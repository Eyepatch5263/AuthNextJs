"use client"

import axios from "axios"
import Link from "next/link"
import  {useRouter}  from "next/navigation"
import React from "react"
import toast, { Toaster } from "react-hot-toast"

const profile=()=>{
    const router=useRouter();
    const [data,setData]=React.useState("")
    const Logout=async()=>{
        try {
            await axios.get('/api/users/logout')
            toast('Successfully logged out', {
                duration: 4000,
                position: 'top-center',
                style: {fontFamily:"georgia",background:"pink"},
                ariaProps: {
                role: 'status',
                'aria-live': 'polite',
                },
            });
            setTimeout(()=>{
                router.push('/login')
            },2000)

        } catch (error:any) {
            console.log(error)
            toast.error(error)
        }
    }
    const getUserData=async()=>{
        const response=await axios.get('/api/users/about')
        console.log(response.data)
        setData(response.data.data.username)

    }
    return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 style={{ fontFamily: "georgia", fontSize: "40px",fontWeight:"bold"}}>Profile</h1>
            <p style={{ fontFamily: "georgia", fontSize: "20px",}}>Profile Page</p>
            <br/>
            <h2 style={{fontFamily: "georgia", fontSize: "20px", paddingBottom:"14px"}}>{data==="nothing"?"":`Username:${data}`}</h2>
            <button onClick={Logout}  className="p-2 border-gray-50 rounded-md mb-4 bg-blue-600 py-2 px-4" style={{border:"1px white solid", fontFamily:"georgia",}}>Logout</button>

            <button onClick={getUserData} className="p-2 border-gray-50 rounded-md mb-4 bg-pink-600 py-2 px-4" style={{border:"1px white solid", fontFamily:"georgia",}}>Get Details</button>
            <div>
        <Toaster />
    </div>

        </div>
    )
}

export default profile