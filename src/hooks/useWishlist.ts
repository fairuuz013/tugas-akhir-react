import { useWishlistContext } from '../contexts/WishlistContext';

export const useWishlist = () => {
    const {
        state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistCount,
    } = useWishlistContext();

    return {
        wishlistItems: state.items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount: getWishlistCount(),
    };
};