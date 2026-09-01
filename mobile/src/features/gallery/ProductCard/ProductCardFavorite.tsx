import { Pressable, StyleSheet } from "react-native";
import { IconHeart } from "../../../components/ui/IconHeart";

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(232, 232, 230, 0.8)",
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
});

export type ProductCardFavoriteProps = {
  selected: boolean;
  onToggle: () => void;
};

export function ProductCardFavorite({ selected, onToggle }: ProductCardFavoriteProps) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={selected ? "Remove from favorites" : "Add to favorites"}
      style={styles.button}
    >
      <IconHeart filled={selected} color={selected ? "#111111" : "#757575"} />
    </Pressable>
  );
}
