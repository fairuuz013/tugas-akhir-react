import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    changeType: 'positive' | 'negative';
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    <div className={`flex items-center mt-2 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        <svg
                            className={`w-4 h-4 ${changeType === 'positive' ? '' : 'rotate-180'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-sm font-medium ml-1">
                            {change > 0 ? '+' : ''}{change}%
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
};

interface AdminStatsProps {
    stats: {
        totalRevenue: number;
        totalOrders: number;
        totalUsers: number;
        totalProducts: number;
        revenueGrowth: number;
        orderGrowth: number;
    };
}

export const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
    const statCards = [
        {
            title: 'Total Revenue',
            value: `$${stats.totalRevenue.toLocaleString()}`,
            change: stats.revenueGrowth,
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders.toLocaleString(),
            change: stats.orderGrowth,
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
        },
        {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            change: 5.2,
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            ),
        },
        {
            title: 'Total Products',
            value: stats.totalProducts.toLocaleString(),
            change: 2.1,
            changeType: 'positive' as const,
            icon: (
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};