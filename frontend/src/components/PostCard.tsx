import { motion } from 'framer-motion'
import { Bookmark, ChartNoAxesColumn, Ellipsis, Heart, MessageCircle, Repeat, Upload, User } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { usePostStore } from '../stores/usePostStore'

const icons = [
    {
      icon: <MessageCircle size={20}/>,
      name: "comments"
    },
    {icon: <Repeat size={20} />, name: "retweets"},
    {icon: <Heart size={20} />, name: "likes"},
    {icon: <ChartNoAxesColumn size={20} />, name: "views"},
    {icon: <Bookmark size={20} />, name: "bookmarks"},
    {icon: <Upload size={20} />, name: "shares"},
]

const PostCard = ({ userPost }) => {

  const router = useRouter();
  const {likePost} = usePostStore();

  const [postStats, setPostStats] = useState({
    comments: userPost?.replies?.length,
    retweets: userPost?.retweets?.length,
    likes: userPost?.likes?.length,
    views: userPost?.views,
    bookmarks: userPost?.bookmarks?.length
  })

  const handleIconClick = async (name) =>{
    try {
      if(name === "likes"){
        const likes = await likePost(userPost._id);
        setPostStats({
          ...postStats,
          likes: likes
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div 
      className='w-full border-b border-gray-600 flex p-3 gap-3'
      onClick={() => router.push(`/post/${userPost?._id}`)}
    >
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
            width={50}
            height={50}
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
              className={`text-gray-500 flex gap-1 rounded-lg p-1 items-center cursor-pointer ${icon.name==='comments'?" hover:text-sky-500 hover:bg-sky-400/10":
              icon.name==='likes'?" hover:text-red-500 hover:bg-red-400/10":
              icon.name==='retweets'?" hover:text-emerald-500 hover:bg-emerald-400/10":
              icon.name==='views'?" hover:text-sky-500 hover:bg-sky-400/10":
              icon.name==='bookmarks'?" hover:text-sky-500 hover:bg-sky-400/10":""}`}
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // prevents triggering parent click
                handleIconClick(icon.name);
              }}
            >
              {icon.icon}{icon.name==='comments'?postStats.comments:
              icon.name==='likes'?postStats.likes:
              icon.name==='retweets'?postStats.retweets:
              icon.name==='views'?postStats.views:
              icon.name==='bookmarks'?postStats.bookmarks:""}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostCard
