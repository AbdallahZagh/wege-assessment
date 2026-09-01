import { Text, View } from "react-native";

export type ImageIndicatorProps = {
  total: number;
  current: number;
};

export function ImageIndicator({ total, current }: ImageIndicatorProps) {
  return (
    <View className="items-center gap-2">
      <Text className="text-[12px] text-surface">
        {current + 1} / {total}
      </Text>
      {total > 1 ? (
        <View className="flex-row gap-1.5">
          {Array.from({ length: total }, (_, index) => (
            <View
              key={index}
              className={`h-1.5 w-1.5 rounded-full ${
                index === current ? "bg-surface" : "bg-surface/40"
              }`}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
