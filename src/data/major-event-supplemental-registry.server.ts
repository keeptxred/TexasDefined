import { getMajorEventRecordServer } from "./major-event-page.server";

export const supplementalMajorEventSlugs = [
  "dobie-dichos",
  "dallas-holiday-parade",
  "schulenburg-festival",
  "westfest",
  "luling-watermelon-thump",
  "national-polka-festival",
  "gillespie-county-fair",
  "north-texas-fair-rodeo",
  "austin-chronicle-hot-sauce-festival",
  "parker-county-peach-festival",
  "buc-days",
  "valero-texas-open",
  "houston-auto-show",
  "fulton-oysterfest",
  "sandhills-stock-show-rodeo",
  "sweetwater-rattlesnake-roundup",
  "granbury-founders-day-jubilee",
  "galveston-juneteenth-celebrations",
  "larry-joe-taylor-texas-music-festival",
  "san-antonio-marathon",
  "rockport-art-festival",
  "viva-el-paso",
  "texas-shakespeare-festival",
  "poteet-strawberry-festival",
  "comicpalooza",
  "tejano-conjunto-festival",
  "great-texas-balloon-race",
  "hidalgo-borderfest",
  "austin-reggae-festival",
  "texas-outdoor-musical",
  "washington-on-the-brazos-texas-independence-day",
  "great-american-scrapbook-convention",
  "the-very-rary",
  "marfa-lights-festival",
  "fredericksburg-oktoberfest",
  "texas-book-festival",
  "houston-art-car-parade",
  "mardi-gras-galveston",
  "texas-state-forest-festival",
  "bayou-city-art-festival-memorial-park",
  "western-heritage-classic",
  "bob-wills-day",
  "lone-star-cowboy-poetry-gathering-alpine",
  "lone-star-cowboy-poetry-gathering-bastrop",
  "texas-jazz-festival",
  "red-steagall-cowboy-gathering",
  "texas-rice-festival",
  "international-quilt-festival-houston",
  "original-greek-festival-houston",
  "san-antonio-muertos-fest",
  "austin-food-wine-festival",
  "gruene-music-wine-festival",
  "texas-clay-festival",
  "texas-craft-brewers-festival",
  "texas-tribune-festival",
  "san-antonio-beer-festival",
  "rodeo-austin",
  "san-antonio-book-festival",
  "pecan-street-festival",
  "lone-star-rally",
  "austin-city-limits-music-festival",
  "austin-marathon",
  "cowtown-marathon",
  "bmw-dallas-marathon",
] as const;

export function loadSupplementalMajorEventRecordsServer() {
  return supplementalMajorEventSlugs.map((slug) => {
    const event = getMajorEventRecordServer(slug);
    if (!event) throw new Error(`Supplemental major-event registry entry does not resolve: ${slug}`);
    return event;
  });
}

export function loadSupplementalMajorEventSitemapEntriesServer() {
  return loadSupplementalMajorEventRecordsServer().map((event) => ({
    path: `/event/${event.slug}`,
    lastmod: event.sourceCheckedAt?.slice(0, 10),
  }));
}
