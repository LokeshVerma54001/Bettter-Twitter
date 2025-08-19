"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useUserStore } from '../../stores/useUserStore'

const LoginPage = () => {
    
    const navigation = useRouter();

    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:""
    });

    const {login} = useUserStore();

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await login(loginInfo);
        if(success){
            navigation.push('/');
        }
    }

  return (
    <div className=' flex flex-col items-center gap-5 justify-center h-screen w-screen'>
        <h1 className=' text-6xl font-extrabold'>
            X
        </h1>
        <h1 className=' text-6xl font-extrabold text-center'>
            Welcome Back
        </h1>
        <h2 className=' text-4xl'>Nice to see you!</h2>
        <form 
            onSubmit={(e) => handleSubmit(e)} 
            className=' flex flex-col mt-5 gap-3 items-center'
        >   
            <input 
                type="email" 
                placeholder='Email'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
                value={loginInfo.email}
                onChange={(e)=> setLoginInfo((prevState)=>({
                    ...prevState, 
                    email: e.target.value
                }))}
            />
            <input 
                type="password" 
                placeholder='Password'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
                value={loginInfo.password}
                onChange={(e)=> setLoginInfo((prevState)=>({
                    ...prevState, 
                    password: e.target.value
                }))}
            />
            <button
                type='submit'
                className=' bg-white text-black px-28 py-3 mt-5 rounded-full'
            >
                Sign Up!
            </button>
        </form>
        <p>{"Don't have an Account? "}<Link className=' text-blue-400 hover:text-blue-300' href={'/signup'}>Sign up!</Link></p>
    </div>
  )
}

export default LoginPage