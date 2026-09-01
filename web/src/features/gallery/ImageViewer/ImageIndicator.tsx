export type ImageIndicatorProps = {
  total: number;
  current: number;
};

export function ImageIndicator({ total, current }: ImageIndicatorProps) {
  if (total <= 1) {
    return (
      <p className="text-center text-[12px] text-muted">1 / 1</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[12px] text-muted">
        {current + 1} / {total}
      </p>
      <ul className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <li
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${
              index === current ? "bg-surface" : "bg-surface/40"
            }`}
          />
        ))}
      </ul>
    </div>
  );
}
