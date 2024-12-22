import { Button } from "@/components/ui/button.tsx";
import { ChevronsUpDown, Loader2 } from "lucide-react";

export default function LoadingComboBox() {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Button
          variant="outline"
          className="w-full justify-between bg-gray-50 cursor-not-allowed"
          disabled>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-gray-500">Loading options...</span>
          </div>
          <ChevronsUpDown className="opacity-30" />
        </Button>
      </div>
    </div>
  );
}
