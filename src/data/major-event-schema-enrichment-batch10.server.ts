import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });

// Supplemental dedicated Event leaves, official-source research wave 8.
// We retain reviewed source-only records where the evidence does not justify a single organizer,
// current offer, performer, or reusable representative image.
export const majorEventSchemaEnrichmentBatch10: MajorEventSchemaEnrichment[] = [
  {
    slug: "texas-monthly-bbq-fest",
    sources: [
      { label: "Texas Monthly first-party 2026 events calendar — BBQ Fest in Lockhart", url: "https://link.texasmonthly.com/public/43654613" },
      { label: "Texas Monthly BBQ World's Fair vendor application", url: "https://form.jotform.com/261674670961163" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "valero-alamo-bowl",
    organizer: organization("San Antonio Bowl Association", "https://www.alamobowl.com/"),
    sources: [
      { label: "Valero Alamo Bowl official 2026 game-date announcement", url: "https://www.alamobowl.com/gamedate2026/" },
      { label: "Valero Alamo Bowl official terms — San Antonio Bowl Association", url: "https://www.alamobowl.com/terms-of-use/" },
      { label: "Valero Alamo Bowl official FAQ", url: "https://www.alamobowl.com/faqs/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "plano-balloon-festival",
    organizer: organization("Plano Balloon Festival, Inc.", "https://www.planoballoonfest.org/"),
    offers: [
      usdOffer("Adult gate admission", 10, "https://www.planoballoonfest.org/p/tickets"),
      usdOffer("Child age 3-12 gate admission", 5, "https://www.planoballoonfest.org/p/tickets"),
      usdOffer("Senior age 65+ gate admission", 5, "https://www.planoballoonfest.org/p/tickets"),
      usdOffer("Child 36 inches and under admission", 0, "https://www.planoballoonfest.org/p/tickets"),
      usdOffer("Military ID holder admission", 0, "https://www.planoballoonfest.org/p/tickets"),
    ],
    sources: [
      { label: "Plano Balloon Festival official 2026 tickets and nonprofit mission", url: "https://www.planoballoonfest.org/p/tickets" },
      { label: "Plano Balloon Festival official site", url: "https://www.planoballoonfest.org/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "cottonwood-art-festival",
    organizer: organization("City of Richardson", "https://www.cor.net/"),
    offers: [usdOffer("Festival admission", 0, "https://cottonwoodartfestival.com/information/")],
    sources: [
      { label: "Cottonwood Art Festival official information — free admission and City of Richardson operations", url: "https://cottonwoodartfestival.com/information/" },
      { label: "Cottonwood Art Festival official site", url: "https://cottonwoodartfestival.com/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "grapevine-main-street-fest",
    organizer: organization("Grapevine Convention & Visitors Bureau", "https://www.grapevinetexasusa.com/"),
    offers: [
      usdOffer("Adult admission", 10, "https://www.grapevinetexasusa.com/main-street-fest/general-information/"),
      usdOffer("Senior age 62+ admission", 5, "https://www.grapevinetexasusa.com/main-street-fest/general-information/"),
      usdOffer("Child age 6-12 admission", 5, "https://www.grapevinetexasusa.com/main-street-fest/general-information/"),
      usdOffer("Child age 5 and under admission", 0, "https://www.grapevinetexasusa.com/main-street-fest/general-information/"),
      usdOffer("Weekend pass", 20, "https://www.grapevinetexasusa.com/main-street-fest/general-information/"),
    ],
    sources: [
      { label: "Grapevine Convention & Visitors Bureau official 2027 Main Street Fest page", url: "https://www.grapevinetexasusa.com/main-street-fest/" },
      { label: "Main Street Fest official 2027 admission and hours", url: "https://www.grapevinetexasusa.com/main-street-fest/general-information/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-pinball-festival",
    sources: [
      { label: "Texas Pinball Festival official 2027 home page", url: "https://texaspinball.com/" },
      { label: "Texas Pinball Festival official About page", url: "https://texaspinball.com/about/" },
      { label: "Texas Pinball Festival official attendee information", url: "https://texaspinball.com/attendees/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "east-texas-yamboree",
    organizer: organization("East Texas Yamboree Association", "https://www.yamboree.com/"),
    sources: [
      { label: "East Texas Yamboree official site — Association nonprofit and 2026 schedule", url: "https://www.yamboree.com/" },
      { label: "East Texas Yamboree official leadership", url: "https://yamboree.com/about/leaders/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "czhilispiel",
    sources: [
      { label: "Czhilispiel official 2026 site", url: "https://www.czhilispiel.com/" },
      { label: "Czhilispiel official ticket page", url: "https://www.czhilispiel.com/cz-tickets" },
      { label: "Czhilispiel official sponsorship information", url: "https://www.czhilispiel.com/sponsors" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-butterfly-festival",
    organizer: organization("National Butterfly Center", "https://www.nationalbutterflycenter.org/"),
    offers: [
      usdOffer("Festival registration", 400, "https://www.texasbutterflyfestival.com/index.php?Itemid=307&id=16&option=com_eventbooking&view=event"),
      usdOffer("Community Day admission", 0, "https://texasbutterflyfestival.com/"),
    ],
    sources: [
      { label: "Texas Butterfly Festival official 2026 site — hosted by National Butterfly Center", url: "https://texasbutterflyfestival.com/" },
      { label: "Texas Butterfly Festival official 2026 registration and price", url: "https://www.texasbutterflyfestival.com/index.php?Itemid=307&id=16&option=com_eventbooking&view=event" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "rio-grande-valley-livestock-show-rodeo",
    organizer: organization("Rio Grande Valley Livestock Show", "https://www.rgvls.com/"),
    sources: [
      { label: "Rio Grande Valley Livestock Show official 2027 vendor page — March 11-21 dates", url: "https://www.rgvls.com/p/get-involved/merchfoodexhibits" },
      { label: "Rio Grande Valley Livestock Show official exhibitor information and mission", url: "https://www.rgvls.com/p/livestock-show/livestock-exhibitors" },
      { label: "Rio Grande Valley Livestock Show official site", url: "https://www.rgvls.com/" },
    ],
    verifiedAt: "2026-09-02",
  },
];
