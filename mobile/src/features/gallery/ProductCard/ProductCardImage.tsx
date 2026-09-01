import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IconBrokenImage } from "../../../components/ui/IconBrokenImage";
import { ImageSkeleton } from "../../../components/ui/ImageSkeleton";
import { productImageSource } from "../../../lib/images";

const ASPECT_RATIO = 3.5 / 6;

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    aspectRatio: ASPECT_RATIO,
    overflow: "hidden",
    backgroundColor: "#f5f4f2",
  },
  imageWrap: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f4f2",
  },
});

export type ProductCardImageProps = {
  path: string;
  alt: string;
  onOpen?: () => void;
};

export function ProductCardImage({ path, alt, onOpen }: ProductCardImageProps) {
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
      style={styles.pressable}
    >
      {error ? (
        <View style={styles.fallback}>
          <IconBrokenImage className="text-muted" />
        </View>
      ) : (
        <View style={styles.imageWrap}>
          {loading ? <ImageSkeleton /> : null}
          <Image
            key={path}
            source={productImageSource(path)}
            contentFit="cover"
            contentPosition="center"
            style={StyleSheet.absoluteFill}
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
