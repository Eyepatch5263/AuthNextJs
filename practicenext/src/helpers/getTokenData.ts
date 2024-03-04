import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

export const getTokenData=async(request:NextRequest)=>{
    try {
        const token:any=request.cookies.get("token")?.value||""
        const decoded:any=jwt.verify(token,"nextjsEyepatch")
        return decoded.id
    } catch (error) {
        console.log(error)
    }

}