import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    lineHeight: 28,
    color: "#757575",
  },
});

export function IconBrokenImage({ className }: { className?: string }) {
  return (
    <Text style={styles.icon} accessibilityElementsHidden>
      ▢
    </Text>
  );
}
