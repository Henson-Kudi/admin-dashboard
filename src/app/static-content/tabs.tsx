'use client'
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter } from 'next/navigation'

const tabs: {[key: string]: string} = {
    banners: 'banners',
    'privacy-policy': 'privacy policy',
    'terms-and-conditions': 'terms and conditions',
    faq: 'faqs',
}

export default function StaticContentTabs() {
    const pathName  = usePathname()
    const splitted = pathName.split('/')
    const path = splitted[splitted.length -1] ?? 'banners'
    const router = useRouter()

    const tabDefaultContent = tabs[path] ?? 'banners'

  return (
    <>
        <Tabs defaultValue={tabDefaultContent}>
        <TabsList>
            {
                Object.entries(tabs).map(([key, value], ind)=>(
                    <TabsTrigger className='capitalize' key={key + ind} value={key} onClick={()=>{

                        router.push(`/static-content/${key}`)
                    }}>{value}</TabsTrigger>
                ))
            }
        </TabsList>
        </Tabs>
    </>
  )
}
