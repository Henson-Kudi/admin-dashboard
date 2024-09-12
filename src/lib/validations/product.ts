import { z } from 'zod'

export const createProductSchema = z.object({

    name: z.string(),
    description: z.string().optional().nullable(),
    price: z.number().gt(0),
    currency: z.string(),
    brandId: z.string(),
    tags: z.array(z.string()),
    SKU: z.string(),
    UPC: z.string().optional().nullable(),
    EAN: z.string().optional().nullable(),
    // media: z.array(z.object({
    //     url: z.string(),
    //     type: z.enum(["IMAGE", "VIDEO"]),
    //     altText: z.string().optional().nullable()
    // })),

    metaTitle: z.string(),
    metaDescription: z.string(),
    metaKeywords: z.array(z.string()),
    qtyInStock: z.number(),
    originalPrice: z.number(),
    discountedPrice: z.number().optional().nullable(),
    discountStartDate: z.string().optional().nullable(),
    discountEndDate: z.string().optional().nullable(),

    unit: z.string().optional().nullable(),
    size: z.string().optional().nullable(),
    color: z.string().optional().nullable(),
    weight: z.string().optional().nullable(),
    dimensions: z.string().optional().nullable(),
    attributes: z.record(z.string()),
    taxes: z.array(z.string())
})