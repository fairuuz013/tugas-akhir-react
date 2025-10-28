
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { AdminProvider } from './contexts/AdminContext'; // NEW
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { CartSidebar } from './components/CartSidebar';

// Import pages
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';

import './App.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <AdminProvider> {/* NEW - Wrap dengan AdminProvider */}
                    <div className="App">
                      <Navbar />
                      <CartSidebar />
                      <main>
                        <Routes>
                          <Route path="/" element={<Navigate to="/products" replace />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductDetail />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route
                            path="/dashboard"
                            element={
                              <PrivateRoute>
                                <Dashboard />
                              </PrivateRoute>
                            }
                          />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
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