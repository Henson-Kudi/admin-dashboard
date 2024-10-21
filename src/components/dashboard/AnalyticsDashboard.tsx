'use client'
import React from 'react'
import { RangeYearPickerWithPresets } from '../range-year-picker-with-presets';
import { RangeMonthPickerWithPresets } from '../range-month-picker-with-presets';
import { DatePickerWithRange } from '../range-date-picker';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { dailyVisitors, monthlyVisitors, pageViews, pageViewsBySocialMedia, piechartData, yearlyVisitors } from '@/lib/constants';
import Map from '../maps';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { PageViewDemo } from './pageViewTable';
import CustomPieChart from '../charts/Pie';

type SelectedDisplay = 'daily' | 'monthly' | 'yearly';

export default function AnalyticsDashboard() {
    const [selectedDisplay, setSelectedDisplay] = React.useState<SelectedDisplay>('daily');

  return (
    <div>
        {/* Date filter for chart */}
        <div className='flex items-center justify-between gap-4'>
            {
                selectedDisplay === 'daily' ? <DatePickerWithRange /> : selectedDisplay === 'monthly' ? <RangeMonthPickerWithPresets/> : selectedDisplay === 'yearly' ? <RangeYearPickerWithPresets/> : null
            }

            <Select
                onValueChange={(val:SelectedDisplay)=>{setSelectedDisplay(val)}}
                defaultValue={selectedDisplay}
            >
                <SelectTrigger className='max-w-sm lg:max-w-36'>
                    <SelectValue placeholder='Select Display Type' />
                </SelectTrigger>
                <SelectContent className='w-max'>
                    <SelectGroup className='w-max'>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        {/* Chart (visitors) */}
        <Card className='my-4 p-4'>
            <CardHeader>
                <CardTitle className='font-lg'>Visitors Analytics</CardTitle>
            </CardHeader>
            {/* Chart */}
            <ChartContainer config={{value: {label: 'Visitors', color: '#2563eb'}}} className="min-h-[200px] max-h-[500px] w-full">
              <BarChart accessibilityLayer data={selectedDisplay === 'daily' ? dailyVisitors : selectedDisplay === 'monthly' ? monthlyVisitors : selectedDisplay === 'yearly' ? yearlyVisitors: []}>
                <CartesianGrid vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                <XAxis
                  dataKey={selectedDisplay === 'daily' ? 'date' : selectedDisplay === 'monthly' ? 'month' : selectedDisplay === 'yearly' ? 'year' : ''}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  dataKey="value"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
              </BarChart>
            </ChartContainer>
        </Card>

        <Card className='flex items-center py-6 my-6'>

          <CardHeader className='flex-1 border-r p-0 px-4'>
            <CardTitle className='font-lg flex gap-6 items-center'>
              <span>18.6K</span>
                <div className='flex gap-2 items-center text-sm text-success'>
                  <ArrowUp size={20} />
                  <span>18%</span>
                </div>
            </CardTitle>
            <CardDescription>Unique Visitors</CardDescription>
          </CardHeader>

          <CardHeader className='flex-1 border-r p-0 px-4'>
              <CardTitle className='font-lg flex gap-6 items-center'>
                <span>55.9K</span>
                <div className='flex gap-2 items-center text-sm text-success'>
                  <ArrowUp size={20} />
                  <span>25%</span>
                </div>
              </CardTitle>
            <CardDescription>Total Page Views</CardDescription>
          </CardHeader>

          <CardHeader className='flex-1 border-r p-0 px-4'>
            <CardTitle className='font-lg flex gap-6 items-center'>
              <span>54%</span>
                <div className='flex gap-2 items-center text-sm text-warning'>
                  <ArrowDown size={20} />
                  <span>-7%</span>
                </div>
            </CardTitle>
            <CardDescription>Bounce Rate</CardDescription>
          </CardHeader>

          <CardHeader className='flex-1 p-0 px-4'>
            <CardTitle className='font-lg flex gap-6 items-center'>
              <span>2m 56s</span>
                <div className='flex gap-2 items-center text-sm text-success'>
                  <ArrowUp size={20} />
                  <span>12%</span>
                </div>
            </CardTitle>
            <CardDescription>Visit Duration</CardDescription>
          </CardHeader>
        </Card>

        {/* Geo map */}
        <div className='flex items-stretch gap-6 justify-between flex-wrap'>
            <Card className='flex-1'>
              <CardHeader className='flex-row items-center justify-between'>
                <CardTitle>Sessions by country</CardTitle>
                <Select defaultValue='7 days'>
                  <SelectTrigger className='max-w-sm lg:max-w-36'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className='w-max z-50'>
                    <SelectGroup className='w-max'>
                      <SelectItem value="7 days">Last 7 Days</SelectItem>
                      <SelectItem value="15 days">Last 15 Days</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
              </CardHeader>

              <div className='h-[500px] p-4 rounded-md'>
                <Map />
              </div>

              <div className='my-4'>
                <div className='flex items-center gap-5 px-4 py-2 relative'>
                  <span className='text-sm flex items-center gap-2 w-2/6'>
                    <Avatar className='!rounded-md w-8 h-8'>
                      <AvatarImage src='images/uae.png'></AvatarImage>
                      <AvatarFallback>UAE</AvatarFallback>
                    </Avatar>
                    <span>United Arab Emirates</span>
                  </span>
                  <div className='relative grid flex-1'>
                    <Progress value={50} className="flex-1 rounded-md h-6"  />
                    <span className='absolute top-1/2 left-[38%] -translate-y-1/2 w-max text-secondary font-semibold'>
                      50%
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-5 px-4 py-2 relative'>
                  <span className='text-sm flex items-center gap-2 w-2/6'>
                    <Avatar className='!rounded-md w-8 h-8'>
                      <AvatarImage src='https://demo.nextadmin.co/images/country/country-03.svg'></AvatarImage>
                      <AvatarFallback>FR</AvatarFallback>
                    </Avatar>
                    <span>France</span>
                  </span>
                  <div className='relative grid flex-1'>
                    <Progress value={35} className="flex-1 rounded-md h-6"  />
                    <span className='absolute top-1/2 left-[23%] -translate-y-1/2 w-max text-secondary font-semibold'>
                      35%
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-5 px-4 py-2 relative'>
                  <span className='text-sm flex items-center gap-2 w-2/6'>
                    <Avatar className='!rounded-md w-8 h-8'>
                      <AvatarImage src='https://demo.nextadmin.co/images/country/country-01.svg'></AvatarImage>
                      <AvatarFallback>USA</AvatarFallback>
                    </Avatar>
                    <span>United States</span>
                  </span>
                  <div className='relative grid flex-1'>
                    <Progress value={26} className="flex-1 rounded-md h-6"  />
                    <span className='absolute top-1/2 left-[14%] -translate-y-1/2 w-max text-secondary font-semibold'>
                      26%
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-5 px-4 py-2 relative'>
                  <span className='text-sm flex items-center gap-2 w-2/6'>
                    <Avatar className='!rounded-md w-8 h-8'>
                      <AvatarImage src='https://demo.nextadmin.co/images/country/country-02.svg'></AvatarImage>
                      <AvatarFallback>CA</AvatarFallback>
                    </Avatar>
                    <span>Canada</span>
                  </span>
                  <div className='relative grid flex-1'>
                    <Progress value={18} className="flex-1 rounded-md h-6"  />
                    <span className='absolute top-1/2 left-[6%] -translate-y-1/2 w-max text-secondary font-semibold'>
                      18%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <div className='flex-1 flex flex-col gap-6'>
              <Card >
                <CardHeader>
                  <CardTitle>Top Content</CardTitle>
                </CardHeader>
                <PageViewDemo pages={pageViews} />
              </Card>

              <Card >
                <CardHeader>
                  <CardTitle>Top Channels</CardTitle>
                </CardHeader>
                <PageViewDemo pages={pageViewsBySocialMedia} />
              </Card>
            </div>
        </div>
        {/* End of Geo map */}

        {/* Session By Device */}
        <div className='flex items-stretch gap-6 justify-between flex-wrap my-6'>
          <Card className='flex-1 text-center'>
            <CardHeader>
                <CardTitle className='font-lg'>Visitors By Device</CardTitle>
            </CardHeader>

            <CustomPieChart data={piechartData}  />
          </Card>

          <Card className='flex-1'>
            <CardHeader>
                <CardTitle className='font-lg'>Live Users</CardTitle>
                <CardDescription>(Past 30minutes)</CardDescription>
            </CardHeader>
            <ChartContainer config={{value: {label: 'Visitors', color: '#8680FF'}}} className="min-h-[200px] max-h-[500px] w-full">
              <BarChart accessibilityLayer data={dailyVisitors}>
                <CartesianGrid vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                <XAxis
                  dataKey={'date'}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  dataKey="value"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>
    </div>
  )
}
