"use client";

import CardShop from "./Card";
import { CardProps } from "../type";

interface CartItems {
  product: CardProps;
  setShow?: (show: boolean) => void;
  favorite: { _id: string }[];
  setFavorite?: (favorite: { _id: string }[]) => void;
}

export default function CardShopDetail(props: CartItems) {
  return <CardShop {...props} />;
}