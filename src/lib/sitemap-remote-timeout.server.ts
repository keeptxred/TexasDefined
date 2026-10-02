const DEFAULT_SITEMAP_REMOTE_TIMEOUT_MS = 4_000;

export class SitemapRemoteTimeoutError extends Error {
  constructor(label: string, timeoutMs: number) {
    super(`${label} timed out after ${timeoutMs}ms`);
    this.name = "SitemapRemoteTimeoutError";
  }
}

export async function withSitemapRemoteTimeout<T>(
  label: string,
  operation: Promise<T>,
  timeoutMs = DEFAULT_SITEMAP_REMOTE_TIMEOUT_MS,
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      operation,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new SitemapRemoteTimeoutError(label, timeoutMs)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
