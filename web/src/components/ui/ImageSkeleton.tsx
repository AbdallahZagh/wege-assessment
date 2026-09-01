export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <span
      className={`absolute inset-0 overflow-hidden bg-skeleton${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <span className="absolute inset-y-0 w-2/3 animate-shimmer bg-gradient-to-r from-transparent via-skeleton-shine to-transparent" />
    </span>
  );
}
