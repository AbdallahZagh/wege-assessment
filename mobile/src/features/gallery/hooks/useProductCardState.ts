import { useState } from "react";
import type { Product } from "../../../lib/products";

export function useProductCardState(product: Product) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const variant = product.variants[selectedVariantIndex] ?? product.variants[0];

  function selectVariant(index: number) {
    setSelectedVariantIndex(index);
    setImageIndex(0);
  }

  return {
    selectedVariantIndex,
    variant,
    favorite,
    viewerOpen,
    imageIndex,
    selectVariant,
    toggleFavorite: () => setFavorite((v) => !v),
    openViewer: () => setViewerOpen(true),
    closeViewer: () => setViewerOpen(false),
    setImageIndex,
  };
}
