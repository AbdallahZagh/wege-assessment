import { tokens } from "@shared/tokens";
import { Pressable, Text, View } from "react-native";
import type { ProductVariant } from "../../lib/products";

export type ColorSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  variant?: "card" | "viewer";
};

function isLightColor(hex: string): boolean {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return false;
  }

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 200;
}

export function ColorSwatches({
  variants,
  selectedIndex,
  onSelect,
  variant = "card",
}: ColorSwatchesProps) {
  const isViewer = variant === "viewer";
  const selected = variants[selectedIndex];
  const swatchSize = isViewer ? tokens.size.swatchViewer : tokens.size.swatch;

  return (
    <View className={isViewer ? "items-center gap-2" : undefined}>
      {isViewer ? (
        <Text className="text-name font-medium text-surface">{selected?.color}</Text>
      ) : null}
      <View className={isViewer ? "flex-row flex-wrap justify-center gap-3" : "flex-row flex-wrap gap-swatch"}>
        {variants.map((item, index) => {
          const active = index === selectedIndex;
          const needsStroke = isLightColor(item.colorCode);

          return (
            <Pressable
              key={item.color}
              onPress={() => onSelect(index)}
              accessibilityRole="button"
              accessibilityLabel={item.color}
              accessibilityState={{ selected: active }}
              style={
                active
                  ? {
                      padding: 2,
                      borderRadius: swatchSize,
                      backgroundColor: tokens.color.bg,
                      borderWidth: 1.5,
                      borderColor: tokens.color.text,
                    }
                  : undefined
              }
            >
              <View
                style={{
                  width: swatchSize,
                  height: swatchSize,
                  borderRadius: swatchSize / 2,
                  backgroundColor: item.colorCode,
                  borderWidth: 1,
                  borderColor: needsStroke ? tokens.color.border : "transparent",
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
