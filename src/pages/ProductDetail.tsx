// src/pages/ProductDetail.tsx - UPDATE BAGIAN HARGA
import React, { useState } from 'react';
import { useParams, Link, } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { useReviews } from '../hooks/useReviews';
import { WishlistButton } from '../components/WishlistButton';
import { StarRating } from '../components/StarRating';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewList } from '../components/ReviewList';
import { type Review } from '../contexts/ReviewContext';
import { EnhancedProductCard as ProductCard } from '../components/EnhancedProductCard';
import { formatUsdToRupiah, } from '../lib/utils';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getProductById, products } = useProductContext();
    const { isAuthenticated, user } = useAuth();
    const { addToCart, openCart } = useCart();
    const {
        addReview,
        updateReview,
        deleteReview,
        getReviewsByProduct,
        getAverageRating,
        getRatingDistribution
    } = useReviews();

    const [selectedImage, setSelectedImage] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [quantity, setQuantity] = useState(1);

    const product = id ? getProductById(parseInt(id)) : undefined;

    // Get reviews data
    const productReviews = product ? getReviewsByProduct(product.id) : [];
    const averageRating = product ? getAverageRating(product.id) : 0;
    const ratingDistribution = product ? getRatingDistribution(product.id) : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Related products (same category)
    const relatedProducts = product
        ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
        : [];

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
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
                userName: user.username || user.name,
                rating: reviewData.rating,
                comment: reviewData.comment,
                verified: true,
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

    // Gunakan username atau name untuk mencari review user
    const currentUserName = user?.username || user?.name;
    const userReview = product ? productReviews.find(review => review.userName === currentUserName) : null;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    // Create image array (main image + additional images if available)
    const images = [product.image, product.image, product.image]; // Simulate multiple images

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex mb-6" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li>
                            <Link to="/" className="hover:text-gray-900">Home</Link>
                        </li>
                        <li>
                            <span className="mx-2">/</span>
                        </li>
                        <li>
                            <Link to="/products" className="hover:text-gray-900">Products</Link>
                        </li>
                        <li>
                            <span className="mx-2">/</span>
                        </li>
                        <li>
                            <Link to={`/products?category=${product.category}`} className="hover:text-gray-900 capitalize">
                                {product.category}
                            </Link>
                        </li>
                        <li>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-900 font-medium truncate max-w-xs">
                            {product.title}
                        </li>
                    </ol>
                </nav>

                {/* Product Main Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="md:flex">
                        {/* Image Gallery */}
                        <div className="md:w-1/2 p-6">
                            <div className="space-y-4">
                                {/* Main Image */}
                                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                                    <img
                                        src={images[selectedImage]}
                                        alt={product.title}
                                        className="max-w-full h-80 object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x500?text=No+Image';
                                        }}
                                    />
                                </div>

                                {/* Thumbnail Images */}
                                <div className="flex space-x-3 justify-center">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`w-16 h-16 border-2 rounded-lg overflow-hidden ${selectedImage === index
                                                ? 'border-blue-500'
                                                : 'border-gray-200 hover:border-gray-300'
                                                } transition-colors`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.title} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                            <div className="mb-4">
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>

                            {/* Rating & Reviews */}
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <StarRating
                                        rating={averageRating || product.rating.rate}
                                        size="md"
                                        readonly
                                    />
                                    <span className="text-gray-600 text-sm">
                                        ({product.rating.count} reviews)
                                    </span>
                                </div>
                                {isAuthenticated && !userReview && (
                                    <button
                                        onClick={() => setShowReviewForm(true)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Tulis Review
                                    </button>
                                )}
                            </div>

                            {/* Price - UBAH DI SINI */}
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-green-600">
                                    {formatUsdToRupiah(product.price)}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">Gratis pengiriman</p>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(prev => prev + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>+ Keranjang ({quantity})</span>
                                    </button>

                                    <WishlistButton
                                        product={product}
                                        size="md"
                                        showText={false}
                                    />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Kategori:</span>
                                        <span className="capitalize font-medium">{product.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Stok:</span>
                                        <span className="text-green-600 font-medium">Tersedia</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>SKU:</span>
                                        <span className="font-medium">PROD-{product.id}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="p-6">
                        {/* Review Form */}
                        {(showReviewForm || editingReview) && (
                            <div className="mb-6">
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
                            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-blue-900">Review Anda</h3>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleEditReview(userReview)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteReview(userReview.id)}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Hapus
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

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Terkait</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(relatedProduct => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};