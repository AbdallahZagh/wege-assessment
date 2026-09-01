import { useCallback, useState } from "react";
import type { Product, ProductVariant } from "../../../lib/products";

export type ProductCardState = {
  selectedVariantIndex: number;
  variant: ProductVariant;
  favorite: boolean;
  viewerOpen: boolean;
  imageIndex: number;
  selectVariant: (index: number) => void;
  toggleFavorite: () => void;
  openViewer: () => void;
  closeViewer: () => void;
  setImageIndex: (index: number) => void;
};

export function useProductCardState(product: Product): ProductCardState {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const variant = product.variants[selectedVariantIndex] ?? product.variants[0];

  const selectVariant = useCallback((index: number) => {
    setSelectedVariantIndex(index);
    setImageIndex(0);
  }, []);

  const toggleFavorite = useCallback(() => {
    setFavorite((value) => !value);
  }, []);

  const openViewer = useCallback(() => {
    setViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
  }, []);

  return {
    selectedVariantIndex,
    variant,
    favorite,
    viewerOpen,
    imageIndex,
    selectVariant,
    toggleFavorite,
    openViewer,
    closeViewer,
    setImageIndex,
  };
}
