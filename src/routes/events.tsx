import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { EventCard } from "@/components/editorial/EventCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { eventsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Rodeos, wildflower weekends, barbecue throwdowns, dance halls and county fairs — a running calendar of what's worth the drive.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "Texas Events Calendar", description }),
    links: [canonicalLink(texasDefinedBrand, "/events")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(eventsQuery({})),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
  },
  component: EventsPage,
});

function EventsPage() {
  const { data: events } = useSuspenseQuery(eventsQuery({}));
  const { data: regions } = useSuspenseQuery(regionsQuery());

  const grouped = events.reduce<Record<string, typeof events>>((acc, event) => {
    const key = event.category;
    acc[key] = [...(acc[key] ?? []), event];
    return acc;
  }, {});

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Events</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          The Texas calendar
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Container>

      {Object.entries(grouped).map(([category, list], index) => (
        <Section key={category} tone={index % 2 === 1 ? "surface" : "default"}>
          <Container>
            <SectionHeader eyebrow={category} title={`${list.length} on the calendar`} />
            <div className="mt-6 grid gap-x-12 md:grid-cols-2">
              {list.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  regionLabel={regions.find((region) => region.id === event.region)?.name}
                />
              ))}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
