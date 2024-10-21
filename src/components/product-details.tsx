"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash, Plus, Save, Star, DollarSign, Package, Percent, PlusIcon, XIcon } from "lucide-react"
import { Product } from "@/types"
import { SimpleToolTip } from "./ui/tooltip"
import Link from "next/link"

// This would typically come from an API
const initialProduct: Product = {
  id: "1",
  serialNumber: 12345,
  name: "Premium Wireless Headphones",
  description: "Experience crystal-clear audio with our premium wireless headphones. Perfect for music lovers and professionals alike.",
  price: 199.99,
  currency: "USD",
  brandId: "brand1",
  tags: ["wireless", "premium", "audio"],
  SKU: "WH-1000XM4",
  UPC: "123456789012",
  EAN: "9876543210123",
  media: [
    { url: "/placeholder.svg?height=400&width=400", type: "IMAGE", altText: "Premium Wireless Headphones" },
    { url: "/placeholder.svg?height=400&width=400", type: "IMAGE", altText: "Headphones in use" },
  ],
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-06-15T00:00:00Z",
  createdById: "user1",
  status: 1,
  stockStatus: 1,
  slug: "premium-wireless-headphones",
  metaTitle: "Premium Wireless Headphones | Amazing Sound Quality",
  metaDescription: "Experience unparalleled audio quality with our Premium Wireless Headphones. Perfect for audiophiles and casual listeners alike.",
  metaKeywords: ["wireless", "headphones", "premium audio", "noise-cancelling"],
  qtyInStock: 50,
  originalPrice: 249.99,
  discountedPrice: 199.99,
  discountStartDate: "2023-06-01T00:00:00Z",
  discountEndDate: "2023-07-31T23:59:59Z",
  averageRating: 4.7,
  reviewCount: 253,
  unit: "piece",
  color: "Black",
  weight: "250g",
  dimensions: "7.27 x 3.03 x 9.94 inches",
  attributes: {
    "Bluetooth Version": "5.0",
    "Battery Life": "Up to 30 hours",
    "Noise Cancellation": "Yes",
  },
  brand: {
    id: "brand1",
    name: "AudioTech",
    slug: "audiotech",
    image: "/placeholder.svg?height=100&width=100",
    createdById: "user1",
    createdAt: "2022-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    description: "Leading audio technology brand",
  },
  categories: [
    {
      id: "cat1",
      name: "Headphones",
      slug: "headphones",
      image: "/placeholder.svg?height=100&width=100",
      createdById: "user1",
      createdAt: "2022-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
      description: "High-quality headphones for all your audio needs",
    },
  ],
}

