import { isLightColor } from "@shared/color";
import { Pressable, StyleSheet, View } from "react-native";
import type { ProductVariant } from "../../../lib/products";

const SIZE = 18;

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  active: {
    padding: 2,
    borderRadius: SIZE,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#111",
  },
  dot: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
  },
});

type Props = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function ProductCardSwatches({ variants, selectedIndex, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {variants.map((item, index) => {
        const active = index === selectedIndex;
        const dot = (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: item.colorCode,
                borderColor: isLightColor(item.colorCode) ? "#e8e8e6" : "transparent",
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
            {active ? <View style={styles.active}>{dot}</View> : dot}
          </Pressable>
        );
      })}
    </View>
  );
}
