"use client";

import Image from "next/image";
import QuantityInput from "./QuantityInput";
import { useContext } from "react";
import { CartProvider } from "@/context";
import axios from "axios";
import { formatRupiah, getImageUrl } from "@/helper";
import { FiTrash2 } from "react-icons/fi";
import Link from "next/link";

interface CartItems {
  product: {
    _id: string;
    name: string;
    price: number;
    image_thumbnail: string;
  };
  quantity: number;
}

export default function ListCart({ data }: { data: CartItems }) {
  const cartContext = useContext(CartProvider);
  const cart = cartContext?.cart || [];
  const setCart = cartContext?.setCart;

  const handleRemove = async () => {
    try {
      const res = await axios.post("/api/cart/remove", {
        productId: data.product._id,
      });
      if (res.status === 200 && setCart) {
        const newCart = cart.filter((item) => item.product?._id !== data.product._id);
        setCart(newCart);
      }
    } catch {}
  };

  const handleDecrement = async () => {
    try {
      const res = await axios.post("/api/cart/reduce", {
        productId: data.product._id,
        quantity: 1,
      });
      if (res.status === 200 && setCart) {
        if (data.quantity <= 1) {
          const newCart = cart.filter((item) => item.product?._id !== data.product._id);
          setCart(newCart);
        } else {
          const newCart = cart.map((item) =>
            item.product?._id === data.product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          setCart(newCart);
        }
      }
    } catch {}
  };

  const handleIncrement = async () => {
    try {
      const res = await axios.post("/api/cart/add", {
        productId: data.product._id,
        quantity: 1,
      });
      if (res.status === 200 && setCart) {
        const newCart = cart.map((item) =>
          item.product?._id === data.product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        setCart(newCart);
      }
    } catch {}
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 hover:border-neutral-300 transition-colors">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link
          href={`/shop/${data.product._id}`}
          className="relative w-20 h-20 rounded-xl bg-white p-2 border border-neutral-200/60 flex-shrink-0 flex items-center justify-center"
        >
          <Image
            src={getImageUrl(data.product.image_thumbnail)}
            alt={data.product.name}
            width={80}
            height={80}
            className="object-contain max-h-full"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            href={`/shop/${data.product._id}`}
            className="font-semibold text-sm text-neutral-900 hover:text-blue-600 transition-colors line-clamp-1"
          >
            {data.product.name}
          </Link>
          <p className="text-xs text-neutral-400 mt-0.5">
            Unit Price: {formatRupiah(data.product.price)}
          </p>
        </div>
      </div>

      {/* Quantity & Line Total */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-200/60">
        <QuantityInput
          quantity={data.quantity}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />

        <div className="text-right min-w-[110px]">
          <p className="text-sm font-bold text-neutral-900">
            {formatRupiah(data.quantity * data.product.price)}
          </p>
        </div>

        <button
          onClick={handleRemove}
          aria-label="Remove item"
          className="p-2 rounded-full text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <FiTrash2 className="text-base" />
        </button>
      </div>
    </div>
  );
}