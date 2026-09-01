import { IconHeart } from "@/components/ui/IconHeart";

export type ProductCardFavoriteProps = {
  selected: boolean;
  onToggle: () => void;
};

export function ProductCardFavorite({ selected, onToggle }: ProductCardFavoriteProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      aria-pressed={selected}
      aria-label={selected ? "Remove from favorites" : "Add to favorites"}
      className="absolute top-card-favorite right-card-favorite flex size-card-favorite items-center justify-center rounded-full border border-line/60 bg-surface shadow-card"
    >
      <IconHeart
        className={`size-icon-sm ${selected ? "text-ink" : "text-muted"}`}
        filled={selected}
      />
    </button>
  );
}
