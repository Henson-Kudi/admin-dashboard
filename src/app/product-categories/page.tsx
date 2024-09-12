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


export const columns: ColumnDef<Order>[] = [
  {
    id: "categories-select",
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
            
            <DropdownMenuItem onClick={()=> alert('Are you sure you want to delete this category? Make sure it is not linked to any product.')}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function ProductCategories() {

  const [pagination, setPagination] = React.useState({
        pageSize: 10,
        pageIndex: 0,
      })

   const [rowSelection, setRowSelection] = React.useState({})

  const [search, setSearch] = React.useState('')
  
  const {data, error, isFetching, } = useQuery({
    queryKey: ['categoriesData', pagination],
    queryFn: () => axios.get(`${envConf.apiBaseUrl}/products-service/categories?options[page]=${pagination.pageIndex + 1}&options[limit]=${pagination.pageSize}&options[withProducts]=${true}`),
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
    <div className="w-full">
      <div className="flex justify-end py-6">
        <Link href={'/product-categories/create-category'}>
          <Button>
            <Plus />
            New Category
          </Button>
        </Link>
      </div>
      <div className="flex items-center py-4 gap-x-4">
        <Input
          placeholder="Search by category name"
          value={search}
          onChange={(event) =>{
            setSearch(event.target.value)
            debounceSearch(event.target.value)
          }
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        {
          isFetching ? (
            <>
              {
                Array(10).fill(0).map((_, ind)=> (
                  <div className="flex items-center gap-y-4 space-4" key={ind}>
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-8 w-full py-4" />
                    </div>
                  </div>
                ))
              }
            </>
          ) : !isFetching && !error ? (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div>
              Error: {error?.message}
              {/* Here we want to display server error page */}
            </div>
          )
        }
      </div>
      {
        !isFetching && !error && <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      }
    </div>
  )
}
