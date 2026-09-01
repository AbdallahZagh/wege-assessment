import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { ImageSourcePropType } from "react-native";

export type ZoomableImageProps = {
  source: ImageSourcePropType;
  onZoomChange?: (scale: number) => void;
};

export function ZoomableImage({ source, onZoomChange }: ZoomableImageProps) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);
  const frameW = useSharedValue(1);
  const frameH = useSharedValue(1);

  const reportZoom = (value: number) => {
    onZoomChange?.(value);
  };

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      const next = Math.min(4, Math.max(1, savedScale.value * event.scale));
      scale.value = next;
    })
    .onEnd(() => {
      if (scale.value <= 1.02) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedX.value = 0;
        savedY.value = 0;
        runOnJS(reportZoom)(1);
        return;
      }
      savedScale.value = scale.value;
      runOnJS(reportZoom)(scale.value);
    });

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (scale.value <= 1) {
        return;
      }
      const maxX = ((scale.value - 1) * frameW.value) / 2;
      const maxY = ((scale.value - 1) * frameH.value) / 2;
      const nextX = savedX.value + event.translationX;
      const nextY = savedY.value + event.translationY;
      translateX.value = Math.max(-maxX, Math.min(maxX, nextX));
      translateY.value = Math.max(-maxY, Math.min(maxY, nextY));
    })
    .onEnd(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    });

  const composed = Gesture.Simultaneous(pinch, pan);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        className="h-full w-full overflow-hidden bg-skeleton"
        onLayout={(event) => {
          frameW.value = event.nativeEvent.layout.width;
          frameH.value = event.nativeEvent.layout.height;
        }}
      >
        <Animated.View style={[{ width: "100%", height: "100%" }, animatedStyle]}>
          <Image
            source={source}
            contentFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
