import { layout } from "@shared/layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export function GalleryHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="min-h-header justify-center border-b border-line bg-canvas px-page"
      style={{ paddingTop: insets.top + layout.headerSafe, paddingBottom: 12 }}
    >
      <Text className="text-header font-medium leading-tight text-ink">WEGE Store</Text>
      <Text className="text-subheader leading-tight text-muted">Home</Text>
    </View>
  );
}
