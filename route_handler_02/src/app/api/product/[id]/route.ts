import { NextRequest,NextResponse } from "next/server";
import { writeFile,readFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { ClothList } from "@/utils/helper";

const dataFilePathForDelete = path.join(process.cwd(),'src','data','clothList.json');

//Helper function to read data
async function readFileForDel(){
    const readDataForDel = await readFile(dataFilePathForDelete,"utf-8")
    return JSON.parse(readDataForDel);
}

//Helper function to write data
async function writeDataFile(data:any){
    await writeFile(dataFilePathForDelete,JSON.stringify(data,null,2));
};

//Handle DELETE Request
export async function DELETE(req:NextRequest) {
    //extract pathname in the URL
    const {pathname} = req.nextUrl;
    //extract id from the pathname
    const deleteId = pathname.split('/').pop();
    if(!deleteId){
        return NextResponse.json({error:'ID is required'},{status:400});
    };
    try {
        //read existing data
        const clothList:ClothList[] = await readFileForDel();

        //find the product to delete
        const deleteProd = clothList.find((e) => {
           return  e.id === +deleteId; 
        });
        if(!deleteProd){
            return NextResponse.json({error:'Product not Found'},{status:404});
        }

        //Filter out the product by an ID
        const filterClothList:ClothList[] = clothList.filter((e) => {
            return e.id !== +deleteId;
        });

        //write updated back to the file
        await writeDataFile(filterClothList);

        //delete images in file once I delete the product
        const deleteImgPath = path.join(process.cwd(),'public','images',deleteProd.img);
        try {
           await unlink(deleteImgPath)
           console.log(`Image Deleted - ID :${deleteProd.id}`)
        } catch (error) {
            console.log(`Error deleting image file`)
        }

        return NextResponse.json({ message: `Product ID ${deleteId} deleted successfully` },{status:200});

    } catch (error) {
        return NextResponse.json({error:"Error when deleting the product"},{status:500})
    }

}

// Handle PUT Request
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const editFormData = await req.formData();
    const getEditName = editFormData.get("editname")?.toString();
    const getEditImg = editFormData.get("editimg") as File | null;

    if (!id || !getEditName) {
        return NextResponse.json({ error: "ID and Name are required" }, { status: 400 });
    }

    try {
        // Read the existing data
        const clothList: ClothList[] = await readFileForDel();

        // Find the product to update
        const productFind = clothList.find((e) => e.id === +id);
        if (!productFind) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        let updatedImg = productFind.img;

        if (getEditImg) {
            try {
                const newImgFileName = `${Date.now()}-${getEditImg.name}`;
                const newImgPath = path.join(process.cwd(), "public", "images", newImgFileName);
                const oldImgPath = path.join(process.cwd(), "public", "images", updatedImg);

                console.log("Old Image Path:", oldImgPath);
                console.log("New Image Path:", newImgPath);

                // Create directory and save new image
                const buffer = Buffer.from(await getEditImg.arrayBuffer());
                await mkdir(path.dirname(newImgPath), { recursive: true });
                await writeFile(newImgPath, buffer);

                // Delete old image if it exists
                try {
                    await unlink(oldImgPath);
                    console.log("Old image deleted successfully.");
                } catch (error) {
                    console.warn("Failed to delete old image. It may not exist:", error);
                }

                updatedImg = newImgFileName;
            } catch (fileError) {
                console.error("Error handling image upload:", fileError);
                return NextResponse.json({ error: "Failed to process image upload" }, { status: 500 });
            }
        }

        // Update product details
        const mapClothList = clothList.map((e) =>
            e.id === productFind.id ? { ...e, name: getEditName, img: updatedImg } : e
        );

        // Save updated data
        await writeDataFile(mapClothList);

        return NextResponse.json({ message: `Product ID:${id} updated successfully` }, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}









