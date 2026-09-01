import { IconHeart } from "@/components/ui/IconHeart";

export function ProductCardFavorite({
  selected,
  onToggle,
}: {
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={selected}
      aria-label={selected ? "Remove from favorites" : "Add to favorites"}
      className="absolute top-card-favorite right-card-favorite z-10 flex size-card-favorite items-center justify-center rounded-full border border-line/60 bg-surface shadow-card"
    >
      <IconHeart
        className={`size-icon-sm ${selected ? "text-ink" : "text-muted"}`}
        filled={selected}
      />
    </button>
  );
}
