import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between w-full p-2 bg-gray-300'>
      <p className='text-blue-400'>Contact Book
        </p>
        <ConnectButton/>
    </div>
  )
}

export default Header
