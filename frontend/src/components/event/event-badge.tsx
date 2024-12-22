import { cn } from "@/lib/utils.ts";

interface Props {
  status: string;
}

export default function EventBadge({ status }: Props) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-2xl items-center w-fit py-1.5 px-2",
        status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700",
      )}>
      {status === "approved" ? "Approved" : "Pending"}
    </div>
  );
}
