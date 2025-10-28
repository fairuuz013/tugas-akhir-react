import React from 'react';
import { type SearchFilters } from '../hooks/useSearch';

interface AdvancedFiltersProps {
    filters: SearchFilters;
    categories: string[];
    priceRange: { min: number; max: number };
    onFiltersChange: (filters: Partial<SearchFilters>) => void;
    onClearFilters: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
    filters,
    categories,
    priceRange,
    onFiltersChange,
    onClearFilters,
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const hasActiveFilters =
        filters.category !== 'all' ||
        filters.minPrice > priceRange.min ||
        filters.maxPrice < priceRange.max ||
        filters.minRating > 0 ||
        filters.inStock;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>

                <div className="flex items-center space-x-4">
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            Clear all
                        </button>
                    )}

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm text-gray-600 hover:text-gray-500 flex items-center"
                    >
                        {isExpanded ? 'Show less' : 'Show more'}
                        <svg
                            className={`ml-1 h-4 w-4 transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Basic Filters - Always Visible */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => onFiltersChange({ category: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Rating
                    </label>
                    <select
                        value={filters.minRating}
                        onChange={(e) => onFiltersChange({ minRating: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value={0}>Any rating</option>
                        <option value={4}>4+ stars</option>
                        <option value={3}>3+ stars</option>
                        <option value={2}>2+ stars</option>
                        <option value={1}>1+ stars</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="inStock"
                        checked={filters.inStock}
                        onChange={(e) => onFiltersChange({ inStock: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                        In stock only
                    </label>
                </div>
            </div>

            {/* Advanced Filters - Expandable */}
            {isExpanded && (
                <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                        Price Range: ${filters.minPrice} - ${filters.maxPrice}
                    </label>

                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">Min Price</label>
                                <input
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => onFiltersChange({ minPrice: Number(e.target.value) })}
                                    min={priceRange.min}
                                    max={filters.maxPrice}
                                    className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">Max Price</label>
                                <input
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => onFiltersChange({ maxPrice: Number(e.target.value) })}
                                    min={filters.minPrice}
                                    max={priceRange.max}
                                    className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                type="range"
                                min={priceRange.min}
                                max={priceRange.max}
                                value={filters.minPrice}
                                onChange={(e) => onFiltersChange({ minPrice: Number(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <input
                                type="range"
                                min={priceRange.min}
                                max={priceRange.max}
                                value={filters.maxPrice}
                                onChange={(e) => onFiltersChange({ maxPrice: Number(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Active Filters Badges */}
            {hasActiveFilters && (
                <div className="border-t pt-4 mt-4">
                    <div className="flex flex-wrap gap-2">
                        {filters.category !== 'all' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Category: {filters.category}
                                <button
                                    onClick={() => onFiltersChange({ category: 'all' })}
                                    className="ml-1 hover:bg-blue-200 rounded-full"
                                >
                                    ×
                                </button>
                            </span>
                        )}

                        {(filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Price: ${filters.minPrice}-${filters.maxPrice}
                                <button
                                    onClick={() => onFiltersChange({
                                        minPrice: priceRange.min,
                                        maxPrice: priceRange.max
                                    })}
                                    className="ml-1 hover:bg-green-200 rounded-full"
                                >
                                    ×
                                </button>
                            </span>
                        )}

                        {filters.minRating > 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Rating: {filters.minRating}+ stars
                                <button
                                    onClick={() => onFiltersChange({ minRating: 0 })}
                                    className="ml-1 hover:bg-yellow-200 rounded-full"
                                >
                                    ×
                                </button>
                            </span>
                        )}

                        {filters.inStock && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                In Stock
                                <button
                                    onClick={() => onFiltersChange({ inStock: false })}
                                    className="ml-1 hover:bg-purple-200 rounded-full"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};