import { FlatList, View } from "react-native";
import { ProductCard } from "./ProductCard/ProductCard";
import { products } from "../../lib/products";

export function ProductGrid() {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={{ gap: 16 }}
      contentContainerStyle={{ gap: 16, padding: 20, paddingBottom: 40 }}
      renderItem={({ item }) => (
        <View className="flex-1">
          <ProductCard product={item} />
        </View>
      )}
    />
  );
}
