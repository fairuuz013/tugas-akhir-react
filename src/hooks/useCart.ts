import { useCartContext } from '../contexts/CartContext';

export const useCart = () => {
    const {
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getTotalItems,
        getTotalPrice,
    } = useCartContext();

    return {
        cartItems: state.items,
        isCartOpen: state.isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems: getTotalItems(),
        totalPrice: getTotalPrice(),
    };
};