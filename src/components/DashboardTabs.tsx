import React from 'react';

interface DashboardTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'overview', name: 'Overview', icon: '📊' },
        { id: 'products', name: 'Products', icon: '📦' },
        { id: 'orders', name: 'Orders', icon: '🛒' },
        { id: 'users', name: 'Users', icon: '👥' },
    ];

    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.name}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};