import React, { useState, useEffect } from 'react';

// FIX: Simplify interface
interface ProductFormProps {
    product?: any;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        description: '',
        category: 'electronics',
        image: ''
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... your form fields ... */}
        </form>
    );
};