import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

interface CheckoutData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
}

export const CheckoutForm: React.FC = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [formData, setFormData] = useState<CheckoutData>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
    };

    if (orderComplete) {
        return (
            <div className="text-center py-8">
                <div className="bg-green-50 rounded-lg p-6">
                    <svg
                        className="mx-auto h-12 w-12 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-green-800">
                        Order Confirmed!
                    </h3>
                    <p className="mt-2 text-green-600">
                        Thank you for your purchase. Your order has been received.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                required
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <h4 className="text-lg font-medium text-gray-900 mt-8 mb-4">Payment Information</h4>

                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="MM/YY"
                                required
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                required
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            id="nameOnCard"
                            name="nameOnCard"
                            required
                            value={formData.nameOnCard}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing || cartItems.length === 0}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
                    </button>
                </form>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                    {cartItems.map(item => (
                        <div key={item.product.id} className="flex justify-between py-2">
                            <div>
                                <p className="font-medium">{item.product.title}</p>
                                <p className="text-gray-600 text-sm">
                                    Qty: {item.quantity} × ${item.product.price}
                                </p>
                            </div>
                            <p className="font-medium">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold">
                            <p>Total</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};