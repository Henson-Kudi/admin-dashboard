import { NavCommandItem } from "@/types";
import { ChartColumnStacked, Component, ListOrdered, NotebookPen, NotebookText, Ribbon, Users, Wallet } from "lucide-react";

export const menuData: Array<NavCommandItem> = [
    {
        // group: '',
        items: [{ label: 'Products', href: '/products', icon: Component }]
    },
    {
        // group: 'Test Group 2',
        items: [{
            href: '/orders',
            icon: ListOrdered,
            label: 'Orders',
        },]
    },
    {
        // group: 'Test Group 2',
        items: [{
            href: '/payments',
            icon: Wallet,
            label: 'Payments',
        },]
    },
    {
        // group: 'Test Group 2',
        items: [{
            href: '/brands',
            icon: Ribbon,
            label: 'Brands',
        },]
    },
    {
        // group: 'Test Group 2',
        items: [{
            href: '/product-categories',
            icon: ChartColumnStacked,
            label: 'Product Categories',
        },]
    },
    {
        // group: 'Test Group 3',
        items: [{
            href: '/clients',
            icon: Users,
            label: 'Clients',
        },]
    },
    {
        // group: 'Test Group 3',
        items: [{
            href: '/users',
            icon: Users,
            label: 'Users',
        },]
    },
    {
        group: 'Content',
        items: [
            {
                href: '/static-content',
                icon: NotebookText,
                label: 'Static Content',
            },
            {
                href: '/blogs',
                icon: NotebookPen,
                label: 'Blogs',
            },
        ]
    },
    // {
    //     // group: 'Test Group 3',
    //     items: [{
    //         href: '/users',
    //         icon: Users,
    //         label: 'Users',
    //     },]
    // },
]