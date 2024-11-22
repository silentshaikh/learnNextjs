import { imgList } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    return NextResponse.json(imgList,{status:200})
};