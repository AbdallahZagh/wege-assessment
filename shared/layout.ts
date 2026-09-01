import { tokens } from "./tokens";

export const layout = {
  page: tokens.space.pageX,
  pageDesktop: tokens.space.pageXDesktop,
  pageY: tokens.space.pageY,
  grid: tokens.space.grid,
  metaTop: tokens.space.metaTop,
  meta: tokens.space.meta,
  viewerPaddingX: tokens.space.viewerX,
  viewerTop: tokens.space.viewerTop,
  viewerBottom: tokens.space.viewerBottom,
  viewerMaxHeightRatio: tokens.viewer.maxHeightRatio,
  aspectProductW: tokens.aspect.w,
  aspectProductH: tokens.aspect.h,
  aspectProduct: tokens.aspect.w / tokens.aspect.h,
  gridPaddingBottom: tokens.space.gridPaddingBottom,
  headerSafe: tokens.space.headerSafe,
  swipeThreshold: tokens.space.swipeThreshold,
  headerHeight: tokens.size.header,
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
