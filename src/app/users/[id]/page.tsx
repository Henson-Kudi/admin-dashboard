import UserDetails from '@/components/user-details'
import React from 'react'

export default function UserDetailsPage({params}:{params: {[key: string]: unknown} &  {id: string}}) {
  return (
    <>
        <UserDetails params={params} />
    </>
  )
}
