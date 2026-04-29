export function nextCarouselIndex(currentIndex, step, slideCount) {
  if (!Number.isInteger(slideCount) || slideCount <= 0) return 0;
  return ((currentIndex + step) % slideCount + slideCount) % slideCount;
}
