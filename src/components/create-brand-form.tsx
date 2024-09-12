'use client'
import { createBrandSchema } from '@/lib/validations/brand'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm }  from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from './ui/textarea'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateBrandForm() {
  const router = useRouter()

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null)
  // 1. Define your form.
  const form = useForm<z.infer<typeof createBrandSchema>>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createBrandSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({
      ...values,
      image: selectedImage
    })
  }

  return (
    <div className='w-2/5 mx-auto px-4 border rounded-lg my-4 pb-4'>
      <div className='flex justify-end items-center mt-2'>
        <Button
          variant={'ghost'}
          className='border rounded-md'
          onClick={router.back}
        >
          <X />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
                </FormControl>
                <FormDescription>
                  Name of your new brand
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Brand Image</FormLabel>
                <FormControl>
                  <Input placeholder="Select brand image" type='file' accept='image/*' {...field} name='image' onChange={(e)=>{
                    setSelectedImage(e.target.files?.[0] ?? null)
                  }} />
                </FormControl>
                <FormDescription>
                  Select Brand Image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your new brand" {...field} />
                </FormControl>
                <FormDescription>
                  Describe your new brand
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
