import React from 'react';
import { type Product } from '../contexts/ProductContext';
import { useWishlist } from '../hooks/useWishlist';

interface WishlistButtonProps {
    product: Product;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
    product,
    size = 'md',
    showText = false
}) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(product.id);

    const handleToggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    return (
        <button
            onClick={handleToggleWishlist}
            className={`flex items-center justify-center rounded-full transition-all duration-200 ${isWishlisted
                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-400'
                } ${sizeClasses[size]} ${showText ? 'px-3 py-2 rounded-md space-x-2' : ''}`}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            {isWishlisted ? (
                <>
                    <svg
                        // className="flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {showText && (
                        <span className={`${textSizeClasses[size]} font-medium`}>
                            Remove from Wishlist
                        </span>
                    )}
                </>
            ) : (
                <>
                    <svg
                        // className="flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    {showText && (
                        <span className={`${textSizeClasses[size]} font-medium`}>
                            Add to Wishlist
                        </span>
                    )}
                </>
            )}
        </button>
    );
};