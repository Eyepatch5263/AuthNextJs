import connect from "@/dbConfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/model/usermodel"
import bcryptjs from "bcryptjs"

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody;

        const user=await User.findOne({email})
        //hashing the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt);
        user.password=hashedPassword
        user.forgotPasswordToken=undefined
        user.forgotPasswordTokenExpiry=undefined
        user.save()
        console.log(user)
        console.log(user.password)
        const response=NextResponse.json({
            success:true,
            message:"Password reset successfully",
            User:user
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error:error,status:500})
    }
    
}