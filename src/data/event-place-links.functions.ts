import { createServerFn } from "@tanstack/react-start";

import type { TexasEntityKind } from "./knowledge-graph/types";
import { loadUpcomingEventGuidesForPlaceServer } from "./event-place-links.server";

interface PlaceEventLinkInput {
  kind: TexasEntityKind;
  name: string;
  slug: string;
  relationshipTargetIds?: string[];
  limit?: number;
}

export const getUpcomingEventGuidesForPlace = createServerFn({ method: "GET" })
  .inputValidator((input: PlaceEventLinkInput) => input)
  .handler(async ({ data }) => loadUpcomingEventGuidesForPlaceServer(data));
