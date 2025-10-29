// src/components/CartItem.tsx
import React from 'react';
import { useCart } from '../hooks/useCart';
import { type CartItem as CartItemType } from '../contexts/CartContext';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity(item.id, newQuantity);
    };

    const handleRemove = () => {
        removeFromCart(item.id);
    };

    return (
        <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
            {/* Product Image */}
            <div className="">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                    disabled={item.quantity <= 1}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                </button>

                <span className="w-8 text-center text-sm font-medium text-gray-900">
                    {item.quantity}
                </span>

                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Price and Remove */}
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                    onClick={handleRemove}
                    className="text-red-600 hover:text-red-800 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};