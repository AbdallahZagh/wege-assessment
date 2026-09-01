import { ColorSwatches } from "../../../components/ui/ColorSwatches";
import { FavoriteButton } from "../../../components/ui/FavoriteButton";
import { PriceDisplay } from "../../../components/ui/PriceDisplay";
import { ProductImage } from "../../../components/ui/ProductImage";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { useProductCardState } from "../hooks/useProductCardState";
import type { Product } from "../../../lib/products";
import { Text, View } from "react-native";

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const state = useProductCardState(product);
  const preview = state.variant.images[0];

  return (
    <View className="flex-1">
      <View className="relative border border-line bg-surface shadow-favorite">
        <ProductImage
          path={preview}
          alt={`${product.name} in ${state.variant.color}`}
          onOpen={state.openViewer}
        />
        <FavoriteButton selected={state.favorite} onToggle={state.toggleFavorite} />
      </View>
      <View className="gap-card-gap pt-card-gap">
        <View className="flex-row items-start justify-between gap-card">
          <Text
            className="min-w-0 flex-1 text-body font-medium leading-body text-ink"
            numberOfLines={2}
          >
            {product.name}
          </Text>
          <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        </View>
        <View className="flex-row items-center justify-between gap-card-gap">
          <ColorSwatches
            variants={product.variants}
            selectedIndex={state.selectedVariantIndex}
            onSelect={state.selectVariant}
          />
          <Text className="text-eyebrow tracking-eyebrow text-muted">
            {state.variant.color}
          </Text>
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
