import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`
                    ${sizeClasses[size]} 
                    border-4 
                    border-gray-200 
                    border-t-gray-600 
                    rounded-full 
                    animate-spin
                `}
            ></div>
        </div>
    );
};

export const SkeletonLoader: React.FC<{ type?: 'card' | 'text' | 'image' }> = ({ type = 'card' }) => {
    if (type === 'card') {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
    );
};

export const PageLoader: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-600 font-medium">Memuat produk...</p>
            </div>
        </div>
    );
};