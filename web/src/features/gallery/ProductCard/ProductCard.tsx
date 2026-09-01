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
    <article>
      <div className="relative border border-line bg-surface shadow-favorite">
        <ProductImage
          src={productImageUrl(preview)}
          alt={`${product.name} in ${state.variant.color}`}
          onOpen={state.openViewer}
          priority={priority}
        />
        <FavoriteButton selected={state.favorite} onToggle={state.toggleFavorite} />
      </div>
      <div className="flex flex-col gap-card-gap pt-card-gap">
        <div className="flex items-start justify-between gap-card">
          <h2 className="min-w-0 flex-1 text-body font-medium leading-body text-ink">
            {product.name}
          </h2>
          <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        </div>
        <div className="flex items-center justify-between gap-card-gap">
          <ColorSwatches
            variants={product.variants}
            selectedIndex={state.selectedVariantIndex}
            onSelect={state.selectVariant}
          />
          <p className="text-eyebrow tracking-eyebrow text-muted">{state.variant.color}</p>
        </div>
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
