export type ImageFallback = {
  src: string;
  alt?: string;
};

const GENERIC_IMAGE_FAILURE_ALT_RE = /^(?:photo unavailable|photo coming soon|photograph unavailable|current photograph unavailable|destination-specific photograph not yet available|image unavailable)\.?$/i;

export function readerSafeImageAlt(value?: string) {
  const alt = value?.trim() ?? "";
  return GENERIC_IMAGE_FAILURE_ALT_RE.test(alt) ? "" : alt;
}

/**
 * Retry a failed image with one known subject-matched fallback, then hide the
 * image if that fallback also fails. The containing surface remains responsible
 * for its own deliberate visual fallback so failed remote media never produces
 * a broken-image icon or an empty reserved block.
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
