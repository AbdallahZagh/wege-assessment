import { layout } from "@shared/layout";
import { Dimensions, FlatList, View } from "react-native";
import { productImageSource } from "../../../lib/images";
import { ZoomableImage } from "./ZoomableImage";

export type ImagePagerProps = {
  images: string[];
  index: number;
  scrollEnabled: boolean;
  onIndexChange: (index: number) => void;
  onZoomChange: (scale: number) => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export function ImagePager({
  images,
  index,
  scrollEnabled,
  onIndexChange,
  onZoomChange,
}: ImagePagerProps) {
  const horizontalInset = layout.viewerPaddingX * 2;
  const width = Math.min(
    SCREEN_WIDTH - horizontalInset,
    (SCREEN_HEIGHT * layout.viewerMaxHeightRatio * layout.aspectProductW) / layout.aspectProductH,
  );

  return (
    <View style={{ width, aspectRatio: layout.aspectProductW / layout.aspectProductH }} className="overflow-hidden bg-surface">
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const next = Math.round(event.nativeEvent.contentOffset.x / width);
          if (next !== index && next >= 0 && next < images.length) {
            onIndexChange(next);
          }
        }}
        renderItem={({ item }) => (
          <View style={{ width, aspectRatio: layout.aspectProductW / layout.aspectProductH }}>
            <ZoomableImage source={productImageSource(item)} onZoomChange={onZoomChange} />
          </View>
        )}
      />
    </View>
  );
}
