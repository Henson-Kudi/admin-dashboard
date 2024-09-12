import React from 'react'
import { Input } from './ui/input'
import { NotificaionsDropdown } from './notifications-dropdown'
import { UserAccountDropdown } from './user-account-dropdown'
import { Separator } from './ui/separator'
import { ThemeToggle } from './theme-switch'

export default function PageHeader() {
  return (
    <div className='sticky top-0 z-50 bg-white dark:bg-black'>
      <div className='flex items-center gap-4 h-10 my-2 px-6'>
          <div className='flex-1'>
            <Input placeholder='Search anything' className=' p-4 m-0' />
          </div>
          <div className='flex items-center gap-1'>
            <ThemeToggle />
            <NotificaionsDropdown />
            <UserAccountDropdown />
          </div>
      </div>
      <Separator />
    </div>
  )
}
