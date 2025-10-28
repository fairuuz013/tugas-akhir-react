import React from 'react';
import { type SalesData } from '../contexts/AdminContext';

interface SalesChartProps {
    salesData: SalesData[];
}

export const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
    const maxRevenue = Math.max(...salesData.map(day => day.revenue));
    const maxOrders = Math.max(...salesData.map(day => day.orders));

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Overview</h3>

            <div className="space-y-4">
                {salesData.map((day, index) => {
                    const revenuePercentage = (day.revenue / maxRevenue) * 100;
                    const ordersPercentage = (day.orders / maxOrders) * 100;

                    return (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="w-20 text-sm text-gray-600">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>

                            <div className="flex-1 space-y-2">
                                {/* Revenue Bar */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500 w-16">Revenue</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-blue-500 h-3 rounded-full"
                                            style={{ width: `${revenuePercentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 w-16 text-right">
                                        ${day.revenue}
                                    </span>
                                </div>

                                {/* Orders Bar */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500 w-16">Orders</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-green-500 h-3 rounded-full"
                                            style={{ width: `${ordersPercentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 w-16 text-right">
                                        {day.orders} orders
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600">Orders</span>
                </div>
            </div>
        </div>
    );
};