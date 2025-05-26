import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  FilterFn,
  flexRender,
} from '@tanstack/react-table';
import { Search, Filter, ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';

interface TableData {
  id: string;
  progress: string;
  release: string;
  milestone: string;
  milestoneDate: string;
  design: number;
  mapping: number;
  build: number;
  target: number;
  status: 'success' | 'warning' | 'danger';
}

interface DataTableProps {
  data: TableData[];
}

const DataTable = ({ data }: DataTableProps) => {
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

  const columns = useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        accessorKey: 'progress',
        header: 'Progress',
        cell: ({ row }) => (
          <div className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${row.original.progress === 'Current' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'}
          `}>
            {row.original.progress}
          </div>
        ),
      },
      {
        accessorKey: 'release',
        header: 'Release',
      },
      {
        accessorKey: 'milestone',
        header: 'Milestone',
      },
      {
        accessorKey: 'milestoneDate',
        header: 'Milestone Date',
      },
      {
        accessorKey: 'design',
        header: 'Design',
        cell: ({ row }) => (
          <div className={`text-sm font-medium ${
            row.original.status === 'success' ? 'text-green-500' :
            row.original.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {row.original.design}
            {row.original.status === 'warning' && <span className="ml-1">▲</span>}
            {row.original.status === 'danger' && <span className="ml-1">▼</span>}
          </div>
        ),
      },
      {
        accessorKey: 'mapping',
        header: 'Mapping',
        cell: ({ row }) => (
          <div className={`text-sm font-medium ${
            row.original.status === 'success' ? 'text-green-500' :
            row.original.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {row.original.mapping}
            {row.original.status === 'warning' && <span className="ml-1">▲</span>}
            {row.original.status === 'danger' && <span className="ml-1">▼</span>}
          </div>
        ),
      },
      {
        accessorKey: 'build',
        header: 'Build',
        cell: ({ row }) => (
          <div className={`text-sm font-medium ${
            row.original.status === 'success' ? 'text-green-500' :
            row.original.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {row.original.build}
            {row.original.status === 'warning' && <span className="ml-1">▲</span>}
            {row.original.status === 'danger' && <span className="ml-1">▼</span>}
          </div>
        ),
      },
      {
        accessorKey: 'target',
        header: 'Target',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters: Object.entries(columnFilters).map(([id, value]) => ({
        id,
        value,
      })),
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-navy-700">
            <tr>
              {table.getAllColumns().map(column => (
                <th
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span>{column.columnDef.header as string}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            column.toggleSorting(column.getIsSorted() === 'asc');
                          }}
                          className="ml-2"
                        >
                          {column.getIsSorted() === 'asc' ? (
                            <ArrowUp size={14} />
                          ) : column.getIsSorted() === 'desc' ? (
                            <ArrowDown size={14} />
                          ) : (
                            <ChevronDown size={14} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={columnFilters[column.id] || ''}
                      onChange={e => {
                        setColumnFilters(prev => ({
                          ...prev,
                          [column.id]: e.target.value,
                        }));
                      }}
                      placeholder="Filter..."
                      className="mt-2 px-2 py-1 text-xs bg-navy-800 border border-gray-700 rounded"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-navy-800 divide-y divide-gray-800">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-navy-700">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;