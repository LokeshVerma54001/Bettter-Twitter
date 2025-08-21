"use client"

import React from 'react'
import ProtectPage from '../../../components/ProtectPage'
import HomeExtras from '../../../components/HomeExtras'
import PostDetails from '../components/PostDetails'

const PostPage = () => {
  return (
    <ProtectPage>
      <div className=" flex w-full h-screen">
        <PostDetails />
        <HomeExtras />
      </div>
    </ProtectPage>
  )
}

export default PostPage