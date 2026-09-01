import type { ProductVariant } from "@/lib/products";

export type ColorSwatchesProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function ColorSwatches({
  variants,
  selectedIndex,
  onSelect,
}: ColorSwatchesProps) {
  return (
    <ul className="flex flex-wrap gap-swatch" role="list">
      {variants.map((variant, index) => {
        const selected = index === selectedIndex;
        return (
          <li key={variant.color}>
            <button
              type="button"
              aria-label={variant.color}
              aria-pressed={selected}
              onClick={() => onSelect(index)}
              className={`h-4 w-4 rounded-full border ${
                selected
                  ? "border-ink outline outline-1 outline-offset-2 outline-ink"
                  : "border-line"
              }`}
              style={{ backgroundColor: variant.colorCode }}
            />
          </li>
        );
      })}
    </ul>
  );
}
