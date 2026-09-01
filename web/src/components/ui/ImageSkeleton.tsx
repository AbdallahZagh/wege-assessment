export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <span
      className={`absolute inset-0 animate-skeleton bg-skeleton${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    />
  );
}
