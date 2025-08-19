"use client"

import { Check, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import ProtectPage from '../../components/ProtectPage'

const subCardsAnnual = [
  {
    name: "Basic",
    price: "₹141.67",
    save: "16%",
    list: [
      "Small reply boost",
      "Bookmark folders",
      "Highlights tab",
      "Edit post",
      "Longer posts",
    ]
  },
  {
    name: "Premium",
    price: "₹356",
    save: "16%",
    list: [
      "Half Ads in For You and Following",
      "Larger reply boost",
      "Get paid to post",
      "Checkmark",
      "Grok with increased limits",
      "X Pro, Analytics, Media Studio",
      "Creator Subscriptions"
    ]
  },
  {
    name: "Premium+",
    price: "₹2,200",
    save: "14%",
    list: [
      "Fully ad-free",
      "Largest reply boost",
      "Write Articles",
      "Radar",
    ]
  }
]

const PremiumPage = () => {

  const [subscriptionDuration, setSubscriptionDuration] = useState('annual');
  const [subscriptionPrice, setSubscriptionPrice] = useState('₹356');
  const [subscriptionType, setSubscriptionType] = useState('Premium');
  
  return (
    <ProtectPage>
      <div className=' h-screen w-full bg-gradient-to-b from-slate-800 to to-black flex flex-col items-center'>
        <div className=' w-full  mt-5'>
          <div className=' ml-5 text-2xl font-bold'>
            <Link 
            
            href={'/'}
            
          ><X /></Link>
          </div>
        </div>
        {/* hero */}
        <div className=' flex w-full flex-col items-center mt-5 justify-center gap-5'>
          <h1 className=' text-6xl font-extrabold'>Upgrade to Premium</h1>
          <p className=' font-light text-gray-400'>Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.</p>
          <div className=' flex gap-1 items-center justify-center bg-black text-white rounded-2xl px-3 py-1.5'>
            <div 
              className={` ${subscriptionDuration === 'annual' && "bg-gray-800"} flex gap-1 items-center justify-center rounded-2xl hover:cursor-pointer px-1 py-0.5`}
              onClick={() => setSubscriptionDuration('annual')}
            >
              <p>Annual</p>
              <p className=' bg-green-900 rounded-2xl px-1 text-sm text-gray-300'>Best Value</p>
            </div>
            <p 
              className={` ${subscriptionDuration === 'monthly' && "bg-gray-800"} rounded-2xl px-3 py-0.5 hover:cursor-pointer`}
              onClick={() => setSubscriptionDuration('monthly')}
            >Monthly</p>
          </div>
        </div>
        {/* subcards */}
        <div className=' flex gap-3 mt-5 items-center justify-center w-full'>
          {subCardsAnnual.map((subCard, index) =>(
            <div 
              key={index}
              className={`${
                subscriptionType === subCard.name
                  ? "shadow-[0_0_15px_1px_rgb(14,165,233)] border border-sky-500 h-132 w-92"
                  : ""
              } bg-gray-800 w-80 rounded-2xl h-120 hover:cursor-pointer 
                transition-all duration-300 ease-in-out `}
              onClick={() =>{ 
                setSubscriptionType(subCard.name)
                setSubscriptionPrice(subCard.price)
              }}
            >
              <div className=' ml-5 mr-5 flex flex-col gap-5'>
                <div className='flex mt-10 w-full justify-between'>
                  <h1 className='text-3xl font-bold'>{subCard.name}</h1>
                </div>
                <div>
                  <div className=' flex items-end'>
                    <h1 className=' font-bold text-4xl'>{subCard.price}</h1>
                    <p className=' text-lg '>/month</p>
                  </div>
                  <p className=' text-sm bg-green-900 mt-1 w-20 flex items-center justify-center rounded-2xl '>SAVE {subCard.save}</p>
                </div>
                <ul className=' flex flex-col  gap-5 font-sans text-gray-300'>
                  {subCard.list.map((perk, index2)=>(
                    <li className=' flex items-center gap-2'
                      key={ index2}
                    >
                      <Check size={18} />{perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* footer */}
        <footer className=' fixed bottom-0 mt-10 flex items-center justify-center bg-black border-t border-gray-600 w-full gap-10'>
          <div className=' flex flex-col gap-5 pb-5'>
            <h1 className=' mt-5 text-2xl font-black'>{subscriptionType}</h1>
            <div>
              <div className=' flex items-end gap-1'>
                <h1 className=' font-bold text-4xl'>{subscriptionPrice}</h1>
                <p>{subscriptionDuration ==="Annual"?"/year":"/month"}</p>
              </div>
              <p className=' text-gray-500'>Billed {subscriptionDuration === "annual"?"yearly":"monthly"}</p>
            </div>
          </div>
          <div className=' h-full items-center flex justify-center'>
            <button className=' bg-white hover:cursor-pointer text-black px-40 py-3 rounded-full '>Subscribe</button>
          </div>
        </footer>
      </div>
    </ProtectPage>
  )
}

export default PremiumPage