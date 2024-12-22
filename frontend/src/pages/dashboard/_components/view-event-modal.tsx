import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { CheckCircle, PencilIcon, XCircle } from "lucide-react";
import { EventEntity } from "@/lib/model/entity/event.entity.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import EventBadge from "@/components/event/event-badge.tsx";
import ApproveEventButton from "@/pages/dashboard/(vendor)/_components/approve-event-button.tsx";

interface Props {
  event: EventEntity;
  onApprove?: (event: EventEntity) => void;
  onReject?: (event: EventEntity) => void;
}

export default function ViewEventModal({ event, onApprove, onReject }: Props) {
  const [open, setOpen] = useState(false);

  const handleApprove = () => {
    onApprove?.(event);
    setOpen(false);
  };

  const handleReject = () => {
    onReject?.(event);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-md p-2 hover:bg-gray-100 transition-colors">
          <PencilIcon className="h-4 w-4 text-gray-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Event Information</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="eventName"
              className="text-gray-600">
              Event Name
            </Label>
            <Input
              className="w-full font-bold bg-gray-50 border-gray-200"
              id="eventName"
              value={event.event_type?.name}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="eventLocation"
              className="text-gray-600">
              Event Location
            </Label>
            <Input
              className="w-full font-bold bg-gray-50 border-gray-200"
              id="eventLocation"
              value={event.location}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="eventStatus"
              className="text-gray-600">
              Event Status
            </Label>
            <EventBadge status={event.status} />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="acceptedDate"
              className="text-gray-600">
              Accepted Date
            </Label>
            <Input
              className="w-full font-bold bg-gray-50 border-gray-200"
              id="acceptedDate"
              value={new Date(event.updated_at).toLocaleDateString()}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="createdDate"
              className="text-gray-600">
              Created Date
            </Label>
            <Input
              className="w-full font-bold bg-gray-50 border-gray-200"
              id="createdDate"
              value={new Date(event.created_at).toLocaleDateString()}
              readOnly
            />
          </div>
        </div>
        {event.status === "pending" && (
          <DialogFooter className="flex gap-2 pt-4 border-t border-gray-100">
            <Button
              // onClick={handleReject}
              variant="outline"
              className="flex-1 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors">
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>

            <ApproveEventButton
              event={event}
              closeModal={() => setOpen(false)}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
