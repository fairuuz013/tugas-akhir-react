import React, { useState } from 'react';
import { type Order } from '../contexts/AdminContext';

interface OrderManagementProps {
    orders: Order[];
    onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ orders, onUpdateOrderStatus }) => {
    const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

    const filteredOrders = statusFilter === 'all'
        ? orders
        : orders.filter(order => order.status === statusFilter);

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        onUpdateOrderStatus(orderId, newStatus);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Order Management</h3>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
                    className="mt-4 lg:mt-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div>
                                <div className="flex items-center space-x-4 mb-2">
                                    <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Customer: <span className="font-medium">{order.userName}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Date: {new Date(order.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Shipping: {order.shippingAddress}
                                </p>
                            </div>

                            <div className="mt-2 lg:mt-0 text-right">
                                <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                <p className="text-sm text-gray-600">{order.items.length} items</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                            <div className="space-y-1">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm text-gray-600">
                                        <span>{item.productName} (x{item.quantity})</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Actions */}
                        <div className="flex flex-wrap gap-2">
                            {order.status !== 'pending' && (
                                <button
                                    onClick={() => handleStatusChange(order.id, 'pending')}
                                    className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
                                >
                                    Mark Pending
                                </button>
                            )}
                            {order.status !== 'processing' && (
                                <button
                                    onClick={() => handleStatusChange(order.id, 'processing')}
                                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                                >
                                    Mark Processing
                                </button>
                            )}
                            {order.status !== 'shipped' && (
                                <button
                                    onClick={() => handleStatusChange(order.id, 'shipped')}
                                    className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200"
                                >
                                    Mark Shipped
                                </button>
                            )}
                            {order.status !== 'delivered' && (
                                <button
                                    onClick={() => handleStatusChange(order.id, 'delivered')}
                                    className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                                >
                                    Mark Delivered
                                </button>
                            )}
                            {order.status !== 'cancelled' && (
                                <button
                                    onClick={() => handleStatusChange(order.id, 'cancelled')}
                                    className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                                >
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No orders found with the selected status.
                </div>
            )}
        </div>
    );
};