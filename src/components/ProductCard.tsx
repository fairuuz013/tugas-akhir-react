import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../contexts/ProductContext';
import { useCart } from '../hooks/useCart';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (id: number) => void;
    showActions?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onEdit,
    onDelete,
    showActions = false
}) => {
    const { addToCart, openCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        openCart();
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />

                {/* Wishlist Button - Top Right */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <WishlistButton product={product} size="sm" />
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2 capitalize">{product.category}</p>
                <p className="text-2xl font-bold text-green-600 mb-3">${product.price}</p>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                            {product.rating.rate} ({product.rating.count})
                        </span>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Link
                        to={`/products/${product.id}`}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded transition-colors duration-200"
                    >
                        Detail
                    </Link>

                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors duration-200"
                    >
                        Add to Cart
                    </button>

                    {showActions && onEdit && onDelete && (
                        <>
                            <button
                                onClick={() => onEdit(product)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition-colors duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(product.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-200"
                            >
                                Hapus
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};