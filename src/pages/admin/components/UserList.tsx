import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from './ui/Badge';
import { Switch } from './ui/Switch';
import { Users, Search, Filter, Gift } from 'lucide-react';

type User = {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  status: 'active' | 'inactive';
  credits: number;
  joinedAt: Date;
  hasFreeAccess: boolean;
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    cell: (info) => (
      <Badge variant={info.getValue() === 'pro' ? 'default' : 'secondary'}>
        {info.getValue().toUpperCase()}
      </Badge>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Badge variant={info.getValue() === 'active' ? 'success' : 'destructive'}>
        {info.getValue().toUpperCase()}
      </Badge>
    ),
  }),
  columnHelper.accessor('credits', {
    header: 'Credits',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('hasFreeAccess', {
    header: 'Free Access',
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Switch
          checked={info.getValue()}
          onCheckedChange={() => handleFreeAccessToggle(info.row.original.id)}
          size="sm"
        />
        {info.getValue() && (
          <Gift className="h-4 w-4 text-green-500" />
        )}
      </div>
    ),
  }),
  columnHelper.accessor('joinedAt', {
    header: 'Joined',
    cell: (info) => format(info.getValue(), 'MMM d, yyyy'),
  }),
];

const data: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    plan: 'pro',
    status: 'active',
    credits: 100,
    joinedAt: new Date('2024-01-15'),
    hasFreeAccess: true,
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    plan: 'free',
    status: 'active',
    credits: 25,
    joinedAt: new Date('2024-02-01'),
    hasFreeAccess: false,
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    plan: 'free',
    status: 'inactive',
    credits: 0,
    joinedAt: new Date('2024-02-15'),
    hasFreeAccess: false,
  },
  {
    id: '4',
    email: 'sarah@example.com',
    name: 'Sarah Wilson',
    plan: 'pro',
    status: 'active',
    credits: 75,
    joinedAt: new Date('2024-02-20'),
    hasFreeAccess: true,
  },
  {
    id: '5',
    email: 'alex@example.com',
    name: 'Alex Brown',
    plan: 'free',
    status: 'active',
    credits: 15,
    joinedAt: new Date('2024-02-25'),
    hasFreeAccess: false,
  },
];

const handleFreeAccessToggle = (userId: string) => {
  console.log('Toggling free access for user:', userId);
  // Here you would implement the API call to update the user's free access status
  // Example:
  // await fetch(`/api/users/${userId}/free-access`, {
  //   method: 'PATCH',
  //   body: JSON.stringify({ hasFreeAccess: !currentStatus }),
  // });
};

export default function UserList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFreeAccessOnly, setShowFreeAccessOnly] = useState(false);

  const filteredData = data.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFreeAccess = showFreeAccessOnly ? user.hasFreeAccess : true;
    return matchesSearch && matchesFreeAccess;
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Users</h2>
          <Badge variant="secondary">{filteredData.length}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => setShowFreeAccessOnly(!showFreeAccessOnly)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
              showFreeAccessOnly 
                ? 'border-green-500 bg-green-50 text-green-700' 
                : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Gift className="h-4 w-4" />
            <span className="text-sm">Free Access</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400"
                    >
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
                <tr
                  key={row.id}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}