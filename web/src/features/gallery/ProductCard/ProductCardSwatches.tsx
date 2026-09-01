import { isLightColor } from "@shared/color";
import type { ProductVariant } from "@/lib/products";

type Props = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function ProductCardSwatches({ variants, selectedIndex, onSelect }: Props) {
  return (
    <ul className="flex flex-wrap gap-swatch" role="list">
      {variants.map((item, index) => {
        const active = index === selectedIndex;
        const ring = active
          ? "0 0 0 2px var(--wege-color-card), 0 0 0 3.5px var(--wege-color-ink)"
          : undefined;

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
                  : isLightColor(item.colorCode)
                    ? "border-line"
                    : "border-transparent"
              }`}
              style={{ backgroundColor: item.colorCode, boxShadow: ring }}
            />
          </li>
        );
      })}
    </ul>
  );
}
