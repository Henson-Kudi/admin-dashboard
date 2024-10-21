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
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { Order, OrderStatus } from "@/types"
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import SearchSelect from "@/components/search-select"
import { debounce } from "lodash"
import { SimpleToolTip } from "@/components/ui/tooltip"
import OrdersList from "@/components/orders-list"


export const columns: ColumnDef<Order>[] = [
  {
    id: "orders-select",
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
    accessorKey: "refNumber",
    header: "Ref #",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original.id}`} className="text-blue-500 underline">{row.getValue("refNumber") ?? '0000Temp'}</Link>
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
    accessorKey: "email",
    header: 'Email',
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: 'Phone',
    cell: ({ row }) => {
      return <div className="lowercase">{row.getValue("phone")}</div>
    },
  },
  {
    accessorKey: "status",
    header: 'Status',
    cell: ({ row }) => {

      return <div className="uppercase">{row.getValue("status")}</div>
    },
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Total Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount")?.toString() || '0')

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original?.currency?.trim() ?? "AED",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original
      const orderUrl = `${envConf.baseUrl}/orders/${order.id}`

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
              onClick={() => navigator.clipboard.writeText(orderUrl)}
              className="cursor-pointer"
            >
              Copy Order Url
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`https://wa.me/?text=${orderUrl}`} target="_blank" referrerPolicy="no-referrer">Share On WhatsApp</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={orderUrl}>View order</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Orders() {
  const [sorting, setSorting] = React.useState<{key: string, type: 'ASC' | 'DESC'} | null>(null)

  const [pagination, setPagination] = React.useState({
        pageSize: 10,
        pageIndex: 0,
      })

   const [rowSelection, setRowSelection] = React.useState({})
  const [search, setSearch] = React.useState('')

  const orderStatusList = Object.entries(OrderStatus).map(([key, value])=> ({
    id: key,
    label: value?.replaceAll('_', ' ')
  }))

  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null)
  
  const {data, error, isFetching, status, } = useQuery({
    queryKey: ['ordersData', {...pagination, selectedStatus}],
    queryFn: () => axios.get(`${'http://localhost:8000/api/v1'}/orders-service?options[page]=${pagination.pageIndex + 1}&options[limit]=${pagination.pageSize}${selectedStatus ? `&filter[status]=${selectedStatus?.replaceAll(' ', '_')}` : ''}`),
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
    <>
      <OrdersList />
    </>
    // <div className="w-full">
    //   <div className="flex justify-end py-6">
    //     <Link href={'/orders/create-order'}>
    //       <SimpleToolTip
    //         trigger={
    //           <Button>
    //             <Plus />
    //           </Button>
    //         }
    //         toolTipContent='New Order'
    //       />
    //     </Link>
    //   </div>
    //   <div className="flex items-center py-4 gap-x-4">
    //     <Input
    //       placeholder="Search by order # or user name"
    //       value={search}
    //       onChange={(event) =>{
    //         setSearch(event.target.value)
    //         debounceSearch(event.target.value)
    //       }
    //       }
    //       className="max-w-sm"
    //     />

    //     <div className="flex-1 flex gap-x-2 justify-end items-center">
    //       <SearchSelect
    //         data={orderStatusList}
    //         placeholder="Filter by status"
    //         showSearchInput={false}            
    //         onSelectItem={(item => {
    //           setSelectedStatus(item?.id ?? null)
    //         })}
    //       />
    //     </div>

    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="outline" className="ml-auto">
    //           Sort <ChevronDown className="ml-2 h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuCheckboxItem
    //           className="capitalize"
    //           checked={sorting?.key.toLowerCase() === 'name' && sorting.type === 'ASC'}
    //           onCheckedChange={() =>
    //             setSorting({
    //               key: 'name', type:  'ASC',
    //             })
    //           }
    //         >
    //           Name ASC
    //         </DropdownMenuCheckboxItem>
    //         <DropdownMenuCheckboxItem
    //           className="capitalize"
    //           checked={sorting?.key.toLowerCase() === 'name' && sorting.type === 'DESC'}
    //           onCheckedChange={() =>
    //             setSorting({
    //               key: 'name', type:  'DESC',
    //             })
    //           }
    //         >
    //           Name DESC
    //         </DropdownMenuCheckboxItem>
    //         <DropdownMenuCheckboxItem
    //           className="capitalize"
    //           checked={sorting?.key.toLowerCase() === 'status' && sorting.type === 'ASC'}
    //           onCheckedChange={() =>
    //             setSorting({
    //               key: 'status', type:  'ASC',
    //             })
    //           }
    //         >
    //           Status ASC
    //         </DropdownMenuCheckboxItem>
    //         <DropdownMenuCheckboxItem
    //           className="capitalize"
    //           checked={sorting?.key.toLowerCase() === 'status' && sorting.type === 'DESC'}
    //           onCheckedChange={() =>
    //             setSorting({
    //               key: 'status', type:  'DESC',
    //             })
    //           }
    //         >
    //           Status DESC
    //         </DropdownMenuCheckboxItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>
    //   <div className="rounded-md border">
    //     {
    //       isFetching ? (
    //         <>
    //           {
    //             Array(10).fill(0).map((_, ind)=> (
    //               <div className="flex items-center gap-x-4 m-2" key={ind}>
    //                 <Skeleton className="h-12 w-12 rounded-full" />
    //                 <div className="flex-1">
    //                   <Skeleton className="h-2 w-full py-4" />
    //                 </div>
    //               </div>
    //             ))
    //           }
    //         </>
    //       ) : !isFetching && !error ? (
    //         <Table>
    //           <TableHeader>
    //             {table.getHeaderGroups().map((headerGroup) => (
    //               <TableRow key={headerGroup.id}>
    //                 {headerGroup.headers.map((header) => {
    //                   return (
    //                     <TableHead key={header.id}>
    //                       {header.isPlaceholder
    //                         ? null
    //                         : flexRender(
    //                             header.column.columnDef.header,
    //                             header.getContext()
    //                           )}
    //                     </TableHead>
    //                   )
    //                 })}
    //               </TableRow>
    //             ))}
    //           </TableHeader>
    //           <TableBody>
    //             {table.getRowModel().rows?.length ? (
    //               table.getRowModel().rows.map((row) => (
    //                 <TableRow
    //                   key={row.id}
    //                   data-state={row.getIsSelected() && "selected"}
    //                 >
    //                   {row.getVisibleCells().map((cell) => (
    //                     <TableCell key={cell.id}>
    //                       {flexRender(
    //                         cell.column.columnDef.cell,
    //                         cell.getContext()
    //                       )}
    //                     </TableCell>
    //                   ))}
    //                 </TableRow>
    //               ))
    //             ) : (
    //               <TableRow>
    //                 <TableCell
    //                   colSpan={columns.length}
    //                   className="h-24 text-center"
    //                 >
    //                   No results.
    //                 </TableCell>
    //               </TableRow>
    //             )}
    //           </TableBody>
    //         </Table>
    //       ) : (
    //         <div>
    //           Error: {error?.message}
    //           {/* Here we want to display server error page */}
    //         </div>
    //       )
    //     }
    //   </div>
    //   {
    //     !isFetching && !error && <div className="flex items-center justify-end space-x-2 py-4">
    //     <div className="flex-1 text-sm text-muted-foreground">
    //       {table.getFilteredSelectedRowModel().rows.length} of{" "}
    //       {table.getFilteredRowModel().rows.length} row(s) selected.
    //     </div>
    //     <div className="space-x-2">
    //       <Button
    //         variant="outline"
    //         size="sm"
    //         onClick={() => table.previousPage()}
    //         disabled={!table.getCanPreviousPage()}
    //       >
    //         Previous
    //       </Button>
    //       <Button
    //         variant="outline"
    //         size="sm"
    //         onClick={() => table.nextPage()}
    //         disabled={!table.getCanNextPage()}
    //       >
    //         Next
    //       </Button>
    //     </div>
    //   </div>
    //   }
    // </div>
  )
}
