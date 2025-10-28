import React from 'react';
import { type ProductStats } from '../contexts/AdminContext';
import { StarRating } from './StarRating';

interface ProductAnalyticsProps {
    productStats: ProductStats[];
}

export const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ productStats }) => {
    const topProducts = productStats.slice(0, 5);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>

            <div className="space-y-4">
                {topProducts.map((product, index) => (
                    <div key={product.productId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                            </div>

                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{product.productName}</h4>
                                <div className="flex items-center space-x-4 mt-1">
                                    <StarRating rating={product.rating} size="sm" readonly />
                                    <span className="text-sm text-gray-500">{product.sales} sold</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                            <p className={`text-sm ${product.stock < 10 ? 'text-red-600' : 'text-green-600'
                                }`}>
                                {product.stock} in stock
                            </p>
                        </div>
                    </div>
                ))}
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
        </div>
    );
};