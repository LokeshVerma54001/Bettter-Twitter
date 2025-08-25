"use client"

import React from 'react'
import ProtectPage from '../../../components/ProtectPage'
import HomeExtras from '../../../components/HomeExtras'
import FollowingMain from '../components/FollowingMain'

const FollowingPage = () => {
  return (
    <ProtectPage>
        <div className=' flex w-full h-screen'>
          <FollowingMain />
          <HomeExtras />
        </div>
     </ProtectPage>
  )
}

export default FollowingPage