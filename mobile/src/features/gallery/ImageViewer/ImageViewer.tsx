import { layout } from "@shared/layout";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorSwatches } from "../../../components/ui/ColorSwatches";
import { IconClose } from "../../../components/ui/IconClose";
import { productImageSource } from "../../../lib/images";
import type { ProductVariant } from "../../../lib/products";
import { ImageIndicator } from "./ImageIndicator";
import { ZoomableImage } from "./ZoomableImage";

const CLOSE_SIZE = 44;
const FOOTER_CHROME = 120;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(17, 17, 17, 0.72)",
  },
  closeBtn: {
    position: "absolute",
    zIndex: 20,
    width: CLOSE_SIZE,
    height: CLOSE_SIZE,
    borderRadius: CLOSE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: layout.viewerPaddingX,
    paddingBottom: 12,
  },
  title: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  frameArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: layout.viewerPaddingX,
    minHeight: 0,
  },
  frame: {
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  footer: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: layout.viewerPaddingX,
    paddingTop: 16,
  },
});

function useViewerFrameSize() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const chrome =
    insets.top + insets.bottom + layout.viewerTop + FOOTER_CHROME + 24;
  const maxFrameHeight = Math.max(160, height - chrome);
  const maxFrameWidth = width - layout.viewerPaddingX * 2;

  let frameWidth = maxFrameWidth;
  let frameHeight = frameWidth * (layout.aspectProductH / layout.aspectProductW);

  if (frameHeight > maxFrameHeight) {
    frameHeight = maxFrameHeight;
    frameWidth = frameHeight * (layout.aspectProductW / layout.aspectProductH);
  }

  return { frameWidth, frameHeight };
}

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
  const { frameWidth, frameHeight } = useViewerFrameSize();

  useEffect(() => {
    setScale(1);
  }, [variant.color, current]);

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.root}>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={`Close gallery for ${productName}`}
            style={[
              styles.closeBtn,
              { top: insets.top + layout.headerSafe, right: layout.page },
            ]}
          >
            <IconClose size={22} />
          </Pressable>

          <View style={[styles.header, { paddingTop: insets.top + layout.viewerTop }]}>
            <Text style={styles.title}>{productName}</Text>
          </View>

          <View style={styles.frameArea}>
            <View style={[styles.frame, { width: frameWidth, height: frameHeight }]}>
              <ZoomableImage
                source={productImageSource(images[current])}
                resetKey={`${variant.color}-${current}`}
                onZoomChange={setScale}
                onSwipeLeft={() => {
                  if (scale <= 1.02) {
                    onIndexChange(Math.min(current + 1, images.length - 1));
                  }
                }}
                onSwipeRight={() => {
                  if (scale <= 1.02) {
                    onIndexChange(Math.max(current - 1, 0));
                  }
                }}
              />
            </View>
          </View>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, layout.viewerBottom) }]}>
            <ImageIndicator total={images.length} current={current} />
            <ColorSwatches
              variant="viewer"
              variants={variants}
              selectedIndex={selectedVariantIndex}
              onSelect={(index) => {
                setScale(1);
                onVariantChange(index);
              }}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}
