"use client"

import React from 'react'
import ProfileMain from './components/ProfileMain'
import HomeExtras from '../../components/HomeExtras'
import ProtectPage from '../../components/ProtectPage'

const ProfilePage = () => {
  return (
     <ProtectPage>
        <div className=' flex w-full h-screen'>
          <ProfileMain />
          <HomeExtras />
        </div>
     </ProtectPage>
  )
}

export default ProfilePage