import { formatRupiah, getImageUrl } from "@/helper";
import Image from "next/image";

interface OrderItems {
  product: {
    _id: string;
    name: string;
    price: number;
    image_thumbnail: string;
  };
  quantity: number;
}

export default function ListOrder({ data }: { data: any }) {
  if (!data) return null;

  // Supports both cart item ({ product, quantity }) and order_item ({ _id, name, price, quantity })
  const productObj =
    data.product ||
    (data._id && typeof data._id === "object" ? data._id : null);

  const name = productObj?.name || data.name || "Apple Product";
  const price = productObj?.price ?? (data.price ?? 0);
  const image = productObj?.image_thumbnail || data.image_thumbnail || "";
  const quantity = data.quantity || 1;

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-neutral-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-xl bg-neutral-50 p-1 border border-neutral-200/60 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {image ? (
            <Image
              className="object-contain max-h-full"
              width={56}
              height={56}
              src={getImageUrl(image)}
              alt={name}
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold text-xs">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
            {name}
          </h4>
          <p className="text-[11px] text-neutral-400">
            Qty: {quantity} × {formatRupiah(price)}
          </p>
        </div>
      </div>
      <p className="text-xs font-bold text-neutral-900">
        {formatRupiah(quantity * price)}
      </p>
    </div>
  );
}