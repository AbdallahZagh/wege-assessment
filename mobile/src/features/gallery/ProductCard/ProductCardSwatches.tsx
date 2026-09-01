import { Pressable, StyleSheet, View } from "react-native";
import type { ProductVariant } from "../../../lib/products";

const SWATCH_SIZE = 18;
const SWATCH_GAP = 6;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SWATCH_GAP,
  },
  swatchOuter: {
    padding: 2,
    borderRadius: SWATCH_SIZE,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#111111",
  },
  swatch: {
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    borderRadius: SWATCH_SIZE / 2,
    borderWidth: 1,
  },
});

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

export type ProductCardSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function ProductCardSwatches({
  variants,
  selectedIndex,
  onSelect,
}: ProductCardSwatchesProps) {
  return (
    <View style={styles.row}>
      {variants.map((item, index) => {
        const active = index === selectedIndex;
        const needsStroke = isLightColor(item.colorCode);

        const swatch = (
          <View
            style={[
              styles.swatch,
              {
                backgroundColor: item.colorCode,
                borderColor: needsStroke ? "#e8e8e6" : "transparent",
              },
            ]}
          />
        );

        return (
          <Pressable
            key={item.color}
            onPress={() => onSelect(index)}
            accessibilityRole="button"
            accessibilityLabel={item.color}
            accessibilityState={{ selected: active }}
          >
            {active ? <View style={styles.swatchOuter}>{swatch}</View> : swatch}
          </Pressable>
        );
      })}
    </View>
  );
}
