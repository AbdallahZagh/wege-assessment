import { formatPrice } from "@/lib/formatPrice";

export type PriceDisplayProps = {
  price: number;
  oldPrice?: number;
};

export function PriceDisplay({ price, oldPrice }: PriceDisplayProps) {
  return (
    <p className="shrink-0 text-right text-[13px] leading-5">
      <span className="font-medium">{formatPrice(price)}</span>
      {oldPrice !== undefined ? (
        <span className="ml-1.5 text-[12px] text-muted line-through">{formatPrice(oldPrice)}</span>
      ) : null}
    </p>
  );
}
