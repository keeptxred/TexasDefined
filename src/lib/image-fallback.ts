export type ImageFallback = {
  src: string;
  alt?: string;
};

/**
 * Retry a failed image with one known subject-matched fallback, then remove the
 * failed media from presentation. Surfaces can opt into collapsing the whole
 * media frame by marking the wrapper with `data-image-frame`; this prevents a
 * broken remote image from leaving a blank aspect-ratio box behind.
 */
export function hideImageFallbackLabel(image: HTMLImageElement) {
  const fallbackLabel = image.parentElement?.querySelector<HTMLElement>("[data-image-fallback-label]");
  if (fallbackLabel) fallbackLabel.style.display = "none";
}

export function recoverOrHideImage(image: HTMLImageElement, fallback?: ImageFallback) {
  if (fallback && image.dataset.fallbackSrc !== fallback.src) {
    image.dataset.fallbackSrc = fallback.src;
    image.src = fallback.src;
    if (fallback.alt) image.alt = fallback.alt;
    return;
  }

  const frame = image.closest<HTMLElement>("[data-image-frame]");
  if (frame) frame.style.display = "none";
  else image.style.display = "none";
}

export function hideFailedImageContainer(image: HTMLImageElement, selector = "figure") {
  const container = image.closest<HTMLElement>(selector);
  if (container) {
    container.style.display = "none";
    return;
  }

  image.style.display = "none";
}
