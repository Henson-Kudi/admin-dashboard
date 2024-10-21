'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { Order } from '@/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, MoreHorizontal, Copy, Share, Eye, Share2 } from 'lucide-react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import envConf from '@/lib/env.conf'

// API function to fetch orders
const fetchOrders = async (): Promise<Order[]> => {
  // In a real application, this would be an API call
//   const response = await fetch('/api/orders')
//   if (!response.ok) {
//     throw new Error('Network response was not ok')
//   }
//   return response.json()
return [
      {
        id: "1",
        refNumber: "ORD-001",
        userId: "user1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        totalAmount: 299.99,
        discount: 10,
        currency: "USD",
        status: "Processing",
        createdAt: "2023-06-01T10:00:00Z",
        updatedAt: "2023-06-01T10:30:00Z",
        paymentId: "PAY-001",
        orderItems: [],
        shippingAddress: {} as any,
      },
      {
        id: "2",
        refNumber: "ORD-002",
        userId: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1987654321",
        totalAmount: 149.99,
        discount: 0,
        currency: "USD",
        status: "Shipped",
        createdAt: "2023-06-02T11:00:00Z",
        updatedAt: "2023-06-02T14:30:00Z",
        paymentId: "PAY-002",
        orderItems: [],
        shippingAddress: {} as any,
      },
      {
        id: "3",
        refNumber: "ORD-003",
        userId: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1987654321",
        totalAmount: 149.99,
        discount: 0,
        currency: "AED",
        status: "Delivered",
        createdAt: "2023-06-02T11:00:00Z",
        updatedAt: "2023-06-02T14:30:00Z",
        paymentId: "PAY-002",
        orderItems: [],
        shippingAddress: {} as any,
      },
      // Add more mock orders as needed
    ]
}

export default function OrdersList() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: orders = [], isLoading, isError } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Badge variant="secondary">{status}</Badge>
      case 'Shipped':
        return <Badge variant="default">{status}</Badge>
      case 'Delivered':
        return <Badge variant="success">{status}</Badge>
      case 'Cancelled':
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'refNumber',
      header: 'Order Ref',
      cell: info => <Link className='text-blue-600 hover:underline' href={`${envConf.baseUrl}/orders/${info.row.original.id}`}>{info.getValue() as string}</Link>
    },
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: info => (
        <div>
          <div>{info.getValue() as string}</div>
          <div className="text-sm text-gray-500">{info.row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: info => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: 'totalAmount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: info => `${(info.getValue() as number).toFixed(2)} ${info.row.original.currency}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => getStatusBadge(info.getValue() as string),
    },
    {
      id: 'actions',
      cell: info => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${envConf.baseUrl}/orders/${info.row.original.id}`)}
              className="cursor-pointer"
            >
              <Copy size={20} className='mr-2' /> Copy Url
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                navigator.share({
                    title: 'Share Order',
                    text: 'Check out this order',
                    url: `${envConf.baseUrl}/orders/${info.row.original.id}`
                }).then(res => console.log(res)).catch(err=> console.log(err))
            }}>
                <Share2 size={20} className='mr-2' /> Share
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href={`${envConf.baseUrl}/orders/${info.row.original.id}`} className='flex gap-2 items-center'>
                <Eye size={20}/> View order
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        
      ),
    },
  ]

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  if (isLoading) {
    return <div className="text-center py-10">Loading orders...</div>
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error loading orders. Please try again later.</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search orders..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{' '}
          of {table.getFilteredRowModel().rows.length} orders
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}