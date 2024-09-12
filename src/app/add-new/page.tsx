'use client'
import AddItemsLinks from '@/components/add-item-links'

export default function AddNewItem() {

  return (
    <div>
      <div className='py-4'>
        <div className='text-lg font-semibold leading-none tracking-tight'>Add New</div>
        <div className='text-sm text-muted-foreground'>What do you want to add?</div>
      </div>
      <AddItemsLinks replace={false} />
    </div>
  )
}
