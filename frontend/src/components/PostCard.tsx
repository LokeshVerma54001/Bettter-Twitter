import { motion } from 'framer-motion'
import { Bookmark, ChartNoAxesColumn, Ellipsis, Heart, MessageCircle, Repeat, Upload, User } from 'lucide-react'
import Image from "next/image"

const icons = [
    {icon: <MessageCircle size={20} />},
    {icon: <Repeat size={20} />},
    {icon: <Heart size={20} />},
    {icon: <ChartNoAxesColumn size={20} />},
    {icon: <Bookmark size={20} />},
    {icon: <Upload size={20} />},
]

const PostCard = ({ userPost }) => {
  return (
    <div className='w-full border-b border-gray-600 flex p-3 gap-3'>
      {/* Profile Image */}
      <motion.div
        initial={{x:-10, opacity:0}}
        animate={{x:0, opacity:1}}
        transition={{delay:0.1, duration:0.3}} 
      >
        {userPost?.author?.profileImage ? (
          <Image 
            src={userPost.author.profileImage}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <User className="border rounded-full" size={35} />
        )}
      </motion.div>

      {/* Post Content */}
      <div className='flex flex-col w-full'>
        {/* Header */}
        <motion.div 
          initial={{x:-10, opacity:0}}
          animate={{x:0, opacity:1}}
          transition={{delay:0.1, duration:0.3}} 
          className='flex justify-between w-full'
        >
          <div className='flex gap-2 items-center'>
            <h1 className='font-bold'>{userPost?.author?.username}</h1>
            <p className='text-gray-500 text-sm'>@{userPost?.author?.username}</p>
          </div>
          <Ellipsis className='text-gray-400 cursor-pointer' />
        </motion.div>

        {/* Post text */}
        <motion.p
          initial={{x:-10, opacity:0}}
          animate={{x:0, opacity:1}}
          transition={{delay:0.1, duration:0.3}} 
          className="mt-1"
        >
          {userPost?.content}
        </motion.p>

        {/* Media (if exists) */}
        {userPost?.media?.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {userPost.media.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt="post media"
                width={300}
                height={300}
                className={`rounded-lg object-cover ${userPost.media.length === 1 ? "col-span-2" : ""}`}
              />
            ))}
          </div>
        )}

        {/* Action icons */}
        <div className='flex gap-16 my-3'>
          {icons.map((icon, index) => (
            <motion.div
              initial={{y:10, opacity:0}}
              animate={{y:0, opacity:1}}
              transition={{delay:0.1*index, duration:0.3}}
              className='text-gray-500 cursor-pointer'
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
