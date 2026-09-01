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
      className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-surface/90"
    >
      <IconHeart filled={selected} className="text-ink" />
    </Pressable>
  );
}
