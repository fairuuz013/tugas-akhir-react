import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { StarRating } from './StarRating';

interface ReviewFormProps {
    productId: number;
    onSubmit: (review: { rating: number; comment: string }) => void;
    onCancel?: () => void;
    editReview?: { rating: number; comment: string };
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
    onSubmit,
    onCancel,
    editReview,
}) => {
    const { isAuthenticated, } = useAuthContext();
    const [rating, setRating] = useState(editReview?.rating || 0);
    const [comment, setComment] = useState(editReview?.comment || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert('Silakan login untuk menulis review');
            return;
        }

        if (rating === 0) {
            alert('Silakan beri rating');
            return;
        }

        if (comment.trim().length < 10) {
            alert('Review harus minimal 10 karakter');
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({ rating, comment: comment.trim() });
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">
                    Login untuk menulis review
                </h3>
                <p className="text-yellow-700">
                    Silakan login untuk berbagi pengalaman Anda dengan produk ini.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editReview ? 'Edit Review Anda' : 'Tulis Review'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating Anda *
                    </label>
                    <StarRating
                        rating={rating}
                        onRatingChange={setRating}
                        size="lg"
                        readonly={false}
                    />
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Review Anda *
                    </label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Bagikan pengalaman Anda dengan produk ini... (minimal 10 karakter)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        minLength={10}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        {comment.length}/10 karakter minimum
                    </p>
                </div>

                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? 'Mengirim...' : editReview ? 'Update Review' : 'Kirim Review'}
                    </button>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};