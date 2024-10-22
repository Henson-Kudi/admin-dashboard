import PageHeader from '@/components/page-header'
import { Sidebar } from '@/components/sidebar'
import { CustomScrollbar } from '@/components/ui/custom-scrollbar'
import React from 'react'

export default function AuthenticatedLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Sidebar />
      <CustomScrollbar className="flex-1 max-h-screen overflow-y-auto overflow-hidden py4">
          <PageHeader/>
          
          <div className="px-6 w-full">{children}</div>
      </CustomScrollbar>
    </>
  )
}
