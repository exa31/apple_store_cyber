"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { CartProvider, DiscountProvider } from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "@/components/ui/Toast";

interface CartItems {
  product: {
    _id: string;
    name: string;
    price: number;
    image_thumbnail: string;
  };
  quantity: number;
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItems[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <DiscountProvider.Provider value={{ discount, setDiscount }}>
      <CartProvider.Provider value={{ cart, setCart }}>
        <SessionProvider>
          <AntdRegistry>
            <main className="flex flex-col min-h-screen">
              {!isAuthPage && (
                <header className="sticky top-0 z-20 w-full print:hidden">
                  <Navbar />
                </header>
              )}
              <div className="flex-1 w-full">{children}</div>
              {!isAuthPage && (
                <footer className="mt-auto print:hidden">
                  <Footer />
                </footer>
              )}
            </main>
            <div className="print:hidden">
              <ToastContainer />
            </div>
          </AntdRegistry>
        </SessionProvider>
      </CartProvider.Provider>
    </DiscountProvider.Provider>
  );
}
