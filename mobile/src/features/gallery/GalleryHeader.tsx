import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export function GalleryHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-b border-line bg-canvas px-page pb-3"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Text className="text-[11px] tracking-[2.4px] text-muted">ATELIER</Text>
      <Text className="mt-1 text-[20px] font-medium text-ink">New arrivals</Text>
    </View>
  );
}
