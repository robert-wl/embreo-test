import { cn } from "@/lib/utils.ts";

interface Props {
  status: string;
}

export default function EventBadge({ status }: Props) {
  const getClassNames = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return <div className={cn("flex gap-2 w-20 py-1 text-sm justify-center rounded-2xl items-center capitalize", getClassNames(status))}>{status}</div>;
}
