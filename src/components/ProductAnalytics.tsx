import React from 'react';
import { type ProductStats } from '../contexts/AdminContext';
import { StarRating } from './StarRating';

interface ProductAnalyticsProps {
    productStats: ProductStats[];
}

export const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ productStats }) => {
    const topProducts = productStats.slice(0, 5);

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600' };
        if (stock < 10) return { text: 'Low Stock', color: 'text-orange-600' };
        return { text: 'In Stock', color: 'text-green-600' };
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>

            <div className="space-y-4">
                {topProducts.map((product, index) => {
                    const stockStatus = getStockStatus(product.stock);

                    return (
                        <div key={product.productId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-4 flex-1">
                                {/* Rank Badge */}
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                                    index === 1 ? 'bg-gray-100 text-gray-800' :
                                        index === 2 ? 'bg-orange-100 text-orange-800' :
                                            'bg-blue-100 text-blue-800'
                                    }`}>
                                    <span className="font-bold text-sm">#{index + 1}</span>
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 truncate">{product.productName}</h4>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <StarRating rating={product.rating} size="sm" readonly />
                                        <span className="text-sm text-gray-500">{product.sales} sold</span>
                                    </div>
                                </div>
                            </div>

                            {/* Revenue & Stock */}
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                                <p className={`text-sm ${stockStatus.color}`}>
                                    {stockStatus.text} ({product.stock})
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                        ${productStats.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {productStats.reduce((sum, p) => sum + p.sales, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Sales</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        {productStats.length}
                    </p>
                    <p className="text-sm text-gray-600">Active Products</p>
                </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">
                        {Math.max(...productStats.map(p => p.rating)).toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600">Highest Rating</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">
                        {productStats.filter(p => p.stock < 10).length}
                    </p>
                    <p className="text-sm text-gray-600">Low Stock Items</p>
                </div>
            </div>
        </div>
    );
};