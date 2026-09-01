import type { ProductVariant } from "@/lib/products";

export type ColorSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  variant?: "card" | "viewer";
};

export function ColorSwatches({
  variants,
  selectedIndex,
  onSelect,
  variant = "card",
}: ColorSwatchesProps) {
  const isViewer = variant === "viewer";
  const selected = variants[selectedIndex];

  return (
    <div className={isViewer ? "flex flex-col items-center gap-2" : undefined}>
      {isViewer ? (
        <p className="text-body font-medium text-surface">{selected?.color}</p>
      ) : null}
      <ul
        className={`flex flex-wrap ${isViewer ? "justify-center gap-3 rounded-full bg-surface px-4 py-3 shadow-viewer" : "gap-swatch"}`}
        role="list"
      >
        {variants.map((item, index) => {
          const active = index === selectedIndex;
          return (
            <li key={item.color}>
              <button
                type="button"
                aria-label={item.color}
                aria-pressed={active}
                onClick={() => onSelect(index)}
                className={
                  isViewer
                    ? `size-swatch-viewer rounded-full border-2 shadow-favorite ${
                        active ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-surface" : "border-line"
                      }`
                    : `size-swatch rounded-full border ${
                        active
                          ? "border-2 border-ink ring-2 ring-ink ring-offset-2 ring-offset-surface"
                          : "border border-line"
                      }`
                }
                style={{ backgroundColor: item.colorCode }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
