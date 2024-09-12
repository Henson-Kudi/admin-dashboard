'use client';

import CreateBrandForm from "@/components/create-brand-form";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";


export function CreateNewBrandDialog({}:{title?: string, description?: string}) {
  const router = useRouter()

  function onDismiss() {
    router.back();
  }

  return (
    <Dialog defaultOpen onOpenChange={(open)=> !open && onDismiss()}>
      
      <DialogContent className="sm:max-w-lg lg:max-w-2xl">
        <CreateBrandForm />
      </DialogContent>
    </Dialog>
  );
}
