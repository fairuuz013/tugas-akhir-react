import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItem {
    id: number;
    name: string;
    price: number; // Price dalam IDR (Rupiah)
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    total: number; // Total dalam IDR (Rupiah)
    totalItems: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function untuk konversi USD ke IDR (1 USD = 16,000 IDR)
const usdToIdr = (usdPrice: number): number => {
    return usdPrice * 16000;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Validasi data cart yang disimpan
                const validatedCart = parsedCart.map((item: any) => ({
                    id: item.id || 0,
                    name: item.name || 'Unknown Product',
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    image: item.image || 'https://via.placeholder.com/100x100?text=No+Image'
                }));
                setCartItems(validatedCart);
            } catch (error) {
                console.error('Error parsing cart data:', error);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            price: usdToIdr(product.price) || 0 // KONVERSI KE IDR
                        }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.title || 'Unknown Product',
                price: usdToIdr(product.price) || 0, // KONVERSI KE IDR
                quantity: 1,
                image: product.image || 'https://via.placeholder.com/100x100?text=No+Image'
            }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const total = cartItems.reduce((sum, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 1;
        return sum + (price * quantity);
    }, 0);

    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        totalItems,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};  