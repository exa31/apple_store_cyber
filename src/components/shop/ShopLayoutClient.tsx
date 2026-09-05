"use client";

import { useEffect, useState } from "react";
import SideBar from "@/components/shop/SideBar";
import { usePathname } from "next/navigation";

interface CategoryType {
  name: string;
  _id?: string;
  id?: string;
}

export default function ShopLayoutClient({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const catList = Array.isArray(data) ? data : (data?.data || data?.categories || []);
        if (Array.isArray(catList)) setCategories(catList);
      })
      .catch(() => {});
  }, []);

  const isCatalogRoot = pathname === "/shop";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start gap-8">
        {isCatalogRoot && <SideBar categories={categories} />}
        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}
