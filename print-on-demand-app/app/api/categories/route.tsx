import { axiosClient } from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        const result=await axiosClient.get('/categories?populate=*');
        return NextResponse.json(result.data);

    } catch(e){
        return NextResponse.json(e);

    }
}