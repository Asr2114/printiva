import { axiosClient } from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');
    try{
        if (email) {
            const result = await axiosClient.get(`/carts?filters[userEmail][$eq]=${email}&populate=*`);
            return NextResponse.json(result.data.data);
        } else {
            const result = await axiosClient.get('/carts?populate=*');
            return NextResponse.json(result.data.data);
        }

    } catch(e){
        console.error('Cart API Error:', e);
        return NextResponse.json({ error: 'Failed to fetch cart data' }, { status: 500 });
    }
}

export async function POST(req:NextRequest){
    const {userEmail, designUrl, product}=await req.json();

    const data={
        data:{
            userEmail:userEmail,
            design:designUrl,
            products:{
                connect:[product?.documentId]
            }
        }
    }

    try{
        const result = await axiosClient.post('/carts',data);
        console.log('Cart created:', result.data);
        return NextResponse.json(result.data);

    } catch(e){
        console.error('Cart creation error:', e);
        return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 });
    }
}