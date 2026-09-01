import { View } from "react-native";

export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <View
      className={`absolute inset-0 animate-skeleton bg-skeleton${className ? ` ${className}` : ""}`}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
