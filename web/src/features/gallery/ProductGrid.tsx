"use client";

import { ProductCard } from "@/features/gallery/ProductCard/ProductCard";
import { products } from "@/lib/products";

export function ProductGrid() {
  return (
    <ul className="mx-auto grid max-w-gallery grid-cols-2 gap-grid px-page py-page lg:grid-cols-6 lg:px-page-lg lg:py-page-lg">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < 6} />
        </li>
      ))}
    </ul>
  );
}
