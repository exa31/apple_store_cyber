"use client";

import CardShop from "@/components/shop/Card";
import { CardProps } from "../type";

export default function CardLikes({
  data,
  removeFavorite,
}: {
  data: CardProps;
  removeFavorite: (id: string) => void;
}) {
  return (
    <CardShop
      product={data}
      favorite={[{ _id: data._id }]}
      setFavorite={(newFavs) => {
        const stillIn = newFavs.some((item) => item._id === data._id);
        if (!stillIn) {
          removeFavorite(data._id);
        }
      }}
    />
  );
}