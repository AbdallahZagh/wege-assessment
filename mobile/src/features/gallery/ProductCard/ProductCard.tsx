import { ColorSwatches } from "../../../components/ui/ColorSwatches";
import { FavoriteButton } from "../../../components/ui/FavoriteButton";
import { PriceDisplay } from "../../../components/ui/PriceDisplay";
import { ProductImage } from "../../../components/ui/ProductImage";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { useProductCardState } from "../hooks/useProductCardState";
import type { Product } from "../../../lib/products";
import { View, Text } from "react-native";

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const state = useProductCardState(product);
  const preview = state.variant.images[0];

  return (
    <View className="flex-1 overflow-hidden rounded-2xl bg-surface">
      <View className="relative">
        <ProductImage
          path={preview}
          alt={`${product.name} in ${state.variant.color}`}
          onOpen={state.openViewer}
        />
        <FavoriteButton selected={state.favorite} onToggle={state.toggleFavorite} />
      </View>
      <View className="gap-2 px-3 py-3">
        <Text className="text-[14px] font-medium leading-[18px] text-ink" numberOfLines={2}>
          {product.name}
        </Text>
        <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        <View className="flex-row items-center justify-between">
          <ColorSwatches
            variants={product.variants}
            selectedIndex={state.selectedVariantIndex}
            onSelect={state.selectVariant}
          />
          <Text className="text-[11px] text-muted">{state.variant.color}</Text>
        </View>
      </View>
      {state.viewerOpen ? (
        <ImageViewer
          productName={product.name}
          variants={product.variants}
          selectedVariantIndex={state.selectedVariantIndex}
          imageIndex={state.imageIndex}
          onIndexChange={state.setImageIndex}
          onVariantChange={state.selectVariant}
          onClose={state.closeViewer}
        />
      ) : null}
    </View>
  );
}
