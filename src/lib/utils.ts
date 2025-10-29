// src/lib/utils.ts
export const formatRupiah = (num: number | undefined | null): string => {
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

// Konversi dari USD ke IDR (1 USD = 16,000 IDR)
export const usdToIdr = (usdPrice: number): number => {
  return usdPrice * 16000;
};

// Format harga dalam Rupiah dari USD
export const formatUsdToRupiah = (usdPrice: number | undefined | null): string => {
  if (usdPrice === undefined || usdPrice === null || isNaN(usdPrice)) {
    return 'Rp 0';
  }
  const idrPrice = usdToIdr(usdPrice);
  return formatRupiah(idrPrice);
};