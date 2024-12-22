import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import { ComponentPropsWithoutRef } from "react";

interface Props<T> extends ComponentPropsWithoutRef<"div"> {
  isLoading?: boolean;
  table: Table<T>;
  columns: ColumnDef<T>[];
}

export default function GenericTable<T>({ isLoading, table, columns, ...props }: Readonly<Props<T>>) {
  return (
    <div
      className="z-10 border-gray-200 border rounded-md"
      {...props}>
      <TableComponent>
        <TableHeader className="sticky top-0 bg-gray-200 opacity-100 z-[100]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableComponent>
    </div>
  );
}
