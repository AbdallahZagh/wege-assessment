import { IconHeart } from "@/components/ui/IconHeart";

export type FavoriteButtonProps = {
  selected: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ selected, onToggle }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      aria-pressed={selected}
      aria-label={selected ? "Remove from favorites" : "Add to favorites"}
      className="absolute top-favorite right-favorite flex size-btn-favorite items-center justify-center rounded-full bg-surface/90 text-ink shadow-favorite"
    >
      <IconHeart className="size-icon-sm text-ink" filled={selected} />
    </button>
  );
}
