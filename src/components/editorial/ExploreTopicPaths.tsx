import { Link } from "@tanstack/react-router";

import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { EvergreenNextSteps } from "@/components/monetization/EvergreenNextSteps";
import type { CategorySlug } from "@/data/types";

type TopicLink = { to: string; label: string; description: string };

const TOPIC_PATHS: Partial<Record<CategorySlug, TopicLink[]>> = {
  "lakes-rivers": [
    { to: "/explore/major-springs", label: "Springs & swimming", description: "Pair rivers and lakes with clear spring-fed water and swimming holes." },
    { to: "/explore/state-parks", label: "State parks", description: "Find shoreline parks, paddling access, camping and trails near the water." },
    { to: "/fishing", label: "Texas fishing", description: "Go deeper lake by lake with target species, techniques, reports and local fishing resources." },
  ],
  "major-springs": [
    { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "See the larger waterways connected to Texas springs and swimming country." },
    { to: "/explore/caverns", label: "Caverns & caves", description: "Explore the limestone geology that shapes many of Texas' spring systems." },
    { to: "/explore/state-parks", label: "State parks", description: "Find protected landscapes with swimming, trails and spring-fed water." },
  ],
  "state-parks": [
    { to: "/best-places-to-go-camping-in-texas", label: "Best camping in Texas", description: "Choose standout campsites by region, season and camping style, then use the park guide for the detailed destination layer." },
    { to: "/explore/outdoors", label: "Wildlife & outdoors", description: "Go beyond park gates into refuges, birding areas and wild landscapes." },
    { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Find paddling, fishing and swimming destinations near Texas parks." },
  ],
  "national-parks": [
    { to: "/explore/road-trips", label: "Road trips", description: "Build a longer route around Texas' largest protected landscapes." },
    { to: "/explore/outdoors", label: "Wildlife & outdoors", description: "Explore dark skies, wildlife and public land beyond the national parks." },
    { to: "/explore/small-towns", label: "Small towns", description: "Find gateway communities and worthwhile stops near remote park country." },
  ],
  caverns: [
    { to: "/explore/major-springs", label: "Springs & swimming", description: "See how limestone, groundwater and clear Texas springs fit together." },
    { to: "/explore/historic-sites", label: "Historic sites & museums", description: "Pair underground geology with nearby history and interpretation." },
    { to: "/explore/road-trips", label: "Road trips", description: "Link caves, parks and Hill Country stops into a weekend route." },
  ],
  "beaches-coast": [
    { to: "/explore/outdoors", label: "Wildlife & outdoors", description: "Explore coastal birding, marshes, refuges and barrier-island habitat." },
    { to: "/explore/small-towns", label: "Small towns", description: "Find Gulf Coast communities worth adding to a beach weekend." },
    { to: "/explore/food-bbq", label: "Food & barbecue", description: "Add seafood, local institutions and regional food stops to the trip." },
  ],
  "historic-sites": [
    { to: "/explore/painted-churches", label: "Painted Churches of Texas", description: "Explore 27 verified churches through history, immigrant heritage, decorative art, preservation and current visitor guidance." },
    { to: "/explore/small-towns", label: "Small towns", description: "Follow Texas history into courthouse squares and communities with a story." },
    { to: "/texas-history", label: "Texas history", description: "Read the deeper stories behind the places preserved across the state." },
  ],
  "road-trips": [
    { to: "/explore/painted-churches/routes", label: "Painted Churches routes", description: "Use eight researched church itineraries ranging from the classic Schulenburg circuit to statewide heritage routes." },
    { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Turn destinations and interests into a practical day-by-day itinerary." },
    { to: "/explore/small-towns", label: "Small towns", description: "Add courthouse squares, local landmarks and worthwhile detours." },
  ],
  "small-towns": [
    { to: "/explore/painted-churches", label: "Painted Churches", description: "Connect immigrant communities, parish history and painted interiors across small-town Texas." },
    { to: "/explore/road-trips", label: "Road trips", description: "String several towns together with scenic roads and worthwhile stops." },
    { to: "/explore/historic-sites", label: "Historic sites & museums", description: "Understand the history behind courthouse squares and older communities." },
  ],
  "food-bbq": [
    { to: "/explore/small-towns", label: "Small towns", description: "Find the communities behind classic barbecue joints and regional food traditions." },
    { to: "/explore/road-trips", label: "Road trips", description: "Build a route around food stops instead of treating them as an afterthought." },
    { to: "/events", label: "Texas events", description: "Find food festivals, fairs and seasonal events worth pairing with a meal." },
  ],
  outdoors: [
    { to: "/explore/state-parks", label: "State parks", description: "Start with protected public land for trails, camping and wildlife." },
    { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Follow wildlife, paddling and fishing into Texas water destinations." },
    { to: "/explore/national-parks", label: "National parks", description: "Go deeper into Texas' largest wild landscapes and dark-sky country." },
  ],
};

export function ExploreTopicPaths({ category }: { category: CategorySlug }) {
  const links = TOPIC_PATHS[category] ?? [];
  if (!links.length) return null;

  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Build the bigger picture"
            title="Keep exploring this part of Texas"
            description="The strongest Texas trips usually cross categories. These nearby topics add context, places and practical next steps."
          />
          <nav aria-label="Related Texas guide topics" className="mt-8 grid border-t border-border md:grid-cols-3">
            {links.map((item, index) => (
              <Link key={item.to} to={item.to} className={`group border-b border-border py-6 md:px-6 ${index < links.length - 1 ? "md:border-r" : ""} md:first:pl-0 md:last:pr-0`}>
                <strong className="font-display text-2xl transition-colors group-hover:text-primary">{item.label}</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
              </Link>
            ))}
          </nav>
        </Container>
      </Section>
      <EvergreenNextSteps category={category} />
    </>
  );
}