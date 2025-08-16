import React from 'react'
import NotificationMain from './components/NotificationMain'
import HomeExtras from '@/components/HomeExtras'

const NotificationPage = () => {
  return (
    <div className='w-full flex h-screen'>
        <NotificationMain />
        <HomeExtras />
    </div>
  )
}

export default NotificationPage