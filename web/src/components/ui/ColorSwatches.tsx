import { isLightColor } from "@shared/color";
import type { ProductVariant } from "@/lib/products";

type Props = {
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
}: Props) {
  const isViewer = variant === "viewer";
  const selected = variants[selectedIndex];

  return (
    <div className={isViewer ? "flex flex-col items-center gap-2" : undefined}>
      {isViewer ? (
        <p className="text-name font-medium text-surface">{selected?.color}</p>
      ) : null}
      <ul
        className={`flex flex-wrap ${isViewer ? "justify-center gap-3" : "gap-swatch"}`}
        role="list"
      >
        {variants.map((item, index) => {
          const active = index === selectedIndex;
          const ring = active
            ? "0 0 0 2px var(--wege-color-canvas), 0 0 0 3.5px var(--wege-color-ink)"
            : undefined;

          return (
            <li key={item.color}>
              <button
                type="button"
                aria-label={item.color}
                aria-pressed={active}
                onClick={() => onSelect(index)}
                className={
                  isViewer
                    ? `size-swatch-viewer rounded-full border ${active ? "border-ink" : "border-line"}`
                    : `size-swatch rounded-full border ${
                        active
                          ? "border-ink"
                          : isLightColor(item.colorCode)
                            ? "border-line"
                            : "border-transparent"
                      }`
                }
                style={{ backgroundColor: item.colorCode, boxShadow: ring }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
