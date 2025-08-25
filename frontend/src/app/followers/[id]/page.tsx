"use client"

import React from 'react'
import ProtectPage from '../../../components/ProtectPage'
import HomeExtras from '../../../components/HomeExtras'
import FollowersMain from '../components/FollowersMain'

const FollowersPage = () => {
  return (
    <ProtectPage>
        <div className=' flex w-full h-screen'>
          <FollowersMain />
          <HomeExtras />
        </div>
     </ProtectPage>
  )
}

export default FollowersPage