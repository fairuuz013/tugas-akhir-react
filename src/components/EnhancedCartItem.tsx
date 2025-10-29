// src/components/EnhancedCartItem.tsx
import React from 'react';
import { useCart } from '../hooks/useCart';
import { type CartItem as CartItemType } from '../contexts/CartContext';

// Helper function untuk format Rupiah
const formatRupiah = (num: number | undefined | null): string => {
    if (num === undefined || num === null || isNaN(num)) {
        return 'Rp 0';
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
};

interface EnhancedCartItemProps {
    item: CartItemType;
}

export const EnhancedCartItem: React.FC<EnhancedCartItemProps> = ({ item }) => {
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
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                    {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{formatRupiah(item.price)} per item</p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3 mt-2">
                    <button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                    </button>

                    <span className="w-8 text-center text-base font-medium text-gray-900">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Price and Remove */}
            <div className="flex flex-col items-end space-y-2">
                <span className="text-lg font-semibold text-gray-900">
                    {formatRupiah(item.price * item.quantity)}
                </span>
                <span className="text-sm text-gray-500">
                    ({formatRupiah(item.price)} × {item.quantity})
                </span>
                <button
                    onClick={handleRemove}
                    className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
};