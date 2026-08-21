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
    ],
  },
  {
    title: "Park weekends",
    body: "Start with public land, then connect trails, camping, wildlife and nearby towns.",
    links: [
      { to: "/explore/state-parks", label: "State parks" },
      { to: "/explore/national-parks", label: "National parks" },
      { to: "/explore/outdoors", label: "Wildlife & outdoors" },
    ],
  },
  {
    title: "History routes",
    body: "Pair missions, painted churches, museums, battlefields and old towns into a route that explains the place as you go.",
    links: [
      { to: "/explore/painted-churches", label: "Painted Churches of Texas" },
      { to: "/explore/historic-sites", label: "Historic sites" },
      { to: "/explore/small-towns", label: "Small towns" },
      { to: "/explore/road-trips", label: "Road trips" },
    ],
  },
  {
    title: "Small-town weekends",
    body: "Choose a courthouse square, add a meal worth the drive and make the road between them part of the trip.",
    links: [
      { to: "/explore/small-towns", label: "Small towns" },
      { to: "/explore/food-bbq", label: "Food & barbecue" },
      { to: "/events", label: "Events calendar" },
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
    title: "Plan the whole trip",
    body: "Move from ideas to an itinerary, then check nearby towns and events before you go.",
    links: [
      { to: "/explore/trip-planner", label: "Texas Trip Planner" },
      { to: "/browse/cities", label: "Cities & towns" },
      { to: "/events", label: "What’s happening" },
    ],
  },
] as const;

const FEATURED_GATEWAYS = [
  { slug: "texas-places-worth-driving-for", label: "25 Texas places worth driving for" },
  { slug: "best-texas-weekend-trips-by-season", label: "Best Texas weekend trips by season" },
  { slug: "best-texas-small-towns-by-trip-type", label: "Best Texas small towns by trip type" },
  { slug: "best-texas-state-parks-for-first-time-visitors", label: "Best state parks for first-time visitors" },
  { slug: "best-texas-family-road-trips", label: "Best Texas family road trips" },
  { slug: "best-texas-food-towns", label: "Texas food towns worth a trip" },
] as const;

export function ExploreIntentPaths() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Plan by the kind of trip"
          title="Start with the weekend you want"
          description="Texas is easier to plan when you begin with the experience, then connect the places, roads and nearby stops that belong together."
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

        <section className="mt-10 border-t border-border pt-7" aria-labelledby="gateway-trip-ideas">
          <h3 id="gateway-trip-ideas" className="font-display text-2xl">Start with a shortlist</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            These broader guides help narrow the state before you choose the exact towns, parks, meals and roads for the trip.
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_GATEWAYS.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/article/$slug"
                  params={{ slug: item.slug }}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Section>
  );
}
