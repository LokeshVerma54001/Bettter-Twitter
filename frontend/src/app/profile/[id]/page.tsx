"use client"

import React from 'react'
import ProtectPage from '../../../components/ProtectPage';
import HomeExtras from '../../../components/HomeExtras';
import OtherProfileMain from '../components/OtherProfileMain';

const PersonProfile = () => {
    
    

    return (
        <ProtectPage >
            <div className=' flex w-full h-screen'>
                <OtherProfileMain />
                <HomeExtras />
            </div>
        </ProtectPage>
  )
}

export default PersonProfile