// This would typically come from an API
const initialHistory = [
  { type: "Created", date: "2023-01-01T00:00:00Z", user: "John Doe", details: "Product created" },
  { type: "Updated", date: "2023-03-15T00:00:00Z", user: "Jane Smith", details: "Price updated" },
  { type: "Updated", date: "2023-06-15T00:00:00Z", user: "Mike Johnson", details: "Description modified" },
]

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product>(initialProduct)
  const [isEditing, setIsEditing] = useState(false)
  const [history, setHistory] = useState(initialHistory)
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" })
  const [isAddingAttribute, setIsAddingAttribute] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the product data here
    // For now, we'll use the initial data
    setProduct(initialProduct)
    setHistory(initialHistory)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setProduct(prev => ({ ...prev, status: checked ? 1 : 0 }))
  }

  const handleAttributeChange = (key: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: value }
    }))
  }

  const handleAddAttribute = () => {
    if (newAttribute.key && newAttribute.value) {
      setProduct(prev => ({
        ...prev,
        attributes: { ...prev.attributes, [newAttribute.key]: newAttribute.value }
      }))
      setNewAttribute({ key: "", value: "" })
      setIsAddingAttribute(false)
    }
  }

  const handleRemoveAttribute = (key: string) => {
    setProduct(prev => {
      const newAttributes = { ...prev.attributes }
      delete newAttributes[key]
      return { ...prev, attributes: newAttributes }
    })
  }

  const handleSave = async () => {
    try {
      // In a real application, you would send the updated product data to an API here
      // For now, we'll just simulate a successful update
      setIsEditing(false)
      toast({ title: "Product updated successfully" })
      // Add a new history entry
      setHistory(prev => [
        { type: "Updated", date: new Date().toISOString(), user: "Current User", details: "Product details updated" },
        ...prev
      ])
    } catch (error) {
      toast({ title: "Failed to update product", variant: "destructive" })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(price)
  }

  const calculateDiscount = () => {
    if (product.originalPrice && product.discountedPrice) {
      const discount = ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
      return Math.round(discount)
    }
    return 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Details: {product.name}</h1>
        <div>
          <SimpleToolTip
            toolTipContent='Add New Product'
            trigger={
              <Button>
                <Link href={'/products/add-product'}><PlusIcon /></Link>
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid gap-6 relative">
        

        <Card className="relative">
          <div className="absolute top-0 right-0">
            <SimpleToolTip
                trigger={
                  <Button variant='outline' onClick={() => setIsEditing(prev => !prev)}>
                    {!isEditing ? <Edit className=" h-4 w-4" /> : <XIcon />}
                  </Button>
                }
                toolTipContent={isEditing ? 'Cancel' : 'Edit'}
              />
          </div>
          <CardContent className="pt-6">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      name="SKU"
                      value={product.SKU}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      name="brandId"
                      value={product.brand.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="categories">Categories</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch
                        id="status"
                        checked={product.status === 1}
                        onCheckedChange={handleSwitchChange}
                        disabled={!isEditing}
                      />
                      <Label htmlFor="status">
                        {product.status === 1 ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        value={product.originalPrice}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="discountedPrice">Discounted Price</Label>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="discountedPrice"
                        name="discountedPrice"
                        type="number"
                        value={product.discountedPrice}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Discount Percentage</Label>
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-2xl font-bold">{calculateDiscount()}%</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="discountStartDate">Discount Start Date</Label>
                    <Input
                      id="discountStartDate"
                      name="discountStartDate"
                      type="datetime-local"
                      value={product.discountStartDate?.slice(0, 16)}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discountEndDate">Discount End Date</Label>
                    <Input
                      id="discountEndDate"
                      name="discountEndDate"
                      type="datetime-local"
                      value={product.discountEndDate?.slice(0, 16)}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="inventory">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="qtyInStock">Quantity in Stock</Label>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="qtyInStock"
                        name="qtyInStock"
                        
                        type="number"
                        value={product.qtyInStock}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="stockStatus">Stock Status</Label>
                    <Select
                      disabled={!isEditing}
                      value={product.stockStatus.toString()}
                      onValueChange={(value) => setProduct(prev => ({ ...prev, stockStatus: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stock status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">In Stock</SelectItem>
                        <SelectItem value="0">Out of Stock</SelectItem>
                        <SelectItem value="2">Backorder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      name="weight"
                      value={product.weight}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      name="dimensions"
                      value={product.dimensions}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.media.map((media, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={media.url}
                        alt={media.altText}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            const newMedia = [...product.media]
                            newMedia.splice(index, 1)
                            setProduct(prev => ({ ...prev, media: newMedia }))
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <div className="border-2 border-dashed rounded-lg flex items-center justify-center h-[200px]">
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" /> Add Media
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="attributes">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute</TableHead>
                      <TableHead>Value</TableHead>
                      {isEditing && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(product.attributes || {}).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>
                          {isEditing ? (
                            <Input
                              value={value}
                              onChange={(e) => handleAttributeChange(key, e.target.value)}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                        {isEditing && (
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveAttribute(key)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {isEditing && (
                  <div className="mt-4">
                    {isAddingAttribute ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Attribute"
                          value={newAttribute.key}
                          onChange={(e) => setNewAttribute({ ...newAttribute, key: e.target.value })}
                        />
                        <Input
                          placeholder="Value"
                          value={newAttribute.value}
                          onChange={(e) => setNewAttribute({ ...newAttribute, value: e.target.value })}
                        />
                        <Button onClick={handleAddAttribute}>Add</Button>
                        <Button variant="outline" onClick={() => setIsAddingAttribute(false)}>Cancel</Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsAddingAttribute(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Attribute
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="seo">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      value={product.metaTitle}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={product.metaDescription}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                    <Input
                      id="metaKeywords"
                      name="metaKeywords"
                      value={product.metaKeywords?.join(", ")}
                      onChange={(e) => setProduct(prev => ({ ...prev, metaKeywords: e.target.value.split(", ") }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={product.slug}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          {
            isEditing && <div className="text-right m-2">
              <SimpleToolTip
                trigger={
                  <Button onClick={handleSave} className="mr-2">
                    <Save className="h-4 w-4" />
                  </Button>
                }
                toolTipContent='Save Changes'
              />
            </div>
          }
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Average Rating</Label>
                <div className="flex items-center mt-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold ml-2">{product.averageRating?.toFixed(1)}</span>
                  <span className="text-gray-500 ml-2">({product.reviewCount} reviews)</span>
                </div>
              </div>
              <div>
                <Label>Total Sales</Label>
                <div className="flex items-center mt-2">
                  <DollarSign className="w-6 h-6 text-green-500" />
                  <span className="text-2xl font-bold ml-2">{formatPrice(product.price * 100)}</span>
                </div>
              </div>
              <div>
                <Label>Conversion Rate</Label>
                <div className="flex items-center mt-2">
                  <Percent className="w-6 h-6 text-blue-500" />
                  <span className="text-2xl font-bold ml-2">3.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{formatDate(event.date)}</TableCell>
                    <TableCell>{event.user}</TableCell>
                    <TableCell>{event.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}