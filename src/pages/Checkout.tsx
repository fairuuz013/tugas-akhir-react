import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';

export type PaymentMethod = 'bank' | 'e-money' | 'e-wallet';

interface PaymentOption {
    id: PaymentMethod;
    name: string;
    description: string;
    icons: string[];
}

const paymentOptions: PaymentOption[] = [
    {
        id: 'bank',
        name: 'Transfer Bank',
        description: 'Transfer melalui bank partner',
        icons: ['BCA', 'BRI', 'Mandiri', 'BNI']
    },
    {
        id: 'e-money',
        name: 'E-Money',
        description: 'Bayar dengan e-money',
        icons: ['Gopay', 'OVO', 'Dana', 'LinkAja']
    },
    {
        id: 'e-wallet',
        name: 'E-Wallet',
        description: 'Bayar dengan dompet digital',
        icons: ['Gopay', 'OVO', 'Dana', 'ShopeePay']
    }
];

// Helper function untuk format Rupiah
const formatRupiah = (num: number | undefined | null): string => {
    if (num === undefined || num === null || isNaN(num)) {
        return 'Rp 0';
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
};

const Checkout: React.FC = () => {
    const { cartItems, clearCart } = useCart();

    // Hitung total dengan handle undefined values
    const total = cartItems.reduce((sum: number, item: any) => {
        const price = item.price || 0;
        const quantity = item.quantity || 1;
        return sum + (price * quantity);
    }, 0);

    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('bank');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        if (cartItems.length === 0) return;

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setShowSuccessAlert(true);
            clearCart();
            setIsProcessing(false);
        }, 3000);
    };

    // Debug cart items
    console.log('Cart Items in Checkout:', cartItems);

    if (cartItems.length === 0 && !showSuccessAlert) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
                    <p className="text-gray-600 mb-4">Silakan tambahkan produk ke keranjang terlebih dahulu</p>
                    <a href="/products" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                        Belanja Sekarang
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h2>

                {showSuccessAlert ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h3>
                        <p className="text-gray-600 mb-6">Terima kasih telah berbelanja. Pesanan Anda sedang diproses.</p>
                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                            >
                                Kembali ke Beranda
                            </button>
                            <button
                                onClick={() => window.location.href = '/products'}
                                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Lanjut Belanja
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Checkout Form Section */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Pengiriman</h3>
                                <CheckoutForm />
                            </div>
                        </div>

                        {/* Payment & Order Summary Section */}
                        <div className="space-y-6">
                            {/* Payment Methods */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Metode Pembayaran</h3>

                                <div className="space-y-4">
                                    {paymentOptions.map(option => (
                                        <div
                                            key={option.id}
                                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedPayment === option.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => setSelectedPayment(option.id)}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={selectedPayment === option.id}
                                                        onChange={() => setSelectedPayment(option.id)}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold text-gray-900">{option.name}</h4>
                                                        {selectedPayment === option.id && (
                                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                                                Dipilih
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {option.icons.map(icon => (
                                                            <span
                                                                key={icon}
                                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                                                            >
                                                                {icon}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>

                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item: any) => {
                                        const price = item.price || 0;
                                        const quantity = item.quantity || 1;
                                        const itemTotal = price * quantity;

                                        return (
                                            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'}
                                                        alt={item.name || 'Unknown Product'}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                                                        }}
                                                    />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                                                            {item.name || 'Unknown Product'}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {formatRupiah(price)} x {quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    {formatRupiah(itemTotal)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{formatRupiah(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Biaya Pengiriman</span>
                                        <span className="text-green-600">Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>{formatRupiah(total)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing || cartItems.length === 0}
                                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses Pembayaran...
                                        </div>
                                    ) : (
                                        `Bayar ${formatRupiah(total)}`
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan kami
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;