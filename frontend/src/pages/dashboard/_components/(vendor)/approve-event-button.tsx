import { Button } from "@/components/ui/button.tsx";
import { CheckCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { ChangeStatusDTO, changeStatusSchema } from "@/lib/model/schema/event/change-status.dto.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeStatus } from "@/service/event-service.ts";
import { EventEntity, EventStatus } from "@/lib/model/entity/event.entity.ts";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import ErrorField from "@/components/form/error-field.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import LoadingButton from "@/components/form/loading-button.tsx";

interface Props {
  event: EventEntity;
  closeModal: () => void;
}

export default function ApproveEventButton({ event, closeModal }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangeStatusDTO>({
    resolver: zodResolver(changeStatusSchema),
    defaultValues: {
      approved_at: new Date(event.dates[0]),
    },
  });

  const { mutate, error, isPending } = useChangeStatus(event.id, {
    onSuccess: () => {
      closeModal();
    },
  });

  const handleApprove = async (data: ChangeStatusDTO) => {
    mutate(data);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="submit"
        className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-colors">
        <CheckCircle className="w-4 h-4 mr-2" />
        Approve
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800">Approve Event</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleApprove)}
            className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Select Date</Label>

              <Controller
                control={control}
                name="approved_at"
                render={({ field }) => (
                  <RadioGroup
                    defaultValue={event.dates[0]}
                    className="grid gap-3">
                    {event.dates.map((date) => (
                      <div
                        key={date}
                        onClick={() => field.onChange(new Date(date))}
                        className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors [&:has([data-state=checked])]:border-green-500 [&:has([data-state=checked])]:bg-green-50">
                        <RadioGroupItem
                          value={date}
                          id={date}
                          className="border-2"
                        />
                        <Label
                          htmlFor={date}
                          className="flex-grow cursor-pointer font-medium">
                          {new Date(date).toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              <ErrorField error={errors.approved_at?.message} />
              <ErrorField error={error?.message} />
            </div>
            <DialogFooter className="flex gap-2 pt-4 border-t border-gray-100">
              <input
                type="hidden"
                value={EventStatus.APPROVED}
                {...register("status")}
              />
              <LoadingButton
                onClick={() => setOpen(true)}
                type="submit"
                isLoading={isPending}
                loadingText="Approving..."
                className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </LoadingButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
