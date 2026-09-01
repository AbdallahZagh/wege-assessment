import { Text } from "react-native";

export function IconClose({ className }: { className?: string }) {
  return (
    <Text
      className={`text-icon-md font-medium leading-none${className ? ` ${className}` : ""}`}
    >
      ×
    </Text>
  );
}
