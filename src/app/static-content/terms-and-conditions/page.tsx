'use client'

import TextEditor from '@/components/editor'
import { Delta } from 'quill/core'
import React, { useState } from 'react'

export default function TermsAndConditions() {
  const [value, setValue] = useState<Delta | undefined>()

    const  submitData = function(params:any){
        console.log(params)

    }

    

  return (
    <div>
        <TextEditor handleSubmit={submitData} value={value} />
    </div>
  )
}
