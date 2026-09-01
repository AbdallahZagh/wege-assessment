import { layout } from "@shared/layout";
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
const SWIPE_THRESHOLD = layout.swipeThreshold;

export type ZoomableImageProps = {
  source: ImageSourcePropType;
  resetKey: string;
  onZoomChange?: (scale: number) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

export function ZoomableImage({
  source,
  resetKey,
  onZoomChange,
  onSwipeLeft,
  onSwipeRight,
}: ZoomableImageProps) {
  const [loading, setLoading] = useState(true);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panStartX = useSharedValue(0);
  const panStartY = useSharedValue(0);
  const frameW = useSharedValue(1);
  const frameH = useSharedValue(1);

  const reportZoom = (value: number) => {
    onZoomChange?.(value);
  };

  const swipeLeft = () => {
    onSwipeLeft?.();
  };

  const swipeRight = () => {
    onSwipeRight?.();
  };

  useEffect(() => {
    scale.value = 1;
    savedScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    panStartX.value = 0;
    panStartY.value = 0;
    setLoading(true);
  }, [resetKey, source]);

  useEffect(() => {
    onZoomChange?.(1);
  }, [resetKey, source, onZoomChange]);

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, savedScale.value * event.scale));
      scale.value = next;
      runOnJS(reportZoom)(next);
    })
    .onEnd(() => {
      if (scale.value <= 1.05) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        panStartX.value = 0;
        panStartY.value = 0;
        runOnJS(reportZoom)(1);
        return;
      }
      savedScale.value = scale.value;
      runOnJS(reportZoom)(scale.value);
    });

  const pan = Gesture.Pan()
    .minPointers(1)
    .maxPointers(1)
    .onBegin(() => {
      panStartX.value = translateX.value;
      panStartY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (scale.value > 1.05) {
        const maxX = ((scale.value - 1) * frameW.value) / 2;
        const maxY = ((scale.value - 1) * frameH.value) / 2;
        translateX.value = Math.max(
          -maxX,
          Math.min(maxX, panStartX.value + event.translationX),
        );
        translateY.value = Math.max(
          -maxY,
          Math.min(maxY, panStartY.value + event.translationY),
        );
      }
    })
    .onEnd((event) => {
      if (scale.value > 1.05) {
        panStartX.value = translateX.value;
        panStartY.value = translateY.value;
        return;
      }
      if (event.translationX <= -SWIPE_THRESHOLD) {
        runOnJS(swipeLeft)();
      } else if (event.translationX >= SWIPE_THRESHOLD) {
        runOnJS(swipeRight)();
      }
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
        className="h-full w-full overflow-hidden bg-surface"
        onLayout={(event) => {
          frameW.value = event.nativeEvent.layout.width;
          frameH.value = event.nativeEvent.layout.height;
        }}
      >
        {loading ? <ImageSkeleton /> : null}
        <Animated.View style={[{ width: "100%", height: "100%" }, animatedStyle]}>
          <Image
            source={source}
            contentFit="contain"
            contentPosition="center"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setLoading(false)}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
