'use client'

import { Bell, Home, Mail, Pen, Search, Star, User, Users, XIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import MiniProfile from './MiniProfile'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '../stores/useUserStore'
import toast from 'react-hot-toast'

const navbarMenus = [
    { name: "Home", Icon: <Home className=' ml-5 size-8 lg:size-6' />, path: "/" },
    { name: "Explore", Icon: <Search className=' ml-5 size-8 lg:size-6' />, path: "/explore" },
    { name: "Notifications", Icon: <Bell className=' ml-5 size-8 lg:size-6' />, path: "/notifications" },
    { name: "Messages", Icon: <Mail className=' ml-5 size-8 lg:size-6' />, path: "/messages" },
    { name: "Communities", Icon: <Users className=' ml-5 size-8 lg:size-6' />, path: "/communities" },
    { name: "Premium", Icon: <Star className=' ml-5 size-8 lg:size-6' />, path: "/premium" },
    { name: "Profile", Icon: <User className=' ml-5 size-8 lg:size-6' />, path: "/profile" }
]

const NavBar = () => {

    const {logout} = useUserStore();

    const path = usePathname();
    const [logoutPopUp, setLogoutPopUp] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // Close popup if clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setLogoutPopUp(false);
            }
        };

        if (logoutPopUp) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [logoutPopUp]);

    const handleLogout = async () =>{
        const success = await logout();
        if(success){
            toast.success("Logged out Successfully!");
            router.push('/login');
        }
    }    

    if (["/premium", "/signup", "/login"].includes(path)) return null;

    return (
        <div className='h-screen w-60 lg:w-90 border-gray-600 border-b flex flex-col items-end fixed top-0 left-0'>
            {/* Popup */}
            {logoutPopUp && (
                <div
                    ref={popupRef}
                    className="absolute bottom-15 left-25 flex flex-col items-center justify-center border border-gray-600 bg-black p-3 rounded-xl z-10 px-10 py-5"
                >
                    <button
                        onClick={handleLogout} 
                        className=' bg-white rounded-2xl px-5 py-1 text-black text-center '
                    >Logout</button>
                </div>
            )}

            <div className='w-80 h-screen flex flex-col items-center justify-end gap-8'>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <XIcon className='ml-5 self-center rounded-full' size={40} />
                </motion.div>

                {/* Navbar Links */}
                <div className='flex gap-5 flex-col '>
                    {navbarMenus.map((menu, index) => (
                        <motion.div
                            key={menu.name}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                            <Link
                                href={menu.path}
                                className='flex gap-5 items-center hover:bg-gray-900 h-10 text-2xl rounded-full'
                            >
                                {menu.Icon}
                                <span className="hidden lg:inline">{menu.name}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Post button */}
                <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className='bg-white text-black lg:w-60 w-14 font-bold h-14 rounded-4xl ml-3'
                >
                    <Pen className='lg:hidden inline' />
                    <h1 className='hidden lg:inline'>Post</h1>
                </motion.button>

                {/* Profile (click to open popup) */}
                <div onClick={() => setLogoutPopUp(prev => !prev)}>
                    <MiniProfile />
                </div>
            </div>
        </div>
    )
}

export default NavBar
