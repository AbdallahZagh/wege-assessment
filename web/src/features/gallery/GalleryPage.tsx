import { GalleryHeader } from "@/features/gallery/GalleryHeader";
import { ProductGrid } from "@/features/gallery/ProductGrid";

export function GalleryPage() {
  return (
    <div className="min-h-full bg-canvas">
      <GalleryHeader />
      <main>
        <ProductGrid />
      </main>
    </div>
  );
}
