"use client"

import { motion } from 'framer-motion'
import { Camera, ImagePlay, MapPin, Smile, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { usePostStore } from '../stores/usePostStore'
import { useUserStore } from '../stores/useUserStore'
import Image from 'next/image'

const icons = [
    { name: "image", icon: <Camera /> },
    { name: "gif", icon: <ImagePlay /> },
    { name: "emoji", icon: <Smile /> },
    { name: "location", icon: <MapPin /> }
]

const ForYouPage = () => {
    
    const { user } = useUserStore();
    const { getAllPosts, allPosts, createPost } = usePostStore();
    const [tab, setTab] = useState<'foryou' | 'following'>('foryou');
    const [postInfo, setPostInfo] = useState({
        content: "",
        media: [] as string[]
      });
    
    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const success = await createPost(postInfo);
            if(success){
                setPostInfo({
                    content: "",
                    media: []
                })
            }
        } catch (error) {
            console.log(error);
        }
      }

    const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const newMedia: string[] = [];
          Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result) {
                setPostInfo(prev => ({
                  ...prev,
                  media: [...prev.media, reader.result as string]
                }));
              }
            };
            reader.readAsDataURL(file);
          });
        }
      }

    useEffect(() => {
        if (tab === "foryou") {
            getAllPosts(); 
        }
    }, [tab, getAllPosts]);

    return (
        <div className='lg:w-[50%] h-full w-[80%] flex flex-col border-r border-l border-gray-600 lg:ml-[22rem] ml-[10rem] '>
            
            {/* Tabs */}
            <div className='flex w-full h-16 border-b border-gray-600 sticky top-0 bg-black z-10'>
                <div
                    className={`w-full hover:bg-gray-900 items-center justify-center flex cursor-pointer relative ${tab === 'foryou' ? 'text-white' : 'text-gray-400'}`}
                    onClick={() => setTab('foryou')}
                >
                    <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.3 }}>
                        Home
                    </motion.h1>
                    {tab === 'foryou' && (
                        <span className="absolute bottom-0 w-20 h-1 bg-sky-500 rounded-full"></span>
                    )}
                </div>
                <div
                    className={`w-full hover:bg-gray-900 items-center justify-center flex cursor-pointer relative ${tab === 'following' ? 'text-white' : 'text-gray-400'}`}
                    onClick={() => setTab('following')}
                >
                    <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.3 }}>
                        Following
                    </motion.h1>
                    {tab === 'following' && (
                        <span className="absolute bottom-0 w-20 h-1 bg-sky-500 rounded-full"></span>
                    )}
                </div>
            </div>

            {/* Feed Section */}
            <div className="overflow-scroll h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                
                {/* Create Post Box */}
                <form
                    onSubmit={handleSubmit}
                    className=' py-5 border-b top-30 left-42 border-gray-600 flex flex-col gap-5 items-center bg-black lg:left-120'
                    >
                    {/* Input Section */}
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className='flex gap-5 w-full justify-center'
                    >
                        {user ? (
                        <Image
                            alt='profileImage'
                            src={user?.profileImage}
                            height={50}
                            width={50}
                            className='rounded-full ml-5'
                        />
                        ) : (
                        <User className='border rounded-full ml-5' size={40} />
                        )}
                        <input
                        placeholder="What's happening?"
                        type="text"
                        className='h-10 text-xl focus:outline-none w-[90%] mr-5 bg-transparent'
                        value={postInfo.content}
                        onChange={(e) =>
                            setPostInfo({ ...postInfo, content: e.target.value })
                        }
                        />
                    </motion.div>

                    {/* Preview Section */}
                    {postInfo.media.length > 0 && (
                        <div className="w-[90%] flex justify-center">
                        {postInfo.media.length === 1 ? (
                            <Image
                            src={postInfo.media[0]}
                            alt="uploaded"
                            width={400}
                            height={300}
                            className="rounded-lg object-cover max-h-72"
                            />
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                            {postInfo.media.slice(0, 4).map((img, i) => (
                                <Image
                                key={i}
                                src={img}
                                alt={`uploaded-${i}`}
                                width={200}
                                height={200}
                                className="rounded-lg object-cover"
                                />
                            ))}
                            </div>
                        )}
                        </div>
                    )}

                    <span className='border-b border-gray-600 w-[90%]'></span>

                    {/* Bottom Icons + Post Btn */}
                    <div className='flex w-[90%] items-center justify-between'>
                        <div className='flex text-sky-500 gap-5'>
                        {icons.map((icon, index) => (
                            <motion.div
                            key={index}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                            >
                            <label
                                htmlFor='imageInput'
                                className='hover:cursor-pointer'
                            >
                                {icon.icon}
                            </label>
                            {icon.name === 'image' && (
                                <input
                                type="file"
                                id="imageInput"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleInputImage}
                                />
                            )}
                            </motion.div>
                        ))}
                        </div>

                        <motion.button
                        className='bg-white text-black w-26 h-9 rounded-full font-bold hover:cursor-pointer'
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileTap={{ scale: 0.6 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        type='submit'
                        >
                        Post
                        </motion.button>
                    </div>
                    </form>

                {/* Posts */}
                <div className='flex flex-col'>
                    {tab === "foryou" ? (
                        allPosts?.length > 0 ? (
                            allPosts.map((post, idx) => (
                                <PostCard key={idx} userPost={post} />
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-5">No posts yet</p>
                        )
                    ) : (
                        <p className="text-center text-gray-400 py-5">Following posts will appear here</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForYouPage
