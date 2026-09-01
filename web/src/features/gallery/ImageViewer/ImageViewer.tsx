"use client";

import { useEffect, useRef } from "react";
import { ColorSwatches } from "@/components/ui/ColorSwatches";
import { IconClose } from "@/components/ui/IconClose";
import { ImageIndicator } from "@/features/gallery/ImageViewer/ImageIndicator";
import { ZoomableImage } from "@/features/gallery/ImageViewer/ZoomableImage";
import { productImageUrl } from "@/lib/imageUrl";
import type { ProductVariant } from "@/lib/products";

export type ImageViewerProps = {
  productName: string;
  variants: ProductVariant[];
  selectedVariantIndex: number;
  imageIndex: number;
  onIndexChange: (index: number) => void;
  onVariantChange: (index: number) => void;
  onClose: () => void;
};

export function ImageViewer({
  productName,
  variants,
  selectedVariantIndex,
  imageIndex,
  onIndexChange,
  onVariantChange,
  onClose,
}: ImageViewerProps) {
  const variant = variants[selectedVariantIndex] ?? variants[0];
  const images = variant.images;
  const current = Math.min(imageIndex, images.length - 1);
  const src = productImageUrl(images[current]);

  const startX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        onIndexChange(Math.min(current + 1, images.length - 1));
      }
      if (event.key === "ArrowLeft") {
        onIndexChange(Math.max(current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, images.length, onClose, onIndexChange]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-overlay" role="dialog" aria-modal="true">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center text-surface"
      >
        <IconClose className="h-6 w-6" />
      </button>

      <div className="flex flex-1 items-center justify-center px-4 pt-14 pb-4">
        <div
          className="relative w-full max-w-[min(100%,calc(85vh*3.5/6))] aspect-[3.5/6] overflow-hidden bg-surface"
          onTouchStart={(event) => {
            startX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (startX.current === null) {
              return;
            }
            const dx = (event.changedTouches[0]?.clientX ?? 0) - startX.current;
            startX.current = null;
            if (dx <= -48) {
              onIndexChange(Math.min(current + 1, images.length - 1));
            } else if (dx >= 48) {
              onIndexChange(Math.max(current - 1, 0));
            }
          }}
        >
          <ZoomableImage
            src={src}
            alt={`${productName} ${variant.color}`}
            resetKey={variant.color}
          />
          {images.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                className="absolute top-1/2 left-2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-surface/80 text-ink lg:flex"
                onClick={() => onIndexChange(Math.max(current - 1, 0))}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="absolute top-1/2 right-2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-surface/80 text-ink lg:flex"
                onClick={() => onIndexChange(Math.min(current + 1, images.length - 1))}
              >
                ›
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 px-4 pb-8">
        <ImageIndicator total={images.length} current={current} />
        <ColorSwatches
          variants={variants}
          selectedIndex={selectedVariantIndex}
          onSelect={onVariantChange}
        />
      </div>
    </div>
  );
}
