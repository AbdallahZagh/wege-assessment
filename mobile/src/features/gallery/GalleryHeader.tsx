import { galleryCopy } from "@shared/gallery";
import { layout } from "@shared/layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export function GalleryHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-b border-line bg-canvas px-page py-header-y"
      style={{ paddingTop: insets.top + layout.headerSafe }}
    >
      <Text className="text-title font-medium tracking-tight text-ink">
        {galleryCopy.storeName}
      </Text>
      <Text className="mt-meta text-eyebrow tracking-eyebrow text-muted">
        {galleryCopy.pageLabel}
      </Text>
    </View>
  );
}
