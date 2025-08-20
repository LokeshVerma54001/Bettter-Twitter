"use client"

import { motion } from 'framer-motion'
import { Camera, ImagePlay, MapPin, Smile, User, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useUserStore } from '../stores/useUserStore'
import Image from 'next/image'
import { useUtilStore } from '../stores/useUtilsStore'
import { usePostStore} from '../stores/usePostStore'

const icons = [
  { name: "image", icon: <Camera /> },
  { name: "gif", icon: <ImagePlay /> },
  { name: "emoji", icon: <Smile /> },
  { name: "location", icon: <MapPin /> }
]

const CreatePostPopUp = () => {

    const {createPost} = usePostStore();

  const { showCreatePostPopUp, setShowCreatePostPopUp } = useUtilStore();
  const [postInfo, setPostInfo] = useState({
    content: "",
    media: [] as string[]
  });
  const { user } = useUserStore();
  const path = usePathname();

  if (["/premium", "/signup", "/login"].includes(path) || !showCreatePostPopUp) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    try {
        e.preventDefault();
        const success = await createPost(postInfo);
        if(success){
            setShowCreatePostPopUp(false);
            setPostInfo({
                content: "",
                media: []
            })
        }
    } catch (error) {
        console.log(error);
    }
  }

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newMedia: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setPostInfo(prev => ({
              ...prev,
              media: [...prev.media, reader.result as string]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='min-h-60 border rounded-lg top-30 left-42 w-[35rem] border-gray-600 flex flex-col gap-5 items-center absolute z-40 bg-black lg:left-120'
    >
      <div className='self-start mt-5 ml-5'>
        <X
          className='hover:cursor-pointer'
          onClick={() => setShowCreatePostPopUp(false)}
          size={40}
        />
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className='flex gap-5 w-full justify-center'
      >
        {user ? (
          <Image
            alt='profileImage'
            src={user?.profileImage}
            height={50}
            width={50}
            className='rounded-full ml-5'
          />
        ) : (
          <User className='border rounded-full ml-5' size={40} />
        )}
        <input
          placeholder="What's happening?"
          type="text"
          className='h-10 text-xl focus:outline-none w-[90%] mr-5 bg-transparent'
          value={postInfo.content}
          onChange={(e) =>
            setPostInfo({ ...postInfo, content: e.target.value })
          }
        />
      </motion.div>

      {/* Preview Section */}
      {postInfo.media.length > 0 && (
        <div className="w-[90%] flex justify-center">
          {postInfo.media.length === 1 ? (
            <Image
              src={postInfo.media[0]}
              alt="uploaded"
              width={400}
              height={300}
              className="rounded-lg object-cover max-h-72"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {postInfo.media.slice(0, 4).map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`uploaded-${i}`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </div>
      )}

      <span className='border-b border-gray-600 w-[90%]'></span>

      {/* Bottom Icons + Post Btn */}
      <div className='flex w-[90%] items-center justify-between'>
        <div className='flex text-sky-500 gap-5'>
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <label
                htmlFor='imageInput'
                className='hover:cursor-pointer'
              >
                {icon.icon}
              </label>
              {icon.name === 'image' && (
                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleInputImage}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          className='bg-white text-black w-26 h-9 rounded-full font-bold'
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileTap={{ scale: 0.6 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          type='submit'
        >
          Post
        </motion.button>
      </div>
    </form>
  )
}

export default CreatePostPopUp
