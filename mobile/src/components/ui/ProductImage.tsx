import { layout } from "@shared/layout";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { IconBrokenImage } from "./IconBrokenImage";
import { ImageSkeleton } from "./ImageSkeleton";
import { productImageSource } from "../../lib/images";

export type ProductImageProps = {
  path: string;
  alt: string;
  onOpen?: () => void;
};

export function ProductImage({ path, alt, onOpen }: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [path]);

  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={`View images of ${alt}`}
      className="w-full overflow-hidden bg-surface"
      style={{ aspectRatio: layout.aspectProduct }}
    >
      {error ? (
        <View className="h-full w-full items-center justify-center bg-fallback">
          <IconBrokenImage className="text-muted" />
        </View>
      ) : (
        <View className="h-full w-full">
          {loading ? <ImageSkeleton /> : null}
          <Image
            key={path}
            source={productImageSource(path)}
            contentFit="cover"
            contentPosition="top"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            accessibilityLabel={alt}
          />
        </View>
      )}
    </Pressable>
  );
}
