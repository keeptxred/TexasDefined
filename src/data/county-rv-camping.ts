import { createServerFn } from "@tanstack/react-start";

export interface CountyRvCampingItem {
  name: string;
  destinationHref: string;
  managingAgency: string;
  facilitySummary: string;
  fullHookup: boolean;
  siteLengthNote?: string;
  reservationUrl: string;
  sourceLabel: string;
  sourceUrl: string;
  verifiedAt: string;
}

const loadCountyRvCamping = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCountyRvCampingServer } = await import("./county-rv-camping.server");
    return loadCountyRvCampingServer(data.countySlug);
  });

export function getCountyRvCamping(countySlug: string) {
  return loadCountyRvCamping({ data: { countySlug } });
}
