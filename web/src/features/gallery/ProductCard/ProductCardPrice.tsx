import { formatPrice } from "@/lib/formatPrice";

export type ProductCardPriceProps = {
  price: number;
  oldPrice?: number;
};

export function ProductCardPrice({ price, oldPrice }: ProductCardPriceProps) {
  return (
    <p className="text-price leading-tight">
      <span className="font-medium text-ink">{formatPrice(price)}</span>
      {oldPrice !== undefined ? (
        <span className="ml-price-gap text-price-old leading-tight text-muted line-through">
          {formatPrice(oldPrice)}
        </span>
      ) : null}
    </p>
  );
}
