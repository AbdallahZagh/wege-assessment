import { Text, View } from "react-native";
import { formatPrice } from "../../lib/formatPrice";

export type PriceDisplayProps = {
  price: number;
  oldPrice?: number;
};

export function PriceDisplay({ price, oldPrice }: PriceDisplayProps) {
  return (
    <View className="flex-row items-baseline gap-2">
      <Text className="text-[14px] font-medium leading-[18px] text-ink">
        {formatPrice(price)}
      </Text>
      {oldPrice !== undefined ? (
        <Text className="text-[13px] leading-[17px] text-muted line-through">
          {formatPrice(oldPrice)}
        </Text>
      ) : null}
    </View>
  );
}
