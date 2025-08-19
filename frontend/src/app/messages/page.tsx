"use client"

import React from 'react'
import MessageMain from './components/MessageMain'
import ProtectPage from '../../components/ProtectPage'

const MessagesPage = () => {
  return (
    <ProtectPage>
      <div className=" flex w-full h-screen">
          <MessageMain />
      </div>
    </ProtectPage>
  )
}

export default MessagesPage