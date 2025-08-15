'use client'

import { Bell, Home, Mail, Pen, Search, Star, User, Users, XIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MiniProfile from './MiniProfile'
import { motion } from 'framer-motion'

const navbarMenus = [
    {
        name: "Home",
        Icon: <Home className=' ml-5 size-8 lg:size-6' />,
        path: "/"
    },
    {
        name: "Explore",
        Icon: <Search className=' ml-5 size-8 lg:size-6'/>,
        path: "/explore"
    },
    {
        name: "Notifications",
        Icon: <Bell className=' ml-5 size-8 lg:size-6'/>,
        path: "/notifications"
    },
    {
        name: "Messages",
        Icon: <Mail className=' ml-5 size-8 lg:size-6'/>,
        path: "/messages"
    },
    {
        name: "Communities",
        Icon: <Users className=' ml-5 size-8 lg:size-6'/>,
        path: "/communities"
    },
    {
        name: "Premium",
        Icon: <Star className=' ml-5 size-8 lg:size-6'/>,
        path: "/premium"
    },
    {
        name: "Profile",
        Icon: <User className=' ml-5'/>,
        path: "/profile"
    }
]

const NavBar = () => {
  return (
    <div className=' h-screen w-60 lg:w-90 border-gray-600 border-b flex flex-col items-end fixed top-0 left-0'>
        <div className=' w-80 h-screen flex flex-col items-center justify-end gap-8'>
            <motion.div
                initial={{scale:0.8, opacity:0}}
                animate={{scale:1, opacity:1}}
                transition={{duration:0.3, delay:0.1}}
            >
                <XIcon className=' ml-5 self-center  rounded-full' size={40} />
            </motion.div>
            <div className=' flex gap-5 flex-col '>
                {navbarMenus.map((menu, index) => (
                    <motion.div 
                        key={menu.name}
                        initial={{x:-10, opacity:0}}
                        animate={{x:0, opacity:1}}
                        transition={{delay:0.1 * index, duration:0.3}}
                    >
                        <Link  href={menu.path} className=' flex gap-5 items-center hover:bg-gray-900 h-10 text-2xl rounded-full'>{menu.Icon}<span className="hidden lg:inline">{menu.name}</span></Link>
                    </motion.div>
                ))}
            </div>
            <motion.button 
                initial={{scale:0.8, opacity:0}}
                animate={{scale:1, opacity:1}}
                transition={{duration:0.3, delay:0.1}}
                className=' bg-white  text-black lg:w-60 w-14 font-bold h-14 rounded-4xl ml-3'
            ><Pen className=' lg:hidden inline' /> <h1 className='hidden lg:inline'>Post</h1></motion.button>
            <MiniProfile/>
        </div>
    </div>
  )
}

export default NavBar