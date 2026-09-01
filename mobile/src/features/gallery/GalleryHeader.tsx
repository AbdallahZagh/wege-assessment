import { layout } from "@shared/layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export function GalleryHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-b border-line bg-canvas px-page pb-card"
      style={{ paddingTop: insets.top + layout.headerSafe }}
    >
      <Text className="text-eyebrow tracking-eyebrow text-muted">ATELIER</Text>
      <Text className="mt-meta text-title font-medium text-ink">New arrivals</Text>
    </View>
  );
}
