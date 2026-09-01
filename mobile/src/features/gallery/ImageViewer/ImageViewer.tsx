import { layout, viewerFrameWidth } from "@shared/layout";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Modal, Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorSwatches } from "../../../components/ui/ColorSwatches";
import { IconClose } from "../../../components/ui/IconClose";
import { productImageSource } from "../../../lib/images";
import type { ProductVariant } from "../../../lib/products";
import { ImageIndicator } from "./ImageIndicator";
import { ZoomableImage } from "./ZoomableImage";

export type ImageViewerProps = {
  productName: string;
  variants: ProductVariant[];
  selectedVariantIndex: number;
  imageIndex: number;
  onIndexChange: (index: number) => void;
  onVariantChange: (index: number) => void;
  onClose: () => void;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const FRAME_WIDTH = viewerFrameWidth(SCREEN_WIDTH, SCREEN_HEIGHT);

export function ImageViewer({
  productName,
  variants,
  selectedVariantIndex,
  imageIndex,
  onIndexChange,
  onVariantChange,
  onClose,
}: ImageViewerProps) {
  const variant = variants[selectedVariantIndex] ?? variants[0];
  const images = variant.images;
  const current = Math.min(imageIndex, images.length - 1);
  const [scale, setScale] = useState(1);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setScale(1);
  }, [variant.color, current]);

  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        .maxPointers(1)
        .activeOffsetX([-20, 20])
        .failOffsetY([-12, 12])
        .enabled(scale <= 1.02)
        .onEnd((event) => {
          if (event.translationX <= -layout.swipeThreshold) {
            onIndexChange(Math.min(current + 1, images.length - 1));
          } else if (event.translationX >= layout.swipeThreshold) {
            onIndexChange(Math.max(current - 1, 0));
          }
        }),
    [current, images.length, onIndexChange, scale],
  );

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-overlay">
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={`Close gallery for ${productName}`}
          className="absolute z-10 size-btn-close items-center justify-center rounded-full bg-surface/15"
          style={{ top: insets.top + layout.headerSafe, right: layout.page }}
        >
          <IconClose className="text-surface" />
        </Pressable>

        <View
          className="flex-1 items-center justify-center gap-card-gap px-viewer-x"
          style={{ paddingTop: insets.top + layout.viewerTop }}
        >
          <Text className="text-center text-body font-medium text-surface">
            {productName}
          </Text>
          <GestureDetector gesture={swipeGesture}>
            <View
              style={{
                width: FRAME_WIDTH,
                aspectRatio: layout.aspectProductW / layout.aspectProductH,
              }}
              className="overflow-hidden border border-line bg-surface shadow-viewer"
            >
              <ZoomableImage
                source={productImageSource(images[current])}
                resetKey={`${variant.color}-${current}`}
                onZoomChange={setScale}
              />
            </View>
          </GestureDetector>
        </View>

        <View
          className="items-center gap-card-gap px-viewer-x"
          style={{ paddingBottom: Math.max(insets.bottom, layout.viewerBottom) }}
        >
          <ImageIndicator total={images.length} current={current} />
          <ColorSwatches
            variants={variants}
            selectedIndex={selectedVariantIndex}
            onSelect={(index) => {
              setScale(1);
              onVariantChange(index);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
