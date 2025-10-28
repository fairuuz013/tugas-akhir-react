import { useState, useEffect } from "react";
import type { Product } from "../contexts/ProductContext";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [localProducts, setLocalProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addProduct = (product: Omit<Product, "id">) => {
        const newProduct = { ...product, id: Date.now() };
        setLocalProducts((prev) => [...prev, newProduct]);
    };

    const updateProduct = (id: number, updated: Partial<Product>) => {
        setLocalProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
        );
    };

    const deleteProduct = (id: number) => {
        setLocalProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const getProductById = (id: number) =>
        [...products, ...localProducts].find((p) => p.id === id);

    return {
        products,
        localProducts,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
    };
};
