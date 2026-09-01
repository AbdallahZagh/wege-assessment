import { layout } from "@shared/layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e6",
    backgroundColor: "#fafaf8",
    paddingHorizontal: layout.page,
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "500",
    color: "#111111",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    color: "#757575",
  },
});

export function GalleryHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + layout.headerSafe }]}>
      <Text style={styles.title}>WEGE Store</Text>
      <Text style={styles.label}>Home</Text>
    </View>
  );
}
