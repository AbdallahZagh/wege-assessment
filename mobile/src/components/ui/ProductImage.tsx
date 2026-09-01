import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { productImageSource } from "../../lib/images";

export type ProductImageProps = {
  path: string;
  alt: string;
  onOpen?: () => void;
};

export function ProductImage({ path, alt, onOpen }: ProductImageProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [path]);

  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={`View images of ${alt}`}
      className="w-full overflow-hidden bg-skeleton"
      style={{ aspectRatio: 3.5 / 6 }}
    >
      {error ? (
        <View className="h-full w-full items-center justify-center bg-fallback">
          <Text className="text-muted">Image unavailable</Text>
        </View>
      ) : (
        <Image
          key={path}
          source={productImageSource(path)}
          contentFit="cover"
          contentPosition="top"
          style={{ width: "100%", height: "100%" }}
          onError={() => setError(true)}
          accessibilityLabel={alt}
        />
      )}
    </Pressable>
  );
}
