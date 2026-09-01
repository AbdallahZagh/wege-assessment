import { Pressable, Text, View } from "react-native";
import type { ProductVariant } from "../../lib/products";

export type ColorSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  variant?: "card" | "viewer";
};

export function ColorSwatches({
  variants,
  selectedIndex,
  onSelect,
  variant = "card",
}: ColorSwatchesProps) {
  const isViewer = variant === "viewer";
  const selected = variants[selectedIndex];

  return (
    <View className={isViewer ? "items-center gap-2" : undefined}>
      {isViewer ? (
        <Text className="text-body font-medium text-surface">{selected?.color}</Text>
      ) : null}
      <View
        className={
          isViewer
            ? "flex-row flex-wrap justify-center gap-3 rounded-full bg-surface px-4 py-3 shadow-viewer"
            : "flex-row flex-wrap gap-swatch"
        }
      >
        {variants.map((item, index) => {
          const active = index === selectedIndex;
          return (
            <Pressable
              key={item.color}
              onPress={() => onSelect(index)}
              accessibilityRole="button"
              accessibilityLabel={item.color}
              accessibilityState={{ selected: active }}
              className={
                isViewer
                  ? `size-swatch-viewer rounded-full border-2 shadow-favorite ${
                      active ? "border-ink" : "border-line"
                    }`
                  : `size-swatch rounded-full border ${
                      active ? "border-2 border-ink" : "border border-line"
                    }`
              }
              style={{ backgroundColor: item.colorCode }}
            />
          );
        })}
      </View>
    </View>
  );
}
