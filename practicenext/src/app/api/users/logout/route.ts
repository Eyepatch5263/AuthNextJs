import { NextResponse } from "next/server"

const GET=()=>{
    try {
        const response=NextResponse.json({message:"Log out successful"},{status:200})
        response.cookies.set('token',"",{expires:new Date(0)})
        return response
    } catch (error:any) {
        NextResponse.json({Error:`${error}`})
    }
    
}
export {GET}