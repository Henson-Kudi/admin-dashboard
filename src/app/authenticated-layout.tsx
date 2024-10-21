import PageHeader from '@/components/page-header'
import { Sidebar } from '@/components/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

export default function AuthenticatedLayout({children}: {children: React.ReactNode}) {
  return (
    <>
        <ScrollArea className="w-72 max-h-screen overflow-y-auto scrollbar-none shadow-sm border-r">
            <Sidebar />
        </ScrollArea>

        <ScrollArea className="flex-1 max-h-screen overflow-y-auto py-4">
            <PageHeader/>
            
            <div className="px-6">{children}</div>
        </ScrollArea>
    </>
  )
}
