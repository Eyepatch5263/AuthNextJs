import connect from "@/dbConfig/dbconfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/model/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request:NextRequest){
try {
    const reqBody=await request.json()
    const {email,token}=reqBody;
    const userExist= await User.findOne({ email });
    if(!userExist){
        return NextResponse.json({message:"User doesn't exist"})
    }
    //check token is valid or not
    if (userExist.resetToken !== token) {
    console.log('Invalid Token');
    return NextResponse.json({message:"Invalid Token",status:401})
    }

    await sendEmail({email,emailType:"FORGET",userId:userExist._id})
    return NextResponse.json({message:"Email sent successfully",success:true})
} catch (error:any) {
    return NextResponse.json({error:error, status:500})
}
}