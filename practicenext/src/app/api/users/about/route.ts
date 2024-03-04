import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/model/usermodel";
import { request } from "http";
import connect from "@/dbConfig/dbconfig";

connect()
export async function GET(request:NextRequest){
    try{
        const UserId=await getTokenData(request);
        const user=await User.findOne({_id:UserId}).select("-password")
        return NextResponse.json({message:"User found", data:user})
    }catch(e:any){
        return NextResponse.json({e:e.message},{status:400})
    }
}