import { Button } from "@/components/ui/button";
import { HeaderContext } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  label: string;
  headerContext: HeaderContext<any, any>;
}

export default function SortableTableCell({ label, headerContext }: Readonly<Props>) {
  const { column } = headerContext;

  return (
    <Button
      className="hover:bg-transparent"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {column.getIsSorted() ? column.getIsSorted() === "asc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" /> : null}
    </Button>
  );
}

export function getTableHeader(label: string) {
  const returnFunction = (ctx: HeaderContext<any, any>) => (
    <SortableTableCell
      headerContext={ctx}
      label={label}
    />
  );

  return returnFunction;
}
