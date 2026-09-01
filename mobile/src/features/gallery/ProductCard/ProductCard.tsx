import { ImageViewer } from "../ImageViewer/ImageViewer";
import { useProductCardState } from "../hooks/useProductCardState";
import type { Product } from "../../../lib/products";
import { StyleSheet, Text, View } from "react-native";
import { ProductCardFavorite } from "./ProductCardFavorite";
import { ProductCardImage } from "./ProductCardImage";
import { PriceDisplay } from "../../../components/ui/PriceDisplay";
import { ProductCardSwatches } from "./ProductCardSwatches";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8e8e6",
    backgroundColor: "#ffffff",
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  imageWrap: {
    position: "relative",
    backgroundColor: "#f5f4f2",
  },
  body: {
    flex: 1,
    minHeight: 104,
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#e8e8e6",
  },
  name: {
    minHeight: 34,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 17,
    letterSpacing: 0.13,
    color: "#111111",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  colorLabel: {
    flexShrink: 1,
    fontSize: 11,
    color: "#757575",
  },
});

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const state = useProductCardState(product);
  const preview = state.variant.images[0];

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <ProductCardImage
          path={preview}
          alt={`${product.name} in ${state.variant.color}`}
          onOpen={state.openViewer}
        />
        <ProductCardFavorite selected={state.favorite} onToggle={state.toggleFavorite} />
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        <View style={styles.footer}>
          <ProductCardSwatches
            variants={product.variants}
            selectedIndex={state.selectedVariantIndex}
            onSelect={state.selectVariant}
          />
          <Text style={styles.colorLabel} numberOfLines={1}>
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
