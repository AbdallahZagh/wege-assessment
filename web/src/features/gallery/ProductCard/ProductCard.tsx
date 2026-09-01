"use client";

import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ProductCardFavorite } from "@/features/gallery/ProductCard/ProductCardFavorite";
import { ProductCardImage } from "@/features/gallery/ProductCard/ProductCardImage";
import { ProductCardSwatches } from "@/features/gallery/ProductCard/ProductCardSwatches";
import { ImageViewer } from "@/features/gallery/ImageViewer/ImageViewer";
import { useProductCardState } from "@/features/gallery/hooks/useProductCardState";
import { productImageUrl } from "@/lib/imageUrl";
import type { Product } from "@/lib/products";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const state = useProductCardState(product);
  const preview = state.variant.images[0];

  return (
    <article className="flex h-full w-full flex-col rounded-card border border-line bg-card shadow-card">
      <div className="relative shrink-0 overflow-hidden rounded-t-card bg-card-image">
        <ProductCardImage
          src={productImageUrl(preview)}
          alt={`${product.name} in ${state.variant.color}`}
          onOpen={state.openViewer}
          priority={priority}
        />
        <ProductCardFavorite selected={state.favorite} onToggle={state.toggleFavorite} />
      </div>

      <div className="flex min-h-card-body-min-h flex-1 flex-col gap-card-gap border-t border-line p-card-pad">
        <h2 className="line-clamp-2 min-h-card-name-min-h text-name font-medium leading-tight tracking-name text-ink">
          {product.name}
        </h2>
        <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <ProductCardSwatches
            variants={product.variants}
            selectedIndex={state.selectedVariantIndex}
            onSelect={state.selectVariant}
          />
          <p className="shrink-0 text-color-label text-muted">{state.variant.color}</p>
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
