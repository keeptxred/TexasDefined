import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });
const group = (name: string): EventSchemaEntity => ({ type: "PerformingGroup", name });

// Supplemental dedicated Event leaves, official-source research wave 8.
// Current ticket values are emitted only when the official event page supports the same occurrence.
// Future ticket tiers that are not yet on sale and rights-unclear promotional imagery remain omitted.
export const majorEventSchemaEnrichmentBatch10: MajorEventSchemaEnrichment[] = [
  {
    slug: "texas-monthly-bbq-fest",
    organizer: organization("Texas Monthly", "https://www.texasmonthly.com/"),
    sources: [
      { label: "Texas Monthly 2026 event calendar — BBQ Fest in Lockhart", url: "https://link.texasmonthly.com/public/43654613" },
      { label: "Texas Monthly BBQ Fest 2026 local-happenings form", url: "https://form.jotform.com/261676478507167" },
      { label: "Texas Monthly BBQ World's Fair 2026 vendor form", url: "https://form.jotform.com/261674670961163" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "valero-alamo-bowl",
    organizer: organization("Valero Alamo Bowl", "https://www.alamobowl.com/"),
    sources: [
      { label: "Valero Alamo Bowl official 2026 game page", url: "https://www.alamobowl.com/" },
      { label: "Valero Alamo Bowl official organization mission", url: "https://www.alamobowl.com/about/community-outreach/" },
      { label: "Valero Alamo Bowl official ticket FAQ", url: "https://www.alamobowl.com/faqs/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "plano-balloon-festival",
    organizer: organization("Plano Balloon Festival, Inc.", "https://www.planoballoonfest.org/"),
    offers: [
      usdOffer("Adult online general admission", 11.6, "https://www.planoballoonfest.org/p/tickets"),
      usdOffer("Child age 3-12 online general admission", 6.5, "https://www.planoballoonfest.org/p/tickets"),
      usdOffer("Senior age 65+ online general admission", 6.5, "https://www.planoballoonfest.org/p/tickets"),
      usdOffer("Child 36 inches and under admission", 0, "https://www.planoballoonfest.org/p/tickets"),
    ],
    sources: [
      { label: "Plano Balloon Festival official 2026 ticket page", url: "https://www.planoballoonfest.org/p/tickets" },
      { label: "Plano Balloon Festival official mission and festival information", url: "https://www.planoballoonfest.org/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "cottonwood-art-festival",
    organizer: organization("City of Richardson", "https://www.cor.net/"),
    offers: [usdOffer("Festival admission", 0, "https://cottonwoodartfestival.com/information/")],
    sources: [
      { label: "Cottonwood Art Festival official 2026-2027 information and free admission", url: "https://cottonwoodartfestival.com/information/" },
      { label: "Cottonwood Art Festival official site", url: "https://cottonwoodartfestival.com/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "grapevine-main-street-fest",
    organizer: organization("Grapevine Convention & Visitors Bureau", "https://www.grapevinetexasusa.com/"),
    offers: [
      usdOffer("Adult admission", 10, "https://www.grapevinetexasusa.com/main-street-fest/purchase-tickets/"),
      usdOffer("Senior age 62+ admission", 5, "https://www.grapevinetexasusa.com/main-street-fest/purchase-tickets/"),
      usdOffer("Child age 6-12 admission", 5, "https://www.grapevinetexasusa.com/main-street-fest/purchase-tickets/"),
      usdOffer("Child age 5 and under admission", 0, "https://www.grapevinetexasusa.com/main-street-fest/purchase-tickets/"),
      usdOffer("Weekend pass", 20, "https://www.grapevinetexasusa.com/main-street-fest/purchase-tickets/"),
    ],
    sources: [
      { label: "Grapevine Main Street Fest official 2027 page", url: "https://www.grapevinetexasusa.com/main-street-fest/" },
      { label: "Grapevine Main Street Fest official 2027 admission information", url: "https://www.grapevinetexasusa.com/main-street-fest/general-information/" },
      { label: "Grapevine Main Street Fest official ticket page", url: "https://www.grapevinetexasusa.com/main-street-fest/purchase-tickets/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "texas-pinball-festival",
    organizer: organization("Texas Pinball Festival", "https://texaspinball.com/"),
    sources: [
      { label: "Texas Pinball Festival official 2027 event site", url: "https://texaspinball.com/" },
      { label: "Texas Pinball Festival official about page", url: "https://texaspinball.com/about/" },
      { label: "Texas Pinball Festival official store — 2027 tickets not yet on sale", url: "https://texaspinball.com/store/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "east-texas-yamboree",
    organizer: organization("East Texas Yamboree Association", "https://www.yamboree.com/"),
    sources: [
      { label: "East Texas Yamboree official 2026 site and nonprofit organizer", url: "https://www.yamboree.com/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "czhilispiel",
    organizer: organization("Czhilispiel", "https://www.czhilispiel.com/"),
    performers: [
      group("The Ghost Peppers"),
      group("Bill Pekar"),
      group("The Solis Brothers"),
      group("The Isaac Jacob Band"),
      group("Reagan Hicks"),
      group("Texas Unlimited Band"),
      group("D'Vine Testament"),
      group("Polka Polka"),
      group("The Fender Benders"),
      group("The Emotions & Sweet Emotions"),
    ],
    sources: [
      { label: "Czhilispiel official 2026 lineup and festival history", url: "https://www.czhilispiel.com/" },
      { label: "Czhilispiel official board page", url: "https://www.czhilispiel.com/board" },
      { label: "Czhilispiel official ticket page", url: "https://www.czhilispiel.com/cz-tickets" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "texas-butterfly-festival",
    organizer: organization("National Butterfly Center", "https://www.nationalbutterflycenter.org/"),
    offers: [usdOffer("Festival registration", 400, "https://texasbutterflyfestival.com/index.php?Itemid=307&id=16&option=com_eventbooking&view=event")],
    sources: [
      { label: "Texas Butterfly Festival official 2026 festival information", url: "https://texasbutterflyfestival.com/" },
      { label: "Texas Butterfly Festival official 2026 registration", url: "https://texasbutterflyfestival.com/index.php?Itemid=307&id=16&option=com_eventbooking&view=event" },
      { label: "National Butterfly Center official 2026 festival page", url: "https://www.nationalbutterflycenter.org/index.php?Itemid=435&catid=77&id=159%3A2025-texas-butterfly-festival&option=com_content&view=article" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "rio-grande-valley-livestock-show-rodeo",
    organizer: organization("Rio Grande Valley Livestock Show", "https://www.rgvls.com/"),
    sources: [
      { label: "Rio Grande Valley Livestock Show official site", url: "https://www.rgvls.com/" },
      { label: "Rio Grande Valley Livestock Show official 2027 vendor page confirming March 11-21", url: "https://www.rgvls.com/p/get-involved/merchfoodexhibits" },
      { label: "Rio Grande Valley Livestock Show official ticket portal", url: "https://www.rgvls.com/p/tickets--deals" },
    ],
    verifiedAt: "2026-09-03",
  },
];
