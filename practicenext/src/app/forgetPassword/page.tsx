"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import toast, { Toaster } from "react-hot-toast"
const forgetPassword=()=>{
    const [user,setUser]=React.useState({email:""})
    const router=useRouter()
    const onForgetPassword=async()=>{
        const response=await axios.post('/api/users/forgetPassword',user)
        toast('Reset Link send successfully', {
            duration: 4000,
            position: 'top-right',
            style: {fontFamily:"georgia",background:"pink"},

            // Aria
            ariaProps: {
            role: 'status',
            'aria-live': 'polite',
            },
        });
        setTimeout(()=>{
            router.push('/login')
        },3000)
        console.log(response)
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 style={{ fontFamily: "georgia", fontSize: "34px", fontWeight: "bolder", paddingBottom: "10px" }}>Reset Password</h1>
            
            <input
                className="p-2 border-gray-200 rounded-sm"
                id="email" type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="Email" style={{ color: "black", fontFamily:"georgia", marginBottom:"16px"}} />
                
                <button onClick={onForgetPassword} className="p-2 border-gray-200 rounded-md mb-4 " style={{border:"1px white solid", padding:"10px", fontFamily:"georgia",}}>Send Link</button>
                <Link href={"/login"} style={{fontFamily:"georgia"}}>Login here</Link>
                <div>
        <Toaster />
    </div>
        </div>
    )
}

export default forgetPassword;