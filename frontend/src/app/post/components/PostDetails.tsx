import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePostStore } from '../../../stores/usePostStore';
import { Bookmark, ChartNoAxesColumn, Ellipsis, Heart, MessageCircle, MoveLeft, Repeat, Upload } from 'lucide-react';
import Image from 'next/image';

const icons = [
    {icon: <MessageCircle 
        size={40} 
        className=' hover:text-sky-500 hover:cursor-pointer py-2 px-2 hover:bg-sky-300/10 rounded-lg '
    />},
    {icon: <Repeat 
        size={40} 
        className=' hover:text-emerald-500 hover:cursor-pointer py-2 px-2 hover:bg-emerald-300/10 rounded-lg '
    />},
    {icon: <Heart 
        size={40} 
        className=' hover:text-red-500 hover:cursor-pointer py-2 px-2 hover:bg-red-300/10 rounded-lg '
    />},
    {icon: <ChartNoAxesColumn 
        size={40} 
        className=' hover:text-sky-500 hover:cursor-pointer py-2 px-2 hover:bg-sky-300/10 rounded-lg '
    />},
    {icon: <Bookmark 
        size={40} 
        className=' hover:text-sky-500 hover:cursor-pointer py-2 px-2 hover:bg-sky-300/10 rounded-lg '
    />},
    {icon: <Upload 
        size={40} 
        className=' hover:text-sky-500 hover:cursor-pointer py-2 px-2 hover:bg-sky-300/10 rounded-lg '
    />},
]

const PostDetails = () => {

    const postId = useParams()?.id; 
    
    const {getPostDetails} = usePostStore();
    const [postDetails, setPostDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () =>{
            try {
                const res = await getPostDetails(postId);
                setPostDetails(res);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDetails();
    }, [postId, getPostDetails])

    console.log(postDetails);

  return (
    <div className="lg:w-[50%] h-full w-[80%] flex flex-col border-r border-l border-gray-600 lg:ml-[22rem] ml-[10rem] overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            {/* header */}
            <div className='flex w-full h-16 sticky top-0 bg-black z-10 items-center border-b border-gray-600'>
                <MoveLeft 
                    size={40}
                    className=' ml-5'
                />
                <h1 className=' ml-5 text-2xl font-bold'>Post</h1>                
            </div>
            {/* content */}
            <div className=' flex flex-col w-full'>
                <div className=' flex justify-between mt-5  items-center'>
                    <div className=' flex items-center ml-5 gap-3'>
                        <Image
                            src={postDetails?.author?.profileImage || "/pfp.jpg"}
                            alt='profileImage'
                            height={50}
                            width={50}
                            className=' rounded-full'
                        />
                        <div className=' flex flex-col'>
                            <h1 className=' text-xl font-bold'>{postDetails?.author.name}</h1>
                            <p className=' text-gray-400'>@{postDetails?.author.username}</p>
                        </div>
                    </div>
                    <Ellipsis className=' mr-5' />
                </div>
                {/* paragraph */}
                <div className=' flex mt-5 items-center justify-center'>
                    <div className=' w-[95%]'>
                        <p>{postDetails?.content}</p>
                    </div>
                </div>
                {/* images if any */}
                <div className=' flex  mt-5 gap-5 items-center justify-center'>
                    {postDetails &&  postDetails?.media?.length > 0 && 
                        postDetails?.media?.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt='profileImage'
                                width={550}
                                height={500}
                                className=' rounded-2xl'
                            />
                        ))
                    }
                </div>
                {/* upload date */}
                <div className=' mt-2 ml-5 text-gray-400 flex items-center border-gray-600 justify-center'>
                    <p>{postDetails?.createdAt?.slice(0, 10)}</p>
                </div>
                {/* icons */}
                <div className=' flex border-t border-b border-gray-600'>
                    {icons.map((icon, index) => (
                        <div 
                            key={index}
                            className=' w-[16.6%] flex items-center justify-center my-5'
                        >
                            {icon.icon}
                        </div>
                    ))}
                </div>
                {/* post comment */}
                <div>

                </div>
                {/* comment section */}
            </div>
        </div>
  )
}

export default PostDetails