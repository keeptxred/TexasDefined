import { createFileRoute, redirect } from "@tanstack/react-router";

import {
  FISHING_TECHNIQUES_DIRECTORY_PATH,
  fishingTechniqueCanonicalPath,
  isPublishedFishingTechniqueSlug,
} from "@/data/fishing/technique-routing";

/**
 * Recovery route for a malformed legacy/client URL that duplicated the fishing prefix:
 * /fishing/fishing/techniques/:slug -> /fishing/techniques/:slug
 *
 * This route is intentionally redirect-only and is not part of public-route or sitemap discovery.
 */
export const Route = createFileRoute("/fishing/fishing/techniques/$slug")({
  beforeLoad: ({ params }) => {
    const href = isPublishedFishingTechniqueSlug(params.slug)
      ? fishingTechniqueCanonicalPath(params.slug)
      : FISHING_TECHNIQUES_DIRECTORY_PATH;

    throw redirect({ href, replace: true, statusCode: 301 });
  },
});
