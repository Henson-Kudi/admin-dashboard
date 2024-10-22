'use client'

import TextEditor from '@/components/editor'
import { Delta } from 'quill/core'
import React, { useEffect, useState } from 'react'

export default function PrivacyPolicyPage() {
  const [value, setValue] = useState<Delta | undefined>()

    const  submitData = function(params:any){
        console.log(params)

    }

    useEffect(()=>{
      if (typeof window !== 'undefined') {
        setValue(new Delta(
            [
                {insert: 'Terms and Conditions Heading'},
                {
                  attributes: {
                    header: 1
                  },
                  insert: '\n'
                }
            ]
        ))
      }
    }, [])

  return (
    <div>
        <TextEditor handleSubmit={submitData} value={value} />
    </div>
  )
}
