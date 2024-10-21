"use client"

import * as React from "react"
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import envConf from "@/lib/env.conf"
import Link from "next/link"
import { Order, Product } from "@/types"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { debounce } from "lodash"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BrandTable from "@/components/brands-list"


export const columns: ColumnDef<Order>[] = [
  {
    id: "brands-select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue('image')} />
        <AvatarFallback>IMG</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "products",
    header: ()=> <div className="text-center">Products Count</div>,
    cell: ({ row }) => (
      <div className="text-center">{(row.getValue("products") as Array<Product>).length!}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
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
              onClick={() => alert('Please fix editing this!!!')}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={()=> alert('Are you sure you want to delete this brand? Make sure it is not linked to any product.')}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Brands() {

  const [pagination, setPagination] = React.useState({
        pageSize: 10,
        pageIndex: 0,
      })

   const [rowSelection, setRowSelection] = React.useState({})
  const [search, setSearch] = React.useState('')
  
  const {data, error, isFetching, } = useQuery({
    queryKey: ['brandsData', pagination],
    queryFn: () => axios.get(`${envConf.apiBaseUrl}/products-service/brands?options[page]=${pagination.pageIndex + 1}&options[limit]=${pagination.pageSize}&options[withProducts]=${true}`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const debounceSearch = debounce((txt:string) => {
    // Handle search logic
    console.log(txt)
  }, 100)

  const table = useReactTable({
    data:data?.data.data.data as unknown as Order[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    rowCount: data?.data?.data?.total,
    manualPagination: true,
    state: {
      rowSelection,
      pagination,
    },
  })


  return (
    <BrandTable />
  )
}
