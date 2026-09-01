import { galleryCopy } from "@shared/gallery";

export function GalleryHeader() {
  return (
    <header className="flex min-h-header flex-col justify-center border-b border-line bg-canvas px-page lg:px-page-lg">
      <h1 className="text-header font-medium leading-tight text-ink">{galleryCopy.storeName}</h1>
      <p className="text-subheader leading-tight text-muted">{galleryCopy.pageLabel}</p>
    </header>
  );
}
