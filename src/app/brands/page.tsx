"use client"

import * as React from "react"
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import envConf from "@/lib/env.conf"
import axios from 'axios'
import { debounce } from "lodash"
import BrandTable from "@/components/brands-list"

export default function Brands() {

  const [pagination, setPagination] = React.useState({
        pageSize: 10,
        pageIndex: 0,
      })

   const [rowSelection, setRowSelection] = React.useState({})
  const [search, setSearch] = React.useState('')
  
  const {data, error, isFetching, } = useQuery({
    queryKey: ['brandsData', pagination],
    queryFn: () => axios.get(`${envConf.apiBaseUrl}/products-service/brands?options[page]=${pagination.pageIndex + 1}&options[limit]=${pagination.pageSize}&options[withProducts]=${true}`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const debounceSearch = debounce((txt:string) => {
    // Handle search logic
    console.log(txt)
  }, 100)

  


  return (
    <BrandTable />
  )
}
