import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import { useAuthContext } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { useReviews } from '../hooks/useReviews';
import { WishlistButton } from '../components/WishlistButton';
import { StarRating } from '../components/StarRating';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewList } from '../components/ReviewList';
import { type Review } from '../contexts/ReviewContext';
import { Loading } from '../components/Loading';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getProductById } = useProductContext();
    const { isAuthenticated, user } = useAuthContext();
    const { addToCart, openCart } = useCart();
    const {
        addReview,
        updateReview,
        deleteReview,
        getReviewsByProduct,
        getAverageRating,
        getRatingDistribution
    } = useReviews();

    const navigate = useNavigate();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);

    const product = id ? getProductById(parseInt(id)) : undefined;

    // Get reviews data
    const productReviews = product ? getReviewsByProduct(product.id) : [];
    const averageRating = product ? getAverageRating(product.id) : 0;
    const ratingDistribution = product ? getRatingDistribution(product.id) : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            openCart();
        }
    };

    const handleSubmitReview = async (reviewData: { rating: number; comment: string }) => {
        if (!product || !user) return;

        if (editingReview) {
            // Update existing review
            updateReview({
                ...editingReview,
                rating: reviewData.rating,
                comment: reviewData.comment,
            });
        } else {
            // Add new review
            addReview({
                productId: product.id,
                userId: user.id.toString(),
                userName: user.username,
                rating: reviewData.rating,
                comment: reviewData.comment,
                verified: true, // Simulate verified purchase
            });
        }

        setShowReviewForm(false);
        setEditingReview(null);
    };

    const handleEditReview = (review: Review) => {
        setEditingReview(review);
        setShowReviewForm(true);
    };

    const handleDeleteReview = (reviewId: string) => {
        deleteReview(reviewId);
    };

    const userReview = product ? productReviews.find(review => review.userName === user?.username) : null;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <Link to="/products" className="text-blue-500 hover:text-blue-600">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-500 hover:text-blue-600 flex items-center"
                >
                    ← Back
                </button>

                {/* Product Info */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="md:flex">
                        <div className="md:flex-1 p-8">
                            <div className="h-96 overflow-hidden rounded-lg relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x500?text=No+Image';
                                    }}
                                />

                                <div className="absolute top-4 right-4">
                                    <WishlistButton product={product} size="lg" />
                                </div>
                            </div>
                        </div>

                        <div className="md:flex-1 p-8">
                            <div className="mb-4">
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

                            {/* Product Rating Summary */}
                            <div className="flex items-center space-x-4 mb-4">
                                <StarRating rating={averageRating || product.rating.rate} size="lg" readonly showLabel />
                                <span className="text-gray-600">({productReviews.length} reviews)</span>
                                {isAuthenticated && !userReview && (
                                    <button
                                        onClick={() => setShowReviewForm(true)}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Write a review
                                    </button>
                                )}
                            </div>

                            <p className="text-4xl font-bold text-green-600 mb-6">${product.price}</p>

                            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                                >
                                    Add to Cart
                                </button>

                                <WishlistButton
                                    product={product}
                                    size="md"
                                    showText
                                />

                                {isAuthenticated && (
                                    <Link
                                        to="/dashboard"
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-center"
                                    >
                                        Edit Product
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                        {/* Review Form */}
                        {(showReviewForm || editingReview) && (
                            <div className="mb-8">
                                <ReviewForm
                                    productId={product.id}
                                    onSubmit={handleSubmitReview}
                                    onCancel={() => {
                                        setShowReviewForm(false);
                                        setEditingReview(null);
                                    }}
                                    editReview={editingReview ? {
                                        rating: editingReview.rating,
                                        comment: editingReview.comment,
                                    } : undefined}
                                />
                            </div>
                        )}

                        {/* User's Existing Review */}
                        {userReview && !editingReview && (
                            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-blue-900">Your Review</h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditReview(userReview)}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteReview(userReview.id)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <StarRating rating={userReview.rating} readonly />
                                <p className="mt-2 text-blue-800">{userReview.comment}</p>
                            </div>
                        )}

                        {/* Reviews List */}
                        <ReviewList
                            reviews={productReviews}
                            averageRating={averageRating}
                            ratingDistribution={ratingDistribution}
                            totalReviews={productReviews.length}
                            onEditReview={handleEditReview}
                            onDeleteReview={handleDeleteReview}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};