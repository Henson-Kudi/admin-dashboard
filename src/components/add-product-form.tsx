"use client"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
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
import { Trash, Plus, DollarSign, Package } from "lucide-react"
import { Product, ProductMedia } from "@/types"

const steps = [
  { id: 'general', title: 'General Information' },
  { id: 'pricing', title: 'Pricing' },
  { id: 'inventory', title: 'Inventory' },
  { id: 'media', title: 'Media' },
  { id: 'attributes', title: 'Attributes' },
  { id: 'seo', title: 'SEO' },
]

export default function AddProductPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [product, setProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    currency: "USD",
    brandId: "",
    tags: [],
    SKU: "",
    UPC: "",
    EAN: "",
    media: [],
    status: 1,
    stockStatus: 1,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    qtyInStock: 0,
    originalPrice: 0,
    discountedPrice: 0,
    unit: "piece",
    color: "",
    weight: "",
    dimensions: "",
    attributes: {},
  })
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" })
  const [isAddingAttribute, setIsAddingAttribute] = useState(false)

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

  const handleAddMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newMedia:ProductMedia[] = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        type: "IMAGE",
        altText: file.name
      }))
      setProduct(prev => ({
        ...(prev??{}),
        media: [...(prev.media || []), ...newMedia]
      }))
    }
  }

  const handleRemoveMedia = (index: number) => {
    setProduct(prev => ({
      ...prev,
      media: prev.media?.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form')
    try {
      // In a real application, you would send the product data to an API here
      console.log("Product data to be submitted:", product)
      toast({ title: "Product created successfully" })
      router.replace("/products/slug") // Redirect to product list page
    } catch (error) {
      toast({ title: "Failed to create product", variant: "destructive" })
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'general':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                name="SKU"
                value={product.SKU}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand1">Brand 1</SelectItem>
                  <SelectItem value="brand2">Brand 2</SelectItem>
                  <SelectItem value="brand3">Brand 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="categories">Categories</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="category3">Category 3</SelectItem>
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
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="status"
                  checked={product.status === 1}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="status">
                  {product.status === 1 ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>
        )
      case 'pricing':
        return (
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
                  required
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
                />
              </div>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={product.currency}
                onValueChange={(value) => setProduct(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="discountStartDate">Discount Start Date</Label>
              <Input
                id="discountStartDate"
                name="discountStartDate"
                type="datetime-local"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="discountEndDate">Discount End Date</Label>
              <Input
                id="discountEndDate"
                name="discountEndDate"
                type="datetime-local"
                onChange={handleInputChange}
              />
            </div>
          </div>
        )
      case 'inventory':
        return (
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
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="stockStatus">Stock Status</Label>
              <Select
                value={product.stockStatus?.toString()}
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
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                name="dimensions"
                value={product.dimensions}
                onChange={handleInputChange}
                placeholder="L x W x H"
              />
            </div>
          </div>
        )
      case 'media':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.media?.map((media, index) => (
              <div key={index} className="relative">
                <Image
                  src={media.url}
                  alt={media.altText}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveMedia(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="border-2 border-dashed rounded-lg flex items-center justify-center h-[200px]">
              <label htmlFor="media-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>
                    <Plus className="h-4 w-4 mr-2" /> Add Media
                  </span>
                </Button>
              </label>
              <input
                id="media-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleAddMedia}
              />
            </div>
          </div>
        )
      case 'attributes':
        return (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attribute</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(product.attributes || {}).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>
                      <Input
                        value={value}
                        onChange={(e) => handleAttributeChange(key, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveAttribute(key)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                  <Button variant="outline" onClick={() => 
                    setIsAddingAttribute(false)}>Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => setIsAddingAttribute(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Attribute
                </Button>
              )}
            </div>
          </>
        )
      case 'seo':
        return (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                value={product.metaTitle}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={product.metaDescription}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input
                id="metaKeywords"
                name="metaKeywords"
                value={product.metaKeywords?.join(", ")}
                onChange={(e) => setProduct(prev => ({ ...prev, metaKeywords: e.target.value.split(", ") }))}
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={product.slug}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <form>
        <div className="grid gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex flex-col items-center"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            index <= currentStep ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`h-1 w-8 sm:w-16 md:w-24 lg:w-32 ${
                              index < currentStep ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          />
                        )}
                      </div>
                      <span className={`mt-2 text-xs sm:text-sm ${
                        index <= currentStep ? 'text-primary' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {renderStepContent()}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button type="button"
              onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
            >
              { currentStep === steps.length - 1 ? 'Create Product' : 'Next'}
            </Button>
            
          </div>
        </div>
      </form>
    </div>
  )
}