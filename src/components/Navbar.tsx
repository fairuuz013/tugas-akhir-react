import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

export const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuthContext();
    const { toggleCart, totalItems } = useCart();
    const { wishlistCount } = useWishlist();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-lg border-b">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-blue-600">E-Store</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/products"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/products'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            Products
                        </Link>

                        {/* Wishlist Link */}
                        <Link
                            to="/wishlist"
                            className={`relative px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/wishlist'
                                    ? 'text-red-600 bg-red-50'
                                    : 'text-gray-700 hover:text-red-600'
                                }`}
                        >
                            Wishlist
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart Button */}
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/dashboard'
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-700">Hello, {user?.username}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};