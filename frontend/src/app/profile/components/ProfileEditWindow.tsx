import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useUserStore } from '../../../stores/useUserStore'

const ProfileEditWindow = ({editProfileActive, setEditProfileActive}) => {
  
    const {user} = useUserStore();

    const [userInfo, setUserInfo] = useState({
        name: user?.name,
        username: user?.username,
        bio: user?.bio,
        bannerImage: user?.bannerImage,
        profileImage: user?.profileImage
    });

    const handleSubmit = async () =>{

    }

    return (
    <div className={` ${editProfileActive==true?"":"hidden"} w-[500px] bg-black border border-gray-600 rounded-xl p-5 absolute lg:left-120 z-99 lg:top-30 left-50 top-30 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                className=' hover:cursor-pointer'
                onClick={() => setEditProfileActive(false)}
              >
                <X />
              </button>
              <h1 className="text-lg font-bold">Edit profile</h1>
            </div>
            <button 
                onClick={handleSubmit}
                className="bg-white text-black px-4 py-1.5 rounded-full font-semibold"
            >
              Save
            </button>
          </div>

            {/* Banner wrapper */}
            <div className="relative h-60">
            {/* Banner image */}
            <label htmlFor="bannerImage" className="cursor-pointer">
                <Image
                src="/1080x360.jpg"
                alt="banner"
                className="object-cover"
                width={1000}
                height={1000}
                />
            </label>
            <input 
                type="file" 
                id="bannerImage"
                className="hidden"  // hides the input
                accept="image/*"   // only allow image files
            />

            {/* Profile picture */}
            <div className="absolute top-20 left-5 rounded-full border-4 border-black">
                <label htmlFor="profileImage" className="cursor-pointer">
                <Image
                    src="/pfp.jpg"
                    alt="pfp"
                    width={126}  
                    height={126}
                    className="rounded-full"
                />
                </label>
                <input 
                type="file" 
                id="profileImage"
                className="hidden" 
                accept="image/*"
                />
            </div>
            </div>

          {/* Body – you can put form fields here */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              className=" border border-gray-500 text-white px-3 py-2 rounded-lg outline-none"
              value={userInfo.name}
              onChange={(e) => setUserInfo((prevState) => ({
                ...prevState,
                name: e.target.value
              }))}
            />
            <input
              type="text"
              placeholder="Username"
              className=" border border-gray-500 text-white px-3 py-2 rounded-lg outline-none"
              value={"@"+userInfo.username}
              onChange={(e) => setUserInfo((prevState) => ({
                ...prevState,
                username: e.target.value
              }))}
            />
            <textarea
              placeholder="Bio"
              className="border border-gray-500 text-white px-3 py-2 rounded-lg outline-none"
              value={userInfo.bio}
              onChange={(e) => setUserInfo((prevState) => ({
                ...prevState,
                bio: e.target.value
              }))}
            />
          </div>
        </div>
  )
}

export default ProfileEditWindow