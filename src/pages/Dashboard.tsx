import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useProductContext } from '../contexts/ProductContext';
import { useAdmin } from '../hooks/useAdmin';
import { AdminStats } from '../components/AdminStats';
import { SalesChart } from '../components/SalesChart';
import { ProductAnalytics } from '../components/ProductAnalytics';
import { UserManagement } from '../components/UserManagement';
import { OrderManagement } from '../components/OrderManagement';
import { DashboardTabs } from '../components/DashboardTabs';
import { ProductForm } from '../components/ProductForm';
import { ProductCard } from '../components/ProductCard';

export const Dashboard: React.FC = () => {
    const { isAuthenticated, user } = useAuthContext();
    const { localProducts, addProduct, updateProduct, deleteProduct } = useProductContext();
    const {
        orders,
        users,
        salesData,
        productStats,
        dashboardStats,
        recentOrders,
        topProducts,
        updateOrderStatus,
        updateUserRole,
    } = useAdmin();

    const [activeTab, setActiveTab] = useState('overview');
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
                    <p className="text-gray-600">Please login to access the dashboard.</p>
                </div>
            </div>
        );
    }

    const handleAddProduct = (productData: any) => {
        addProduct(productData);
        setIsProductModalOpen(false);
    };

    const handleEditProduct = (productData: any) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
            setEditingProduct(null);
            setIsProductModalOpen(false);
        }
    };

    const handleEditClick = (product: any) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsProductModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">
                            Welcome back, {user?.username}! Here's what's happening with your store today.
                        </p>
                    </div>

                    <div className="mt-4 lg:mt-0 flex space-x-3">
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setIsProductModalOpen(true);
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Add New Product
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <AdminStats stats={dashboardStats} />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SalesChart salesData={salesData} />
                            <ProductAnalytics productStats={topProducts} />
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Order #{order.id}</p>
                                            <p className="text-sm text-gray-600">{order.userName} • ${order.total}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
                                <p className="text-gray-600">{localProducts.length} products</p>
                            </div>

                            {localProducts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {localProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onEdit={handleEditClick}
                                            onDelete={deleteProduct}
                                            showActions
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No products yet. Add your first product!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <OrderManagement orders={orders} onUpdateOrderStatus={updateOrderStatus} />
                )}

                {activeTab === 'users' && (
                    <UserManagement users={users} onUpdateUserRole={updateUserRole} />
                )}

                {/* Product Modal */}
                {isProductModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                                onClick={handleCloseModal}
                            ></div>

                            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h3>
                                </div>

                                <ProductForm
                                    product={editingProduct || undefined}
                                    onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                                    onCancel={handleCloseModal}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};