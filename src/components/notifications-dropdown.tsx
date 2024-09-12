'use client'

import React from 'react'
import {
  Bell,
  CreditCard,
  Keyboard,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { Separator } from './ui/separator'



export function NotificaionsDropdown() {
  const notifications = [
    {
      title: 'Notification Title',
      content: 'Short notification content to be truncated in how many lines i dont know of jjw...',
      frontendUrl: '/notification'
    },
    {
      title: 'Notification Title 2',
      content: 'Short notification content 2... i dont know wy it affes',
      frontendUrl: '/notification'
    },
    {
      title: 'Notification Title 3',
      content: 'Short notification content 3...',
      frontendUrl: '/notification'
    },
    {
      title: 'Notification Title 4',
      content: 'Short notification content 4...',
      frontendUrl: '/notification'
    },
    {
      title: 'Notification Title 5',
      content: 'Short notification content 5...',
      frontendUrl: '/notification'
    },
  ]
  const router = useRouter()

  const handleNotificationClick = (notification: any) => {
    console.log('Notification clicked:', notification)

    if (notification.frontendUrl) {
      router.push(notification.frontendUrl)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={'icon'}>
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {
          notifications?.map((notification, index) => (
              <React.Fragment key={index}>
                <DropdownMenuItem className='flex items-center justify-start gap-2 cursor-pointer'  key={index} onClick={() => handleNotificationClick(notification)}>
                  <div><Bell size={20} /></div>
                  <div className='flex flex-col items-start'>
                    <span className='font-semibold'>{notification.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{notification.content}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </React.Fragment>
          ))
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

