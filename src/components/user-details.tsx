"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, Mail, Phone, Calendar, 
  Shield, Users, Check, X, Download, Trash2, ChevronLeft} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type User = {
  id: string
  email: string
  emailVerified: boolean
  name: string
  phone: string
  phoneVerified: boolean
  createdAt: string
  updatedAt: string
  isActive: boolean
  isDeleted: boolean
  deletedAt?: string
  deletedById?: string
  lastModifiedById?: string
  invitedById?: string
  lastLoginAt?: string
  lastLoginIp?: string 
  lastLoginDevice?: string
  lastLoginLocation?: string
  googleId?: string
  appleId?: string
  photo?: string
  deletedBy?: User
  lastModifiedBy?: User
  invitedBy?: User
  roles?: {
    id: string
    name: string
    slug: string
    description?: string | null
    createdAt: string
    updatedAt: string
    createdById: string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string | null
    deletedById?: string | null
    lastModifiedById?: string | null
  }[]
  groups: {
    id: string
    name: string
    slug: string
    description?: string | null
    createdAt: string
    updatedAt: string
    createdById: string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string
    deletedById?: string | null
    lastModifiedById?: string | null
  }[]
}

type Order = {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  items: number
}

// Mock activities data
  const monthlySpendingData = [
    { month: "Jan", amount: 250 },
    { month: "Feb", amount: 300 },
    { month: "Mar", amount: 200 },
    { month: "Apr", amount: 400 },
    { month: "May", amount: 300 },
    { month: "Jun", amount: 350 },
  ]

  const categorySpendingData = [
    { category: "Electronics", amount: 1200 },
    { category: "Clothing", amount: 800 },
    { category: "Books", amount: 400 },
    { category: "Home", amount: 950 },
    { category: "Other", amount: 400 },
  ]

export default function ClientDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data
  const user: User = {
    id: params.id,
    email: "alice@example.com",
    emailVerified: true,
    name: "Alice Johnson",
    phone: "+1 (555) 123-4567",
    phoneVerified: true,
    createdAt: "2022-03-15T00:00:00Z",
    updatedAt: "2023-06-01T12:30:00Z",
    isActive: true,
    isDeleted: false,
    lastLoginAt: "2023-06-15T08:45:00Z",
    lastLoginIp: "192.168.1.100",
    lastLoginDevice: "iPhone 12",
    lastLoginLocation: "New York, USA",
    googleId: "alice_google_123",
    appleId: "alice_apple_456",
    photo: "/placeholder.svg",
    roles: [
      { id: "1", name: "Admin", slug: "admin", createdAt: "2022-03-15T00:00:00Z", updatedAt: "2022-03-15T00:00:00Z", createdById: "1", isActive: true, isDeleted: false },
      { id: "2", name: "User", slug: "user", createdAt: "2022-03-15T00:00:00Z", updatedAt: "2022-03-15T00:00:00Z", createdById: "1", isActive: true, isDeleted: false }
    ],
    groups: [
      { id: "1", name: "Management", slug: "management", createdAt: "2022-03-15T00:00:00Z", updatedAt: "2022-03-15T00:00:00Z", createdById: "1", isActive: true, isDeleted: false },
      { id: "2", name: "Sales", slug: "sales", createdAt: "2022-03-15T00:00:00Z", updatedAt: "2022-03-15T00:00:00Z", createdById: "1", isActive: true, isDeleted: false }
    ],
  }

  // Mock recent orders data
  const recentOrders: Order[] = [
    { id: "ORD001", date: "2023-06-15", total: 129.99, status: "completed", items: 3 },
    { id: "ORD002", date: "2023-06-10", total: 79.95, status: "processing", items: 2 },
    { id: "ORD003", date: "2023-06-05", total: 249.99, status: "completed", items: 1 },
    { id: "ORD004", date: "2023-05-28", total: 59.99, status: "cancelled", items: 1 },
    { id: "ORD005", date: "2023-05-20", total: 189.97, status: "completed", items: 4 },
  ]

  return (
    <div className="container mx-auto py-10 text-blue-600">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Details</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit className="mr-2 h-4 w-4" /> {isEditing ? "Save Changes" : "Edit User"}
          </Button>
          {!user.isDeleted && (
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete User
            </Button>
          )}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.photo} alt={user.name} />
                <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <Badge variant={user.isActive ? "default" : "secondary"}>{user.isActive ? "Active" : "Inactive"}</Badge>
                {user.isDeleted && <Badge variant="destructive" className="ml-2">Deleted</Badge>}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                {isEditing ? (
                  <Input defaultValue={user.email} />
                ) : (
                  <span>{user.email}</span>
                )}
                {user.emailVerified && <Check className="ml-2 h-4 w-4 text-green-500" />}
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                {isEditing ? (
                  <Input defaultValue={user.phone} />
                ) : (
                  <span>{user.phone}</span>
                )}
                {user.phoneVerified && <Check className="ml-2 h-4 w-4 text-green-500" />}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Created on {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                <span>Roles: </span>
                <div className="flex flex-wrap gap-1 ml-2">
                  {user.roles?.map((role) => (
                    <Badge key={role.id} variant="outline">
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Groups: </span>
                <div className="flex flex-wrap gap-1 ml-2">
                  {user.groups?.map((group) => (
                    <Badge key={group.id} variant="secondary">
                      {group.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Last Login</p>
                <h3 className="text-lg font-semibold">{new Date(user.lastLoginAt || "").toLocaleString()}</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Login IP</p>
                <h3 className="text-lg font-semibold">{user.lastLoginIp}</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Login Device</p>
                <h3 className="text-lg font-semibold">{user.lastLoginDevice}</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Login Location</p>
                <h3 className="text-lg font-semibold">{user.lastLoginLocation}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>The user&apos;s most recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={
                          order.status === "completed" ? "success" :
                          order.status === "processing" ? "secondary" :
                          order.status === "cancelled" ? "destructive" : "outline"
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => router.push(`/orders/${order.id}`)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                View All Orders
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Client Analytics</CardTitle>
              <CardDescription>Insights and statistics about the client&apos;s behavior.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Monthly Spending</h3>
                  <ChartContainer config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-1))",
                    },
                  }} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlySpendingData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Spending by Category</h3>
                  <ChartContainer config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-2))",
                    },
                  }} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categorySpendingData}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="var(--color-amount)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage user&apos;s security settings and connected accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-factor Authentication</Label>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password-reset">Force Password Reset</Label>
                <Button variant="outline" size="sm">Reset Password</Button>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Connected Accounts</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Google Account</span>
                    {user.googleId ? (
                      <Badge variant="outline">Connected</Badge>
                    ) : (
                      <Button variant="outline" size="sm">Connect</Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Apple ID</span>
                    {user.appleId ? (
                      <Badge variant="outline">Connected</Badge>
                    ) : (
                      <Button variant="outline" size="sm">Connect</Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>Manage user&apos;s roles and group memberships.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {user.roles?.map((role) => (
                    <Badge key={role.id} variant="outline">
                      {role.name}
                      {isEditing && <X className="ml-1 h-3 w-3 cursor-pointer" />}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">Add Role</Button>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Groups</h4>
                <div className="flex flex-wrap gap-2">
                  {user.groups?.map((group) => (
                    <Badge key={group.id} variant="secondary">
                      {group.name}
                      {isEditing && <X className="ml-1 h-3 w-3 cursor-pointer" />}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">Add to Group</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}