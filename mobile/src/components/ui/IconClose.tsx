import { Text } from "react-native";

export function IconClose({ className }: { className?: string }) {
  return (
    <Text className={className} style={{ fontSize: 22, lineHeight: 24 }}>
      ×
    </Text>
  );
}
