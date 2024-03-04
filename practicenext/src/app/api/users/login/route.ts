import jsonwebtoken from  'jsonwebtoken';
import { NextRequest,NextResponse } from 'next/server';
import connect from "@/dbConfig/dbconfig"
import bcryptjs from "bcryptjs"
import User from "@/model/usermodel"

connect()

export  async function POST(request:NextRequest) {
    try {
    const reqBody=await request.json()
    const {password,email}=reqBody
    console.log(reqBody)

    //check if the user exist
    const userExist= await User.findOne({email})
    if(!userExist){
        return NextResponse.json({message:"user doesn't exist"},{status:400})
    }

    //comparing the password
    const validPassword = await bcryptjs.compare(password, userExist.password)
    if(!validPassword){
        console.log("Invalid password")
        return NextResponse.json({message: "Invalid password"}, {status: 400})
    }
    console.log(userExist);

    const tokenData={
        id:userExist._id,
        username:userExist.username,
        email:userExist.email,
    }
    //create token
    const token=jsonwebtoken.sign(tokenData,"nextjsEyepatch",{expiresIn:"1d"})
    console.log(token)
    const response=NextResponse.json({
        success:true,
        message:"user logged in successfully",
        User:userExist
    })

    response.cookies.set("token",token,{httpOnly:true})
    return response;
    
    } catch (error:any) {
        return NextResponse.json({message:`error:${error}`},{status:500})
    }

}