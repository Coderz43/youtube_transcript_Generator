import React from 'react';
import { BarChart3, Users, CreditCard, ArrowUpRight, ArrowDownRight, Globe2 } from 'lucide-react';

const stats = [
  {
    name: 'Total Transcripts',
    value: '49/50',
    label: 'Daily Limit',
    change: '+12.3%',
    trend: 'up',
    icon: BarChart3,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Active Users',
    value: '34,245',
    label: 'Last 24 Hours',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Total Revenue',
    value: '$75',
    label: 'Today',
    change: '+23.1%',
    trend: 'up',
    icon: CreditCard,
    color: 'bg-red-100 text-red-600',
  },
];

const topCountries = [
  { country: 'United States', users: 2700, percentage: 33.27 },
  { country: 'Germany', users: 1300, percentage: 21.43 },
  { country: 'Australia', users: 750, percentage: 10.55 },
  { country: 'United Kingdom', users: 690, percentage: 7.87 },
  { country: 'Romania', users: 600, percentage: 5.94 },
  { country: 'Brazil', users: 550, percentage: 4.34 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-gray-500" />
              Global Usage by Location
            </h3>
          </div>
          <div className="space-y-4">
            {topCountries.map((item) => (
              <div key={item.country} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {item.country}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">
                    {item.users.toLocaleString()}
                  </span>
                  <div className="w-24 h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-16">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    New user registered
                  </p>
                  <p className="text-xs text-gray-500">
                    2 minutes ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}