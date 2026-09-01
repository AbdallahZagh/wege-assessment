"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconBrokenImage } from "@/components/ui/IconBrokenImage";
import { ImageSkeleton } from "@/components/ui/ImageSkeleton";

export type ProductImageProps = {
  src: string;
  alt: string;
  onOpen?: () => void;
  priority?: boolean;
};

export function ProductImage({ src, alt, onOpen, priority }: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [src]);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative block w-full overflow-hidden bg-skeleton aspect-product"
      aria-label={`View images of ${alt}`}
    >
      {error ? (
        <span className="flex h-full w-full items-center justify-center bg-fallback text-muted">
          <IconBrokenImage className="size-icon-lg text-muted" />
        </span>
      ) : (
        <>
          {loading ? <ImageSkeleton /> : null}
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 16vw, 50vw"
            priority={priority}
            className="object-cover object-top"
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        </>
      )}
    </button>
  );
}
