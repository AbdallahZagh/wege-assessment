import type { ProductVariant } from "@/lib/products";

export type ProductCardSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

function swatchRing(active: boolean): string | undefined {
  if (!active) {
    return undefined;
  }

  return "0 0 0 2px var(--wege-color-card), 0 0 0 3.5px var(--wege-color-ink)";
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

export function ProductCardSwatches({
  variants,
  selectedIndex,
  onSelect,
}: ProductCardSwatchesProps) {
  return (
    <ul className="flex flex-wrap gap-swatch" role="list">
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
              className={`size-swatch-card rounded-full border transition-transform ${
                active
                  ? "scale-110 border-ink"
                  : needsStroke
                    ? "border-line"
                    : "border-transparent"
              }`}
              style={{
                backgroundColor: item.colorCode,
                boxShadow: swatchRing(active),
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
