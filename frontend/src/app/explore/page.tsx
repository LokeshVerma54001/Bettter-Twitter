
import React from 'react'
import SearchMain from './components/SearchMain'
import SearchExtras from './components/SearchExtras'


const ExplorePage = () => {
  return (
    <div className=' w-full flex h-screen'>
        <SearchMain />
        <SearchExtras />
    </div>
    
  )
}

export default ExplorePage