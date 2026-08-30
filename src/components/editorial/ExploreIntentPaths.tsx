import { Link } from "@tanstack/react-router";

import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";

const INTENT_GROUPS = [
  {
    title: "Water weekends",
    body: "Build a trip around swimming holes, springs, lakes, rivers and the coast.",
    links: [
      { to: "/explore/lakes-rivers", label: "Lakes & rivers" },
      { to: "/explore/major-springs", label: "Springs & swimming" },
      { to: "/explore/beaches-coast", label: "Beaches & coast" },
      { to: "/fishing", label: "Texas fishing" },
    ],
  },
  {
    title: "Park weekends",
    body: "Start with public land, then connect trails, camping, wildlife and nearby towns.",
    links: [
      { to: "/best-places-to-go-camping-in-texas", label: "Best camping in Texas" },
      { to: "/explore/state-parks", label: "State parks" },
      { to: "/explore/national-parks", label: "National parks" },
      { to: "/explore/outdoors", label: "Wildlife & outdoors" },
      { to: "/texas-natural-wonders-bucket-list", label: "Natural wonders" },
    ],
  },
  {
    title: "Wildlife & conservation",
    body: "Follow bird migration, refuge habitat, public lands and the ecosystems that make each region distinct.",
    links: [
      { to: "/texas-birds-guide", label: "Texas birds guide" },
      { to: "/explore/outdoors", label: "Wildlife & outdoors" },
      { to: "/explore/state-parks", label: "State parks" },
      { to: "/explore/beaches-coast", label: "Coastal habitat" },
    ],
  },
  {
    title: "History routes",
    body: "Pair missions, lighthouses, painted churches, museums, battlefields and old towns into a route that explains the place as you go.",
    links: [
      { to: "/texas-history", label: "Texas history & heritage" },
      { to: "/explore/lighthouses", label: "Texas lighthouses" },
      { to: "/explore/painted-churches", label: "Painted Churches of Texas" },
      { to: "/explore/historic-sites", label: "Historic sites" },
      { to: "/explore/small-towns", label: "Small towns" },
      { to: "/explore/road-trips", label: "Road trips" },
    ],
  },
  {
    title: "Sacred & spiritual heritage",
    body: "Visit missions, Painted Churches, memorial landscapes and historic religious communities with worship, burial, cultural sensitivity and visitor access kept distinct.",
    links: [
      { to: "/texas-sacred-places", label: "Sacred places in Texas" },
      { to: "/explore/painted-churches", label: "Painted Churches" },
      { to: "/explore/painted-churches/heritage", label: "Religious & immigrant heritage" },
      { to: "/explore/historic-sites", label: "Historic sites & missions" },
      { to: "/german-czech-texas-towns", label: "German & Czech Texas towns" },
    ],
  },
  {
    title: "Old West & ranch country",
    body: "Connect rodeo, cattle culture, frontier forts, Native history, dance halls and the roads that still carry Texas western heritage.",
    links: [
      { to: "/texas-old-west", label: "Texas Old West guide" },
      { to: "/sports-venues/rodeo-western", label: "Rodeo & western venues" },
      { to: "/texas-dance-halls-honky-tonks", label: "Dance halls & honky-tonks" },
      { to: "/explore/historic-sites", label: "Historic sites" },
      { to: "/things-unique-to-texas/roadside-small-towns", label: "Roadside & small-town Texas" },
    ],
  },
  {
    title: "Music & culture",
    body: "Use venues, music history, immigrant heritage and living traditions to understand the culture behind a destination.",
    links: [
      { to: "/texas-music", label: "Texas music" },
      { to: "/texas-music-venues", label: "Music venues" },
      { to: "/texas-dance-halls-honky-tonks", label: "Dance halls & honky-tonks" },
      { to: "/things-unique-to-texas/culture-music", label: "Culture & music reference" },
      { to: "/explore/painted-churches", label: "Painted Churches" },
    ],
  },
  {
    title: "Texas flavors",
    body: "Plan around regional food traditions, destination meals, food history and festivals rather than a generic restaurant directory.",
    links: [
      { to: "/explore/food-bbq", label: "Food & barbecue" },
      { to: "/texas-food-trail", label: "Texas food trail" },
      { to: "/texas-food-history", label: "Texas food history" },
      { to: "/events", label: "Food festivals & events" },
    ],
  },
  {
    title: "Seasonal Texas",
    body: "Plan around the seasons that actually change a Texas trip: spring wildflowers, late fall color and December town traditions.",
    links: [
      { to: "/article/texas-bluebonnets-complete-guide", label: "Bluebonnet season" },
      { to: "/article/fall-in-texas-complete-guide", label: "Fall colors in Texas" },
      { to: "/article/christmas-in-texas-complete-guide", label: "Christmas in Texas" },
      { to: "/events", label: "Texas events calendar" },
    ],
  },
  {
    title: "Small-town weekends",
    body: "Choose a courthouse square, add a meal worth the drive and make the road between them part of the trip.",
    links: [
      { to: "/explore/small-towns", label: "Small towns" },
      { to: "/explore/food-bbq", label: "Food & barbecue" },
      { to: "/texas-roadside-oddities", label: "Roadside oddities" },
      { to: "/events", label: "Events calendar" },
    ],
  },
  {
    title: "Roadside & only-in-Texas",
    body: "Build a route around unusual landmarks, eccentric stops, regional folklore and places that make the drive itself memorable.",
    links: [
      { to: "/texas-roadside-oddities", label: "Texas roadside oddities" },
      { to: "/things-unique-to-texas/roadside-small-towns", label: "Unique roadside & small towns" },
      { to: "/things-unique-to-texas", label: "Things unique to Texas" },
      { to: "/explore/road-trips", label: "Road trips" },
    ],
  },
  {
    title: "Landscapes & scenery",
    body: "Choose the Texas you want to see — limestone hills, pine forest, prairie, coast, canyon, desert or mountain country.",
    links: [
      { to: "/explore/landscapes", label: "Texas landscapes" },
      { to: "/texas-natural-wonders-bucket-list", label: "Natural wonders" },
      { to: "/explore/road-trips", label: "Scenic drives" },
      { to: "/explore/caverns", label: "Caverns & karst" },
      { to: "/article/texas-wildflowers-guide", label: "Wildflower seasons" },
    ],
  },
  {
    title: "Below-ground Texas",
    body: "Connect caverns, springs and Hill Country road trips where geology shapes the whole day.",
    links: [
      { to: "/explore/caverns", label: "Caverns & caves" },
      { to: "/explore/major-springs", label: "Major springs" },
      { to: "/explore/road-trips", label: "Scenic road trips" },
    ],
  },
  {
    title: "Sports weekends",
    body: "Start with an iconic venue or tradition, then add the neighborhood, event calendar and road-trip layer around game day.",
    links: [
      { to: "/sports", label: "Texas sports" },
      { to: "/sports-venues", label: "Sports venues" },
      { to: "/sports-venues/college-sports", label: "College sports venues" },
      { to: "/sports-venues/rodeo-western", label: "Rodeo & western venues" },
      { to: "/events", label: "Events calendar" },
    ],
  },
  {
    title: "Plan the whole trip",
    body: "Move from ideas to an itinerary, then check nearby towns and events before you go.",
    links: [
      { to: "/explore/trip-planner", label: "Texas Trip Planner" },
      { to: "/browse/cities", label: "Cities & towns" },
      { to: "/browse/counties", label: "Counties" },
      { to: "/events", label: "What’s happening" },
    ],
  },
] as const;

export function ExploreIntentPaths() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Plan by the kind of trip"
          title="Start with the Texas experience you want"
          description="Texas is easier to plan when you begin with the experience, then connect the places, roads, history, food and nearby stops that belong together."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INTENT_GROUPS.map((group) => (
            <section key={group.title} className="border-t-2 border-foreground pt-5">
              <h3 className="font-display text-2xl">{group.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.body}</p>
              <ul className="mt-5 space-y-2">
                {group.links.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm font-semibold text-primary hover:underline">
                      {item.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
