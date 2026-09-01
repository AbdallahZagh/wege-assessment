"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { IconBrokenImage } from "@/components/ui/IconBrokenImage";
import { ImageSkeleton } from "@/components/ui/ImageSkeleton";

export type ZoomableImageProps = {
  src: string;
  alt: string;
  resetKey: string;
  onZoomChange?: (scale: number) => void;
};

export function ZoomableImage({
  src,
  alt,
  resetKey,
  onZoomChange,
}: ZoomableImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [src, resetKey]);

  return (
    <TransformWrapper
      key={resetKey}
      initialScale={1}
      minScale={1}
      maxScale={4}
      centerOnInit
      limitToBounds
      wheel={{ step: 0.12 }}
      pinch={{ step: 5 }}
      doubleClick={{ mode: "toggle", step: 1.4 }}
      onTransform={(ref) => {
        onZoomChange?.(ref.state.scale);
      }}
    >
      <TransformComponent wrapperClass="!h-full !w-full" contentClass="!h-full !w-full">
        <div className="relative h-full w-full touch-none bg-skeleton">
          {error ? (
            <span className="flex h-full w-full items-center justify-center bg-fallback text-muted">
              <IconBrokenImage className="size-icon-xl text-muted" />
            </span>
          ) : (
            <>
              {loading ? <ImageSkeleton /> : null}
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain object-center"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError(true);
                }}
                draggable={false}
              />
            </>
          )}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
