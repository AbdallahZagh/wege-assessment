export type ImageIndicatorProps = {
  total: number;
  current: number;
};

export function ImageIndicator({ total, current }: ImageIndicatorProps) {
  if (total <= 1) {
    return <p className="text-center text-indicator text-muted">1 / 1</p>;
  }

  return (
    <div className="flex flex-col items-center gap-card-gap">
      <p className="text-indicator text-muted">
        {current + 1} / {total}
      </p>
      <ul className="flex gap-indicator-gap" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <li
            key={index}
            className={`size-dot rounded-full ${
              index === current ? "bg-surface" : "bg-surface/40"
            }`}
          />
        ))}
      </ul>
    </div>
  );
}
