"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/table-core";
import { useMemo } from "react";
import type { User } from "@supabase/auth-js";
import { ArrowUpDown, MoreHorizontal, SquareDashedKanban } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsersStore } from "@/app/(private)/usuarios/_store/provider";
import { Badge } from "@/components/ui/badge";
import { useWhatChanged } from "@simbathesailor/use-what-changed";
import { useShallow } from "zustand/react/shallow";

export default function UsersTable({ users }: { users: User[] }) {
  const {
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  } = useUsersStore(
    useShallow((state) => ({
      setSorting: state.setSorting,
      setColumnFilters: state.setColumnFilters,
      setColumnVisibility: state.setColumnVisibility,
      setRowSelection: state.setRowSelection,
      sorting: state.sorting,
      columnFilters: state.columnFilters,
      columnVisibility: state.columnVisibility,
      rowSelection: state.rowSelection,
    })),
  );

  useWhatChanged([
    users,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  ]);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "role",
        header: "Perfil",
      },
      {
        accessorKey: "confirmed_at",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="outline">{row.getValue("confirmed_at")}</Badge>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => {
          const user = row.original;

          console.log(user);

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      const newSortingValue =
        updater instanceof Function ? updater(sorting) : updater;
      setSorting(newSortingValue);
    },
    onColumnFiltersChange: (updater) => {
      const newColumnFiltersValue =
        updater instanceof Function ? updater(columnFilters) : updater;
      setColumnFilters(newColumnFiltersValue);
    },
    onColumnVisibilityChange: (updater) => {
      const newColumnVisibilityValue =
        updater instanceof Function ? updater(columnVisibility) : updater;
      setColumnVisibility(newColumnVisibilityValue);
    },
    onRowSelectionChange: (updater) => {
      const newRowSelectionValue =
        updater instanceof Function ? updater(rowSelection) : updater;
      setRowSelection(newRowSelectionValue);
    },
  });

  const rows = useMemo(() => table.getRowModel().rows, [table]);

  return (
    <Table className="whitespace-nowrap">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          );
        })}
      </TableHeader>
      <TableBody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableHead key={cell.id} className="py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              className="pt-40 pb-40 text-muted-foreground"
              colSpan={table.getVisibleLeafColumns().length}
            >
              <div className="flex flex-col justify-center gap-4 w-full items-center">
                <SquareDashedKanban size={80} className="text-gray-300" />
                Nenhum usuário encontrado
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
