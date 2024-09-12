'use client';

import AddItemsLinks from "@/components/add-item-links";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


export function AddNewDialogue() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <Dialog defaultOpen={isOpen} onOpenChange={(open)=> !open && onDismiss()}>
      
      <DialogContent className="sm:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New</DialogTitle>
          <DialogDescription>
            What do you want to add?
          </DialogDescription>
        </DialogHeader>
        <AddItemsLinks />
      </DialogContent>
    </Dialog>,

    document.getElementById('modal-root')!
  );
}
