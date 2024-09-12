"use client"

import { z } from "zod"

const ACCEPTED_IMAGE_TYPE = /image\//
const MAX_FILE_SIZE = 5 * 1024 * 1024

export const createBrandSchema = z.object({
    name: z.string().min(2).max(50),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPE.test(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional().nullable(),

    description: z.string().optional()
})
