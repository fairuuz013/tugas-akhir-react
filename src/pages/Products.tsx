import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import { EnhancedProductCard as ProductCard } from '../components/EnhancedProductCard';
import { PageLoader as Loading } from '../components/EnhancedLoading';
import { useSearch, type SortOption } from '../hooks/useSearch';
import { Pagination } from '../components/Pagination';

export const Products: React.FC = () => {
    const { products, localProducts, loading, error } = useProductContext();
    const [searchParams,] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const allProducts = [...products, ...localProducts];

    // Get URL parameters
    const searchQuery = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || 'all';
    const sortParam = (searchParams.get('sort') as SortOption) || 'price-asc';

    const {
        filteredProducts,
        updateFilters,
        setSortBy,
    } = useSearch(allProducts);

    // Sync URL parameters dengan state - FIX: Gunakan useEffect
    useEffect(() => {
        updateFilters({
            query: searchQuery,
            category: categoryParam
        });
        setSortBy(sortParam);
        setCurrentPage(1); // Reset ke page 1 ketika filter berubah
    }, [searchQuery, categoryParam, sortParam, updateFilters, setSortBy]);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {searchQuery ? `Hasil pencarian "${searchQuery}"` : 'Semua Produk'}
                    </h1>
                    <p className="text-gray-600">
                        {filteredProducts.length} produk ditemukan
                    </p>
                </div>

                {/* Results Info */}
                {filteredProducts.length > 0 && (
                    <div className="mb-6 flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Menampilkan {Math.min(currentProducts.length, productsPerPage)} dari {filteredProducts.length} produk
                        </p>
                        {totalPages > 1 && (
                            <p className="text-sm text-gray-600">
                                Halaman {currentPage} dari {totalPages}
                            </p>
                        )}
                    </div>
                )}

                {/* Product Grid */}
                {currentProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {currentProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md mx-auto">
                            <svg
                                className="mx-auto h-12 w-12 text-black-400 mb"
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
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Produk tidak ditemukan</h3>
                            <p className="mt-2 text-gray-600">
                                {searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : 'Coba ubah filter pencarian.'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};