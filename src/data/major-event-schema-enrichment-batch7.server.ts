import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });

// Supplemental dedicated Event leaves, official-source research wave 5.
// Multi-producer events remain source-reviewed without an organizer assertion when the
// official material does not support one unambiguous responsible organization.
export const majorEventSchemaEnrichmentBatch7: MajorEventSchemaEnrichment[] = [
  {
    slug: "texas-jazz-festival",
    organizer: organization("Texas Jazz Festival Society", "https://www.texasjazz-fest.org/"),
    offers: [usdOffer("Festival admission", 0, "https://www.texasjazz-fest.org/")],
    sources: [
      { label: "Texas Jazz Festival Society official 2026 festival page", url: "https://www.texasjazz-fest.org/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "red-steagall-cowboy-gathering",
    sources: [
      { label: "Red Steagall Cowboy Gathering official site", url: "https://www.redsteagallcowboygathering.com/" },
      { label: "Red Steagall Cowboy Gathering official history and current management", url: "https://www.redsteagallcowboygathering.com/our-story/" },
      { label: "Red Steagall Cowboy Gathering official schedule and tickets", url: "https://www.redsteagallcowboygathering.com/schedule-tickets/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-rice-festival",
    sources: [
      { label: "Texas Rice Festival official site", url: "https://texasricefestival.com/" },
      { label: "Texas Rice Festival official tickets and fees", url: "https://texasricefestival.com/festivalpark-info/ticketsfees/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "international-quilt-festival-houston",
    organizer: organization("Quilts, Inc.", "https://www.quilts.com/"),
    sources: [
      { label: "Quilts, Inc. official company and International Quilt Festival background", url: "https://www.quilts.com/about-us/" },
      { label: "International Quilt Festival/Houston official information", url: "https://www.quilts.com/quilt-festival/quilt-festival-houston/" },
      { label: "Quilts, Inc. official 2026 Houston Festival date announcement", url: "https://www.quilts.com/major-changes-announced-festival-dates-changed-market-discontinued/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "original-greek-festival-houston",
    organizer: organization("Annunciation Greek Orthodox Cathedral", "https://www.agoc.org/"),
    sources: [
      { label: "The Original Greek Festival official site", url: "https://www.greekfestival.org/" },
      { label: "The Original Greek Festival official attending information", url: "https://www.greekfestival.org/pages/attending" },
      { label: "The Original Greek Festival official FAQ", url: "https://www.greekfestival.org/pages/faqs" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "san-antonio-muertos-fest",
    sources: [
      { label: "Muertos Fest official site", url: "https://muertosfest.com/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "austin-food-wine-festival",
    sources: [
      { label: "Austin Food & Wine Festival official site", url: "https://www.austinfoodandwinefestival.com/" },
      { label: "Austin Food & Wine Festival official tickets and day formats", url: "https://www.austinfoodandwinefestival.com/tickets" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "gruene-music-wine-festival",
    sources: [
      { label: "Gruene Music & Wine Festival official site", url: "https://gruenemusicandwinefest.org/" },
      { label: "Gruene Music & Wine Festival official tickets and daily program", url: "https://gruenemusicandwinefest.org/tickets/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-clay-festival",
    sources: [
      { label: "Texas Clay Festival official site", url: "https://texasclayfestival.com/" },
      { label: "Texas Clay Festival official about and schedule page", url: "https://texasclayfestival.com/about/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-craft-brewers-festival",
    organizer: organization("Texas Craft Brewers Guild", "https://texascraftbrewersguild.org/"),
    sources: [
      { label: "Texas Craft Brewers Festival official site — organized by Texas Craft Brewers Guild", url: "https://texascraftbrewersfestival.org/" },
      { label: "Texas Craft Brewers Festival official visitor information", url: "https://texascraftbrewersfestival.org/info/" },
    ],
    verifiedAt: "2026-09-02",
  },
];
