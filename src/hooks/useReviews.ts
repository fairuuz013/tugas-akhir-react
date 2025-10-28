import { useReviewContext } from '../contexts/ReviewContext';

export const useReviews = () => {
    const {
        state,
        addReview,
        updateReview,
        deleteReview,
        getReviewsByProduct,
        getAverageRating,
        getRatingDistribution,
    } = useReviewContext();

    return {
        reviews: state.reviews,
        addReview,
        updateReview,
        deleteReview,
        getReviewsByProduct,
        getAverageRating,
        getRatingDistribution,
    };
};