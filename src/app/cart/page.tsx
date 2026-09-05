"use client";

import ListCart from "@/components/cart/ListCart";
import OrderSummary from "@/components/cart/OrderSummary";
import { CartProvider } from "@/context";
import Link from "next/link";
import { useContext } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";

export default function Cart() {
  const cartContext = useContext(CartProvider);
  const cart = cartContext?.cart || [];

  const subTotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <HiOutlineShoppingBag className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Your Bag is Empty
          </h1>
          <p className="text-sm text-neutral-500">
            Items you add to your shopping bag will appear here. Enjoy complimentary nationwide delivery on all Apple orders.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-semibold transition-transform active:scale-95 shadow-md"
            >
              Start Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Review Your Bag
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Free standard delivery on all qualifying orders &bull; {totalItems} items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Cart Items list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => (
            <ListCart data={item} key={index} />
          ))}

          <div className="pt-4 flex justify-between items-center">
            <Link
              href="/shop"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              &larr; Continue shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <OrderSummary subTotal={subTotal} />
          </div>
        </div>
      </div>
    </div>
  );
}