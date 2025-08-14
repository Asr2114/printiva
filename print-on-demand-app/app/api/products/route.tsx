import { axiosClient } from "@/lib/axiosClient";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const isPopular = searchParams.get('isPopular');
    const category = searchParams.get('category');
    const productId = searchParams.get('productId');



    if(isPopular=='1'){

    

    const result = await axiosClient.get('/products?populate=*');
    return NextResponse.json(result?.data?.data);
    }

    else if(category){
        const result = await axiosClient.get('/products?populate=*&filters[category][slug][$eq]='+category);
        return NextResponse.json(result?.data?.data);
    }
     else if(productId){
        const result = await axiosClient.get('/products/'+productId + '?populate=*');
        return NextResponse.json(result?.data?.data);
     }
    else{
        return NextResponse.json({});
    }
}