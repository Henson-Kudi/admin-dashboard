'use client';

import {
  Bell,
  Bookmark,
  Home,
  List,
  Mail,
  User,
  Users,
} from 'lucide-react';
import { SidebarItems } from '@/types';
import SideBarNav from './sidebar-command';
import Logo from './logo';
import { Separator } from './ui/separator';
import { menuData } from '@/lib/menu';

const sidebarItems: SidebarItems = {
  links: menuData
};


export function Sidebar() {

  return (
      <>
        <div className='sticky top-0 bg-white dark:bg-black'>
          <Logo />

          <Separator className='w-full' />
        </div>
          
          
        <SideBarNav menu={sidebarItems}/>
     </>
    )
}