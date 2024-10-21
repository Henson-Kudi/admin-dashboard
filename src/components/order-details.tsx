'use client'

import { useState } from 'react'
import { Order } from '@/types'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const mockOrder: Order = {
  id: "123",
  refNumber: "ORD-123456",
  userId: "user123",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  totalAmount: 299.99,
  discount: 10,
  currency: "USD",
  status: "Processing",
  createdAt: "2023-06-01T10:00:00Z",
  updatedAt: "2023-06-01T10:30:00Z",
  paymentId: "PAY-123456",
  orderItems: [
    {
      id: "item1",
      orderId: "123",
      productId: "prod1",
      productName: "Smartphone",
      productSKU: "SM-001",
      quantity: 1,
      price: 299.99,
      total: 299.99,
      tax: 30
    }
  ],
  shippingAddress: {
    id: "addr1",
    orderId: "123",
    buildingName: "Tech Plaza",
    landmark: "Near Central Park",
    roomNo: "405",
    floor: "4th",
    address: "123 Tech Street",
    city: "Silicon Valley",
    state: "California",
    country: "USA",
    zipCode: "12345"
  }
}

export default function OrderDetails() {
  const [order, setOrder] = useState<Order>(mockOrder)

  const updateOrderStatus = (newStatus: string) => {
    setOrder(prevOrder => ({ ...prevOrder, status: newStatus }))
    // In a real application, you would make an API call here to update the status
  }

  const generateInvoice = () => {
    // In a real application, this would generate and download an invoice
    console.log("Generating invoice for order:", order.refNumber)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/orders" className="flex items-center text-blue-600 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Orders
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Details: {order.refNumber}</h1>
        <div className="flex gap-4">
          <Select value={order.status} onValueChange={updateOrderStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateInvoice}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-semibold">Order ID:</dt>
                <dd>{order.id}</dd>
              </div>
              <div>
                <dt className="font-semibold">Reference Number:</dt>
                <dd>{order.refNumber}</dd>
              </div>
              <div>
                <dt className="font-semibold">Customer Name:</dt>
                <dd>{order.name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Email:</dt>
                <dd>{order.email}</dd>
              </div>
              <div>
                <dt className="font-semibold">Phone:</dt>
                <dd>{order.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold">Status:</dt>
                <dd>{order.status}</dd>
              </div>
              <div>
                <dt className="font-semibold">Created At:</dt>
                <dd>{new Date(order.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="font-semibold">Updated At:</dt>
                <dd>{new Date(order.updatedAt).toLocaleString()}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic">
              {order.shippingAddress.buildingName}<br />
              {order.shippingAddress.roomNo && `Room ${order.shippingAddress.roomNo}, `}
              {order.shippingAddress.floor && `${order.shippingAddress.floor} Floor, `}
              {order.shippingAddress.address}<br />
              {order.shippingAddress.landmark && `${order.shippingAddress.landmark}, `}
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </address>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.productSKU}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toFixed(2)} {order.currency}</TableCell>
                  <TableCell>{item.total.toFixed(2)} {order.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-right">
            <p className="text-sm text-gray-600">Subtotal: {(order.totalAmount + order.discount).toFixed(2)} {order.currency}</p>
            <p className="text-sm text-gray-600">Discount: -{order.discount.toFixed(2)} {order.currency}</p>
            <p className="text-xl font-bold mt-2">Total: {order.totalAmount.toFixed(2)} {order.currency}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}