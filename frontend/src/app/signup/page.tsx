"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import {useUserStore} from '../../stores/useUserStore.js'
import { useRouter } from 'next/navigation';

const SignupPage = () => {

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const {signup} = useUserStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const success = await signup(userInfo);
        if(success){
            router.push('/');
        }
    }

    return (
    <div className=' flex flex-col items-center gap-5 justify-center h-screen w-screen'>
        <h1 className=' text-6xl font-extrabold'>
            X
        </h1>
        <h1 className=' text-6xl font-extrabold text-center'>
            Happening Now
        </h1>
        <h2 className=' text-4xl'>Join Today!</h2>
        <form 
            onSubmit={(e) => handleSubmit(e)} 
            className=' flex flex-col mt-5 gap-3 items-center'
        >   
            <input 
                type="text" 
                placeholder='Name'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
                value={userInfo.name}
                onChange={(e) => setUserInfo((prevState) => ({
                    ...prevState, 
                    name: e.target.value
                }))}
                required
            />
            <input 
                type="text" 
                placeholder='UserName'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
                value={userInfo.username}
                onChange={(e) => setUserInfo((prevState) => ({
                    ...prevState, 
                    username: e.target.value
                }))}
                required
            />
            <input 
                type="email" 
                placeholder='Email'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
                value={userInfo.email}
                onChange={(e) => setUserInfo((prevState) => ({
                    ...prevState, 
                    email: e.target.value
                }))}
                required
            />
            <input 
                type="password" 
                placeholder='Password'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
                value={userInfo.password}
                onChange={(e) => setUserInfo((prevState) => ({
                    ...prevState, 
                    password: e.target.value
                }))}
                required
            />
            <input 
                type="password" 
                placeholder='Confirm Password'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
                value={userInfo.confirmPassword}
                onChange={(e) => setUserInfo((prevState) => ({
                    ...prevState, 
                    confirmPassword: e.target.value
                }))}
                required
            />
            <button
                type='submit'
                className=' bg-white hover:cursor-pointer hover:scale-105 text-black px-28 py-3 mt-5 rounded-full'
            >
                Sign Up!
            </button>
        </form>
        <p>Already Have an Account? <Link className=' text-blue-400 hover:text-blue-300' href={'/login'}>Login!</Link></p>
    </div>
  )
}

export default SignupPage