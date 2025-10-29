// src/App.tsx - UPDATE IMPORT
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { AdminProvider } from './contexts/AdminContext';

// Components
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { EnhancedCartSidebar } from './components/EnhancedCartSidebar'; // HAPUS ALIAS

// Hooks
import { useCart } from './hooks/useCart';

// Pages
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Dashboard } from './pages/Dashboard';
import Login from './pages/Login';
import { NotFound } from './pages/NotFound';
import Checkout from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';

import './App.css';

// Page transition wrapper
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Mobile Bottom Navigation Component
const MobileBottomNav: React.FC = () => {
  const { toggleCart, totalItems } = useCart();
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-40">
      <div className="flex justify-around items-center py-3">
        <a
          href="/products"
          className={`flex flex-col items-center ${location.pathname === '/products' ? 'text-gray-900' : 'text-gray-600'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </a>

        <a
          href="/wishlist"
          className={`flex flex-col items-center ${location.pathname === '/wishlist' ? 'text-gray-900' : 'text-gray-600'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs mt-1">Wishlist</span>
        </a>

        <button
          onClick={toggleCart}
          className="flex flex-col items-center text-gray-600 relative"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </button>

        <a
          href="/checkout"
          className={`flex flex-col items-center ${location.pathname === '/checkout' ? 'text-gray-900' : 'text-gray-600'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-xs mt-1">Checkout</span>
        </a>
      </div>
    </div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
        <Route path="/products/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />

        {/* Protected Routes */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <PageWrapper><Checkout /></PageWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <PageWrapper><Wishlist /></PageWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute adminOnly>
              <PageWrapper><Dashboard /></PageWrapper>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// Main App Component
const AppContent: React.FC = () => {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      <EnhancedCartSidebar /> {/* UPDATE NAMA KOMPONEN */}
      <main className="min-h-screen pb-16 lg:pb-0">
        <AnimatedRoutes />
      </main>
      <MobileBottomNav />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <AdminProvider>
                    <AppContent />
                  </AdminProvider>
                </ReviewProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;