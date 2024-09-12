import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'
import { usePathname, useRouter } from 'next/navigation'

const links: {title: string, icon?: LucideIcon, href: string}[] = [
    {
        title: "Add Product",
        href: "products/add-product",
        // icon?: 
    },
    {
        title: "Add Category",
        href: "categories/add-category",
    },
    {
        title: "Add Brand",
        href: "brands/add-brand",
    },
    {
        title: "Add Order",
        href: "orders/add-order",
    },
    {
        title: "Add Client",
        href: "users/add-user",
    },
    {
        title: "Add Payment",
        href: "payments/add-payment",
    }
]

export default function AddItemsLinks({replace = true}:{replace?: boolean}) {
  return (
    <div className="grid gap-4 grid-cols-4 items-stretch justify-stretch">
        {
            links.map((link, index) => (
                <Link key={index} href={link.href} replace={replace}>
                  <Card className="hover:bg-secondary w-full h-full flex items-center justify-center">
                    <CardHeader>
                      <CardTitle className="text-lg flex gap-2 justify-center items-center">
                        {link.title}
                      </CardTitle>
                      {/* <CardDescription className="truncate">Card Description</CardDescription> */}
                    </CardHeader>
                  </Card>
                </Link>
            ))
        }
    </div>
  )
}
