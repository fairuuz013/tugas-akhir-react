E-Commerce Lite - React E-Commerce Application
📋 Deskripsi Aplikasi
E-Commerce Lite adalah aplikasi e-commerce modern yang dibangun menggunakan React, TypeScript, dan Tailwind CSS. Aplikasi ini menyediakan pengalaman belanja online yang lengkap dengan berbagai fitur untuk pengguna biasa dan administrator.

🚀 Fitur Utama
👥 Sistem Autentikasi & Role Management
Login/Register dengan validasi form

Dual Role System: User & Admin

Protected Routes untuk akses terbatas

Demo Accounts untuk testing:

User: user@example.com / user123

Admin: admin@example.com / admin123

🛍️ Fitur Produk & Katalog
Product Listing dengan grid layout responsive

Product Search dengan fitur pencarian real-time

Category Filter untuk menyaring produk berdasarkan kategori

Sorting Options: harga, rating, nama

Product Detail dengan gambar gallery dan informasi lengkap

Related Products di halaman detail produk

🛒 Sistem Keranjang Belanja
Add to Cart dengan quantity control

Cart Sidebar yang dapat dibuka/tutup

Update Quantity langsung dari cart

Remove Items dari keranjang

Persistent Cart data tersimpan di localStorage

Real-time Total calculation

💳 Sistem Pembayaran Lengkap
Multiple Payment Methods:

Transfer Bank (BCA, BRI, Mandiri, BNI)

E-Money (Gopay, OVO, Dana, LinkAja)

E-Wallet (Gopay, OVO, Dana, ShopeePay)

Checkout Process dengan form pengiriman

Order Summary dengan detail produk

Payment Success notification

Currency Format Rupiah (IDR)

❤️ Sistem Wishlist/Favorit
Add/Remove Wishlist dengan one-click

Wishlist Counter di navbar

Wishlist Page terpisah

Persistent Data di localStorage

⭐ Sistem Review & Rating
Product Reviews dari pengguna

Star Rating system (1-5 bintang)

Review Form dengan validasi

Edit/Delete review milik sendiri

Verified Purchase badge

📊 Admin Dashboard
Product Management (CRUD operations)

User Management overview

Order Management tracking

Sales Analytics dengan charts

Admin Statistics cards

📱 Responsive Design
Mobile-First approach

Bottom Navigation untuk mobile users

Responsive Grid layouts

Touch-Friendly interfaces

🛠️ Teknologi yang Digunakan
Frontend Framework
React 18 dengan TypeScript

React Router DOM untuk routing

React Context untuk state management

Styling & UI
Tailwind CSS v4 untuk styling

Framer Motion untuk animasi

Responsive Design principles

Development Tools
Vite sebagai build tool

TypeScript untuk type safety

ESLint untuk code linting

Data Management
Local Storage untuk persistensi data

Context API untuk global state

Custom Hooks untuk logic reuse

📁 Struktur Project
text
src/
├── components/ # Reusable components
│ ├── AdminStats.tsx
│ ├── CartItem.tsx
│ ├── CheckoutForm.tsx
│ ├── DashboardProductCard.tsx
│ ├── EnhancedCartItem.tsx
│ ├── EnhancedCartSidebar.tsx
│ ├── EnhancedProductCard.tsx
│ ├── EnhancedSearchBar.tsx
│ ├── ErrorBoundary.tsx
│ ├── Navbar.tsx
│ ├── OrderManagement.tsx
│ ├── Pagination.tsx
│ ├── PrivateRoute.tsx
│ ├── ProductAnalytics.tsx
│ ├── ProductFilter.tsx
│ ├── ProductForm.tsx
│ ├── ReviewCard.tsx
│ ├── ReviewForm.tsx
│ ├── ReviewList.tsx
│ ├── SalesChart.tsx
│ ├── StarRating.tsx
│ ├── UserManagement.tsx
│ ├── WishlistButton.tsx
│ └── WishlistPage.tsx
├── contexts/ # React Context providers
│ ├── AdminContext.tsx
│ ├── AuthContext.tsx
│ ├── CartContext.tsx
│ ├── ProductContext.tsx
│ ├── ReviewContext.tsx
│ └── WishlistContext.tsx
├── hooks/ # Custom React hooks
│ ├── useAdmin.ts
│ ├── useAuth.ts
│ ├── useCart.ts
│ ├── useLocalStorage.ts
│ ├── useMobileDetection.ts
│ ├── useProducts.ts
│ ├── useReviews.ts
│ ├── useSearch.ts
│ └── useWishlist.ts
├── lib/ # Utility functions
│ └── utils.ts
├── pages/ # Page components
│ ├── Checkout.tsx
│ ├── Dashboard.tsx
│ ├── Login.tsx
│ ├── NotFound.tsx
│ ├── ProductDetail.tsx
│ ├── Products.tsx
│ └── Wishlist.tsx
└── App.tsx # Main App component
🎯 Cara Menjalankan
Prerequisites
Node.js (versi 16 atau lebih tinggi)

npm atau yarn

Installation
bash

# Clone repository

git clone <repository-url>
cd ecommerce-lite

# Install dependencies

npm install

# Jalankan development server

npm run dev

# Build untuk production

npm run build

# Preview production build

npm run preview
🔧 Konfigurasi
Environment Variables
Buat file .env di root project:

env
VITE_APP_TITLE=E-Commerce Lite
VITE_API_URL=your_api_url_here
Tailwind CSS v4
Aplikasi menggunakan Tailwind CSS v4 dengan konfigurasi:

javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
plugins: [
react(),
tailwindcss()
],
})
📊 Fitur Admin
Product Management
✅ Tambah produk baru

✅ Edit produk existing

✅ Hapus produk

✅ Lihat semua produk

User Management
✅ Lihat daftar pengguna

✅ Statistik pengguna

Order Management
✅ Lihat semua pesanan

✅ Tracking status pesanan

Analytics
✅ Sales chart

✅ Product analytics

✅ Admin statistics

💰 Sistem Harga
Currency: Rupiah (IDR)

Conversion Rate: 1 USD = 16,000 IDR

Format: Menggunakan Intl.NumberFormat untuk formatting

🛡️ Security Features
Route Protection dengan PrivateRoute

Admin-Only Routes untuk akses terbatas

Input Validation di semua form

Error Boundaries untuk error handling

📈 Performance Optimizations
Code Splitting dengan React.lazy

Image Optimization dengan lazy loading

Efficient Re-renders dengan React.memo

Local Storage untuk mengurangi API calls

🐛 Troubleshooting
Common Issues
Build Errors: Pastikan semua TypeScript types sudah benar

Styling Issues: Restart dev server setelah mengubah Tailwind config

Cart Data Lost: Clear localStorage dan refresh halaman

Debug Tips
Gunakan browser DevTools untuk inspect state

Check console untuk error messages

Verify localStorage data integrity

🔮 Future Enhancements
Integration dengan backend API

Payment gateway integration

Email notifications

Product inventory management

Advanced search filters

Social media integration

Multi-language support

PWA features

👥 Kontribusi
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 Lisensi
Distributed under the MIT License. See LICENSE for more information.

🤝 Support
Jika Anda menemukan bug atau memiliki pertanyaan, silakan buat issue di repository atau hubungi maintainer.

Dibuat dengan ❤️ menggunakan React & TypeScript
