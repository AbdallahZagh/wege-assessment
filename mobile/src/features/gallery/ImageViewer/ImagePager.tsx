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

export function ImagePager({
  images,
  index,
  scrollEnabled,
  onIndexChange,
  onZoomChange,
}: ImagePagerProps) {
  const width = Math.min(SCREEN_WIDTH - 32, (Dimensions.get("window").height * 0.85 * 3.5) / 6);

  return (
    <View style={{ width, aspectRatio: 3.5 / 6 }} className="overflow-hidden bg-surface">
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
          <View style={{ width, aspectRatio: 3.5 / 6 }}>
            <ZoomableImage
              source={productImageSource(item)}
              onZoomChange={onZoomChange}
            />
          </View>
        )}
      />
    </View>
  );
}
