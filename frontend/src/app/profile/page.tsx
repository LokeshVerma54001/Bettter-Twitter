import React from 'react'
import ProfileMain from './components/ProfileMain'
import HomeExtras from '@/components/HomeExtras'

const ProfilePage = () => {
  return (
     <div className=' flex w-full h-screen'>
        <ProfileMain />
        <HomeExtras />
    </div>
  )
}

export default ProfilePage