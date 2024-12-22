import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import useAuth from "@/hooks/use-auth.ts";
import { getAllEventTypes } from "@/service/event-service.ts";
import { Combobox } from "@/components/ui/combo-box.tsx";
import { useMemo } from "react";
import { DatePicker } from "@/components/ui/date-picker.tsx";

export default function RegisterEventForm() {
  const { user } = useAuth();
  const { data: eventTypes } = getAllEventTypes();

  const eventSelection = useMemo(() => {
    return (
      eventTypes?.map((event) => {
        return {
          label: event.name,
          value: event.id,
        };
      }) ?? []
    );
  }, [eventTypes]);

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={user?.company?.name}
          disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="eventName">Event Name</Label>
        <Combobox
          values={eventSelection}
          placeholder="Select an event type"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="proposedLocation">Proposed Location</Label>
        <Input
          id="proposedLocation"
          type="text"
          placeholder="Enter your proposed location"
        />
      </div>
      <div className="grid gap-2">
        <Label>Proposed Dates</Label>
        <div className="flex gap-4">
          <DatePicker className="w-1/3" />
          <DatePicker className="w-1/3" />
          <DatePicker className="w-1/3" />
        </div>
      </div>
    </div>
  );
}
