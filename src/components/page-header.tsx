'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { NotificaionsDropdown } from './notifications-dropdown'
import { UserAccountDropdown } from './user-account-dropdown'
import { Separator } from './ui/separator'
import { ThemeToggle } from './theme-switch'
import { Button } from './ui/button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScreenSize } from '@/hooks/screen-detector'

export default function PageHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const {isMobile} = useScreenSize()

  const toggleSearch = ()=>{
    setShowSearch(!showSearch)
  }

  return (
    <div className={cn('sticky top-0 py-2 md:z-50 bg-background mx-4', showSearch ? 'z-50':'')}>
      <div className='flex items-center gap-4 my-2'>
        <div
          className={cn('flex-1 flex items-center gap-2 transition-all ease-linear z-50', showSearch ? ' absolute h-full w-screen left-0 px-4 bg-background' : '', isMobile && !showSearch ? 'hidden': '')}
        >
        <Input placeholder='Search anything' className='p-4 m-0 w-full' />
        <Button variant='outline' onClick={toggleSearch} className='md:hidden'>
          <X />
        </Button>
      </div>
          
      <div className={cn('flex items-center gap-1', isMobile ? 'justify-end w-screen sm:w-full' : '')}>
        <Button className='md:hidden' variant='outline' onClick={toggleSearch}>
          <Search size={20} />
        </Button>
        <ThemeToggle />
        <NotificaionsDropdown />
        <UserAccountDropdown />
      </div>
      </div>
      <Separator />
    </div>
  )
}
