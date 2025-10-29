// src/components/DashboardProductCard.tsx
// src/pages/Dashboard.tsx
import React, { useState, useCallback } from 'react';
import { DashboardTabs } from '../components/DashboardTabs';
import { AdminStats } from '../components/AdminStats';
import { OrderManagement } from '../components/OrderManagement';
import { UserManagement } from '../components/UserManagement';
import { ProductAnalytics } from '../components/ProductAnalytics';
import { SalesChart } from '../components/SalesChart';
import { useAdmin } from '../hooks/useAdmin';

export const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const {
        orders,
        users,
        salesData,
        productStats,
        updateOrderStatus,
        updateUserRole,
        dashboardStats,
        recentOrders,
    } = useAdmin();

    const handleTabChange = useCallback((tab: string) => {
        setActiveTab(tab);
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600 mb-8">Welcome back, Admin. Here's what's happening.</p>

            <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="mt-6">
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <AdminStats stats={dashboardStats} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <SalesChart salesData={salesData} />
                            <ProductAnalytics productStats={productStats} />
                        </div>
                        <OrderManagement orders={recentOrders} onUpdateOrderStatus={updateOrderStatus} />
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
                        {/* Komponen untuk manajemen produk akan ditempatkan di sini */}
                        <p>Product management UI will be here.</p>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <OrderManagement orders={orders} onUpdateOrderStatus={updateOrderStatus} />
                )}

                {activeTab === 'users' && (
                    <UserManagement users={users} onUpdateUserRole={updateUserRole} />
                )}
            </div>
        </div>
    );
};