import { Text } from "react-native";

type IconBrokenImageProps = {
  className?: string;
};

export function IconBrokenImage({ className }: IconBrokenImageProps) {
  return (
    <Text
      className={`text-icon-lg leading-body${className ? ` ${className}` : ""}`}
      accessibilityElementsHidden
    >
      ▢
    </Text>
  );
}
