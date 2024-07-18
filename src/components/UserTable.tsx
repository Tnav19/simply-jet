import React, { useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const UserTable = ({ handleEdit }: { handleEdit: (user: any) => void }) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'first_name',
        header: 'First Name',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'alternate_email',
        header: 'Alternate Email',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [handleEdit]
  );

  const table = useReactTable({
    columns,
    data: [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
