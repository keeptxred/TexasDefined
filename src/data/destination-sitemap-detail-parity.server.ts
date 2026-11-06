import { auditDestination } from "./destination-audit";
import { isPrimaryTripPlannerDestination } from "./destination-availability";

/**
 * Targeted parity for publicly indexable destination pages whose detail
 * resolution source can differ from the bulk Explore catalog.
 *
 * Runs only on the server and shares the public detail resolver. The
 * proximity pages own their separate, existing shared readiness pipeline;
 * do not load their catalog from this module.
 */
const DETAIL_PARITY_SLUGS = ["blanco", "caddo-lake"] as const;

export async function loadCanonicalDestinationSitemapParity(): Promise<Array<{ path: string; lastmod?: string }>> {
  const { getResolvedDestination } = await import("./destination-query-runtime");
  const verified = await Promise.all(DETAIL_PARITY_SLUGS.map(async (slug) => {
    try {
      const destination = await getResolvedDestination(slug);
      // This is the same indexability gate as the live destination detail
      // route. No URL can enter the sitemap merely because its slug was named.
      if (!destination || destination.slug !== slug || !isPrimaryTripPlannerDestination(destination) ||
          !auditDestination(destination).readyForIndexing) return null;
      return { path: `/destination/${destination.slug}`, lastmod: destination.sourceCheckedAt };
    } catch (error) {
      console.error(`Destination sitemap parity resolution failed for ${slug}`, error);
      return null;
    }
  }));
  return verified.filter((item): item is NonNullable<typeof item> => item !== null);
}
