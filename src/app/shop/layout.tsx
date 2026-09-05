import type { Metadata } from "next";
import ShopLayoutClient from "@/components/shop/ShopLayoutClient";

export const metadata: Metadata = {
  title: "Katalog Produk Apple Resmi Indonesia | iPhone, Mac, iPad, Watch, AirPods",
  description:
    "Jelajahi seluruh lini produk Apple original bergaransi resmi di Cyber Apple Store Indonesia. Tersedia iPhone 15 series, MacBook M3, iPad Pro, Apple Watch, dan AirPods dengan promo cicilan 0%.",
  keywords: [
    "Katalog Apple Store",
    "Beli iPhone Resmi",
    "Beli MacBook Indonesia",
    "iPad Pro M4",
    "Apple Watch S9 Ultra",
    "AirPods Pro",
    "Garansi Resmi Apple Indonesia",
    "Promo Apple Store",
  ],
  openGraph: {
    title: "Katalog Produk Apple Resmi Indonesia | Cyber Apple Store",
    description:
      "Temukan produk Apple impian Anda dengan penawaran eksklusif, garansi resmi 1 tahun, dan pengiriman kilat ke seluruh Indonesia.",
    url: "/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <ShopLayoutClient>{children}</ShopLayoutClient>;
}