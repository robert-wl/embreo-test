import { Button } from "@/components/ui/button.tsx";
import { ComponentProps } from "react";
import { Loader2 } from "lucide-react";

interface Props extends ComponentProps<typeof Button> {
  isLoading: boolean;
  loadingText?: string;
}

export default function LoadingButton({ children, isLoading, loadingText = "Loading...", ...props }: Props) {
  return (
    <Button
      disabled={isLoading}
      {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {loadingText}
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
