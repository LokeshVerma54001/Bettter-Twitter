"use client"

import React from 'react'
import NotificationMain from './components/NotificationMain'
import HomeExtras from '../../components/HomeExtras'
import ProtectPage from '../../components/ProtectPage'

const NotificationPage = () => {
  return (
    <ProtectPage>
      <div className='w-full flex h-screen'>
          <NotificationMain />
          <HomeExtras />
      </div>
    </ProtectPage>
  )
}

export default NotificationPage