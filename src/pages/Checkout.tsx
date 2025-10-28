import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';

export const Checkout: React.FC = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
                    <CheckoutForm />
                </div>
            </div>
        </div>
    );
};