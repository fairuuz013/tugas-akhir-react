// src/components/EnhancedCartSidebar.tsx
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

// Buat komponen CartItem langsung di sini untuk menghindari circular import
const CartItemComponent: React.FC<{ item: CartItemType }> = ({ item }) => {
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
                <p className="mt-1 text-sm text-gray-500">{formatRupiah(item.price)} each</p>

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

export const EnhancedCartSidebar: React.FC = () => {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        total,
        totalItems,
        clearCart
    } = useCart();

    const handleCheckout = () => {
        closeCart();
        // Redirect to checkout page
        window.location.href = '/checkout';
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-6 bg-gray-50 border-b border-gray-200">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Keranjang Belanja
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-gray-600 mb-4">Keranjang Anda kosong</p>
                                    <button
                                        onClick={closeCart}
                                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Lanjut Belanja
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item: CartItemType) => (
                                        <CartItemComponent key={item.id} item={item} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 px-4 py-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                    <span>Subtotal</span>
                                    <span>{formatRupiah(total)}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    Biaya pengiriman dan pajak dihitung saat checkout.
                                </p>
                                <div className="space-y-3">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                    >
                                        Checkout
                                    </button>
                                    <button
                                        onClick={clearCart}
                                        className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Kosongkan Keranjang
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-sm text-gray-600">
                                    <button
                                        onClick={closeCart}
                                        className="text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Lanjut Belanja →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};