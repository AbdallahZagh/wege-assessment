"use client";

import { products } from "@/lib/products";
import { ProductCard } from "@/features/gallery/ProductCard/ProductCard";

export function ProductGrid() {
  return (
    <ul className="mx-auto grid w-full max-w-gallery grid-cols-2 items-stretch gap-grid px-page py-page-y pb-grid-bottom lg:grid-cols-6 lg:px-page-lg">
      {products.map((product, index) => (
        <li key={product.id} className="flex min-h-0 min-w-0">
          <ProductCard product={product} priority={index < 6} />
        </li>
      ))}
    </ul>
  );
}
