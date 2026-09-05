"use client";

import { useEffect, useState } from "react";
import CardShop from "@/components/shop/Card";
import CardSkeleton from "@/components/shop/CardSkeleton";
import { CardProps } from "../type";
import { FiClock, FiTag } from "react-icons/fi";
import Link from "next/link";

export default function DiscountSec() {
  const [data, setData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<{ _id: string }[]>([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch("/api/products?limit=4&skip=12")
      .then((res) => res.json())
      .then((resData) => {
        const prods = resData?.products || resData?.data?.products;
        if (isMounted && prods) {
          setData(prods);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    fetch("/api/like")
      .then((res) => (res.status === 200 ? res.json() : []))
      .then((favs) => {
        const list = Array.isArray(favs) ? favs : (favs?.data || favs?.likes || []);
        if (isMounted && Array.isArray(list)) {
          setFavorites(list);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && data.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      {/* Discount Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-black text-white p-8 sm:p-12 mb-10 border border-neutral-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold">
              <FiTag /> Special Cyber Promotion
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Limited-Time Apple Deals
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg">
              Save up to 20% on certified authentic Apple devices with official nationwide warranty.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-4 py-2.5 rounded-full border border-white/10">
              <FiClock className="text-red-400" />
              <span>Ends Sunday 23:59 WIB</span>
            </div>
            <Link
              href="/shop"
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-transform active:scale-95"
            >
              Shop All Deals
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of discounted items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))
          : data.map((item) => (
              <CardShop
                key={item._id}
                product={item}
                favorite={favorites}
                setFavorite={setFavorites}
              />
            ))}
      </div>
    </section>
  );
}