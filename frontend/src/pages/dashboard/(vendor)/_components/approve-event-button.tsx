import { Button } from "@/components/ui/button.tsx";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { ChangeStatusDTO, changeStatusSchema } from "@/lib/model/schema/event/change-status.dto.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeStatus } from "@/service/event-service.ts";
import { EventEntity, EventStatus } from "@/lib/model/entity/event.entity.ts";

interface Props {
  event: EventEntity;
  closeModal: () => void;
}

export default function ApproveEventButton({ event, closeModal }: Props) {
  const { register, handleSubmit } = useForm<ChangeStatusDTO>({
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
    <form
      className="flex-1"
      onSubmit={handleSubmit(handleApprove)}>
      <input
        type="hidden"
        value={EventStatus.APPROVED}
        {...register("status")}
      />
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors">
        <CheckCircle className="w-4 h-4 mr-2" />
        Approve
      </Button>
    </form>
  );
}
