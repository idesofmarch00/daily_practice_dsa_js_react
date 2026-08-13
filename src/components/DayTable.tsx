import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import type { DayEntry } from "../types";

type DayTableProps = {
  days: DayEntry[];
};

const columns: ColumnDef<DayEntry>[] = [
  {
    header: "Day",
    accessorKey: "title",
    cell: ({ row }) => (
      <Link className="table-link" to="/day/$dayId" params={{ dayId: row.original.slug }}>
        {row.original.title}
      </Link>
    ),
  },
  {
    header: "Focus",
    accessorKey: "summary",
  },
  {
    header: "Routes",
    cell: ({ row }) => (
      <div className="route-links">
        <Link to="/day/$dayId/$problemType" params={{ dayId: row.original.slug, problemType: "dsa" }}>
          DSA
        </Link>
        <Link to="/day/$dayId/$problemType" params={{ dayId: row.original.slug, problemType: "js" }}>
          JS
        </Link>
        <Link to="/day/$dayId/$problemType" params={{ dayId: row.original.slug, problemType: "react" }}>
          React
        </Link>
        {row.original.problems.interview && (
          <Link to="/day/$dayId/$problemType" params={{ dayId: row.original.slug, problemType: "interview" }}>
            Interview
          </Link>
        )}
      </div>
    ),
  },
];

export function DayTable({ days }: DayTableProps) {
  const table = useReactTable({
    data: days,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-wrap">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
