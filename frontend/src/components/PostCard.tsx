import { motion } from 'framer-motion'
import { Bookmark, ChartNoAxesColumn, Ellipsis, Heart, MessageCircle, Repeat, Upload, User } from 'lucide-react'
import React from 'react'

const icons = [
    {icon: <MessageCircle size={20} />},
    {icon: <Repeat size={20} />},
    {icon: <Heart size={20} />},
    {icon: <ChartNoAxesColumn size={20} />},
    {icon: <Bookmark size={20} />},
    {icon: <Upload size={20} />},
 ]

const PostCard = () => {
  return (
    <div className=' w-full border-b border-gray-600 flex'>
        <motion.div
            initial={{x:-10, opacity:0}}
            animate={{x:0, opacity:1}}
            transition={{delay:0.1, duration:0.3}} 
        >
            <User 
                className=' border rounded-full mt-3 ml-3'
                size={35}
            />
        </motion.div>
        <div className=' flex-col items-center w-full mt-3 ml-3 gap-5'>
            <motion.div 
                initial={{x:-10, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.1, duration:0.3}} 
                className=' w-full flex justify-between '
            >
                <div className=' flex gap-2 w-full'>
                    <h1 className='font-bold'>UserName</h1>
                    <p className=' font-light text-gray-500'>@username</p>
                </div>
                <Ellipsis className='mr-5'/>
            </motion.div>
            <motion.p
                initial={{x:-10, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.1, duration:0.3}} 
            >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti quo vitae veritatis corporis quas accusantium iusto id, voluptatem minus suscipit! Quibusdam aut, deleniti quia quo officiis quam reiciendis quaerat a!</motion.p>
            <div className=' flex gap-20 my-3'>
                {icons.map((icon, index)=>(
                    <motion.div
                        initial={{y:10, opacity:0}}
                        animate={{y:0, opacity:1}}
                        transition={{delay:0.1*index, duration:0.3}}
                        className=' text-gray-500'
                        key={index}
                    >
                        {icon.icon}
                    </motion.div>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default PostCard