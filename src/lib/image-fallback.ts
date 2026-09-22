export type ImageFallback = {
  src: string;
  alt?: string;
};

/**
 * Retry a failed image with one known subject-matched fallback, then hide the
 * image if that fallback also fails. The containing surface remains responsible
 * for its own deliberate visual fallback so failed remote media never produces
 * a broken-image icon or an empty reserved block.
 */
export function recoverOrHideImage(image: HTMLImageElement, fallback?: ImageFallback) {
  if (fallback && image.dataset.fallbackSrc !== fallback.src) {
    image.dataset.fallbackSrc = fallback.src;
    image.src = fallback.src;
    if (fallback.alt) image.alt = fallback.alt;
    return;
  }

  image.style.display = "none";
}


export function hideFailedImageContainer(image: HTMLImageElement, selector = "figure") {
  const container = image.closest<HTMLElement>(selector);
  if (container) {
    container.style.display = "none";
    return;
  }

  image.style.display = "none";
}
