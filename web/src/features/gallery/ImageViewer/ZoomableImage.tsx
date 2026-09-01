"use client";

import Image from "next/image";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { IconBrokenImage } from "@/components/ui/IconBrokenImage";
import { ImageSkeleton } from "@/components/ui/ImageSkeleton";

export type ZoomableImageProps = {
  src: string;
  alt: string;
  resetKey: string;
};

export function ZoomableImage({ src, alt, resetKey }: ZoomableImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <TransformWrapper
      key={resetKey}
      initialScale={1}
      minScale={1}
      maxScale={4}
      centerOnInit
      wheel={{ step: 0.12 }}
      doubleClick={{ mode: "toggle", step: 1.4 }}
    >
      <TransformComponent wrapperClass="!h-full !w-full" contentClass="!h-full !w-full">
        <div className="relative h-full w-full bg-skeleton">
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
                className="object-cover object-center"
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
