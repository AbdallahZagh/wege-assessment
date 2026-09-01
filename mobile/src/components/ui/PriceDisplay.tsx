import { Text, View } from "react-native";
import { formatPrice } from "../../lib/formatPrice";

export type PriceDisplayProps = {
  price: number;
  oldPrice?: number;
};

export function PriceDisplay({ price, oldPrice }: PriceDisplayProps) {
  return (
    <View className="flex-row items-baseline gap-price-gap">
      <Text className="text-body font-medium leading-body-tight text-ink">
        {formatPrice(price)}
      </Text>
      {oldPrice !== undefined ? (
        <Text className="text-price-old leading-price-old text-muted line-through">
          {formatPrice(oldPrice)}
        </Text>
      ) : null}
    </View>
  );
}
