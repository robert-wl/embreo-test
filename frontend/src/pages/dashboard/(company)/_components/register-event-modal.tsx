import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CalendarPlus, Send } from "lucide-react";
import RegisterEventForm from "@/pages/dashboard/(company)/_components/register-event-form.tsx";

export default function RegisterEventModal() {
  return (
    <Dialog>
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
        <RegisterEventForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
