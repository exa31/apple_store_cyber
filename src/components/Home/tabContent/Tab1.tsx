"use client";

import { useEffect, useState } from "react";
import CardShop from "@/components/shop/Card";
import CardSkeleton from "@/components/shop/CardSkeleton";
import { CardProps } from "../../type";

interface DataProduct {
  products: CardProps[];
  count: number;
  page: number;
}

export default function Tab1({ category = "", limit = 8 }: { category?: string; limit?: number }) {
  const [data, setData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<{ _id: string }[]>([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const url = category
      ? `/api/products?limit=${limit}&category=${encodeURIComponent(category)}`
      : `/api/products?limit=${limit}`;

    fetch(url)
      .then((res) => res.json())
      .then((resData: any) => {
        const prods = Array.isArray(resData?.products)
          ? resData.products
          : Array.isArray(resData?.data?.products)
          ? resData.data.products
          : [];
        if (isMounted) {
          setData(prods);
        }
      })
      .catch((err) => {
        console.error("Error fetching tab products:", err);
        if (isMounted) setData([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Fetch user favorites
    fetch("/api/like")
      .then((res) => (res.status === 200 ? res.json() : []))
      .then((favData) => {
        const list = Array.isArray(favData) ? favData : (favData?.data || favData?.likes || []);
        if (isMounted && Array.isArray(list)) {
          setFavorites(list);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [category, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(limit)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-400">
        <p className="text-sm">No products found in this collection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item: CardProps) => (
        <CardShop
          key={item._id}
          product={item}
          favorite={favorites}
          setFavorite={setFavorites}
        />
      ))}
    </div>
  );
}