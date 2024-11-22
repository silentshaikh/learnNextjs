import { ImgList } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,context:{params:{id:string}}){
    try {
        const fetchProductApi = await fetch(`http://localhost:3000/api/product`);
    const dataIntoJson:ImgList[] = await fetchProductApi.json();
    const findProduct = dataIntoJson.find((e) => {
        return e.id === +context.params.id;
    });
    if(findProduct){
        return NextResponse.json(findProduct,{status:200});
    }else{
        return NextResponse.json({ error: 'Failed to fetch product detail' }, { status: 500 });
    }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product detail' }, { status: 500 });
    }
}