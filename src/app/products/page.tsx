import * as React from "react"
import { debounce } from 'lodash'

import ProductList from "@/components/products-list"

export default function Products() {

  const debounceSearch = debounce((txt:string) => {
    // Handle search logic
    console.log(txt)
  }, 1000
  )

  return (
    <>
      <ProductList />
    </>
  )
}
