"use client";

import { ProductCard } from "@/features/gallery/ProductCard/ProductCard";
import { products } from "@/lib/products";

export function ProductGrid() {
  return (
    <ul className="mx-auto grid max-w-gallery grid-cols-2 gap-x-grid gap-y-grid-row px-page py-page pb-grid-bottom sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-8 lg:px-page-lg lg:py-page-lg lg:pb-16">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < 6} />
        </li>
      ))}
    </ul>
  );
}
