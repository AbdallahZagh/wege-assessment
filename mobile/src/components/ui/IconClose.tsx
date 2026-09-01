import { Text } from "react-native";

export function IconClose({ className }: { className?: string }) {
  return (
    <Text className={`text-icon-md leading-body${className ? ` ${className}` : ""}`}>
      ×
    </Text>
  );
}
