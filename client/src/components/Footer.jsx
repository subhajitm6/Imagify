import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between mt-20 py-3 gap-4'>
      <img src={assets.logo} alt="" width={150}/>
      <p className='flex-1 border-l border-gray-400 text-sm pl-4 text-gray-500 max-sm:hidden'>Copyright @imagify | All right reserved.</p>
      <div className='flex gap-2'>
        <img src={assets.facebook_icon} alt="" width={35}/>
        <img src={assets.twitter_icon} alt="" width={35}/>
        <img src={assets.instagram_icon} alt="" width={35}/>
      </div>
    </div>
  )
}

export default Footer
