import { ClothList,  } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable"; // Import formidable

import path from "path";
import { readFile, writeFile } from "fs/promises";
import { mkdir ,access} from "fs/promises";

const dataFilePath = path.join(process.cwd(),'src','data','clothList.json');
console.log(dataFilePath)

//ensure the data file exist
async function ensureDataFileExists() {
  try {
    // Ensure directory exists
    await mkdir(path.dirname(dataFilePath),{recursive:true});
    // Check if file exists
    await access(dataFilePath)
  } catch (error) {
    //Create an empty json file
    alert('New File create')
    await writeFile(dataFilePath,JSON.stringify([]));
  }
};

//Read the data file
async function readDataFile(){
  await ensureDataFileExists();
  const readData = await readFile(dataFilePath,'utf-8')
  return JSON.parse(readData);
};

//write to the data file
async function writeDataFile(data:any){
  await writeFile(dataFilePath,JSON.stringify(data,null,2))
};


export async function POST(req:NextRequest){
  const data = await req.formData();
  const prodImg = data.get('img') as File | null;
  const prodId = data.get('id');
  const prodName = data.get('name');
  if(!prodId || !prodImg || !prodName){
    return NextResponse.json({error:"Image not Found"},{status:400})
  }
  console.log(prodImg)
  const byteImg  =  prodImg.toString();
  const byteId = prodId.toString();
  const byteName = prodName.toString();
  const imgFileName = `${Date.now()}-${prodImg.name}`
  const generatePath = path.join(process.cwd(),'public','images',imgFileName);

  // Read the file as an ArrayBuffer and convert it to Buffer
  const arrBuffer = await prodImg.arrayBuffer();
  const buffr = Buffer.from(arrBuffer);
  await mkdir(path.dirname(generatePath), { recursive: true });
  await writeFile(generatePath,buffr);

  //Read existing data
  const clothList:ClothList[] = await readDataFile();
  // push the product data in api
  clothList.push({id:+byteId,name:byteName,img:imgFileName});
  console.log(clothList)

  //save back to the file
  await writeDataFile(clothList);
  return NextResponse.json({ message: `Product ID:${byteId} added successfully` },{status:201});
};

export async function GET() {
  try {
    //read the data
    const clothList:ClothList[] = await readDataFile();
    return NextResponse.json(clothList, { status: 200 });
  } catch (error) {
    
  }
}






