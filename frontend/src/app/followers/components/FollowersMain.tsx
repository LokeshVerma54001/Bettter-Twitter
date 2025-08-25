import { MoveLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../../stores/useUserStore'
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const FollowersMain = () => {
  const params = useParams();
  const id = params.id; 
  const router = useRouter();

  const { getOtherUser, followUser, user: selfUser } = useUserStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getOtherUser(id);

        // ✅ Initialize isFollowed for each follower
        const updatedFollowers = res.followers.map(f => ({
          ...f,
          isFollowed: selfUser?.following?.includes(f._id) || false
        }));

        setUser({ ...res, followers: updatedFollowers });
      } catch (error) {
        console.log(error);       
      }
    }
    fetchUser();
  }, [id, getOtherUser, selfUser]);

  const handleFollow = async (followId) => {
    try {
      const success = await followUser(followId);
      if (success) {
        setUser((prev) => ({
          ...prev,
          followers: prev.followers.map((f) =>
            f._id === followId ? { ...f, isFollowed: !f.isFollowed } : f
          ),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="lg:w-[50%] w-[80%] flex flex-col border-r border-l border-gray-600 lg:ml-[22rem] ml-[10rem] ">
      
      {/* Header */}
      <div className="flex flex-col border-b border-gray-700 sticky top-0 bg-black z-10">
        <div className="flex items-center gap-5 px-5 py-3">
          <MoveLeft 
            size={28} 
            className="cursor-pointer hover:text-sky-500 transition"
            onClick={() => router.back()}
          />
          <div>
            <h1 className="font-extrabold text-xl">{user?.name}</h1>
            <p className="font-light text-gray-400 text-sm">@{user?.username}</p>
          </div>
        </div>

        <div className="flex text-center">
          <button className="w-1/2 py-3 hover:bg-gray-800 flex flex-col items-center">
            Followers
            <span className="border-b-2 border-sky-500 w-12 mt-1"></span>
          </button>
          <button 
            className="w-1/2 py-3 hover:bg-gray-800 flex flex-col items-center" 
            onClick={() => router.push(`/following/${user?._id}`)}
          >
            Following 
          </button>
        </div>
      </div>

      {/* Followers List */}
      <div className="overflow-y-scroll h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] divide-y divide-gray-800">
        {user?.followers?.map((follow, index) => {
          const isFollowing = follow.isFollowed;
          return (
            <div
              key={index}
              className="flex flex-col px-5 py-4 border-b border-gray-600"
              onClick={() => router.push(`/profile/${follow?._id}`)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Image 
                    src={follow?.profileImage || '/pfp.jpg'}
                    alt="pfp"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h1 className="font-semibold">{follow?.name}</h1>
                    <p className="text-sm text-gray-400">@{follow?.username}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleFollow(follow._id); 
                  }}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                    isFollowing 
                      ? "bg-gray-700 text-white hover:bg-gray-600" 
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow back"}
                </button>
              </div>
              {follow?.bio && (
                <p className="text-sm text-gray-300 mt-2 ml-[3.5rem]">{follow?.bio}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default FollowersMain;
