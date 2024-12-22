import GenericTable from "@/components/table/generic-table.tsx";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { EventEntity } from "@/lib/model/entity/event.entity.ts";
import { useMemo } from "react";
import { Badge, CalendarIcon, MapPinIcon, PencilIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface TableContent {
  name: string;
  vendor: string;
  dates: string[];
  location: string;
  status: string;
  createdDate: string;
}

const tableColumns: ColumnDef<TableContent>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue("vendor")}</div>,
  },
  {
    accessorKey: "dates",
    header: "Dates",
    cell: ({ row }) => {
      const dates: string[] = row.getValue("dates");

      return (
        <div className="space-y-1">
          {dates.map((date, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-gray-600">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-600">
        <MapPinIcon className="mr-2 h-4 w-4" />
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <div
          className={cn(
            "flex gap-2 rounded-2xl items-center w-fit py-1.5 px-2",
            status === "accepted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700",
          )}>
          {status === "accepted" ? "Accepted" : "Pending"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue("createdDate")}</div>,
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button className="rounded-md p-2 hover:bg-gray-100">
          <PencilIcon className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    ),
  },
];

interface Props {
  data: EventEntity[];
}

export default function EventTable({ data }: Props) {
  const tableData = useMemo<TableContent[]>(
    () =>
      data.map((event) => {
        return {
          name: event.event_type?.name ?? "N/A",
          vendor: "N/A",
          dates: event.dates.map((date) => new Date(date).toLocaleDateString()),
          location: event.location,
          status: event.status,
          createdDate: new Date(event.created_at).toLocaleDateString(),
        };
      }),
    [data],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <GenericTable
      table={table}
      columns={tableColumns}
    />
  );
}
