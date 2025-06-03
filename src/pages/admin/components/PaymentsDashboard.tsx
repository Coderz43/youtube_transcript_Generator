import React from 'react';
import { BarChart3, DollarSign, CreditCard, Users, ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/Badge';
import { useNavigate } from 'react-router-dom';

const transactions = [
  {
    id: 1,
    user: 'John Doe',
    email: 'john@example.com',
    amount: 49.99,
    status: 'completed',
    date: '2024-02-28',
    plan: 'Pro Monthly',
  },
  {
    id: 2,
    user: 'Jane Smith',
    email: 'jane@example.com',
    amount: 99.99,
    status: 'completed',
    date: '2024-02-27',
    plan: 'Pro Yearly',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    email: 'mike@example.com',
    amount: 49.99,
    status: 'pending',
    date: '2024-02-26',
    plan: 'Pro Monthly',
  },
];

const stats = [
  {
    name: 'Monthly Revenue',
    value: '$4,890',
    change: '+12.3%',
    icon: DollarSign,
  },
  {
    name: 'Paid Subscribers',
    value: '873',
    change: '+8.2%',
    icon: Users,
  },
  {
    name: 'Avg. Transaction',
    value: '$49.99',
    change: '+2.1%',
    icon: CreditCard,
  },
];

export default function PaymentsDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payments</h2>
        <button 
          onClick={() => navigate('/admin/connect-stripe')}
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Connect Stripe
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-2 text-blue-600 dark:text-blue-400">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                {stat.change}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <div className="mt-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    User
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Plan
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Amount
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap px-3 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.user}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.email}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.plan}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                      ${transaction.amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <Badge
                        variant={transaction.status === 'completed' ? 'success' : 'secondary'}
                      >
                        {transaction.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}