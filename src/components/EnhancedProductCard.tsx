// src/components/EnhancedProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../contexts/ProductContext';
import { WishlistButton } from './WishlistButton';
import { StarRating } from './StarRating';
import { useCart } from '../hooks/useCart';
import { formatUsdToRupiah } from '../lib/utils';

interface EnhancedProductCardProps {
    product: Product;
}

export const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <Link to={`/products/${product.id}`} className="block">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
                        }}
                    />

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3">
                        <WishlistButton
                            product={product}
                            size="sm"
                            showText={false}
                        />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full capitalize">
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                        {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                        <StarRating
                            rating={product.rating.rate}
                            size="sm"
                            readonly
                        />
                        <span className="text-sm text-gray-600">
                            ({product.rating.count})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-green-600">
                            {formatUsdToRupiah(product.price)}
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>+ Keranjang</span>
                    </button>
                </div>
            </Link>
        </div>
    );
};