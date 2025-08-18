"use client"

import Link from 'next/link';
import React from 'react'

const SignupPage = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
    }

    return (
    <div className=' flex flex-col items-center gap-5 justify-center h-screen w-screen'>
        <h1 className=' text-6xl font-extrabold'>
            X
        </h1>
        <h1 className=' text-6xl font-extrabold'>
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
            />
            <input 
                type="text" 
                placeholder='UserName'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
            />
            <input 
                type="email" 
                placeholder='Email'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
            />
            <input 
                type="password" 
                placeholder='Password'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
            />
            <input 
                type="password" 
                placeholder='Confirm Password'
                className=' text-center border-gray-500 border-b rounded-2xl py-2 px-20 '
            />
            <button
                type='submit'
                className=' bg-white text-black px-28 py-3 mt-5 rounded-full'
            >
                Sign Up!
            </button>
        </form>
        <p>Already Have an Account? <Link className=' text-blue-400 hover:text-blue-300' href={'/login'}>Login!</Link></p>
    </div>
  )
}

export default SignupPage