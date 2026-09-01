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
          className="absolute z-10 h-11 w-11 items-center justify-center"
          style={{ top: insets.top + 8, right: 12 }}
        >
          <IconClose className="text-surface" />
        </Pressable>
        <View className="flex-1 items-center justify-center px-4" style={{ paddingTop: insets.top + 48 }}>
          <ImagePager
            key={variant.color}
            images={images}
            index={current}
            scrollEnabled={scale <= 1.02}
            onIndexChange={onIndexChange}
            onZoomChange={setScale}
          />
        </View>
        <View className="items-center gap-3 px-4" style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
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
