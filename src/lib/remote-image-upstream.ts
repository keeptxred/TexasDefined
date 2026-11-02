/**
 * Select a smaller rendition of the SAME licensed image before the existing
 * /media/remote broker fetches it. Never replace a photo with a different file.
 * This avoids paid CDN transforms and protects existing credit/provenance URLs.
 */
export const REMOTE_IMAGE_MAX_WIDTH = 1200;

const COMMONS_SPECIAL_FILE = /^\/wiki\/Special:(?:Redirect\/file|FilePath)\//i;
const COMMONS_INDEX_PATH = "/w/index.php";
const COMMONS_REDIRECT_TITLE = /^Special:(?:Redirect\/file|FilePath)\//i;
const ORIGINAL_COMMONS_UPLOAD =
  /^\/wikipedia\/commons\/[a-f0-9]\/[a-f0-9]{2}\/([^/]+)$/i;
const SUPPORTED_RASTER = /\.(?:jpe?g|png|webp)$/i;

function boundWidth(url: URL, param: string): URL {
  const copy = new URL(url.toString());
  const requested = Number(copy.searchParams.get(param));
  if (!Number.isInteger(requested) || requested <= 0 || requested > REMOTE_IMAGE_MAX_WIDTH) {
    copy.searchParams.set(param, String(REMOTE_IMAGE_MAX_WIDTH));
  }
  return copy;
}

/**
 * Only canonical public image endpoints are rewritten.
 * Video, GIF, unknown media, hosted thumbnails, and unrelated URL forms retain
 * their original upstream URLs so content and licensing stay unchanged.
 */
export function optimizedRemoteImageUpstream(original: URL): URL {
  const hostname = original.hostname.toLowerCase();

  if (hostname === "commons.wikimedia.org") {
    const isSpecial =
      COMMONS_SPECIAL_FILE.test(original.pathname) ||
      (original.pathname === COMMONS_INDEX_PATH &&
        COMMONS_REDIRECT_TITLE.test(original.searchParams.get("title") ?? ""));
    return isSpecial ? boundWidth(original, "width") : original;
  }

  if (hostname === "upload.wikimedia.org" && !original.search) {
    const match = original.pathname.match(ORIGINAL_COMMONS_UPLOAD);
    if (match) {
      let filename: string;
      try {
        filename = decodeURIComponent(match[1]);
      } catch {
        return original;
      }
      if (SUPPORTED_RASTER.test(filename)) {
        const thumbnail = new URL("https://commons.wikimedia.org/w/index.php");
        thumbnail.searchParams.set("title", "Special:Redirect/file/" + filename);
        thumbnail.searchParams.set("width", String(REMOTE_IMAGE_MAX_WIDTH));
        return thumbnail;
      }
    }
    return original;
  }

  if (hostname === "images.unsplash.com") {
    const output = boundWidth(original, "w");
    const quality = Number(output.searchParams.get("q"));
    if (!Number.isInteger(quality) || quality <= 0 || quality > 78) {
      output.searchParams.set("q", "78");
    }
    if (!output.searchParams.has("auto")) output.searchParams.set("auto", "format");
    return output;
  }

  return original;
}
