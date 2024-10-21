'use client'
import React from 'react'
import Banners from './banners/page'

export default function StaticContents() {
  return (
    <>
        {/* By default render the banners page when the url is /static-content */}
        <Banners />
    </>
  )
}
