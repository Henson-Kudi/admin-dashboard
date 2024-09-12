'use client';

import AddItemsLinks from "@/components/add-item-links";
import CreateBrandForm from "@/components/create-brand-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";


export function CreateNewBrandDialog({}:{title?: string, description?: string}) {
  const router = useRouter()

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <Dialog defaultOpen onOpenChange={(open)=> !open && onDismiss()}>
      
      <DialogContent className="sm:max-w-lg lg:max-w-2xl">
        <CreateBrandForm />
      </DialogContent>
    </Dialog>,

    document.getElementById('modal-root')!
  );
}
