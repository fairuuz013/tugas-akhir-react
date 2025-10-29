import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { type SortOption } from '../hooks/useSearch';

export const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const { toggleCart, totalItems } = useCart();
    const { wishlistCount } = useWishlist();
    const location = useLocation();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState<SortOption>('price-asc');
    const [showFilters, setShowFilters] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim());
        }
        if (selectedCategory !== 'all') {
            params.set('category', selectedCategory);
        }
        if (sortBy !== 'price-asc') {
            params.set('sort', sortBy);
        }

        navigate(`/products?${params.toString()}`);
    };

    const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim());
        }
        if (category !== 'all') {
            params.set('category', category);
        }
        if (sortBy !== 'price-asc') {
            params.set('sort', sortBy);
        }

        navigate(`/products?${params.toString()}`);
    };

    const handleSortChange = (sort: SortOption) => {
        setSortBy(sort);
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim());
        }
        if (selectedCategory !== 'all') {
            params.set('category', selectedCategory);
        }
        if (sort !== 'price-asc') {
            params.set('sort', sort);
        }

        navigate(`/products?${params.toString()}`);
    };

    const clearSearch = () => {
        setSearchQuery('');
        const params = new URLSearchParams();

        if (selectedCategory !== 'all') {
            params.set('category', selectedCategory);
        }
        if (sortBy !== 'price-asc') {
            params.set('sort', sortBy);
        }

        navigate(`/products?${params.toString()}`);
    };

    const displayName = user?.username || user?.name || 'User';

    return (
        <header className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">ruuz shopp</h1>
                            <p className="text-xs text-gray-500">Online Shopping</p>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 shadow-sm"
                                placeholder="Cari produk di ruuz shopp..."
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="px-2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="px-3 text-gray-500 hover:text-gray-700 border-l border-gray-300 h-full flex items-center"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                    </svg>
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gray-800 text-white px-4 py-3 rounded-r-lg hover:bg-gray-700 transition-colors font-medium"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className={`relative p-2 rounded-lg ${location.pathname === '/wishlist' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                } transition-colors`}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-gray-600 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Checkout Button - TAMBAH INI */}
                        {isAuthenticated && totalItems > 0 && (
                            <button
                                onClick={() => navigate('/checkout')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Checkout ({totalItems})
                            </button>
                        )}

                        {/* Auth */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                {isAdmin && (
                                    <Link
                                        to="/dashboard"
                                        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-medium text-sm">
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-700">{displayName}</span>
                                        <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-500 hover:text-gray-700 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Filter Dropdown */}
                {showFilters && (
                    <div className="border-t border-gray-200 py-4 bg-white">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori
                                </label>
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
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
                                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                >
                                    <option value="price-asc">Harga: Rendah ke Tinggi</option>
                                    <option value="price-desc">Harga: Tinggi ke Rendah</option>
                                    <option value="rating">Rating Tertinggi</option>
                                    <option value="name">Nama: A ke Z</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                >
                                    Tutup Filter
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Horizontal Scroll */}
                <div className="flex items-center space-x-6 py-3 border-t border-gray-200 overflow-x-auto">
                    {categories.filter(cat => cat !== 'all').map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`text-sm whitespace-nowrap pb-1 border-b-2 transition-colors ${selectedCategory === category
                                ? 'text-gray-900 border-gray-800 font-medium'
                                : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};