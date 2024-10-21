'use client'

import { useState } from 'react'
import { Order, OrderItem, ShippingAddress } from '@/types'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from 'lucide-react'

export default function AddOrder() {
  const [order, setOrder] = useState<Partial<Order>>({
    currency: 'USD',
    orderItems: [],
    shippingAddress: {} as ShippingAddress,
  })

  const [newItem, setNewItem] = useState<Partial<OrderItem>>({})

  const updateOrder = (field: keyof Order, value: any) => {
    setOrder(prev => ({ ...prev, [field]: value }))
  }

  const updateShippingAddress = (field: keyof ShippingAddress, value: string) => {
    setOrder(prev => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [field]: value } as ShippingAddress
    }))
  }

  const addOrderItem = () => {
    if (newItem.productName && newItem.quantity && newItem.price) {
      const item: OrderItem = {
        id: Date.now().toString(), // temporary ID
        orderId: order.id || '',
        productId: '', // You might want to add a field for this
        productName: newItem.productName,
        productSKU: newItem.productSKU || '',
        quantity: newItem.quantity,
        price: newItem.price,
        total: newItem.quantity * newItem.price,
        tax: 0, // You might want to calculate this
      }
      setOrder(prev => ({
        ...prev,
        orderItems: [...(prev.orderItems || []), item],
        totalAmount: (prev.totalAmount || 0) + item.total
      }))
      setNewItem({})
    }
  }

  const removeOrderItem = (id: string) => {
    setOrder(prev => ({
      ...prev,
      orderItems: prev.orderItems?.filter(item => item.id !== id) || [],
      totalAmount: (prev.totalAmount || 0) - (prev.orderItems?.find(item => item.id === id)?.total || 0)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order data to your backend
    console.log('Submitting order:', order)
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={order.name || ''} onChange={e => updateOrder('name', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={order.email || ''} onChange={e => updateOrder('email', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={order.phone || ''} onChange={e => updateOrder('phone', e.target.value)} required />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="buildingName">Building Name</Label>
              <Input id="buildingName" value={order.shippingAddress?.buildingName || ''} onChange={e => updateShippingAddress('buildingName', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={order.shippingAddress?.address || ''} onChange={e => updateShippingAddress('address', e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={order.shippingAddress?.city || ''} onChange={e => updateShippingAddress('city', e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={order.shippingAddress?.state || ''} onChange={e => updateShippingAddress('state', e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={order.shippingAddress?.country || ''} onChange={e => updateShippingAddress('country', e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" value={order.shippingAddress?.zipCode || ''} onChange={e => updateShippingAddress('zipCode', e.target.value)} required />
              </div>
            </div>
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
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.productSKU}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toFixed(2)} {order.currency}</TableCell>
                  <TableCell>{item.total.toFixed(2)} {order.currency}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => removeOrderItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Input 
                    placeholder="Product Name" 
                    value={newItem.productName || ''} 
                    onChange={e => setNewItem({...newItem, productName: e.target.value})}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="SKU" 
                    value={newItem.productSKU || ''} 
                    onChange={e => setNewItem({...newItem, productSKU: e.target.value})}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    placeholder="Quantity" 
                    value={newItem.quantity || ''} 
                    onChange={e => setNewItem({...newItem, quantity: Number(e.target.value)})}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    placeholder="Price" 
                    value={newItem.price || ''} 
                    onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button type="button" variant="ghost" size="sm" onClick={addOrderItem}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: {order.totalAmount?.toFixed(2) || '0.00'} {order.currency}</p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 text-right">
        <Button type="submit">Create Order</Button>
      </div>
    </form>
  )
}