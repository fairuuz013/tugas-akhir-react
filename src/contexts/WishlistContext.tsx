import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type Product } from './ProductContext';

interface WishlistState {
    items: Product[];
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: Product }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
    | { type: 'CLEAR_WISHLIST' };

interface WishlistContextType {
    state: WishlistState;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    clearWishlist: () => void;
    isInWishlist: (productId: number) => boolean;
    getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            // Check if product already in wishlist
            if (state.items.find(item => item.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                items: [...state.items, action.payload],
            };

        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        case 'CLEAR_WISHLIST':
            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
};

const initialState: WishlistState = {
    items: [],
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    const addToWishlist = (product: Product) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    };

    const removeFromWishlist = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    };

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    };

    const isInWishlist = (productId: number): boolean => {
        return state.items.some(item => item.id === productId);
    };

    const getWishlistCount = (): number => {
        return state.items.length;
    };

    const value: WishlistContextType = {
        state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistCount,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlistContext = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlistContext must be used within a WishlistProvider');
    }
    return context;
};