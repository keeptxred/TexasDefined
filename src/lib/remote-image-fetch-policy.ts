export const REMOTE_IMAGE_ACCEPT = "image/avif,image/webp,image/*,*/*;q=0.8";
export const REMOTE_IMAGE_USER_AGENT =
  "TexasDefinedImageProxyBot/1.0 (https://texasdefined.com/about)";

export function remoteImageRequestHeaders() {
  return {
    Accept: REMOTE_IMAGE_ACCEPT,
    "User-Agent": REMOTE_IMAGE_USER_AGENT,
  };
}
