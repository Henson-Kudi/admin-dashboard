'use client'
import React from 'react'
import {
  CreditCard,
  LogOut,
  Settings,
  User,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions'

export function UserAccountDropdown() {
    const router = useRouter()

    const handleLogout = async()=>{
        try {
            console.log('Logged out')
            const res = await logout()
            // res.success && window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
            <div className='flex items-center justify-start gap-2'>
                <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='truncate'>Henson Kudi Amah</div>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
          <Link href={'/account'}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

        <DropdownMenuSeparator />

          <Link href={'/billing'}>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
          </Link>

        <DropdownMenuSeparator />

        <Link href={'/account-settings'}>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        
        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

