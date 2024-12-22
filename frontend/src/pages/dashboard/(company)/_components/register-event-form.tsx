import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import useAuth from "@/hooks/use-auth.ts";
import { getAllEventTypes, useCreateEvent } from "@/service/event-service.ts";
import { Combobox } from "@/components/ui/combo-box.tsx";
import { useMemo } from "react";
import { DatePicker } from "@/components/ui/date-picker.tsx";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEventDTO, createEventSchema } from "@/lib/model/schema/event/create-event.dto.ts";
import { DialogClose, DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Send } from "lucide-react";
import ErrorField from "@/components/form/error-field.tsx";

interface Props {
  setModalOpen: (value: boolean) => void;
}

export default function RegisterEventForm({ setModalOpen }: Props) {
  const { user } = useAuth();
  const { data: eventTypes } = getAllEventTypes();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEventDTO>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      company_id: user?.company?.id,
    },
  });
  const { mutate } = useCreateEvent({
    onSuccess: () => setModalOpen(false),
  });

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

  const createEventHandler = async (data: CreateEventDTO) => {
    mutate(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(createEventHandler)}
        className="grid gap-4 py-4">
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
          <Controller
            name="event_type_id"
            control={control}
            render={({ field }) => (
              <Combobox
                values={eventSelection}
                placeholder="Select an event type"
                onValueChange={(value) => field.onChange(value)}
              />
            )}
          />
          <ErrorField error={errors.event_type_id?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="proposedLocation">Proposed Location</Label>
          <Input
            id="proposedLocation"
            type="text"
            placeholder="Enter your proposed location"
            {...register("location")}
          />
          <ErrorField error={errors.location?.message} />
        </div>
        <div className="grid gap-2">
          <Label>Proposed Dates</Label>
          <div className="flex gap-4">
            {[...Array(3)].map((_, index) => (
              <Controller
                key={index}
                name={`dates.${index}` as const}
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2 w-1/3">
                    <DatePicker
                      className="w-full"
                      onValueChange={(value) => field.onChange(value)}
                    />
                    <ErrorField error={errors.dates?.[index]?.message} />
                  </div>
                )}
              />
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700">
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
