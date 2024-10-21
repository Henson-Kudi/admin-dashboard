'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

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

// Mock data for demonstration
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    content: 'React is a popular JavaScript library for building user interfaces...',
    createdBy: 'John Doe',
    createdAt: '2023-05-01T12:00:00Z',
    isActive: false,
    isDeleted: true,
  },
  {
    id: '2',
    title: 'Advanced TypeScript Techniques',
    slug: 'advanced-typescript-techniques',
    content: 'TypeScript offers many advanced features that can improve your code...',
    createdBy: 'Jane Smith',
    createdAt: '2023-05-05T14:30:00Z',
    lastModifiedBy: 'John Doe',
    lastUpdatedAt: '2023-05-06T10:15:00Z',
    isActive: true,
    isDeleted: false,
  },
  // Add more mock data as needed
]

export default function BlogPostList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterBy, setFilterBy] = useState('all')

  useEffect(() => {
    // In a real application, you would fetch blog posts from an API here
    // For now, we'll use the mock data
    setBlogPosts(mockBlogPosts)
  }, [])

  const filteredAndSortedPosts = blogPosts
    .filter(post => {
      if (filterBy === 'active') return post.isActive && !post.isDeleted
      if (filterBy === 'inactive') return !post.isActive && !post.isDeleted
      if (filterBy === 'deleted') return post.isDeleted
      return true
    })
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof BlogPost]
      const bValue = b[sortBy as keyof BlogPost]
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      return 0
    })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex space-x-4 w-full md:w-auto">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="lastUpdatedAt">Last Updated</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedPosts.map(post => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <div className="flex space-x-2">
                <Badge variant={post.isActive ? "success" : "secondary"}>
                  {post.isActive ? 'Active' : 'Inactive'}
                </Badge>
                {post.isDeleted && <Badge variant="destructive">Deleted</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-2">Created by {post.createdBy} on {new Date(post.createdAt).toLocaleDateString()}</p>
              {post.lastModifiedBy && (
                <p className="text-sm text-gray-500 mb-2">Last modified by {post.lastModifiedBy} on {new Date(post.lastUpdatedAt!).toLocaleDateString()}</p>
              )}
              <p className="line-clamp-3">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/blogs/${post.slug}`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}