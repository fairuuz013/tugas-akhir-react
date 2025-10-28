import React, { useState } from 'react';
import { type Review } from '../contexts/ReviewContext';
import { ReviewCard } from './ReviewCard';
import { StarRating } from './StarRating';

interface ReviewListProps {
    reviews: Review[];
    averageRating: number;
    ratingDistribution: { [key: number]: number };
    totalReviews: number;
    onEditReview?: (review: Review) => void;
    onDeleteReview?: (reviewId: string) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({
    reviews,
    averageRating,
    ratingDistribution,
    totalReviews,
    onEditReview,
    onDeleteReview,
}) => {
    const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');

    const sortedReviews = [...reviews].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            case 'highest':
                return b.rating - a.rating;
            case 'lowest':
                return a.rating - b.rating;
            default:
                return 0;
        }
    });

    const getPercentage = (count: number) => {
        return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    };

    return (
        <div className="space-y-6">
            {/* Reviews Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>

                    {/* Average Rating */}
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
                        <div className="space-y-1">
                            <StarRating rating={averageRating} size="lg" readonly showLabel />
                            <p className="text-sm text-gray-600">{totalReviews} reviews</p>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2 max-w-xs">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600 w-8">{rating} star</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-yellow-400 h-2 rounded-full"
                                        style={{ width: `${getPercentage(ratingDistribution[rating])}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-600 w-12">
                                    {ratingDistribution[rating]} ({getPercentage(ratingDistribution[rating]).toFixed(0)}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sort Controls */}
                <div className="mt-4 lg:mt-0">
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                        Sort by
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">Newest First</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                    </select>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {sortedReviews.length > 0 ? (
                    sortedReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onEdit={onEditReview}
                            onDelete={onDeleteReview}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                    </div>
                )}
            </div>

            {/* Load More (Future Feature) */}
            {sortedReviews.length > 5 && (
                <div className="text-center">
                    <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
                        Load More Reviews
                    </button>
                </div>
            )}
        </div>
    );
};