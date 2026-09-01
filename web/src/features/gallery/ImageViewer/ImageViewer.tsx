"use client";

import { layout } from "@shared/layout";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  const startX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setScale(1);
  }, [variant.color, current]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (scale > 1.02) {
        return;
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
  }, [current, images.length, onClose, onIndexChange, scale]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close gallery"
        className="absolute top-favorite right-favorite z-20 flex size-btn-close touch-manipulation items-center justify-center rounded-full bg-surface text-ink shadow-viewer"
      >
        <IconClose className="size-icon-md" />
      </button>

      <div className="flex min-h-0 flex-1 flex-col" onClick={(event) => event.stopPropagation()}>
        <div className="shrink-0 px-viewer-x pt-viewer-top text-center">
          <p className="text-name font-medium text-surface">{productName}</p>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center px-viewer-x py-3">
          <div
            className="viewer-frame relative overflow-hidden bg-surface shadow-viewer"
            onTouchStart={(event) => {
              if (scale > 1.02) {
                return;
              }
              startX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (scale > 1.02 || startX.current === null) {
                startX.current = null;
                return;
              }
              const dx = (event.changedTouches[0]?.clientX ?? 0) - startX.current;
              startX.current = null;
              if (dx <= -layout.swipeThreshold) {
                onIndexChange(Math.min(current + 1, images.length - 1));
              } else if (dx >= layout.swipeThreshold) {
                onIndexChange(Math.max(current - 1, 0));
              }
            }}
          >
            <ZoomableImage
              src={src}
              alt={`${productName} ${variant.color}`}
              resetKey={`${variant.color}-${current}`}
              onZoomChange={setScale}
            />
            {images.length > 1 && scale <= 1.02 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute top-1/2 left-viewer-x hidden size-btn-favorite -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-surface/90 text-ink lg:flex"
                  onClick={() => onIndexChange(Math.max(current - 1, 0))}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute top-1/2 right-viewer-x hidden size-btn-favorite -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-surface/90 text-ink lg:flex"
                  onClick={() => onIndexChange(Math.min(current + 1, images.length - 1))}
                >
                  ›
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-meta px-viewer-x pb-viewer-bottom pt-2">
          <ImageIndicator total={images.length} current={current} />
          <ColorSwatches
            variant="viewer"
            variants={variants}
            selectedIndex={selectedVariantIndex}
            onSelect={(index) => {
              setScale(1);
              onVariantChange(index);
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
