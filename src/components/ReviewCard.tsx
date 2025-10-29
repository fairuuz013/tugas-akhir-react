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

    // Gunakan username atau name untuk komparasi
    const currentUserName = user?.username || user?.name;
    const isOwnReview = currentUserName === review.userName;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
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
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                    Hapus
                                </button>

                                {showDeleteConfirm && (
                                    <div className="absolute bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
                                        <p className="text-sm text-gray-700 mb-3">
                                            Yakin ingin menghapus review ini?
                                        </p>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleDelete}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                            >
                                                Ya, Hapus
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                                            >
                                                Batal
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
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
                    >
                        {isExpanded ? 'Tutup' : 'Baca selengkapnya'}
                    </button>
                )}
            </div>
        </div>
    );
};