import React, { useState, useEffect } from 'react';

// FIX: Simplify interface
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... your form fields ... */}
        </form>
    );
};