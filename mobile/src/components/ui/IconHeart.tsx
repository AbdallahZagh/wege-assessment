import { Text } from "react-native";

type IconHeartProps = {
  filled?: boolean;
  className?: string;
};

export function IconHeart({ filled = true, className }: IconHeartProps) {
  return (
    <Text className={className} style={{ fontSize: 16, lineHeight: 18 }}>
      {filled ? "♥" : "♡"}
    </Text>
  );
}
