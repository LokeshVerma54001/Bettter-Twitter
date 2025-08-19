"use client"

import React from 'react'
import SearchMain from './components/SearchMain'
import SearchExtras from './components/SearchExtras'
import ProtectPage from '../../components/ProtectPage'


const ExplorePage = () => {
  return (
    <ProtectPage>
      <div className=' w-full flex h-screen'>
          <SearchMain />
          <SearchExtras />
      </div>
    </ProtectPage>
    
  )
}

export default ExplorePage