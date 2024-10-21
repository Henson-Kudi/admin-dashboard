"use client"

import * as React from "react"
import { debounce } from "lodash"
import CategoriesList from "@/components/categories-list"

export default function ProductCategories() {

  const debounceSearch = debounce((txt:string) => {
    // Handle search logic
    console.log(txt)
  }, 100)


  return (
    <CategoriesList />
  )
}
