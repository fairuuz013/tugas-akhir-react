import React from 'react';
import { useProductContext } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { Loading } from '../components/Loading';
import { ProductFilter } from '../components/ProductFilter';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { useSearch, type SortOption } from '../hooks/useSearch'; // Import SortOption

export const Products: React.FC = () => {
    const { products, localProducts, loading, error } = useProductContext();

    const allProducts = [...products, ...localProducts];

    const {
        filters,
        sortBy,
        filteredProducts,
        categories,
        priceRange,
        updateFilters,
        setSortBy,
        debouncedSearch,
        clearFilters,
    } = useSearch(allProducts);

    // Fix: Handle sort change dengan type yang benar
    const handleSortChange = (sort: SortOption) => {
        setSortBy(sort);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
                    <p className="text-gray-600">Discover amazing products at great prices</p>
                </div>

                {/* Advanced Filters */}
                <AdvancedFilters
                    filters={filters}
                    categories={categories}
                    priceRange={priceRange}
                    onFiltersChange={updateFilters}
                    onClearFilters={clearFilters}
                />

                {/* Product Filter & Search */}
                <ProductFilter
                    categories={categories}
                    selectedCategory={filters.category}
                    sortBy={sortBy}
                    onCategoryChange={(category) => updateFilters({ category })}
                    onSortChange={handleSortChange}
                    onSearch={debouncedSearch}
                    productCount={filteredProducts.length}
                    totalProducts={allProducts.length}
                />

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                            <p className="mt-2 text-gray-600">
                                Try adjusting your search or filter criteria.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Clear all filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};