import { Image } from "expo-image";
import { useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ImageSkeleton } from "../../../components/ui/ImageSkeleton";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export type ZoomableImageProps = {
  source: ImageSourcePropType;
  resetKey: string;
  onZoomChange?: (scale: number) => void;
};

export function ZoomableImage({
  source,
  resetKey,
  onZoomChange,
}: ZoomableImageProps) {
  const [loading, setLoading] = useState(true);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const frameW = useSharedValue(1);
  const frameH = useSharedValue(1);

  const reportZoom = (value: number) => {
    onZoomChange?.(value);
  };

  useEffect(() => {
    scale.value = 1;
    startScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    startX.value = 0;
    startY.value = 0;
    setLoading(true);
    onZoomChange?.(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset animated values when image changes
  }, [resetKey, source]);

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, startScale.value * event.scale));
      scale.value = next;
      runOnJS(reportZoom)(next);
    })
    .onEnd(() => {
      if (scale.value <= 1.05) {
        scale.value = withTiming(1);
        startScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        startX.value = 0;
        startY.value = 0;
        runOnJS(reportZoom)(1);
        return;
      }
      startScale.value = scale.value;
    });

  const pan = Gesture.Pan()
    .minPointers(1)
    .maxPointers(1)
    .onBegin(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (scale.value <= 1) {
        return;
      }
      const maxX = ((scale.value - 1) * frameW.value) / 2;
      const maxY = ((scale.value - 1) * frameH.value) / 2;
      translateX.value = Math.max(
        -maxX,
        Math.min(maxX, startX.value + event.translationX),
      );
      translateY.value = Math.max(
        -maxY,
        Math.min(maxY, startY.value + event.translationY),
      );
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
        {loading ? <ImageSkeleton /> : null}
        <Animated.View style={[{ width: "100%", height: "100%" }, animatedStyle]}>
          <Image
            source={source}
            contentFit="cover"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setLoading(false)}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
