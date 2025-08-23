import { Search, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../stores/useUserStore'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HomeExtras = () => {

    const {getRandomUsers} = useUserStore();
    const [ransomUsers, setRandomUsers] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRandomUsers = async () => {
            try {
                const res = await getRandomUsers();
                setRandomUsers(res);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRandomUsers();
    }, [getRandomUsers]);
    console.log(ransomUsers);

  return (
    <div className=' hidden flex-col w-[28%] lg:flex items-center'>
        <div className=' w-80'>
            <div className=' fixed bg-black w-80 pb-3'>
                <div className=' border border-gray-600 flex items-center justify-center h-10 rounded-full gap-2 mt-3 '>
                    <Search />
                    <input 
                        className=' focus:outline-none'
                        type="text" 
                        placeholder='Search'
                    />
                </div>
            </div>
            <div className=' w-full border rounded-2xl mt-20 border-gray-600 h-52'>
                <h1 className=' font-extrabold text-xl mt-5 pl-5'>Subscribe to Premium</h1>
                <p className=' text-sm w-78 mt-3 pl-5'>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
                <button className=' bg-sky-600 h-10 w-32 rounded-2xl ml-5 mt-5 font-bold'>Subscribe</button>
            </div>
            {/* who to follow */}
                <div
                    className=' w-full border flex flex-col pb-5 rounded-2xl mt-5 border-gray-600'
                >
                    <h1 className=' font-extrabold text-xl mt-5 pl-5'>Who to follow</h1>
                    {ransomUsers?.map((randomUser, index) => (
                    <div 
                        key={index} 
                        className=' flex w-[95%]  self-center mt-3 ml-5 justify-between items-center'
                        onClick={() => router.push(`/profile/${randomUser?._id}`)}
                    >
                        <div className=' flex  items-center gap-3'>
                            {randomUser?.profileImage ? (
                            <Image 
                                src={randomUser.profileImage} 
                                width={50}
                                height={50}
                                alt="profileImage"
                                className="rounded-full"
                            />
                            ) : (
                            <User className="border rounded-full size-8" />
                            )}

                            <div className=' flex flex-col'>
                                <h1 className=' font-bold'>{randomUser?.name}</h1>
                                <p className=' text-gray-400 text-sm'>@{randomUser?.username}</p>
                            </div>
                        </div>
                        <button className=' bg-white text-black self-center mr-5 h-8 w-20 rounded-2xl'>Follow</button>
                    </div>
                    ))}
                </div>
        </div>
    </div>
  )
}

export default HomeExtras