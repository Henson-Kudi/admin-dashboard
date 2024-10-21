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
import  { productStatus, productStatusKeys } from "@/types"
import envConf from "@/lib/env.conf"
import Link from "next/link"
import { Product } from "@/types"
import { debounce, set } from 'lodash'
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchSelect from "@/components/search-select"
import ProductList from "@/components/products-list"


export const columns: ColumnDef<Product>[] = [
  {
    id: "product-select",
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
      <Link href={`${envConf.baseUrl}/products/${row.original.slug}`} className="capitalize text-blue-500 underline">{row.getValue("name")}</Link>
    ),
  },
  {
    accessorKey: "SKU",
    header: 'SKU',
    cell: ({ row }) => <div>{row.getValue("SKU")}</div>,
  },
  {
    accessorKey: "brand",
    header: 'Brand',
    cell: ({ row }) => {
      const brand = row.getValue("brand") as Record<string, string | number>

      return <div className="uppercase">{brand?.name}</div>
    },
  },
  {
    accessorKey: "status",
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue("status") as number

      return <div className="uppercase">{(productStatus as any)[status]}</div>
    },
  },
  {
    accessorKey: "costPrice",
    header: () => <div className="text-right">Cost Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("costPrice")?.toString() || row.original?.price?.toString() || '0')

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original?.currency ?? "AED",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "originalPrice",
    header: () => <div className="text-right">Selling Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("originalPrice")?.toString() || '0')

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original?.currency ?? "AED",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "qtyInStock",
    header: () => <div className="text-right capitalize">Qty In Stock</div>,
    cell: ({ row }) => {
      const qty = parseFloat(row.getValue("qtyInStock")?.toString() || '0')

      return <div className="text-right font-medium">{qty}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
      const productUrl = `${envConf.baseUrl}/products/${product.slug}`

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
              onClick={() => navigator.clipboard.writeText(productUrl)}
            >
              Copy Product Url
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>{
              console.log('share on whatsapp')
            }}>
              <Link href={`https://wa.me/?text=${productUrl}`} target="_blank" referrerPolicy="no-referrer">Share On WhatsApp</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={productUrl}>View Product</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Products() {
  const [sorting, setSorting] = React.useState<{key: string, type: 'ASC' | 'DESC'} | null>(null)

  const [pagination, setPagination] = React.useState({
        pageSize: 10,
        pageIndex: 0,
      })

   const [rowSelection, setRowSelection] = React.useState({})
  const [search, setSearch] = React.useState('')
  const [searchBrand, setSearchBrand] = React.useState('')
  const [productStatusList, setProductStatusList] = React.useState(Object.entries(productStatus).map(([key, value])=> ({
    id: key,
    label: value?.replaceAll('_', ' ')
  })))
  const [otherQuery, setOtherQuery] = React.useState<Record<string, string | number | null> | null>({
    status: productStatusKeys.ACTIVE
  })
  
  const {data, error, isFetching} = useQuery({
    queryKey: ['productsData', {...pagination, ...otherQuery}],
    queryFn: () => axios.get(`${envConf.apiBaseUrl}/products-service/products?options[withBrand]=true&options[withCategories]=true&options[page]=${pagination.pageIndex + 1}&options[limit]=${pagination.pageSize}${otherQuery?.status ? `&filter[status]=${otherQuery?.status}`: ''}${otherQuery?.brand ? `&filter[brand]=${otherQuery.brand}` : ''}`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const brandsQuery = useQuery({
    queryKey: ['brandsData', {
      ...pagination,
      searchBrand,
      ...otherQuery
    }],
    queryFn: () => axios.get(`${envConf.apiBaseUrl}/products-service/brands?filter[name]=${searchBrand}`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const brands = brandsQuery?.isFetching ? [] : brandsQuery.data?.data?.data?.data?.map((item:any) => ({
    ...item,
    label: item?.name
  })) ?? []

  const debounceSearch = debounce((txt:string) => {
    // Handle search logic
    console.log(txt)
  }, 1000
  )

  const table = useReactTable({
    data:data?.data.data.data as unknown as Product[],
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
      <ProductList />
    </>
    // <div className="w-full">
    //   <div className="flex justify-end py-6">
    //     <Link href={'/products/add-product'}>
    //       <Button>
    //         <Plus />
    //         Add New Product
    //       </Button>
    //     </Link>
    //   </div>
    //   <div className="flex items-center py-4 gap-x-4">
    //     <Input
    //       placeholder="Search by name or SKU"
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
    //         data={brands}
    //         placeholder="Filter by brand"
    //         inputPlaceHolder='Search brand by name'
    //         noOptionsMessage="No brands to display"
    //         onInputChange={(txt)=>{
    //           setSearchBrand(txt)
    //         }}
    //         onSelectItem={(brand)=>{
    //           setOtherQuery(prev => ({
    //             ...prev,
    //             brand: brand?.id ?? null
    //           }))
    //         }}
    //       />

    //       <SearchSelect
    //         data={productStatusList}
    //         placeholder="Filter by status"
    //         noOptionsMessage="No brands to display"
    //         showSearchInput={false}
    //         onSelectItem={(item => {
              
    //           setOtherQuery(prev => ({
    //             ...prev,
    //             status: item?.id ?? null
    //           }))
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
    //       ) : error ? (
    //         <div>
    //           Error: {error?.message}
    //         </div>
    //       ) : (
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
