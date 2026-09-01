import { formatPrice } from "@/lib/formatPrice";

export type PriceDisplayProps = {
  price: number;
  oldPrice?: number;
};

export function PriceDisplay({ price, oldPrice }: PriceDisplayProps) {
  return (
    <p className="shrink-0 text-right text-price leading-body">
      <span className="font-medium">{formatPrice(price)}</span>
      {oldPrice !== undefined ? (
        <span className="ml-price-gap text-price-old leading-price-old text-muted line-through">
          {formatPrice(oldPrice)}
        </span>
      ) : null}
    </p>
  );
}
