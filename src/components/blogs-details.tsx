'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Save, ArrowLeft, ChevronLeft } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import TextEditor from './editor'
import { toast } from '@/hooks/use-toast'

type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  createdBy: string
  lastModifiedBy?: string
  createdAt: string
  lastUpdatedAt?: string
  headerImage?: string
  metaTitle?: string
  metaDescription?: string
  metaTags?: string
  isActive: boolean
  isDeleted: boolean
  deletedAt?: string
}

export default function BlogPostDetails() {
  const router = useRouter()
  const { id } = useParams()
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the blog post from an API here
    // For now, we'll use mock data
    const mockBlogPost: BlogPost = {
      id: '1',
      title: 'Getting Started with React',
      slug: 'getting-started-with-react',
      content: 'React is a popular JavaScript library for building user interfaces...',
      createdBy: 'John Doe',
      createdAt: '2023-05-01T12:00:00Z',
      isActive: true,
      isDeleted: false,
      metaTitle: 'React Tutorial for Beginners',
      metaDescription: 'Learn how to get started with React, a popular JavaScript library for building user interfaces.',
      metaTags: 'react, javascript, frontend, web development',
    }

    setBlogPost(mockBlogPost)
    setIsLoading(false)
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (blogPost) {
      setBlogPost({
        ...blogPost,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    if (blogPost) {
      setBlogPost({
        ...blogPost,
        isActive: checked,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the updated blog post to an API here
    console.log('Updated blog post:', blogPost)
    // Simulate API call
    setTimeout(() => {
      return toast({ title: 'Blog post updated successfully' })
    }, 1000)
  }

  const handleSaveBlogContent = (params: {
    delta: unknown;
    html: HTMLElement | string;
}) => {
    console.log(params)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!blogPost) {
    return <div>Blog post not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-blue-600 hover:underline">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="content">
              <TabsList className="mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Meta Information</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={blogPost.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={blogPost.slug}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-6">
                    <Switch
                      id="isActive"
                      checked={blogPost.isActive}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <TextEditor handleSubmit={handleSaveBlogContent} />
                  </div>
                  <div className='h-8'></div>
                </div>
              </TabsContent>
              <TabsContent value="meta">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      value={blogPost.metaTitle || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={blogPost.metaDescription || ''}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaTags">Meta Tags</Label>
                    <Input
                      id="metaTags"
                      name="metaTags"
                      value={blogPost.metaTags || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <CardFooter className="flex justify-between mt-6">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}