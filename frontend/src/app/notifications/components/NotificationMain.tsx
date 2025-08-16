"use client"

import React from 'react'

const NotificationMain = () => {
  return (
    <div className='lg:w-[50%] w-[80%] flex flex-col border-r border-l border-gray-600 lg:ml-[22rem] ml-[10rem] '>
        <div className='flex w-full h-40 flex-col border-b border-gray-600 sticky top-0 bg-black z-10'>
            <h1 className=' ml-5 mt-5 font-extrabold text-2xl'>Notifications</h1>
            <div className=' w-full font-bold flex items-center justify-center mt-5' >
                <div className=' hover:bg-gray-900 w-[50%] flex justify-center items-center h-14 ' >
                    <h1>All</h1>
                </div>
                <div className='hover:bg-gray-900 w-[50%] flex justify-center items-center h-14'>
                    <h1>Verified</h1>
                </div>    
            </div>        
        </div>
        <div className=" overflow-scroll h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
        </div>
    </div>
  )
}

export default NotificationMain