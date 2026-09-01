type IconProps = {
  className?: string;
};

export function IconClose({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
