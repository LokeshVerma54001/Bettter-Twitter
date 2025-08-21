"use client"

import { motion } from 'framer-motion'
import { Camera, ImagePlay, MapPin, Smile, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { usePostStore } from '../stores/usePostStore'

const icons = [
    { name: "image", icon: <Camera /> },
    { name: "gif", icon: <ImagePlay /> },
    { name: "emoji", icon: <Smile /> },
    { name: "location", icon: <MapPin /> }
]

const ForYouPage = () => {
    const { getAllPosts, allPosts } = usePostStore();
    const [tab, setTab] = useState<'foryou' | 'following'>('foryou');

    useEffect(() => {
        if (tab === "foryou") {
            getAllPosts(); 
        }
    }, [tab]);

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
                <div className='h-32 border-b border-gray-600 flex flex-col gap-5 items-center'>
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className='flex mt-5 gap-5 w-full justify-center'
                    >
                        <User className='border rounded-full ml-5' size={40} />
                        <input
                            placeholder="What's happening?"
                            type="text"
                            className='h-10 text-xl focus:outline-none focus:border-gray-600 focus:border-b w-[90%] mr-5'
                        />
                    </motion.div>
                    <div className='flex w-[90%] items-center justify-between'>
                        <div className='flex text-sky-500 gap-5'>
                            {icons.map((icon, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                                >
                                    {icon.icon}
                                </motion.div>
                            ))}
                        </div>
                        <motion.button
                            className='bg-white text-black w-26 h-9 rounded-full font-bold'
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            whileTap={{ scale: 0.6 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            Post
                        </motion.button>
                    </div>
                </div>

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
