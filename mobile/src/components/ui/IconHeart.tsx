import { Text } from "react-native";

type IconHeartProps = {
  filled?: boolean;
  className?: string;
};

export function IconHeart({ filled = true, className }: IconHeartProps) {
  return (
    <Text className={`text-icon-sm leading-body-tight${className ? ` ${className}` : ""}`}>
      {filled ? "♥" : "♡"}
    </Text>
  );
}
