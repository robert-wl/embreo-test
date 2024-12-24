import { Button } from "@/components/ui/button.tsx";
import { XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { ChangeStatusDTO, changeStatusSchema } from "@/lib/model/schema/event/change-status.dto.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeStatus } from "@/service/event-service.ts";
import { EventEntity, EventStatus } from "@/lib/model/entity/event.entity.ts";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import ErrorField from "@/components/form/error-field.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import LoadingButton from "@/components/form/loading-button.tsx";

interface Props {
  event: EventEntity;
  closeModal: () => void;
}

export default function RejectEventButton({ event, closeModal }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeStatusDTO>({
    resolver: zodResolver(changeStatusSchema),
  });

  const { mutate, error, isPending } = useChangeStatus(event.id, {
    onSuccess: () => {
      closeModal();
    },
  });

  const handleReject = async (data: ChangeStatusDTO) => {
    mutate(data);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex-1 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors">
        <XCircle className="w-4 h-4 mr-2" />
        Reject
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800">Reject Event</DialogTitle>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={handleSubmit(handleReject)}>
            <div className="grid gap-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                className="min-h-24"
                placeholder="Enter remarks"
                {...register("remarks")}
              />
              <ErrorField error={errors.remarks?.message} />
              <ErrorField error={error?.message} />
            </div>
            <DialogFooter className="flex gap-2 pt-4 border-t border-gray-100">
              <input
                type="hidden"
                value={EventStatus.REJECTED}
                {...register("status")}
              />
              <LoadingButton
                type="submit"
                variant="outline"
                isLoading={isPending}
                loadingText="Rejecting..."
                className="flex-1 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors">
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </LoadingButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
