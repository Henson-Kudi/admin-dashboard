import { LucideIcon } from 'lucide-react';

export interface NavCommanListItem {
    label: string;
    href: string;
    icon?: LucideIcon;
    disabled?: boolean; //we can use this to  disable routes for unauthorised users. If we decide to manage routes from api (backend)
    external?: boolean; //Decides if to open a link in new tab
}

export interface NavCommandItem {
    group?: string;
    items: Array<NavCommanListItem>

}
export interface SidebarItems {
    links: Array<NavCommandItem>;
}

export type ProductMedia = {
    url: string,
    type: "IMAGE" | "VIDEO",
    altText: string
}

export type ProductBrand = {
    id: string,
    name: string,
    slug: string,
    image: string,
    createdById: string,
    createdBy?: Record<string, any>
    lastModifiedBy?: Record<string, any>,
    lastModifiedById?: string,
    createdAt: string,
    updatedAt: string,
    description?: string
}

export type ProductCategory = {
    id: string,
    name: string,
    slug: string,
    image: string,
    createdById: string,
    createdBy?: Record<string, any>
    lastModifiedBy?: Record<string, any>,
    lastModifiedById?: string,
    createdAt: string,
    updatedAt: string,
    description?: string
}

export type Tax = {
    id: string,
    name: string,
    slug: string,
    rate: number,
    createdById: string,
    createdBy?: Record<string, any>
    lastModifiedBy?: Record<string, any>,
    lastModifiedById?: string,
    createdAt: string,
    updatedAt: string,
    description?: string
}

export type Product = {
    id: string,
    serialNumber: number,
    name: string,
    description?: string,
    price: number,
    currency: string,
    brandId: string,
    tags?: string[],
    SKU: string,
    UPC?: string,
    EAN?: string,
    media: ProductMedia[],
    createdAt: string,
    updatedAt: string,
    createdById: string,
    createdBy?: Record<string, any>,
    lastModifiedBy?: Record<string, any>,
    lastModifiedById?: string,
    status: number,
    stockStatus: number,
    slug: string,
    metaTitle?: string,
    metaDescription?: string,
    metaKeywords?: string[],
    qtyInStock: number,
    originalPrice: number,
    discountedPrice?: number,
    discountStartDate?: string,
    discountEndDate?: string,
    averageRating?: number,
    reviewCount?: number,
    unit?: string,
    size?: string,
    color?: string,
    weight?: string,
    dimensions?: string,
    attributes?: Record<string, string>,
    brand: ProductBrand,
    categories: ProductCategory[],
    taxes?: Tax[]
}

export type OrderItem = {
    "id": string,
    "orderId": string,
    "productId": string,
    "productName": string,
    "productSKU": string,
    "quantity": number,
    "price": number,
    "total": number,
    "tax": number
}

export type ShippingAddress = {
    "id": string,
    "orderId": string,
    "buildingName": string,
    "landmark": string,
    "roomNo": string,
    "floor": string,
    "address": string,
    "city": string,
    "state": string,
    "country": string,
    "zipCode": string
}



export type Order = {
    "id": string,
    refNumber: string
    "userId"?: string | null,
    "name": string,
    "email": string,
    "phone": string,
    "totalAmount": number,
    "discount": number,
    "currency": string,
    "status": string,
    "createdAt": string,
    "updatedAt": string,
    "paymentId": string,
    "orderItems": OrderItem[],
    "shippingAddress": ShippingAddress,
}

export enum OrderStatus {
    PENDING = "PENDING",
    PACKAGING = "PACKAGING", //Product is being packaged
    CANCELLED = "CANCELLED",
    OUT_FOR_DELIVERY = "OUT FOR DELIVERY",
    DELIVERED = "DELIVERED",
}

export type Faq = {
    id: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt?: string,
    createdById: string,
    lastModifiedById?: string
}

export const productStatus = {
    1: "ACTIVE",
    2: "INACTIVE",
    3: "DISCONTINUED",
    4: "PENDING_APPROVAL",
    5: "ARCHIVED",
} as const;

export const productStatusKeys = {
    "ACTIVE": 1,
    "INACTIVE": 2,
    "DISCONTINUED": 3,
    "PENDING_APPROVAL": 4,
    "ARCHIVED": 5,
} as const;

// eslint-disable-next-line
export type ProductStatus = (typeof productStatus)[keyof typeof productStatus];

export const StockStatus = {
    1: "OUT_OF_STOCK",
    2: "IN_STOCK",
} as const;

// eslint-disable-next-line
export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus];

export const DefaultCurrency = 'AED' as const;

export type Role = {
    id: string
    name: string
    slug: string
    description?: string | null
    createdAt: string // valid date string
    updatedAt: string // valid date string
    createdById: string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string | null // valid date string | null
    deletedById?: string | null
    lastModifiedById?: string | null
}

export type Group = {
    id: string
    name: string
    slug: string
    description?: string | null
    createdAt: string // date string
    updatedAt: string // date string
    createdById: string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string // date string | null
    deletedById?: string | null
    lastModifiedById?: string | null
}

export type User = {
    id: string
    email: string
    emailVerified: boolean
    name: string
    phone: string
    phoneVerified: boolean
    createdAt: string // valid date string
    updatedAt: string // valid date string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string // valid date string
    deletedById?: string
    lastModifiedById?: string
    invitedById?: string
    lastLoginAt?: string // valid date string
    lastLoginIp?: string
    lastLoginDevice?: string
    lastLoginLocation?: string
    googleId?: string
    appleId?: string
    photo?: string
    deletedBy?: User
    lastModifiedBy?: User
    invitedBy?: User
    roles?: Role[]
    groups: Group[]
}

export type BlogPost = {
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

export enum NODE_ENV {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    TEST = "test"
}