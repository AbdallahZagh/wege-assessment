"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconBrokenImage } from "@/components/ui/IconBrokenImage";

export type ProductImageProps = {
  src: string;
  alt: string;
  onOpen?: () => void;
  priority?: boolean;
};

export function ProductImage({ src, alt, onOpen, priority }: ProductImageProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative block w-full overflow-hidden bg-skeleton aspect-[3.5/6]"
      aria-label={`View images of ${alt}`}
    >
      {error ? (
        <span className="flex h-full w-full items-center justify-center bg-fallback text-muted">
          <IconBrokenImage className="h-8 w-8" />
        </span>
      ) : (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 16vw, 50vw"
          priority={priority}
          className="object-cover object-top"
          onError={() => setError(true)}
        />
      )}
    </button>
  );
}
