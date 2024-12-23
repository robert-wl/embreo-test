import { Button } from "@/components/ui/button.tsx";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { ChangeStatusDTO, changeStatusSchema } from "@/lib/model/schema/event/change-status.dto.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeStatus } from "@/service/event-service.ts";
import { EventEntity, EventStatus } from "@/lib/model/entity/event.entity.ts";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import ErrorField from "@/components/form/error-field.tsx";
import { Label } from "@/components/ui/label.tsx";

interface Props {
  event: EventEntity;
  closeModal: () => void;
}

export default function ApproveEventButton({ event, closeModal }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeStatusDTO>({
    resolver: zodResolver(changeStatusSchema),
  });

  const { mutate } = useChangeStatus(event.id, {
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
            className="grid gap-4 py-4"
            onSubmit={handleSubmit(handleApprove)}>
            <div className="grid gap-2">
              <Label>Select Date</Label>
              // ADD SHADCN RADIO GROUP AND MAKE IT PRETTY HERE
              <ErrorField error={errors.remarks?.message} />
            </div>
            <DialogFooter className="flex gap-2 pt-4 border-t border-gray-100">
              <input
                type="hidden"
                value={EventStatus.APPROVED}
                {...register("status")}
              />
              <Button
                onClick={() => setOpen(true)}
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
