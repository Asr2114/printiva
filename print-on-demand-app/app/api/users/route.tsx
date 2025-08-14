import { axiosClient } from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {name, email, picture}=await req.json();

    try{

        const data = {
            data:{
                fullName:name,
                email:email,
                picture:picture
            }
        }
        const result = await axiosClient.post('/user-lists',data);
        console.log("User successfully posted to Strapi:", result.data);
        return NextResponse.json(result.data);

    } catch (e: any) {
        console.error("Error saving user:", e?.response?.data || e.message);
      
        return NextResponse.json(
          { error: e?.response?.data?.message || "Internal Server Error" },
          { status: e?.response?.status || 500 }
        );
      }
}