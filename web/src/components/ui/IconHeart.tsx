export type IconHeartProps = {
  className?: string;
  filled?: boolean;
};

export function IconHeart({ className, filled = true }: IconHeartProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.6}
    >
      <path d="M12.1 21.35 10.55 19.94C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.44z" />
    </svg>
  );
}
