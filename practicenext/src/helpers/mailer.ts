import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import User from "@/model/usermodel"
import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
export async function sendEmail({email,emailType,userId}:any) {
    try {
        const hashedToken=await bcryptjs.hash(userId.toString(),10)

        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600*24*7*1000
            })
        }
    
        else if(emailType==="FORGET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+(3600*24*7*1000)
            })
        }
    
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "48abea47269367",
                pass: "709de73e65c009"
            }
        });
    
        const mailOption={
            from:"pratyushpragyey@gmail.com",
            to: email,
            subject: `${emailType=="VERIFY"?'Account Verification':'Reset Your Password'}`,
            html:`<p>click ${emailType==="VERIFY"?`<a href="http://localhost:3000/verifyEmail?token=${hashedToken}">here</a>`:`<a href="http://localhost:3000/passwordReset?token=${hashedToken}">here</a>`}  to ${emailType==="VERIFY"?"Verify your Email":"Reset your Password"}</p>`
        }
        const mail=await transport.sendMail(mailOption)
        return mail
    } catch (error:any) {
    NextResponse.json({error:error})
    console.log(error)
    }
    
}