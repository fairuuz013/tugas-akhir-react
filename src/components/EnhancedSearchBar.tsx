import React, { useState, useEffect, useRef } from 'react';
import { useProductContext } from '../contexts/ProductContext';

interface EnhancedSearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
    onSearch,
    placeholder = "Cari produk..."
}) => {
    const { products } = useProductContext();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Generate search suggestions
    useEffect(() => {
        if (query.length > 2) {
            const productTitles = products.map(p => p.title);
            const categoryNames = [...new Set(products.map(p => p.category))];

            const allSuggestions = [
                ...productTitles,
                ...categoryNames,
            ];

            const filtered = allSuggestions
                .filter(item =>
                    item.toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 5);

            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query, products]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        onSearch(suggestion);
    };

    const clearSearch = () => {
        setQuery('');
        onSearch('');
        setShowSuggestions(false);
    };

    return (
        <div ref={searchRef} className="relative w-full">
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Input - Style Tokopedia */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 2 && setShowSuggestions(true)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 shadow-sm"
                    placeholder={placeholder}
                />

                {/* Clear Button */}
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    <div className="py-2">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                            >
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="text-gray-700">
                                    {suggestion}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};