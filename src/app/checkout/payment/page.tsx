"use client";

import ListOrder from "@/components/checkout/ListOrder";
import PaymentSummary from "@/components/checkout/PaymentSummary";
import { AddressProvider, CartProvider } from "@/context";
import { Suspense, useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

function PaymentContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("order_id") || undefined;
  const router = useRouter();

  // If order_id is present in search param, redirect cleanly to the dedicated continue payment page
  useEffect(() => {
    if (orderIdParam) {
      router.replace(`/checkout/payment/${orderIdParam}`);
    }
  }, [orderIdParam, router]);

  const cartProvider = useContext(CartProvider);
  const addressProvider = useContext(AddressProvider);
  const address = addressProvider?.address || "";
  const setAddress = addressProvider?.setAddress || (() => {});
  const cart = cartProvider?.cart || [];
  const setCart = cartProvider?.setCart;

  const [activePayment, setActivePayment] = useState<any>(null);
  const [loadingCart, setLoadingCart] = useState(false);

  // If cart is empty on initial mount and no active order yet, fetch from cart API
  useEffect(() => {
    if (cart.length === 0 && !activePayment && !orderIdParam && setCart) {
      setLoadingCart(true);
      axios
        .get("/api/cart")
        .then((res) => {
          if (res.data?.products && Array.isArray(res.data.products)) {
            setCart(res.data.products);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingCart(false));
    }
  }, [cart.length, activePayment, orderIdParam, setCart]);

  // Determine if viewing an active pending order or current cart checkout
  const isViewingActiveOrder = Boolean(
    activePayment?.order &&
      activePayment.order.status_payment === "pending" &&
      activePayment.order.order_items &&
      activePayment.order.order_items.length > 0
  );

  const displayItems = isViewingActiveOrder
    ? activePayment.order.order_items
    : cart;

  const subTotal = isViewingActiveOrder
    ? activePayment.order.order_items.reduce((acc: number, item: any) => {
        const p =
          item.product?.price ||
          (typeof item._id === "object" ? item._id?.price : 0) ||
          item.price ||
          0;
        return acc + p * (item.quantity || 1);
      }, 0)
    : cart.reduce((acc, item) => {
        return acc + (item.product?.price || 0) * (item.quantity || 0);
      }, 0);

  return (
    <div className="w-full">
      <div className="pb-4 border-b border-neutral-200 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Order Review & Payment
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Finalize your order details and proceed to secure payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 border border-neutral-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900">
              Items in this Order ({displayItems.length})
            </h2>
            {isViewingActiveOrder && (
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Order #{String(activePayment.order._id).slice(-6)}
              </span>
            )}
          </div>

          {displayItems.length > 0 ? (
            <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto pr-2">
              {displayItems.map((item: any, index: number) => (
                <ListOrder
                  data={item}
                  key={item._id?._id || item._id || index}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-400 text-xs">
              {loadingCart
                ? "Loading order items..."
                : "No items found in this order."}
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <PaymentSummary
            setCart={setCart || (() => {})}
            subTotal={subTotal}
            setAddress={setAddress}
            addressId={address}
            targetOrderId={orderIdParam}
            onActivePaymentChange={setActivePayment}
          />
        </div>
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-neutral-400">
          Loading payment details...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}