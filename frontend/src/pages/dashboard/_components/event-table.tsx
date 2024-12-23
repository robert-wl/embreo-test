import GenericTable from "@/components/table/generic-table.tsx";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { EventEntity, EventStatus } from "@/lib/model/entity/event.entity.ts";
import { useMemo, useState } from "react";
import { CalendarIcon, CheckIcon, MapPinIcon } from "lucide-react";
import ViewEventModal from "@/pages/dashboard/_components/view-event-modal.tsx";
import EventBadge from "@/components/event/event-badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { getTableHeader } from "@/components/table/sortable-cell.tsx";

interface TableContent {
  event: EventEntity;
  name: string;
  vendor: string;
  dates: string[];
  location: string;
  status: string;
  createdBy: string;
  createdDate: string;
}

const tableColumns: ColumnDef<TableContent>[] = [
  {
    accessorKey: "name",
    header: getTableHeader("Name"),
    enableSorting: true,
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "vendor",
    header: getTableHeader("Vendor"),
    enableSorting: true,
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue("vendor")}</div>,
  },
  {
    accessorKey: "dates",
    header: getTableHeader("Dates"),
    enableSorting: true,
    cell: ({ row }) => {
      const dates: string[] = row.getValue("dates");

      return (
        <div className="space-y-1">
          {dates.map((date, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-gray-600">
              {dates.length > 1 ? <CalendarIcon className="mr-2 h-4 w-4" /> : <CheckIcon className="mr-2 h-4 w-4" />}
              {date}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: getTableHeader("Location"),
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-600">
        <MapPinIcon className="mr-2 h-4 w-4" />
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: getTableHeader("Status"),
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return <EventBadge status={status} />;
    },
  },
  {
    accessorKey: "createdDate",
    header: getTableHeader("Created Date"),
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue("createdDate")}</div>,
  },
  {
    accessorKey: "createdBy",
    header: getTableHeader("Created By"),
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue("createdBy")}</div>,
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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const tableData = useMemo<TableContent[]>(
    () =>
      data.map((event) => {
        let dates = event.dates.map((date) => new Date(date).toLocaleDateString());
        const vendor = event.approved_vendor?.name ?? "N/A";

        if (event.status === EventStatus.APPROVED) {
          dates = [new Date(event.approved_at ?? "").toLocaleDateString()];
        }
        return {
          event: event,
          name: event.event_type?.name ?? "N/A",
          vendor: vendor,
          dates: dates,
          location: event.location,
          status: event.status,
          createdBy: event.user?.username ?? "N/A",
          createdDate: new Date(event.created_at).toLocaleDateString(),
        };
      }),
    [data],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="pb-4">
        <Input
          placeholder="Filter events"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <GenericTable
        table={table}
        columns={tableColumns}
      />
      <div className="flex-1 flex justify-end space-x-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </>
  );
}
