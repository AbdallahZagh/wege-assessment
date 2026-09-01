import { layout } from "@shared/layout";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorSwatches } from "../../../components/ui/ColorSwatches";
import { IconClose } from "../../../components/ui/IconClose";
import { ImageIndicator } from "./ImageIndicator";
import { ImagePager } from "./ImagePager";
import type { ProductVariant } from "../../../lib/products";

export type ImageViewerProps = {
  productName: string;
  variants: ProductVariant[];
  selectedVariantIndex: number;
  imageIndex: number;
  onIndexChange: (index: number) => void;
  onVariantChange: (index: number) => void;
  onClose: () => void;
};

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

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-overlay">
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={`Close gallery for ${productName}`}
          className="absolute z-10 size-btn-close items-center justify-center"
          style={{ top: insets.top + layout.headerSafe, right: layout.page }}
        >
          <IconClose className="text-surface" />
        </Pressable>
        <View
          className="flex-1 items-center justify-center px-viewer-x"
          style={{ paddingTop: insets.top + layout.viewerTop }}
        >
          <ImagePager
            key={variant.color}
            images={images}
            index={current}
            scrollEnabled={scale <= 1.02}
            onIndexChange={onIndexChange}
            onZoomChange={setScale}
          />
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
