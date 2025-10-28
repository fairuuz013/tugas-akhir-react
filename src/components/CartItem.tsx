import React from 'react';
import { type CartItem as CartItemType } from '../contexts/CartContext';
import { useCart } from '../hooks/useCart';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 0) {
            updateQuantity(item.product.id, newQuantity);
        }
    };

    return (
        <li className="py-6 flex">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-center object-cover"
                />
            </div>

            <div className="ml-4 flex-1 flex flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-sm line-clamp-2">{item.product.title}</h3>
                        <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                </div>

                <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                            -
                        </button>

                        <span className="mx-2 text-gray-900">{item.quantity}</span>

                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.product.id)}
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </li>
    );
};