import { formatPrice } from "@/lib/formatPrice";

export function PriceDisplay({
  price,
  oldPrice,
}: {
  price: number;
  oldPrice?: number;
}) {
  return (
    <p className="text-price leading-tight">
      <span className="font-medium text-ink">{formatPrice(price)}</span>
      {oldPrice != null ? (
        <span className="ml-price-gap text-price-old leading-tight text-muted line-through">
          {formatPrice(oldPrice)}
        </span>
      ) : null}
    </p>
  );
}
