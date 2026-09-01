import { Text, View } from "react-native";
import { formatPrice } from "../../../lib/formatPrice";

export type ProductCardPriceProps = {
  price: number;
  oldPrice?: number;
};

export function ProductCardPrice({ price, oldPrice }: ProductCardPriceProps) {
  return (
    <View className="flex-row flex-wrap items-baseline gap-price-gap">
      <Text className="text-price font-medium leading-tight text-ink">{formatPrice(price)}</Text>
      {oldPrice !== undefined ? (
        <Text className="text-price-old leading-tight text-muted line-through">
          {formatPrice(oldPrice)}
        </Text>
      ) : null}
    </View>
  );
}
