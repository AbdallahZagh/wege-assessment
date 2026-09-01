import { StyleSheet, Text, View } from "react-native";
import { formatPrice } from "../../lib/formatPrice";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: 6,
  },
  price: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#111111",
  },
  oldPrice: {
    fontSize: 13,
    lineHeight: 18,
    color: "#757575",
    textDecorationLine: "line-through",
  },
});

export function PriceDisplay({
  price,
  oldPrice,
}: {
  price: number;
  oldPrice?: number;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.price}>{formatPrice(price)}</Text>
      {oldPrice != null ? <Text style={styles.oldPrice}>{formatPrice(oldPrice)}</Text> : null}
    </View>
  );
}
