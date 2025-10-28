import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

export interface Review {
    id: string;
    productId: number;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    verified?: boolean;
}

interface ReviewState {
    reviews: Review[];
}

type ReviewAction =
    | { type: 'ADD_REVIEW'; payload: Review }
    | { type: 'UPDATE_REVIEW'; payload: Review }
    | { type: 'DELETE_REVIEW'; payload: string }
    | { type: 'SET_REVIEWS'; payload: Review[] };

interface ReviewContextType {
    state: ReviewState;
    addReview: (review: Omit<Review, 'id' | 'date'>) => void;
    updateReview: (review: Review) => void;
    deleteReview: (reviewId: string) => void;
    getReviewsByProduct: (productId: number) => Review[];
    getAverageRating: (productId: number) => number;
    getRatingDistribution: (productId: number) => { [key: number]: number };
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
    switch (action.type) {
        case 'ADD_REVIEW':
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
            };

        case 'UPDATE_REVIEW':
            return {
                ...state,
                reviews: state.reviews.map(review =>
                    review.id === action.payload.id ? action.payload : review
                ),
            };

        case 'DELETE_REVIEW':
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.payload),
            };

        case 'SET_REVIEWS':
            return {
                ...state,
                reviews: action.payload,
            };

        default:
            return state;
    }
};

// Sample initial reviews
const initialReviews: Review[] = [
    {
        id: '1',
        productId: 1,
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Excellent product! Fast delivery and great quality.',
        date: '2024-01-15',
        verified: true,
    },
    {
        id: '2',
        productId: 1,
        userId: 'user2',
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Good value for money. Would recommend!',
        date: '2024-01-10',
        verified: true,
    },
    {
        id: '3',
        productId: 2,
        userId: 'user3',
        userName: 'Mike Johnson',
        rating: 3,
        comment: 'Average product. Could be better.',
        date: '2024-01-08',
    },
];

const initialState: ReviewState = {
    reviews: initialReviews,
};

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
        const newReview: Review = {
            ...reviewData,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
        };
        dispatch({ type: 'ADD_REVIEW', payload: newReview });
    };

    const updateReview = (review: Review) => {
        dispatch({ type: 'UPDATE_REVIEW', payload: review });
    };

    const deleteReview = (reviewId: string) => {
        dispatch({ type: 'DELETE_REVIEW', payload: reviewId });
    };

    const getReviewsByProduct = (productId: number): Review[] => {
        return state.reviews
            .filter(review => review.productId === productId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const getAverageRating = (productId: number): number => {
        const productReviews = getReviewsByProduct(productId);
        if (productReviews.length === 0) return 0;

        const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return Number((total / productReviews.length).toFixed(1));
    };

    const getRatingDistribution = (productId: number): { [key: number]: number } => {
        const productReviews = getReviewsByProduct(productId);
        const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        productReviews.forEach(review => {
            distribution[review.rating]++;
        });

        return distribution;
    };

    const value: ReviewContextType = {
        state,
        addReview,
        updateReview,
        deleteReview,
        getReviewsByProduct,
        getAverageRating,
        getRatingDistribution,
    };

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = () => {
    const context = useContext(ReviewContext);
    if (context === undefined) {
        throw new Error('useReviewContext must be used within a ReviewProvider');
    }
    return context;
};