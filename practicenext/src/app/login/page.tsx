"use client"
import Link  from 'next/link'
import  { useRouter } from 'next/navigation';   
import  React,{useState, useEffect} from 'react'
import  axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import User from '@/model/usermodel';


const Login=()=>{

    const  router = useRouter()
    const [user,setUser]=React.useState({username:"",email:"",password:""})
    const [buttonDisabled,setButtonDisabled]=React.useState(false)


    useEffect(()=>{
        if(user.email.length>0&&user.password.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])

    const onLogin=async()=>{
        try {
            const response=await axios.post('api/users/login',user)
            console.log(response.data)
            console.log(response.data.User.username)
            if(response.data.User.isVerified==false){
                toast("Please Verify Your Email", {
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
            else if(response.data.User.isVerified==true){
                router.push('/profile')

            }
        } catch (error:any) {
            console.log(error)
        }
    }
    
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 style={{ fontFamily: "georgia", fontSize: "34px", fontWeight: "bolder", paddingBottom: "10px" }}>Login</h1>
            
            <label htmlFor="email" style={{ fontFamily: "georgia", fontSize: "20px", paddingBottom: "6px" }}>Email: </label>
            <input
                className="p-2 border-gray-200 rounded-sm"
                id="email" type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="Email" style={{ color: "black", fontFamily:"georgia"}} />
                <br/>

            <label htmlFor="Password" style={{ fontFamily: "georgia", fontSize: "20px", paddingBottom: "6px" }}>Password: </label>
            <input
                className="p-2 border-gray-200 rounded-sm"
                id="password" type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="Password" style={{ color: "black", fontFamily:"georgia", marginBottom:"10px"}} />
                <Link href={'/forgetPassword'} style={{fontFamily:"georgia" }}>Forgot password?</Link>

                <br/>
                <button onClick={onLogin} className="p-2 border-gray-50 rounded-md mb-4 " style={{border:"1px white solid", padding:"12px", fontFamily:"georgia",}}>{buttonDisabled?"Not Login":"Login"}</button>
                <Link href={'/signup'} style={{fontFamily:"georgia" }}>Haven't registered? Sign In here</Link>
                <div>
        <Toaster />
    </div>
        </div>

    )
}

export default Login