import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

export default function SimpleDialog({
    triggerComponent,
    children,
    title,
    description,
    onOpenChange
}: {
    triggerComponent?: string | React.ReactNode,
    children?: React.ReactNode,
    title?: string,
    description?: string
    onOpenChange?: (state:boolean)=> void
}) {
  return (
    <Dialog onOpenChange={(open)=>{
      onOpenChange?.(open)
    }}>
      <DialogTrigger asChild>
        {
            typeof triggerComponent !== 'string' ? triggerComponent : <Button variant="outline">{triggerComponent ?? 'Open'}</Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {
          children
        }
      </DialogContent>
    </Dialog>
  )
}
