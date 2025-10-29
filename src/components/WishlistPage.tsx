import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../contexts/ProductContext';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { EnhancedProductCard as ProductCard } from './EnhancedProductCard';

export const WishlistPage: React.FC = () => {
    const { wishlistItems, clearWishlist, removeFromWishlist } = useWishlist();
    const { addToCart, openCart } = useCart();

    const handleAddAllToCart = () => {
        wishlistItems.forEach(product => {
            addToCart(product);
        });
        openCart();
    };

    const handleMoveToCart = (product: Product) => {
        addToCart(product);
        removeFromWishlist(product.id);
        openCart();
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                            <p className="mt-2 text-gray-600">
                                Start adding products you love to your wishlist!
                            </p>
                            <Link
                                to="/products"
                                className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-gray-600">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                        </p>
                    </div>

                    <div className="flex space-x-3 mt-4 lg:mt-0">
                        <button
                            onClick={handleAddAllToCart}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Add All to Cart
                        </button>
                        <button
                            onClick={clearWishlist}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Clear Wishlist
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map(product => (
                        <div key={product.id} className="relative group">
                            <ProductCard product={product} />

                            {/* Quick Actions Overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                    onClick={() => handleMoveToCart(product)}
                                    className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
                                    title="Move to Cart"
                                >
                                    <svg
                                        className="w-4 h-4"
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
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Wishlist Summary */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Wishlist Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Total Items</p>
                            <p className="text-lg font-semibold">{wishlistItems.length}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Value</p>
                            <p className="text-lg font-semibold text-green-600">
                                ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Average Rating</p>
                            <p className="text-lg font-semibold text-yellow-600">
                                {(wishlistItems.reduce((total, item) => total + item.rating.rate, 0) / wishlistItems.length).toFixed(1)} ★
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};