'use client'
// import TextEditor from '@/components/editor'
import { head } from 'lodash'
import { Delta } from 'quill/core'
import React from 'react'

export default function PrivacyPolicyPage() {
    const  submitData = function(params:any){
        console.log(params)

    }

    // const delta = new Delta(
    //     [
    //         {insert: 'Privacy Policy Heading'},
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
        {/* <TextEditor handleSubmit={submitData} /> */}
    </div>
  )
}
