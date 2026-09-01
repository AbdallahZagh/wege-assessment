import { layout } from "@shared/layout";
import { FlatList, View } from "react-native";
import { ProductCard } from "./ProductCard/ProductCard";
import { products } from "../../lib/products";

export function ProductGrid() {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={{ gap: layout.grid }}
      contentContainerStyle={{
        gap: layout.grid,
        padding: layout.page,
        paddingBottom: layout.gridPaddingBottom,
      }}
      renderItem={({ item }) => (
        <View className="flex-1">
          <ProductCard product={item} />
        </View>
      )}
    />
  );
}
