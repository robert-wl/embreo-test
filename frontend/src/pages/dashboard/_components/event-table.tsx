import GenericTable from "@/components/table/generic-table.tsx";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface TableContent {
  name: string;
  vendor: string;
  dates: string[];
  status: string;
  createdDate: string;
}

const tableColumns: ColumnDef<TableContent>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => <div>{row.getValue("vendor")}</div>,
  },
  {
    accessorKey: "dates",
    header: "Dates",
    cell: ({ row }) => <div>{row.getValue("dates")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ row }) => <div>{row.getValue("createdDate")}</div>,
  },
];

export default function EventTable() {
  const tableData: any = [];

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
