"use client";

import CardShop from "@/components/shop/Card";
import { CardProps } from "../../type";

export default function Card({ data }: { data: CardProps }) {
  return <CardShop product={data} />;
}