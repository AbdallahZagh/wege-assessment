import { Text, View } from "react-native";
import { formatPrice } from "../../lib/formatPrice";

export function PriceDisplay({
  price,
  oldPrice,
}: {
  price: number;
  oldPrice?: number;
}) {
  return (
    <View className="flex-row flex-wrap items-baseline gap-price-gap">
      <Text className="text-price font-medium leading-tight text-ink">{formatPrice(price)}</Text>
      {oldPrice != null ? (
        <Text className="text-price-old leading-tight text-muted line-through">
          {formatPrice(oldPrice)}
        </Text>
      ) : null}
    </View>
  );
}
