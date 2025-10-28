import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';

export const CartSidebar: React.FC = () => {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        totalItems,
        totalPrice,
        clearCart,
    } = useCart();

    const navigate = useNavigate();

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={closeCart}
                ></div>

                <div className="absolute inset-y-0 right-0 max-w-full flex">
                    <div className="relative w-screen max-w-md">
                        <div className="h-full flex flex-col bg-white shadow-xl">
                            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                                    <button
                                        onClick={closeCart}
                                        className="ml-3 h-7 flex items-center"
                                    >
                                        <span className="sr-only">Close panel</span>
                                        <svg
                                            className="h-6 w-6 text-gray-400 hover:text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        {cartItems.length === 0 ? (
                                            <div className="text-center py-12">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                    />
                                                </svg>
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                    Your cart is empty
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Start adding some products to your cart!
                                                </p>
                                            </div>
                                        ) : (
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <CartItem key={item.product.id} item={item} />
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {cartItems.length > 0 && (
                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${totalPrice.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Shipping and taxes calculated at checkout.
                                    </p>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full bg-blue-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Checkout
                                        </button>
                                    </div>

                                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                        <button
                                            onClick={clearCart}
                                            className="text-blue-600 font-medium hover:text-blue-500"
                                        >
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};