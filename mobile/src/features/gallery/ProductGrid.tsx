import { layout, productCardWidth } from "@shared/layout";
import { FlatList, View, useWindowDimensions } from "react-native";
import { ProductCard } from "./ProductCard/ProductCard";
import { products } from "../../lib/products";

export function ProductGrid() {
  const { width } = useWindowDimensions();
  const cardWidth = productCardWidth(width, 2);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap: layout.grid, alignItems: "stretch" }}
      contentContainerStyle={{
        paddingHorizontal: layout.page,
        paddingTop: layout.page,
        paddingBottom: layout.gridPaddingBottom,
        gap: layout.grid,
      }}
      renderItem={({ item }) => (
        <View style={{ width: cardWidth, flex: 1 }}>
          <ProductCard product={item} />
        </View>
      )}
    />
  );
}
