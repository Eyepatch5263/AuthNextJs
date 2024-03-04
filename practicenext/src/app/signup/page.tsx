"use client"
import Link  from 'next/link'
import  { useRouter } from 'next/navigation';   
import  React,{useState, useEffect} from 'react'
import  axios from 'axios'
import {Toaster, toast} from "react-hot-toast"


const Signup=()=>{

    const  router = useRouter()
    const [user,setUser]=React.useState({username:"",email:"",password:""})
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    const [loading,setLoading]=React.useState(false)

    useEffect(()=>{
        if(user.email.length>0&&user.password.length>0&&user.password.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])
    const onSignUp=async()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("response is ",response)
            toast('Account Created Successfully', {
                duration: 4000,
                position: 'top-center',
                style: {fontFamily:"georgia",background:"pink"},

                // Aria
                ariaProps: {
                role: 'status',
                'aria-live': 'polite',
                },
            });
            setTimeout(() => router.push('/login'), 3000);
        } catch (error:any) {
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
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1 style={{ fontFamily: "georgia", fontSize: "34px", fontWeight: "bolder", paddingBottom: "10px" }}>{loading?"Processing":"SignUp"}</h1>
            
            <label htmlFor="username" style={{ fontFamily: "georgia", fontSize: "20px", paddingBottom: "6px" }}>Username: </label>
            <input
                className="p-2 border-gray-200 rounded-sm"
                id="username" type="text" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} placeholder="Username" style={{ color: "black", fontFamily:"georgia", marginBottom:"10px" }} />
                

            <label htmlFor="email" style={{ fontFamily: "georgia", fontSize: "20px", paddingBottom: "6px" }}>Email: </label>
            <input
                className="p-2 border-gray-200 rounded-sm"
                id="email" type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="Email" style={{ color: "black", fontFamily:"georgia", marginBottom:"10px" }} />
                

            <label htmlFor="Password" style={{ fontFamily: "georgia", fontSize: "20px", paddingBottom: "6px" }}>Password: </label>
            <input
                className="p-2 border-gray-200 rounded-sm"
                id="password" type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="Password" style={{ color: "black", fontFamily:"georgia", marginBottom:"16px" }} />
                
                <button onClick={onSignUp} className="p-2 border-gray-50 rounded-md mb-4 " style={{border:"1px white solid", padding:"12px", fontFamily:"georgia",}}>{buttonDisabled?"Not SignUp":"SignUp"}</button>
                <Link href={'/login'} style={{fontFamily:"georgia" }}>Already registered? Sign In here</Link>
                <div>
                <Toaster />
                    </div>
    </div>
        
        
    )
}

export default Signup