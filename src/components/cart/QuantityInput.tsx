"use client";

interface QuantityInputProps {
  quantity: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

export default function QuantityInput({
  quantity,
  handleDecrement,
  handleIncrement,
}: QuantityInputProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-neutral-300 bg-white">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-semibold text-xs transition-colors"
      >
        &minus;
      </button>
      <span className="w-6 text-center text-xs font-semibold text-neutral-900 select-none">
        {quantity}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-semibold text-xs transition-colors"
      >
        +
      </button>
    </div>
  );
}