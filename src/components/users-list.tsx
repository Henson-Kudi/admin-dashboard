"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Search, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

const data: User[] = [
  {
    id: "1",
    email: "john@example.com",
    emailVerified: true,
    name: "John Doe",
    phone: "+1234567890",
    phoneVerified: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-06-15T12:30:00Z",
    isActive: true,
    isDeleted: false,
    lastLoginAt: "2023-06-15T12:30:00Z",
    lastLoginIp: "192.168.1.1",
    lastLoginDevice: "iPhone 12",
    lastLoginLocation: "New York, USA",
    photo: "/placeholder.svg",
    roles: [{ id: "1", name: "Admin", slug: "admin", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2023-01-01T00:00:00Z", createdById: "1", isActive: true, isDeleted: false }],
    groups: [{ id: "1", name: "Management", slug: "management", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2023-01-01T00:00:00Z", createdById: "1", isActive: true, isDeleted: false }],
  },
  {
    id: "2",
    email: "jane@example.com",
    emailVerified: true,
    name: "Jane Smith",
    phone: "+1987654321",
    phoneVerified: false,
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-06-10T09:45:00Z",
    isActive: true,
    isDeleted: false,
    lastLoginAt: "2023-06-10T09:45:00Z",
    lastLoginIp: "192.168.1.2",
    lastLoginDevice: "Samsung Galaxy S21",
    lastLoginLocation: "Los Angeles, USA",
    photo: "/placeholder.svg",
    roles: [{ id: "2", name: "User", slug: "user", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2023-01-01T00:00:00Z", createdById: "1", isActive: true, isDeleted: false }],
    groups: [{ id: "2", name: "Sales", slug: "sales", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2023-01-01T00:00:00Z", createdById: "1", isActive: true, isDeleted: false }],
  },
]

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
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
    accessorKey: "name",
    header: ({column}) => (
        <>
            <div
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center gap-2 w-max cursor-pointer"
            >
              <span>Name</span>
              <ArrowUpDown className="h-4 w-4" />
            </div>
        </>
    ),
    cell: ({ row, column }) => {
        
      return (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.original.photo} alt={row.original.name} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <Link href={`/users/${row.original.id}`} className="font-medium text-blue-600 hover:underline">{row.original.name}</Link>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "success" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.roles?.map((role) => (
          <Badge key={role.id} variant="outline">
            {role.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "groups",
    header: "Groups",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.groups?.map((group) => (
          <Badge key={group.id} variant="secondary">
            {group.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "lastLoginAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 w-max cursor-pointer"
        >
          <span>Last Login</span>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div>{new Date(row.original.lastLoginAt || "").toLocaleString()}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      const router = useRouter()

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
              onClick={() => router.push(`/users/${user.id}`)}
            >
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Reset password</DropdownMenuItem>
            <DropdownMenuItem>
              {user.isActive ? "Deactivate" : "Activate"} user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function UsersList() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>
      <div className="flex justify-between items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search clients..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onClick={() => column.toggleVisibility(!column.getIsVisible())}
                    >
                      <Checkbox checked={column.getIsVisible()} />
                      {column.id}
                    </DropdownMenuItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Clients
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Clients
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$234.57</div>
            <p className="text-xs text-muted-foreground">
              +4.75% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lifetime Value
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,750</div>
            <p className="text-xs text-muted-foreground">
              +12.3% from last year
            </p>
          </CardContent>
        </Card>
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
    </div>
  )
}