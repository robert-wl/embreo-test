import GenericTable from "@/components/table/generic-table.tsx";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { EventEntity } from "@/lib/model/entity/event.entity.ts";
import { useMemo } from "react";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import ViewEventModal from "@/pages/dashboard/_components/view-event-modal.tsx";
import EventBadge from "@/components/event/event-badge.tsx";

interface TableContent {
  event: EventEntity;
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

      return <EventBadge status={status} />;
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
        <ViewEventModal event={row.original.event} />
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
          event: event,
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
