'use client';
import { SidebarItems } from '@/types';
import SideBarNav from './sidebar-command';
import Logo from './logo';
import { Separator } from './ui/separator';
import { menuData } from '@/lib/menu';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScreenSize } from '@/hooks/screen-detector';

const sidebarItems: SidebarItems = {
  links: menuData
};


export function Sidebar() {
  const {isMobile, width} = useScreenSize()

  const [isCollapsed, setIsCollapsed] = useState(false)

  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    
    setIsCollapsed(width < 1024 && width >= 768)

  }, [width])

  useEffect(() => {
    if (isMobile && mobileNavOpen) {
      setMobileNavOpen(false)
    }
  
    return () => {
      
    }
  }, [pathname])
  

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const SideBarContent = ()=>(
    <>
      <ScrollArea className="w-full max-h-screen overflow-y-auto scrollbar-none shadow-sm border-r">
        {!isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 absolute right-0 z-50 my-2">
            {isCollapsed ? <Menu className={"h-5 w-5 transition-all"} /> : <X className='w-5 h-5 transition-all' />}
          </Button>
        )}
        <div className='md:sticky top-0 bg-white dark:bg-black'>
          <Logo />

          <Separator className='w-full' />
        </div>
          
          
        <SideBarNav menu={sidebarItems} isCollapsed={isCollapsed}/>
     </ScrollArea>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        
        <SheetTrigger asChild className='z-50 fixed'>
          <Button variant="outline" size="icon" className="md:hidden fixed left-2 top-4">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left"  className={"flex start-0 justify-start w-3/4"}>
          <SheetClose className='absolute top-2 right-2 z-50'>
            <Button variant='outline' className='p-1.5'>
              <X className='h-5 w-5' />
            </Button>
          </SheetClose>
          <SideBarContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
      <div className={cn('flex transition-all duration-300 ease-linear ', isCollapsed ? 'justify-center w-20' : 'w-72')}>
        <SideBarContent />
      </div>
    )
}