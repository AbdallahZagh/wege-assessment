import { tokens } from "@shared/tokens";
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
      className="absolute top-favorite right-favorite size-btn-favorite items-center justify-center rounded-full bg-favorite-scrim"
    >
      <IconHeart
        filled={selected}
        color={selected ? tokens.color.favoriteOn : tokens.color.favoriteOff}
      />
    </Pressable>
  );
}
