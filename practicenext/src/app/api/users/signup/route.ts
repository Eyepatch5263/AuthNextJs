import jsonwebtoken from  'jsonwebtoken';
import { NextRequest,NextResponse } from 'next/server';
import connect from "@/dbConfig/dbconfig"
import bcryptjs from "bcryptjs"
import User from "@/model/usermodel"
import { sendEmail } from '@/helpers/mailer';

connect()
export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json()
        const {email,password,username}=reqBody
        console.log(reqBody)

        //check if the user exists
        const userExist =await User.findOne({ email })
        if (userExist){
        return NextResponse.json({message:"User already exists",status:400})
        }

        //hashing a password
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)

        //creating a new user
        const user=new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser= await user.save();
        console.log(savedUser)

        //send email verification
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:"User created successfully!",
            savedUser
        })


    } catch (error:any) {
        NextResponse.json({error:`error occurred :${error}`})
        console.log(error)
    }
}
