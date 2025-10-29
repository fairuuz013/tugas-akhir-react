import React, { useState, useEffect } from 'react';

interface ProductFormProps {
    product?: any;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const CATEGORIES = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        description: '',
        category: 'electronics',
        image: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                price: product.price || 0,
                description: product.description || '',
                category: product.category || 'electronics',
                image: product.image || ''
            });
        }
    }, [product]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Product title is required';
        }

        if (formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.image.trim()) {
            newErrors.image = 'Image URL is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'
                        }`}
                    placeholder="Enter product title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Price */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-300' : 'border-gray-300'
                        }`}
                    placeholder="0.00"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {CATEGORIES.map(category => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-300' : 'border-gray-300'
                        }`}
                    placeholder="Enter product description"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Image URL */}
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL *
                </label>
                <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.image ? 'border-red-300' : 'border-gray-300'
                        }`}
                    placeholder="https://example.com/image.jpg"
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}

                {/* Image Preview */}
                {formData.image && (
                    <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                        <div className="w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL';
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                    {product ? 'Update Product' : 'Create Product'}
                </button>
            </div>
        </form>
    );
};