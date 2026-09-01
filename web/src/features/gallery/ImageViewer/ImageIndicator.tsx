export type ImageIndicatorProps = {
  total: number;
  current: number;
};

export function ImageIndicator({ total, current }: ImageIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-meta">
      <p className="text-indicator text-surface/80">
        {current + 1} / {total}
      </p>
      {total > 1 ? (
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
      ) : null}
    </div>
  );
}
