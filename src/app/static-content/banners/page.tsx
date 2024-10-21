import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default function Banners() {
  return (
    <div>
        <Card className='w-max cursor-pointer hover:scale-[1.02]'>
            <Image src={'/images/banner-2.jpg'} alt='banner' width={300} height={450} className='rounded-md' />
        </Card>
    </div>
  )
}
