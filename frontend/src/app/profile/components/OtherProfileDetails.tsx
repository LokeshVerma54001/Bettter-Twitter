import React, { useEffect, useState } from 'react'
import PostCard from '../../../components/PostCard'
import { useUserStore } from '../../../stores/useUserStore';
import Image from 'next/image';
import { Calendar, CircleCheckBig } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const tabs = [{name:"Posts"}, {name:"Replies"}, {name:"Highlights"}, {name:"Media"}, {name:"Likes"}]

const OtherProfileDetails = () => {

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Posts");
  const {getOtherUser, followUser, user:selfUser} = useUserStore();
  const [user, setUser] = useState(null);
  const params = useParams();
  const id = params.id;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (selfUser && user) {
      setIsFollowing(selfUser.following?.includes(user._id));
    }
  }, [selfUser, user]);

  const handleFollowButton = async () =>{
    try {
      const success = await followUser(user?._id);
      if(success){
        setIsFollowing((prevState) => !prevState);
      }
      else{
        throw new Error("Error following/unfollowing user");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
      const fetchOtherUser = async ()=>{
          try {
              const res = await getOtherUser(id);
              setUser(res);
          } catch (error) {
              console.log("Error:", error)
          }
      }
      fetchOtherUser();
  }, [getOtherUser, id])

  return (
    <div className="flex flex-col">



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
      {!isFollowing && <button onClick={handleFollowButton} className=' hover:cursor-pointer self-end bg-white text-black rounded-2xl px-5 py-1 m-5 font-bold'>Follow</button>}
      {isFollowing && <button onClick={handleFollowButton} className=' hover:cursor-pointer self-end bg-white text-black rounded-2xl px-5 py-1 m-5 font-bold '>Following</button>}
      <div className=' flex flex-col h-66 '>
        <div className=' flex ml-5 items-center gap-3'>
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
          <div className=' flex gap-1 hover:cursor-pointer' onClick={() => router.push(`/following/${user?._id}`)}>
            <h1 className=' font-bold'>{user?.following?.length}</h1>
            <p className=' text-gray-500'>Following</p>
          </div>
          <div className='flex gap-1 hover:cursor-pointer' onClick={() => router.push(`/followers/${user?._id}`)}>
            <h2 className=' font-bold'>{user?.followers?.length}</h2>
            <p className=' text-gray-500'>Followers</p>
          </div>
        </div>
        {/* tabs */}
        <div className=' flex'>
          {tabs.map((tab, index) =>(
            <div
              key={index}
              className=' w-[20%] hover:cursor-pointer flex flex-col items-center justify-center h-10 mt-2.5 hover:bg-gray-900 border-b border-gray-600'
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
              <span className={` ${tab.name === activeTab?"inline": "hidden"} border-b-4 border-blue-400 w-[80%] `}></span>
            </div>
          ))}
        </div>
        {/* posts stuff below */}
        {/* posts  */}
        {activeTab === 'Posts' && 
          user?.posts?.map((userPost, index) => (
            <PostCard 
              key={index} 
              userPost={userPost}  
            />
          ))
        }
        {/* likes */}
        {activeTab === 'Likes' &&
          user?.likedPosts?.map((userPost, index) =>(
            <PostCard 
              key={index}
              userPost={userPost}
            />
          ))
        }
      </div>
    </div>
  )
}

export default OtherProfileDetails