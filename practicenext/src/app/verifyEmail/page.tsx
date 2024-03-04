"use client"
import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";

const verifyEmail=()=>{
    const [verified,setVerified]=useState(false)
    const [token,setToken]=useState("")
    const [error,setError]=useState(false)
    const verifyEmail=async()=>{
        try {
        const response=axios.post('/api/users/verifyEmail',{token})
        console.log(response)
        setVerified(true)
        } catch (error:any) {
            setError(true)
            toast(error, {
                duration: 4000,
                position: 'top-right',
                style: {fontFamily:"georgia",background:"pink"},

                // Aria
                ariaProps: {
                role: 'status',
                'aria-live': 'polite',
                },
            });
        }
        
    }
    useEffect(()=>{
        const urlToken=window.location.search.split("=")[1]
        setToken(urlToken)
    })

    useEffect(()=>{
        if(token.length>0){
            verifyEmail()
        }
    },[token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen-2">
            <h1 style={{fontFamily:"georgia"}}>Verify Email</h1>
            <br/>
            <h2 className="p-2 bg-purple-400 text-black" style={{fontFamily:"georgia"}}>{token?`${token}`:"No Token"}</h2>
            {verified &&(
                <div>
                    <h2 style={{fontFamily:"georgia", color:"lightgreen"}}>Your Email verified</h2>
                    <Link href='/login' style={{fontFamily:"georgia"}}>Login</Link>
                    </div>
            )}
            {error &&  toast(`${error}`, {
                duration: 4000,
                position: 'top-right',
                style: {fontFamily:"georgia",background:"pink"},

                // Aria
                ariaProps: {
                role: 'status',
                'aria-live': 'polite'
                },
            })}
            <div>
        <Toaster />
    </div>
        </div>
    )
}
export default verifyEmail