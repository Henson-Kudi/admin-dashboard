'use client'
import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Activity, CreditCard, DollarSign, Eye } from 'lucide-react'
import Barchart from '../ui/barchart'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'

export default function OverviewDashboard() {
  return (
    <>
    {/* Cards */}
    <div className='flex items-center  justify-between gap-4 my-4'>
        <Card className='flex-1'>
            <CardHeader className='flex-row items-center justify-between pb-1'>
                <p className="font-semibold">Total Revenue</p>
                <DollarSign size={20} />
            </CardHeader>
            <CardHeader className='pt-1'>
            <CardTitle>$45,231.89</CardTitle>
            <CardDescription>+20.1% from last month</CardDescription>
          </CardHeader>
        </Card>

        <Card className='flex-1'>
            <CardHeader className='flex-row items-center justify-between pb-1'>
                <p className="font-semibold">Page Views</p>
                <Eye size={20} />
            </CardHeader>
            <CardHeader className='pt-1'>
            <CardTitle>+523</CardTitle>
            <CardDescription>+20.1% from last hour</CardDescription>
          </CardHeader>
        </Card>

        <Card className='flex-1'>
            <CardHeader className='flex-row items-center justify-between pb-1'>
                <p className="font-semibold">Sales</p>
                <CreditCard size={20} />
            </CardHeader>
            <CardHeader className='pt-1'>
            <CardTitle>+12,234</CardTitle>
            <CardDescription>+19% from last month</CardDescription>
          </CardHeader>
        </Card>

        <Card className='flex-1'>
            <CardHeader className='flex-row items-center justify-between pb-1'>
                <p className="font-semibold">Active Now</p>
                <Activity size={20} />
            </CardHeader>
            <CardHeader className='pt-1'>
            <CardTitle>+573</CardTitle>
            <CardDescription>+201 since last hour</CardDescription>
          </CardHeader>
        </Card>
    </div>

    {/* Sales Chart and Recent sales */}
    <div className='flex gap-4 my-4'>
        {/* Sales Chart */}
        <Card className='flex-1'>
            <CardHeader>
                <CardTitle className='text-lg'>Sales Revenue</CardTitle>
                <CardDescription>Sales Revenue of past 6 months</CardDescription>
            </CardHeader>
            <Barchart />
        </Card>

        {/* Recent Sales */}
        <Card className='flex-1'>
            <CardHeader>
                <CardTitle className='text-lg'>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <div className='flex flex-col gap-6 justify-center p-4 pt-0'>
                {
                    Array(4).fill(0).map((_,i)=>(
                        <Link href={'#'} key={i} className='hover:bg-secondary p-2 rounded-md'>
                            <RenderRecentSaleItem  />
                        </Link>
                    ))
                }
            </div>
        </Card>
    </div>
    {/* End of Sales Chart and Recent sales */}
        
    </>
  )
}

const RenderRecentSaleItem = ()=>{
    return (
        <>
        {/* Recent Sale Item */}
        <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
                <Avatar>
                    <AvatarImage src="https://ui.shadcn.com/avatars/02.png" alt="@shadcn" />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div>
                    <p className='font-semibold'>Jackson Lee</p>
                    <p className='text-sm'>jacksonlee@gmail.com</p>
                </div>
            </div>
            <div>
                <p className='font-semibold'>$1000</p>
            </div>
        </div>
        {/* End of Recent Sale Item */}
        </>
    )
}
