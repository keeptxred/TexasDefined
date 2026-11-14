import { createServerFn } from '@tanstack/react-start';
import type { TexasCountyStatewideContext } from './county-comparison';

// Compute rankings where the official county sources can be fetched securely.
// Returning four rank records avoids 254 direct browser source requests or RPCs.
const countyContextServerFn = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<TexasCountyStatewideContext> => {
    const { buildCountyStatewideContext, loadTexasCountyComparison } = await import('./county-comparison');
    return buildCountyStatewideContext(await loadTexasCountyComparison(), data.slug);
  });

// Suspense needs a stable Promise for repeat renders of the same county.
const countyContextCache = new Map<string, Promise<TexasCountyStatewideContext>>();
export function loadCountyStatewideContext(slug: string): Promise<TexasCountyStatewideContext> {
  let promise = countyContextCache.get(slug);
  if (!promise) {
    promise = countyContextServerFn({ data: { slug } });
    countyContextCache.set(slug, promise);
  }
  return promise;
}
