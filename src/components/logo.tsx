import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'

export default function Logo() {
  const {resolvedTheme} = useTheme()
  
  return (
    <div className='relative w-full h-10 my-4'>
        <Image src={resolvedTheme === 'light' ? '/next.svg' : '/next-copy.svg'} layout='fill' objectFit='contain' alt='Logo' />
    </div>
  )
}
