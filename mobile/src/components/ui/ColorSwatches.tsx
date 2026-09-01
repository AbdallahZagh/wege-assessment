import { isLightColor } from "@shared/color";
import { tokens } from "@shared/tokens";
import { Pressable, Text, View } from "react-native";
import type { ProductVariant } from "../../lib/products";

type Props = {
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
}: Props) {
  const isViewer = variant === "viewer";
  const selected = variants[selectedIndex];
  const size = isViewer ? tokens.size.swatchViewer : tokens.size.swatch;

  return (
    <View className={isViewer ? "items-center gap-2" : undefined}>
      {isViewer ? (
        <Text style={{ fontSize: 12, lineHeight: 16, color: "rgba(255,255,255,0.8)" }}>
          {selected?.color}
        </Text>
      ) : null}
      <View className={isViewer ? "flex-row flex-wrap justify-center gap-3" : "flex-row flex-wrap gap-swatch"}>
        {variants.map((item, index) => {
          const active = index === selectedIndex;
          const swatch = (
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: item.colorCode,
                borderWidth: 1,
                borderColor: isLightColor(item.colorCode) ? tokens.color.border : "transparent",
              }}
            />
          );

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
                      borderRadius: size,
                      backgroundColor: tokens.color.bg,
                      borderWidth: 1.5,
                      borderColor: tokens.color.text,
                    }
                  : undefined
              }
            >
              {swatch}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
