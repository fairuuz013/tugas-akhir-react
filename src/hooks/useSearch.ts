import { useState, useMemo, useCallback } from 'react';
import { type Product } from '../contexts/ProductContext';

// ✅ Tambahin ini biar error SortOption ilang
export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name';

export interface SearchFilters {
    query: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    inStock: boolean;
}

export const useSearch = (products: Product[]) => {
    const [filters, setFilters] = useState<SearchFilters>({
        query: '',
        category: 'all',
        minPrice: 0,
        maxPrice: 1000,
        minRating: 0,
        inStock: false,
    });

    const [sortBy, setSortBy] = useState<SortOption>('price-asc');

    // Debounced search
    const debouncedSearch = useCallback((value: string) => {
        setFilters(prev => ({ ...prev, query: value }));
    }, []);

    const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            query: '',
            category: 'all',
            minPrice: 0,
            maxPrice: 1000,
            minRating: 0,
            inStock: false,
        });
    }, []);

    // Filter & Sort logic
    const filteredProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch =
                filters.query === '' ||
                product.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                product.description.toLowerCase().includes(filters.query.toLowerCase());

            const matchesCategory =
                filters.category === 'all' || product.category === filters.category;

            const matchesPrice =
                product.price >= filters.minPrice &&
                product.price <= filters.maxPrice;

            const matchesRating = product.rating.rate >= filters.minRating;
            const matchesStock = !filters.inStock || product.rating.count > 10;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice &&
                matchesRating &&
                matchesStock
            );
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rating':
                    return b.rating.rate - a.rating.rate;
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [products, filters, sortBy]);

    // Available categories
    const categories = useMemo(() => {
        const allCategories = products.map(product => product.category);
        return ['all', ...Array.from(new Set(allCategories))];
    }, [products]);

    // Price range for slider
    const priceRange = useMemo(() => {
        if (products.length === 0) return { min: 0, max: 1000 };

        const prices = products.map(product => product.price);
        return {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices)),
        };
    }, [products]);

    return {
        filters,
        sortBy,
        filteredProducts,
        categories,
        priceRange,
        updateFilters,
        setSortBy,
        debouncedSearch,
        clearFilters,
    };
};
