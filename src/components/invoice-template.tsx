import { Order, OrderItem } from '@/types'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function InvoiceTemplate({ order }: { order: Order }) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Invoice</h1>
          <p className="text-gray-600 mt-1">#{order.refNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-semibold text-gray-900">Your Company Name</h2>
          <p className="text-gray-600">123 Business Street</p>
          <p className="text-gray-600">City, State 12345</p>
          <p className="text-gray-600">contact@yourcompany.com</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
            <p className="text-gray-600">{order.name}</p>
            <p className="text-gray-600">{order.email}</p>
            <p className="text-gray-600">{order.phone}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Ship To:</h3>
            <p className="text-gray-600">{order.shippingAddress.buildingName}</p>
            <p className="text-gray-600">{order.shippingAddress.address}</p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="text-gray-600">{order.shippingAddress.country}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item: OrderItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toFixed(2)} {order.currency}</TableCell>
                  <TableCell>{item.total.toFixed(2)} {order.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Card className="w-72">
          <CardContent className="p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Subtotal:</span>
              <span>{(order.totalAmount + order.discount).toFixed(2)} {order.currency}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Discount:</span>
              <span>-{order.discount.toFixed(2)} {order.currency}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>{order.totalAmount.toFixed(2)} {order.currency}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>Thank you for your business!</p>
        <p>If you have any questions, please contact us at support@yourcompany.com</p>
      </div>
    </div>
  )
}