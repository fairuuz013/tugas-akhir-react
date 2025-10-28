import React from 'react';
import { SearchBar } from './SearchBar';
import { type SortOption } from '../hooks/useSearch';

interface ProductFilterProps {
    categories: string[];
    selectedCategory: string;
    sortBy: string;
    onCategoryChange: (category: string) => void;
    onSortChange: (sort: SortOption) => void;
    onSearch: (query: string) => void;
    productCount: number;
    totalProducts: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
    categories,
    selectedCategory,
    sortBy,
    onCategoryChange,
    onSortChange,
    onSearch,
    productCount,
    totalProducts,
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                    <p className="text-sm text-gray-600">
                        Showing {productCount} of {totalProducts} products
                    </p>
                </div>

                <div className="flex-1 max-w-md">
                    <SearchBar onSearch={onSearch} placeholder="Search products by name or description..." />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="name">Name: A to Z</option>
                    </select>
                </div>
            </div>
        </div>
    );
};