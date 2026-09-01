/** Runtime layout numbers — keep in sync with shared/theme.css */
export const layout = {
  page: 24,
  grid: 20,
  viewerPaddingX: 16,
  viewerTop: 56,
  viewerBottom: 32,
  viewerMaxHeightRatio: 0.85,
  aspectProductW: 3.5,
  aspectProductH: 6,
  aspectProduct: 3.5 / 6,
  gridPaddingBottom: 56,
  headerSafe: 12,
  swipeThreshold: 48,
} as const;

export function viewerFrameWidth(screenWidth: number, screenHeight: number): number {
  const horizontalInset = layout.viewerPaddingX * 2;
  return Math.min(
    screenWidth - horizontalInset,
    (screenHeight * layout.viewerMaxHeightRatio * layout.aspectProductW) /
      layout.aspectProductH,
  );
}

export function productCardWidth(screenWidth: number, columns = 2): number {
  const horizontalPadding = layout.page * 2;
  const gaps = layout.grid * (columns - 1);
  return (screenWidth - horizontalPadding - gaps) / columns;
}
