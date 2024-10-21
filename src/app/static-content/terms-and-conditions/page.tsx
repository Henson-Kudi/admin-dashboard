'use client'
import TextEditor from '@/components/editor'
// import { Delta } from 'quill/core'
import React from 'react'

export default function TermsAndConditions() {
    const  submitData = function(params:any){
        console.log(params)

    }

    // const delta = new Delta(
    //     [
    //         {insert: 'Terms and Conditions Heading'},
    //         {
    //           attributes: {
    //             header: 1
    //           },
    //           insert: '\n'
    //         }
    //     ]
    // )

  return (
    <div>
        <TextEditor handleSubmit={submitData} />
    </div>
  )
}
