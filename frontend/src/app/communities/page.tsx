"use client"

import React from 'react'
import MessageMain from '../messages/components/MessageMain'
import ProtectPage from '../../components/ProtectPage'

const CommunitiesPage = () => {
  return (
    <ProtectPage>
      <div className=" flex w-full h-screen">
          <MessageMain />
      </div>
    </ProtectPage>
  )
}

export default CommunitiesPage