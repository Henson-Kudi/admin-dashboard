import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { ChevronDown, Image, MoreHorizontal, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCategory } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

// Mock API functions (replace these with your actual API calls)
const fetchCategories = async (): Promise<ProductCategory[]> => {
  // Simulating API call
  return new Promise((resolve) => setTimeout(() => resolve([
    { id: '1', name: 'Category A', slug: 'category-a', image: '/placeholder.svg', createdById: 'user1', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
    { id: '2', name: 'Category B', slug: 'category-b', image: '/placeholder.svg', createdById: 'user2', createdAt: '2023-01-02', updatedAt: '2023-01-02' },
    // Add more mock data as needed
  ]), 1000))
}

const updateCategory = async (category: ProductCategory): Promise<ProductCategory> => {
  // Simulating API call
  return new Promise((resolve) => setTimeout(() => resolve(category), 1000))
}

const deleteCategory = async (id: string): Promise<void> => {
  // Simulating API call
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

export default function CategoriesList() {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data: categories = [] } = useQuery<ProductCategory[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsDrawerOpen(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsDrawerOpen(false)
    },
  })

  const columns: ColumnDef<ProductCategory>[] = [
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
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => (
        <Avatar>
           <AvatarImage src={row.original.image} alt={row.original.name} /> 
           <AvatarFallback>
            <Image />
           </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const category = row.original
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
              <DropdownMenuItem onClick={() => {
                setEditingCategory(category)
                setIsDrawerOpen(true)
              }}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteMutation.mutate(category.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: categories,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
                <Input
                  placeholder="Search categories..."
                  value={globalFilter ?? ''}
                  onChange={(event) => setGlobalFilter(String(event.target.value))}
                  className="max-w-sm"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Delete Selected</DropdownMenuItem>
                    <DropdownMenuItem>Another Action</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="rounded-md border">
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
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
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
          </CardContent>
          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{editingCategory ? 'Edit Category' : 'Category Details'}</SheetTitle>
                <SheetDescription>
                  {editingCategory ? 'Make changes to the category here. Click save when you\'re done.' : 'View category details here.'}
                </SheetDescription>
              </SheetHeader>
              {editingCategory && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Input
                      id="description"
                      value={editingCategory.description || ''}
                      onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                    <Button onClick={() => updateMutation.mutate(editingCategory)}>Save Changes</Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </Card>
    </div>
  )
}