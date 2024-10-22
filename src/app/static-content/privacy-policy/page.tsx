'use client'
import TextEditor from '@/components/editor'
import { Delta } from 'quill/core'
import React, { useEffect } from 'react'

export default function PrivacyPolicyPage() {
    const  submitData = function(params:any){
        console.log(params)

    }

    useEffect(()=>{
      if (window && typeof window !== 'undefined') {
        const delta = new Delta(
            [
                {insert: 'Terms and Conditions Heading'},
                {
                  attributes: {
                    header: 1
                  },
                  insert: '\n'
                }
            ]
        )
      }
    }, [])

  return (
    <div>
        <TextEditor handleSubmit={submitData} />
    </div>
  )
}
