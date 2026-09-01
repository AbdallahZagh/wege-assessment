import { galleryCopy } from "@shared/gallery";

export function GalleryHeader() {
  return (
    <header className="border-b border-line bg-canvas px-page py-header-y lg:px-page-lg">
      <h1 className="text-title font-medium tracking-tight text-ink">
        {galleryCopy.storeName}
      </h1>
      <p className="mt-meta text-eyebrow tracking-eyebrow text-muted">
        {galleryCopy.pageLabel}
      </p>
    </header>
  );
}
 