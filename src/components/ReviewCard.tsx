import React, { useState } from 'react';
import { type Review } from '../contexts/ReviewContext';
import { StarRating } from './StarRating';
import { useAuthContext } from '../contexts/AuthContext';

interface ReviewCardProps {
    review: Review;
    onEdit?: (review: Review) => void;
    onDelete?: (reviewId: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onEdit, onDelete }) => {
    const { user } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const isOwnReview = user?.username === review.userName;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const shouldTruncate = review.comment.length > 150;
    const displayComment = isExpanded || !shouldTruncate
        ? review.comment
        : `${review.comment.substring(0, 150)}...`;

    const handleDelete = () => {
        if (onDelete) {
            onDelete(review.id);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {review.userName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                            {review.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Verified Purchase
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                            <StarRating rating={review.rating} size="sm" readonly />
                            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {isOwnReview && (onEdit || onDelete) && (
                    <div className="flex space-x-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(review)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    Delete
                                </button>

                                {showDeleteConfirm && (
                                    <div className="absolute bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
                                        <p className="text-sm text-gray-700 mb-3">
                                            Are you sure you want to delete this review?
                                        </p>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleDelete}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                            >
                                                Yes, Delete
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Review Content */}
            <div className="text-gray-700">
                <p className="leading-relaxed">{displayComment}</p>

                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            {/* Helpful Votes (Future Feature) */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>Helpful (0)</span>
                </button>
            </div>
        </div>
    );
};