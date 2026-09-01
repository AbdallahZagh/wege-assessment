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
      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-sm"
    >
      <IconHeart className="h-4 w-4 text-ink" filled={selected} />
    </button>
  );
}
