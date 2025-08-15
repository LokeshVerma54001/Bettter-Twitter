import { Search, User } from 'lucide-react'
import React from 'react'

const HomeExtras = () => {
  return (
    <div className=' flex flex-col w-[28%] items-center'>
        <div className=' w-80'>
            <div className=' border border-gray-600 flex items-center justify-center h-10 rounded-full gap-2 mt-5 sticky'>
                <Search />
                <input 
                    className=' focus:outline-none'
                    type="text" 
                    placeholder='Search'
                />
            </div>
            <div className=' w-full border rounded-2xl mt-10 border-gray-600 h-52'>
                <h1 className=' font-extrabold text-xl mt-5 pl-5'>Subscribe to Premium</h1>
                <p className=' text-sm w-78 mt-3 pl-5'>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
                <button className=' bg-sky-600 h-10 w-32 rounded-2xl ml-5 mt-5 font-bold'>Subscribe</button>
            </div>
            <div className=' w-full border flex flex-col rounded-2xl mt-5 border-gray-600 h-52'>
                <h1 className=' font-extrabold text-xl mt-5 pl-5'>Who to follow</h1>
                <div className=' flex w-[95%] self-center mt-5 justify-between items-center'>
                    <div className=' flex  items-center gap-3'>
                        <User  className=' border rounded-full size-8'/>
                        <div className=' flex flex-col'>
                            <h1>UserName</h1>
                            <p>@user_name</p>
                        </div>
                    </div>
                    <button className=' bg-white text-black self-center mr-5 h-8 w-20 rounded-2xl'>Follow</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeExtras