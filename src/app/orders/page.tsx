import * as React from "react"
import { debounce } from "lodash"
import OrdersList from "@/components/orders-list"

export default function Orders() {

  const debounceSearch = debounce((txt:string) => {
    // Handle search logic
    console.log(txt)
  }, 100)


  return (
    <>
      <OrdersList />
    </>
    
  )
}
