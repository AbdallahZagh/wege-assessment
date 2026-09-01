import { Pressable, View } from "react-native";
import type { ProductVariant } from "../../lib/products";

export type ColorSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function ColorSwatches({
  variants,
  selectedIndex,
  onSelect,
}: ColorSwatchesProps) {
  return (
    <View className="flex-row flex-wrap gap-swatch">
      {variants.map((variant, index) => {
        const selected = index === selectedIndex;
        return (
          <Pressable
            key={variant.color}
            onPress={() => onSelect(index)}
            accessibilityRole="button"
            accessibilityLabel={variant.color}
            accessibilityState={{ selected }}
            className={`size-swatch rounded-full ${
              selected ? "border-2 border-ink" : "border border-line"
            }`}
            style={{ backgroundColor: variant.colorCode }}
          />
        );
      })}
    </View>
  );
}
