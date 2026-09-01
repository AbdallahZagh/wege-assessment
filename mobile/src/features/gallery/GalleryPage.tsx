import { View } from "react-native";
import { ProductGrid } from "./ProductGrid";
import { GalleryHeader } from "./GalleryHeader";

export function GalleryPage() {
  return (
    <View className="flex-1 bg-canvas">
      <GalleryHeader />
      <ProductGrid />
    </View>
  );
}
