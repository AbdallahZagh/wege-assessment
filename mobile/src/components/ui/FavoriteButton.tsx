import { Pressable } from "react-native";
import { IconHeart } from "./IconHeart";

export type FavoriteButtonProps = {
  selected: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ selected, onToggle }: FavoriteButtonProps) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={selected ? "Remove from favorites" : "Add to favorites"}
      className="absolute right-favorite top-favorite size-btn-favorite items-center justify-center rounded-full bg-surface/90"
    >
      <IconHeart filled={selected} className="text-ink" />
    </Pressable>
  );
}
