import { Calendar, CircleCheckBig } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PostCard from '../../../components/PostCard'
import { useUserStore } from '../../../stores/useUserStore'
import ProfileEditWindow from './ProfileEditWindow'
import { usePostStore } from '../../../stores/usePostStore'

const tabs = [{name:"Posts"}, {name:"Replies"}, {name:"Highlights"}, {name:"Articles"}, {name:"Media"}, {name:"Likes"}]

const ProfileDetails = () => {

  const [editProfileActive, setEditProfileActive] = useState(false);

  const {user} = useUserStore();
  const {userPosts, getPostsByUser} = usePostStore();

  useEffect(()=>{
    getPostsByUser();
    
  }, [getPostsByUser])
  console.log(userPosts);
  

  return (
    <div className="flex flex-col">

      <ProfileEditWindow 
        editProfileActive={editProfileActive}
        setEditProfileActive={setEditProfileActive}
      />

      {/* Banner wrapper */}
      <div className="relative h-60">
        {/* Banner image */}
        <Image
          src={user?.bannerImage ||"/1080x360.jpg"}
          alt="banner"
          fill
          className="object-cover"
        />

        {/* Profile picture */}
        <div className="absolute -bottom-16 left-5 rounded-full border-4 border-black">
          <Image
            src={user?.profileImage || "/pfp.jpg"}
            alt="pfp"
            width={126}  // 96px (6rem) for a good size
            height={126}
            className="rounded-full"
          />
        </div>
      </div>
      <div className=' flex flex-col h-66 '>
        <button 
          onClick={(() => setEditProfileActive(true))}
          className=' self-end bg-white text-black mt-5 mr-5 px-7 py-2 rounded-full'
        >Edit</button>
        <div className=' flex ml-5 mt-3 items-center gap-3'>
          <h1 className=' font-bold text-2xl'>{user?.name}</h1>
          <button className=' flex border rounded-full py-0.5 px-2 text-sm items-center'>
            <CircleCheckBig className=' text-sky-500 ' size={20}/> Get Verified
          </button>
        </div>
        <p className=' font-light text-sm ml-5 text-gray-500'>@{user?.username}</p>
        <p className=' mt-3 ml-5 '>{user?.bio}</p>
        <p className=' flex items-center text-gray-500 ml-5 mt-1 gap-2'>
          <Calendar /> Joined {user?.createdAt?.slice(0, 10)}
        </p>
        <div className=' flex ml-5 mt-1 gap-5'>
          <div className=' flex gap-1'>
            <h1 className=' font-bold'>{user?.following.length}</h1>
            <p className=' text-gray-500'>Following</p>
          </div>
          <div className='flex gap-1'>
            <h2 className=' font-bold'>{user?.followers.length}</h2>
            <p className=' text-gray-500'>Followers</p>
          </div>
        </div>
        {/* tabs */}
        <div className=' flex'>
          {tabs.map((tab, index) =>(
            <div
              key={index}
              className=' w-[16.6%] flex items-center justify-center h-10 mt-2.5 hover:bg-gray-900 border-b border-gray-600'
            >
              {tab.name}
            </div>
          ))}
        </div>
        {/* posts stuff below */}
        {user && userPosts && userPosts.length>0 && 
        userPosts?.map((userPost, index) => (
          <PostCard 
            key={index} 
            userPost = {userPost}  
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileDetails
