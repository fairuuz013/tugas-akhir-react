import React from 'react';
import { EnhancedSearchBar as SearchBar } from './EnhancedSearchBar';
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
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Filter Produk</h2>
                    <p className="text-sm text-gray-600">
                        Ditemukan {productCount} dari {totalProducts} produk
                    </p>
                </div>

                <div className="flex-1 max-w-md">
                    <SearchBar onSearch={onSearch} placeholder="Cari produk..." />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Kategori
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'Semua Kategori' : category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                        Urutkan
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    >
                        <option value="price-asc">Harga: Rendah ke Tinggi</option>
                        <option value="price-desc">Harga: Tinggi ke Rendah</option>
                        <option value="rating">Rating Tertinggi</option>
                        <option value="name">Nama: A ke Z</option>
                    </select>
                </div>
            </div>
        </div>
    );
};