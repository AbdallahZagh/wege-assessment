import { Text, View } from "react-native";

export type ImageIndicatorProps = {
  total: number;
  current: number;
};

export function ImageIndicator({ total, current }: ImageIndicatorProps) {
  return (
    <View className="items-center gap-card-gap">
      <Text className="text-indicator text-surface/80">
        {current + 1} / {total}
      </Text>
      {total > 1 ? (
        <View className="flex-row gap-indicator-gap">
          {Array.from({ length: total }, (_, index) => (
            <View
              key={index}
              className={`size-dot rounded-full ${
                index === current ? "bg-surface" : "bg-surface/40"
              }`}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
