"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Image as BrokenImage, Plus, Search, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { Product } from "@/types"
import { SimpleToolTip } from "./ui/tooltip"
import { CustomScrollbar } from "./ui/custom-scrollbar"
import { Table, TableBody, TableHeader, TableRow } from "./ui/table"

// Mock getProducts function
const getProducts = async (): Promise<Partial<Product>[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      SKU: "WH-1000XM4",
      brand: { name: "AudioTech", createdAt: '', createdById: '', id: '1', slug: 'audio-tech', image: '', updatedAt: ''  },
      status: 1,
      qtyInStock: 50,
      media: [{ url: "/placeholder.svg?height=50&width=50", type: "IMAGE", altText: "Premium Wireless Headphones" }],
      brandId: '1',
      slug: 'premium-wireless-headphones',
    },
    {
      id: "2",
      name: "Ultra HD Smart TV",
      SKU: "TV-UHD55",
      brand: { name: "TechVision", createdAt: '', createdById: '', id: '2', slug: 'tech-vision', image: '', updatedAt: '' },
      status: 1,
      qtyInStock: 25,
      media: [{ url: "/placeholder.svg?height=50&width=50", type: "IMAGE", altText: "Ultra HD Smart TV" }],
      slug: 'ultra-hd-smart-tv',
    },
    {
      id: "3",
      name: "Ergonomic Office Chair",
      SKU: "CH-ERGO100",
      brand: { name: "ComfortSeating", createdAt: '', createdById: '', id: '3', slug: 'comfort-seating', image: '', updatedAt: '' },
      status: 0,
      qtyInStock: 0,
      media: [{ url: "/placeholder.svg?height=50&width=50", type: "IMAGE", altText: "Ergonomic Office Chair" }],
      slug: 'ergonomic-office-chair',
    },
    {
      id: "4",
      name: "Professional DSLR Camera",
      SKU: "CAM-DSLR800",
      brand: { name: "PhotoPro", createdAt: '', createdById: '', id: '4', slug: 'photo-pro', image: '', updatedAt: '' },
      status: 1,
      qtyInStock: 15,
      media: [{ url: "/placeholder.svg?height=50&width=50", type: "IMAGE", altText: "Professional DSLR Camera" }],
      slug: 'professional-dslr-camera',
    },
    {
      id: "5",
      name: "Smart Home Security System",
      SKU: "SEC-SMARTHOME",
      brand: { name: "SafeGuard", createdAt: '', createdById: '', id: '5', slug: 'safe-guard', image: '', updatedAt: '' },
      status: 1,
      qtyInStock: 30,
      media: [{ url: "/placeholder.svg?height=50&width=50", type: "IMAGE", altText: "Smart Home Security System" }],
      slug: 'smart-home-security-system',
    },
    {
      id: "6",
      name: "Gaming Laptop",
      SKU: "LAP-GAMING",
      brand: { name: "TechInnovate", createdAt: '', createdById: '', id: '6', slug: 'tech-innovate', image: '', updatedAt: '' },
      status: 1,
      qtyInStock: 20,
      media: [{ url: "/placeholder.svg?height=50&width=50", type: "IMAGE", altText: "Gaming Laptop" }],
      slug: 'gaming-laptop',
    },
  ]
}

export default function ProductList() {
  const [globalFilter, setGlobalFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const router = useRouter()

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getProducts() as unknown as Product[],
  })

  const handleBulkAction = (action: string) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedIds = selectedRows.map(row => row.original.id)
    console.log(`Performing ${action} on`, selectedIds)
  }

  const columns: ColumnDef<Product>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      accessorKey: 'media',
      header: '',
      cell: ({ row }) => (
        <Avatar>
            <AvatarImage src={row.original.media[0]?.url}/>
            <AvatarFallback>
                <BrokenImage />
            </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <Link href={`/products/${row.original.slug}`} className="text-blue-600 hover:underline">{row.original.name}</Link>,
    },
    {
      accessorKey: 'SKU',
      header: 'SKU',
    },
    {
      accessorKey: 'brand.name',
      header: 'Brand',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 1 ? "success" : "secondary"}>
          {row.original.status === 1 ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: 'qtyInStock',
      header: 'Qty in Stock',
      cell: ({ row }) => <div className="text-right">{row.original.qtyInStock}</div>,
    },
    {
      id: 'actions',
      header: ({ table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleBulkAction('delete')}>Delete</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleBulkAction('activate')}>Activate</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleBulkAction('deactivate')}>Deactivate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/admin/products/${row.original.id}`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Delete', row.original.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const filteredData = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                            product.SKU.toLowerCase().includes(globalFilter.toLowerCase())
      const matchesStatus = statusFilter === "all" || product.status === (statusFilter === "active" ? 1 : 0)
      const matchesBrand = brandFilter === "all" || product.brand.name === brandFilter
      return matchesSearch && matchesStatus && matchesBrand
    })
  }, [products, globalFilter, statusFilter, brandFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(products.map(product => product.brand.name)))
  }, [products])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading products</div>

  return (
    <CustomScrollbar className="mx-auto py-8 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <SimpleToolTip
            trigger={
                <Button onClick={() => router.push('/products/add-product')}>
                  <Plus className="h-4 w-4" />
                </Button>
            }
            toolTipContent="New Product"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center w-full md:w-auto">
          <Search className="h-4 w-4 mr-2 text-gray-500" />
          <Input
            placeholder="Search products..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {uniqueBrands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
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
    </CustomScrollbar>
  )
}