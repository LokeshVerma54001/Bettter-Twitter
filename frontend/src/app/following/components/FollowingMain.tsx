import { MoveLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../../stores/useUserStore';
import Image from 'next/image';

const FollowingMain = () => {
    const params = useParams();
    const id = params.id; 
    const router = useRouter();
    
    const { getOtherUser, followUser, user: selfUser } = useUserStore();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getOtherUser(id);

                // ✅ initialize isFollowed correctly
                const updatedFollowing = res.following.map(f => ({
                    ...f,
                    isFollowed: selfUser?.following?.includes(f._id) || false
                }));

                setUser({ ...res, following: updatedFollowing });
            } catch (error) {
                console.log(error);       
            }
        };
        fetchUser();
    }, [id, getOtherUser, selfUser]);

    const handleFollow = async (followId) => {
        try {
            const success = await followUser(followId);
            if (success) {
                setUser((prev) => ({
                    ...prev,
                    following: prev.following.map((f) =>
                        f._id === followId ? { ...f, isFollowed: !f.isFollowed } : f
                    ),
                }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='lg:w-[50%] w-[80%] flex flex-col border-r border-l border-gray-600 lg:ml-[22rem] ml-[10rem] '>
            <div className='flex-col w-full items-center border-b border-gray-600 sticky top-0 bg-black z-10'>
                <div className=' ml-5 flex items-center gap-5 '>
                    <MoveLeft size={40} onClick={() => router.back()} className='cursor-pointer'/>
                    <div>
                        <h1 className=' font-extrabold text-2xl'>{user?.name}</h1>
                        <p className=' font-light text-gray-500 text-sm'>@{user?.username}</p>
                    </div>
                </div>
                <div className=' flex'>
                    <button 
                        className=' w-[50%] py-3 hover:cursor-pointer hover:bg-gray-400/10' 
                        onClick={() =>router.push(`/followers/${user?._id}`)}
                    >
                        Followers
                    </button>
                    <button className=' w-[50%] py-3 hover:cursor-pointer hover:bg-gray-400/10 flex flex-col items-center gap1'>
                        Following <span className=' border-b-3 border-sky-500 w-[40%]'></span>
                    </button>
                </div>
            </div>

            <div className=" overflow-scroll h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {user?.following?.map((follow, index) => {
                    const isFollowing = follow.isFollowed; 
                    return (
                        <div
                            key={index}
                            className=' flex flex-col px-5 py-3 border-b border-gray-700'
                        >
                            <div className=' flex justify-between items-center'>
                                <div className=' flex items-center gap-3'>
                                    <Image 
                                        src={follow?.profileImage || '/pfp.jpg'}
                                        alt='pfp'
                                        width={40}
                                        height={40}
                                        className=' rounded-full'
                                    />
                                    <div>
                                        <h1 className=' font-bold'>{follow?.name}</h1>
                                        <p className='text-gray-400 text-sm'>@{follow?.username}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => {e.stopPropagation();  
                                        handleFollow(follow._id)}}
                                    className={`px-4 h-8 rounded-full text-sm font-semibold ${
                                        isFollowing 
                                            ? "bg-gray-700 text-white" 
                                            : "bg-white text-black"
                                    }`}
                                >
                                    {isFollowing ? "Following" : "Follow"}
                                </button>
                            </div>
                            {follow?.bio && (
                                <p className="ml-12 mt-1 text-sm text-gray-300">{follow?.bio}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FollowingMain;
