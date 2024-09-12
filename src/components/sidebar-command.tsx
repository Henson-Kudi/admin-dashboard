import React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { LayoutDashboard, Plus } from 'lucide-react'
import { NavCommandItem, SidebarItems } from '@/types';
import Link from 'next/link';
import { SidebarButton } from './sidebar-button';
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';

interface SidebarProps {
  menu: SidebarItems;
}

export default function SideBarNav({menu}: SidebarProps) {
    const pathname = usePathname();

  return (
    <div>
        {/* Add New Button Start */}
        <Link href={'/add-new'} className='flex justify-center items-center text-primary my-4'>
          <SidebarButton variant={'default'} icon={Plus} className='border p-6'>
            <span>Add New</span>
          </SidebarButton>
        </Link>
        <Separator className='h-[0.5px] ' />

        {/* Dashboard Start */}
        <Link href={'/'} className='text-primary'>
          <SidebarButton
          variant={pathname === '/' ? 'secondary' : 'ghost'}
          icon={LayoutDashboard}
          className='w-full py-6'
          >
            <span>Dashboard</span>
          </SidebarButton>
        </Link>

        {/* Menu Start */}
        <div className='uppercase p-4 text-slate-400'>Menu</div>
        <Separator className='h-[0.5px] ' />
        <Command>
          <CommandInput placeholder="Type to search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList className='max-h-max'>
            {
                menu.links.map((item, ind)=>(
                    <CommandElement command={item} pathname={pathname} key={ind} />
                ))
            }
          </CommandList>
        </Command>
    </div>
  )
}

function CommandElement({command, pathname}:{
    command: NavCommandItem,
    pathname: string,
}){
    return (
        <React.Fragment>
            {
                command?.group  ? <>
                <CommandGroup heading={command.group} className='space-x-0 p-0 m-0'>
                        {
                            command.items.map((link, index)=>(
                                <CommandItem key={`${index}-000}`} className='w-full'>
                                    <Link href={link.href} className='w-full'>
                                        <SidebarButton
                                          variant={pathname === link.href ? 'secondary' : 'ghost'}
                                          icon={link?.icon}
                                          className='w-full'
                                        >
                                          {link.label}
                                        </SidebarButton>
                                      </Link>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                    <CommandSeparator />
                </>
                     :
                    
                    command.items.map((link, index)=>(
                        <React.Fragment key={`$${index}-0000`}>
                        <CommandItem className='w-full'>
                                    <Link href={link.href} className='w-full'>
                                        <SidebarButton
                                          variant={pathname === link.href ? 'secondary' : 'ghost'}
                                          icon={link?.icon}
                                          className='w-full'
                                        >
                                          {link.label}
                                        </SidebarButton>
                                      </Link>
                                </CommandItem>
                                <CommandSeparator />
                        </React.Fragment>
                    ))
                    
                }

                
                    
                </React.Fragment>
    )
}
