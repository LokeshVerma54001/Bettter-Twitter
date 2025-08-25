import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../../stores/useUserStore'
import { useParams } from 'next/navigation'
import OtherProfileDetails from './OtherProfileDetails'

const OtherProfileMain = () => {

    const {getOtherUser} = useUserStore();
    const [user, setUser] = useState(null);
    const params = useParams();
    const id = params.id;

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
    <div className='lg:w-[50%] w-[80%] flex flex-col border-r border-l border-gray-600 lg:ml-[22rem] ml-[10rem] '>
        <div className='flex w-full h-16 justify-between items-center border-b border-gray-600 sticky top-0 bg-black z-10'>
            <div className=' ml-5'>
                <h1 className=' font-extrabold text-2xl'>{user?.name}</h1>
                <p className=' font-light text-gray-500 text-sm'>{user?.posts?.length} posts</p>
            </div>
            <Search className=' mr-5' />
        </div>
        <div className=" overflow-scroll h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <OtherProfileDetails />
        </div>
    </div>
  )
}

export default OtherProfileMain