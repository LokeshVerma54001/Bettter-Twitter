import { Search } from 'lucide-react'
import React from 'react'

const SearchMain = () => {
  return (
  
    <div className='lg:w-[50%] w-[80%] flex flex-col border-r border-l border-gray-600 lg:ml-[22rem] ml-[10rem] '>
        <div className='flex w-full h-32 flex-col border-b border-gray-600 sticky top-0 bg-black z-10'>
            <div className=' border border-gray-600 flex items-center h-10 rounded-full gap-2 mt-3 w-[80%] self-center'>
                <Search className=' ml-5' />
                <input 
                    className=' focus:outline-none'
                    type="text" 
                    placeholder='Search'
                />
            </div>
            <div className=' flex mt-2'>
                <div className='  hover:bg-gray-900 w-[50%] h-12 flex justify-center items-center '>
                    People
                </div>
                <div className=' w-[50%] hover:bg-gray-900 flex justify-center items-center h-12'>
                    Posts
                </div>
            </div>        
        </div>
        <div className=" overflow-scroll h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
        </div>
    </div>
  )
}

export default SearchMain