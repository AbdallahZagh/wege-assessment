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
              className={`size-swatch rounded-full border ${
                selected
                  ? "border-2 border-ink ring-2 ring-ink ring-offset-2 ring-offset-canvas"
                  : "border border-line"
              }`}
              style={{ backgroundColor: variant.colorCode }}
            />
          </li>
        );
      })}
    </ul>
  );
}
