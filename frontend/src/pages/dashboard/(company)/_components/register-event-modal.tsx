import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CalendarPlus } from "lucide-react";
import RegisterEventForm from "@/pages/dashboard/(company)/_components/register-event-form.tsx";
import { useState } from "react";

export default function RegisterEventModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-blue-200 hover:bg-blue-50 text-blue-600 gap-2 group">
          <CalendarPlus className="w-4 h-4" />
          <span>Register Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Apply for Event</DialogTitle>
          <DialogDescription>Fill out the form below to apply for an event. The event will be distributed to various vendors.</DialogDescription>
        </DialogHeader>
        <RegisterEventForm setModalOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
