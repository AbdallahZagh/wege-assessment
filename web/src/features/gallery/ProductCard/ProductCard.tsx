"use client";

import { ColorSwatches } from "@/components/ui/ColorSwatches";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ProductImage } from "@/components/ui/ProductImage";
import { ImageViewer } from "@/features/gallery/ImageViewer/ImageViewer";
import { useProductCardState } from "@/features/gallery/hooks/useProductCardState";
import { productImageUrl } from "@/lib/imageUrl";
import type { Product } from "@/lib/products";

export type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: ProductCardProps) {
  const state = useProductCardState(product);
  const preview = state.variant.images[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card">
      <div className="relative shrink-0">
        <ProductImage
          src={productImageUrl(preview)}
          alt={`${product.name} in ${state.variant.color}`}
          onOpen={state.openViewer}
          priority={priority}
        />
        <FavoriteButton selected={state.favorite} onToggle={state.toggleFavorite} />
      </div>

      <div className="flex h-card-meta-h shrink-0 flex-col justify-between gap-2 px-card py-card">
        <div className="flex h-card-name-h items-start justify-between gap-2">
          <h2 className="line-clamp-2 min-w-0 flex-1 text-body font-medium leading-body-tight text-ink">
            {product.name}
          </h2>
          <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        </div>
        <div className="flex h-card-swatch-h items-center">
          <ColorSwatches
            variants={product.variants}
            selectedIndex={state.selectedVariantIndex}
            onSelect={state.selectVariant}
          />
        </div>
        <p className="h-card-color-h truncate text-eyebrow leading-none tracking-eyebrow text-muted">
          {state.variant.color}
        </p>
      </div>

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
    </article>
  );
}
