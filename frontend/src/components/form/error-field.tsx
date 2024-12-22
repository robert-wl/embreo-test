import { ComponentPropsWithoutRef } from "react";
import { AlertCircle } from "lucide-react";
import { Maybe } from "@/lib/type/utils.ts";

interface Props extends ComponentPropsWithoutRef<"div"> {
  error: Maybe<string>;
}

export default function ErrorField({ error, ...props }: Props) {
  if (!error) {
    return null;
  }
  return (
    <div
      className="flex items-center gap-2 text-red-500 text-sm mt-1 bg-red-50 border border-red-200 rounded-md p-2"
      {...props}>
      <AlertCircle className="h-4 w-4" />
      <span>{error}</span>
    </div>
  );
}
