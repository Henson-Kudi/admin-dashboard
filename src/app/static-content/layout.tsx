import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import StaticContentTabs from './tabs'



export default function StaticContentLayout({children}: {children: React.ReactNode}) {
    

  return (
    <div>
        <div className='text-right my-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='min-w-56'>
                <Button variant="default">Create</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='min-w-56'>
                <DropdownMenuItem>Banner</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Faq</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <StaticContentTabs />
        <div className='my-4'>
            {children}
        </div>
    </div>
  )
}
