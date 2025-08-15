import { motion } from 'framer-motion'
import { Ellipsis, User } from 'lucide-react'
import React from 'react'

const MiniProfile = () => {
  return (
    <motion.div 
      initial={{y:10, opacity:0}}
      animate={{y:0, opacity:1}}
      transition={{duration:0.3, delay:0.1}}
      className=' w-full flex  items-center justify-center h-18 mr-8 mb-4 rounded-full hover:bg-gray-900 gap-3'
    >
      <User className='border rounded-full ml-10 lg:ml-0' size={40}/>
      <div className=' flex-col lg:flex hidden'>
        <h1 className=' font-extrabold'>UserName</h1>
        <p className=' font-light text-gray-500'>@user_tag</p>
      </div>
      <Ellipsis className=' ml-4 lg:inline hidden '/>
    </motion.div>
  )
}

export default MiniProfile