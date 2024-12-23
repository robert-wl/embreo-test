import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { CalendarIcon, Clock, Info, MapPin, Tag, User } from "lucide-react";
import { EventEntity } from "@/lib/model/entity/event.entity.ts";
import useAuth from "@/hooks/use-auth.ts";
import { Role } from "@/lib/model/entity/user.entity.ts";
import ApproveEventButton from "@/pages/dashboard/_components/(vendor)/approve-event-button.tsx";
import RejectEventButton from "@/pages/dashboard/_components/(vendor)/reject-event-button.tsx";

interface Props {
  event: EventEntity;
}

export default function ViewEventModal({ event }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-md p-2 hover:bg-gray-100 transition-colors">
          <Info className="h-4 w-4 text-gray-600" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Event Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 rounded-lg border border-input bg-gray-50">
            <Tag className="w-5 h-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Event Type</p>
              <div className="mt-1 font-semibold text-gray-900">{event.event_type?.name}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg border border-input bg-gray-50">
            <User className="w-5 h-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Created By</p>
              <div className="mt-1 font-semibold text-gray-900">{event.user?.username}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg border border-input bg-gray-50">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Location</p>
              <div className="mt-1 font-semibold text-gray-900">{event.location}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg border border-input bg-gray-50">
            <Info className="w-5 h-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Status</p>
              <div className="mt-1 font-semibold text-gray-900">{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</div>
            </div>
          </div>

          {event.accepted_at ? (
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-input bg-gray-50">
              <CalendarIcon className="w-5 h-5 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Accepted Date</p>
                <div className="mt-1 font-semibold text-gray-900">{new Date(event.accepted_at).toLocaleDateString()}</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 rounded-lg border border-input bg-gray-50 p-3">
              <p className="text-sm font-medium text-gray-600 flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                Proposed Dates
              </p>
              {event.dates.map((date, index) => (
                <div
                  key={index}
                  className="ml-7 p-2 bg-white border border-input rounded-md text-gray-900 font-medium">
                  {new Date(date).toLocaleDateString()}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start space-x-3 p-3 rounded-lg border border-input bg-gray-50">
            <CalendarIcon className="w-5 h-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Created Date</p>
              <div className="mt-1 font-semibold text-gray-900">{new Date(event.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {user?.role === Role.VENDOR && event.status === "pending" && (
          <DialogFooter className="flex gap-2 pt-4 border-t border-gray-100">
            <RejectEventButton
              event={event}
              closeModal={() => setOpen(false)}
            />
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
