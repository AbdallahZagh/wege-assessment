import type { ProductVariant } from "@/lib/products";

export type ColorSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  variant?: "card" | "viewer";
};

function swatchRing(active: boolean): string | undefined {
  if (!active) {
    return undefined;
  }

  return "0 0 0 2px var(--wege-color-canvas), 0 0 0 3.5px var(--wege-color-ink)";
}

function isLightColor(hex: string): boolean {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return false;
  }

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 200;
}

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
        <p className="text-name font-medium text-surface">{selected?.color}</p>
      ) : null}
      <ul
        className={`flex flex-wrap ${isViewer ? "justify-center gap-3" : "gap-swatch"}`}
        role="list"
      >
        {variants.map((item, index) => {
          const active = index === selectedIndex;
          const needsStroke = isLightColor(item.colorCode);

          return (
            <li key={item.color}>
              <button
                type="button"
                aria-label={item.color}
                aria-pressed={active}
                onClick={() => onSelect(index)}
                className={
                  isViewer
                    ? `size-swatch-viewer rounded-full border ${
                        active ? "border-ink" : "border-line"
                      }`
                    : `size-swatch rounded-full border ${
                        active ? "border-ink" : needsStroke ? "border-line" : "border-transparent"
                      }`
                }
                style={{
                  backgroundColor: item.colorCode,
                  boxShadow: swatchRing(active),
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
