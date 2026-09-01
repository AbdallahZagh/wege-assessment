import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function ImageSkeleton({ className }: { className?: string }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, [progress]);

  const highlightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 320 - 160 }],
  }));

  return (
    <View
      className={`absolute inset-0 overflow-hidden bg-skeleton${className ? ` ${className}` : ""}`}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "65%",
            backgroundColor: "rgba(255, 251, 247, 0.7)",
          },
          highlightStyle,
        ]}
      />
    </View>
  );
}
