import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";

import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { CategorySlug } from "@/data/types";

const EvergreenNextSteps = lazy(() =>
  import("@/components/monetization/EvergreenNextSteps").then((module) => ({ default: module.EvergreenNextSteps })),
);

type TopicLink = { to: string; label: string; description: string };

const TOPIC_PATHS: Partial<Record<CategorySlug, TopicLink[]>> = {
  "lakes-rivers": [
    { to: "/explore/major-springs", label: "Springs & swimming", description: "Pair rivers and lakes with clear spring-fed water and swimming holes." },
    { to: "/texas-paddling-guide", label: "Texas paddling", description: "Plan five official paddling trails around launch access, route length, water levels, wind and current conditions." },
    { to: "/fishing", label: "Texas fishing", description: "Go deeper lake by lake with target species, techniques, reports and local fishing resources." },
    { to: "/best-places-to-go-camping-in-texas", label: "Best camping in Texas", description: "Turn a lake or river trip into an overnight plan with standout campsites by region, season and camping style." },
    { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Connect waterways to habitat, wildlife viewing, public lands, heat safety and seasonal outdoor planning." },
    { to: "/explore/state-parks", label: "State parks", description: "Use managed public land as an access, camping and recreation anchor around Texas water." },
    { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Turn water access, camping and nearby stops into a practical day-by-day route." },
  ],
  "major-springs": [
    { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "See the larger waterways connected to Texas springs and swimming country." },
    { to: "/explore/caverns", label: "Caverns & caves", description: "Explore the limestone geology that shapes many of Texas' spring systems." },
    { to: "/explore/state-parks", label: "State parks", description: "Find protected landscapes with swimming, trails and spring-fed water." },
    { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Add habitat, weather, wildlife and public-land planning to a spring-fed trip." },
  ],
  "state-parks": [
    { to: "/best-places-to-go-camping-in-texas", label: "Best camping in Texas", description: "Choose standout campsites by region, season and camping style, then use the park guide for the detailed destination layer." },
    { to: "/texas-birds-guide", label: "Texas birds guide", description: "Connect park visits to birding seasons, habitats and species found across the state." },
    { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Find paddling, fishing and swimming destinations near Texas parks." },
    { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Plan around public-land access, wildlife, heat, hiking and seasonal conditions." },
    { to: "/explore/beaches-coast", label: "Beaches & Gulf Coast", description: "Connect coastal state parks to beaches, bays, bird migration and Gulf conditions." },
  ],
  "national-parks": [
    { to: "/explore/road-trips", label: "Road trips", description: "Build a longer route around Texas' largest protected landscapes." },
    { to: "/texas-natural-wonders-bucket-list", label: "Texas natural wonders", description: "Put the parks in context with canyons, mountains, coast, caves and other defining landscapes." },
    { to: "/explore/small-towns", label: "Small towns", description: "Find gateway communities and worthwhile stops near remote park country." },
    { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Add habitat, hiking safety, dark skies and seasonal planning to a national-park trip." },
  ],
  caverns: [
    { to: "/explore/major-springs", label: "Springs & swimming", description: "See how limestone, groundwater and clear Texas springs fit together." },
    { to: "/explore/historic-sites", label: "Historic sites & museums", description: "Pair underground geology with nearby history and interpretation." },
    { to: "/explore/road-trips", label: "Road trips", description: "Link caves, parks and Hill Country stops into a weekend route." },
    { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Connect caves and karst to surface habitat, public-land access and outdoor trip safety." },
  ],
  "beaches-coast": [
    { to: "/explore/lighthouses", label: "Texas lighthouses", description: "Use the sourced lighthouse map to connect Gulf Coast beaches with maritime history, public-access guidance and a coast-spanning route." },
    { to: "/texas-birds-guide", label: "Texas birds guide", description: "Add migration seasons, coastal habitat and birding context to a Gulf Coast trip." },
    { to: "/fishing", label: "Texas fishing", description: "Connect the coast to fishing planning, species, techniques and access resources." },
    { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Add habitat, wildlife, weather and heat-safety context to beaches, bays and barrier islands." },
    { to: "/explore/state-parks", label: "Coastal state parks", description: "Use managed public lands for camping, beach access, birding and habitat interpretation." },
    { to: "/explore/road-trips", label: "Gulf Coast road trips", description: "Build a regional coast route without turning the entire shoreline into one rushed checklist." },
    { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence beaches, towns, fishing, wildlife and history around realistic drive times." },
  ],
  "historic-sites": [
    { to: "/explore/lighthouses", label: "Texas lighthouses", description: "Follow surviving and relocated Gulf Coast lights through shipping, storms, war, preservation and the counties they served." },
    { to: "/explore/painted-churches", label: "Painted Churches of Texas", description: "Explore 27 verified churches through history, immigrant heritage, decorative art, preservation and current visitor guidance." },
    { to: "/texas-history", label: "Texas history", description: "Read the deeper stories behind the places preserved across the state." },
    { to: "/texas-dance-halls-honky-tonks", label: "Dance halls & honky-tonks", description: "Connect historic places to Texas music, community gathering spaces and living western culture." },
  ],
  "road-trips": [
    { to: "/texas-roadside-oddities", label: "Texas roadside oddities", description: "Add eccentric landmarks, giant objects and unusual stops that make the drive part of the story." },
    { to: "/explore/lighthouses", label: "Texas lighthouse trail", description: "Build a Gulf Coast itinerary around Port Isabel, Bolivar, Matagorda Bay, Port Aransas and the historic Sabine gateway." },
    { to: "/explore/painted-churches/routes", label: "Painted Churches routes", description: "Use eight researched church itineraries ranging from the classic Schulenburg circuit to statewide heritage routes." },
    { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Turn destinations and interests into a practical day-by-day itinerary." },
    { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Build water access, paddling, fishing and camping into a regional driving route." },
    { to: "/explore/beaches-coast", label: "Beaches & Gulf Coast", description: "Use beach access, birding, fishing and maritime stops to build a focused coastal route." },
  ],
  "small-towns": [
    { to: "/explore/painted-churches", label: "Painted Churches", description: "Connect immigrant communities, parish history and painted interiors across small-town Texas." },
    { to: "/explore/food-bbq", label: "Food & barbecue", description: "Pair town squares and main streets with regional food traditions and destination meals." },
    { to: "/things-unique-to-texas/roadside-small-towns", label: "Unique roadside & small-town Texas", description: "Connect courthouse squares and main streets with only-in-Texas stops and regional character." },
    { to: "/texas-dance-halls-honky-tonks", label: "Dance halls & honky-tonks", description: "Find living music traditions and historic gathering places rooted in Texas towns." },
    { to: "/explore/road-trips", label: "Road trips", description: "String several towns together with scenic roads and worthwhile stops." },
    { to: "/explore/historic-sites", label: "Historic sites & museums", description: "Understand the history behind courthouse squares and older communities." },
  ],
  "food-bbq": [
    { to: "/texas-food-trail", label: "Texas food trail", description: "Follow regional food traditions and destination stops as a statewide travel route." },
    { to: "/texas-food-history", label: "Texas food history", description: "Understand the immigrant, ranching, Gulf Coast and border traditions behind the food." },
    { to: "/explore/small-towns", label: "Small towns", description: "Find the communities behind classic barbecue joints and regional food traditions." },
    { to: "/events", label: "Texas events", description: "Find food festivals, fairs and seasonal events worth pairing with a meal." },
  ],
  outdoors: [
    { to: "/explore/state-parks", label: "State parks", description: "Start with protected public land for trails, camping and wildlife." },
    { to: "/texas-birds-guide", label: "Texas birds guide", description: "Plan wildlife outings around habitat, migration and birding seasons across Texas." },
    { to: "/texas-natural-wonders-bucket-list", label: "Texas natural wonders", description: "Move from recreation into the canyons, mountains, springs, caves and coast that define the landscape." },
    { to: "/texas-rock-climbing-bouldering-guide", label: "Rock climbing & bouldering", description: "Plan four public climbing areas around land-manager access, conservation and visitor-safety rules." },
    { to: "/texas-mountain-biking-guide", label: "Mountain biking", description: "Compare five public trail systems across desert mountains, canyon country, the Hill Country and East Texas pines." },
    { to: "/texas-horseback-riding-guide", label: "Horseback riding", description: "Plan five public-land riding destinations around Coggins documentation, permits, trail sharing, water and equestrian facilities." },
    { to: "/texas-ohv-guide", label: "OHV legal riding", description: "Find legal Texas OHV venues and plan around decals, vehicle classes, land-manager maps, permits and current closures." },
    { to: "/texas-paddling-guide", label: "Texas paddling", description: "Compare five official paddling trails from city lakes and bayous to Caddo swamp and Gulf Coast flats." },
    { to: "/texas-stargazing-guide", label: "Stargazing & dark skies", description: "Plan Texas's five International Dark Sky Parks around moon phase, Bortle ratings, weather, access and night-sky stewardship." },
    { to: "/best-places-to-go-camping-in-texas", label: "Best camping in Texas", description: "Choose an overnight base by region, season and camping style before heading deeper outdoors." },
    { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Plan swimming, paddling and water weekends around current conditions and public access." },
    { to: "/explore/beaches-coast", label: "Beaches & Gulf Coast", description: "Move into barrier islands, bays, coastal habitat, surf safety and Gulf trip planning." },
    { to: "/fishing", label: "Texas fishing", description: "Connect outdoor destinations to species, techniques, regulations and lake or coastal access." },
  ],
  events: [
    { to: "/texas-state-fair", label: "State Fair of Texas", description: "Go deeper on one of the state's most durable recurring event destinations." },
    { to: "/sports-venues", label: "Sports venues", description: "Connect event planning to stadiums, arenas, race tracks, rodeo grounds and college traditions." },
    { to: "/explore/small-towns", label: "Small towns", description: "Use recurring festivals, fairs and seasonal traditions as anchors for a town weekend." },
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
            description="The strongest Texas trips usually cross categories. These nearby topics add context, places and practical next steps without creating duplicate destination pages."
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
      <Suspense fallback={null}>
        <EvergreenNextSteps category={category} />
      </Suspense>
    </>
  );
}
