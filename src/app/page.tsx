'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import ContactLists from './Components/ContactLists'

const page = () => {
  const { isConnected } = useAccount()
  return (
    <div className='w-full flex mt-20 mx-auto justify-center'>
      {!isConnected ? "Please connect to your account" : <ContactLists />}
    </div>
  )
}

export default page
