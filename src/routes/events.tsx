import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import bluebonnets from "@/assets/bluebonnets.jpg";
import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { EventCard } from "@/components/editorial/EventCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { eventsQuery, regionsQuery } from "@/data/queries";
import { formatDateRange } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { cn } from "@/lib/utils";

const description =
  "Rodeos, wildflower weekends, barbecue throwdowns, dance halls and county fairs — good reasons to get out of the house.";
const canonicalPath = "/events";
const pageUrl = `https://${texasDefinedBrand.identity.domain}${canonicalPath}`;

export const Route = createFileRoute("/events")({
  loader: async ({ context }) => {
    const [events, regions] = await Promise.all([
      context.queryClient.ensureQueryData(eventsQuery({})),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { events, regions };
  },
  head: ({ loaderData }) => {
    const regions = loaderData?.regions ?? [];
    const regionName = (id: string) => regions.find((item) => item.id === id)?.name;
    const eventItems = (loaderData?.events ?? []).slice(0, 50).map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        "@id": `${pageUrl}#${event.id}`,
        name: event.name,
        description: event.blurb,
        startDate: event.startDate,
        endDate: event.endDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        url: `${pageUrl}#${event.id}`,
        location: {
          "@type": "Place",
          name: [event.city, regionName(event.region), "Texas"].filter(Boolean).join(", "),
          address: {
            "@type": "PostalAddress",
            addressLocality: event.city,
            addressRegion: "TX",
            addressCountry: "US",
          },
        },
      },
    }));

    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "Texas Events Calendar",
        description,
        canonicalPath,
        image: bluebonnets,
        imageAlt: "Bluebonnets running to a fence line in a Texas spring field",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: eventItems.length
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "@id": `${pageUrl}#events`,
                name: "Texas events calendar",
                url: pageUrl,
                numberOfItems: eventItems.length,
                itemListElement: eventItems,
                image: absoluteUrl(texasDefinedBrand, bluebonnets),
              }),
            },
          ]
        : [],
    };
  },
  component: EventsPage,
});

function EventsPage() {
  const brand = useBrand();
  const { data: events } = useSuspenseQuery(eventsQuery({}));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const [category, setCategory] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");

  const regionName = (id: string) => regions.find((item) => item.id === id)?.name;
  const categories = ["all", ...new Set(events.map((event) => event.category))];
  const featured = events[0];
  const rest = events.slice(1);

  const filtered = rest.filter(
    (event) =>
      (category === "all" || event.category === category) &&
      (region === "all" || event.region === region),
  );

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={bluebonnets}
          alt="Bluebonnets running to a fence line in a Texas spring field"
          width={1600}
          height={1067}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <Container className="relative py-20 sm:py-28">
          <p className="eyebrow text-ink-foreground/75">This weekend</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            Good reasons to leave the house
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-foreground/85">
            {description}
          </p>
          {featured && (
            <div id={featured.id} className="mt-10 max-w-xl border-t border-ink-foreground/30 pt-6">
              <p className="eyebrow text-ink-foreground/70">Our pick · {featured.category}</p>
              <h2 className="mt-2 font-display text-3xl leading-snug">{featured.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/85">
                {featured.blurb}
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-ink-foreground/70">
                {formatDateRange(featured.startDate, featured.endDate, brand.identity.locale)} ·{" "}
                {featured.city} · {regionName(featured.region)}
              </p>
            </div>
          )}
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Plan your weekend"
            title="What are you in the mood for?"
            description="Choose the kind of outing and the part of the state that works for you."
          />

          <div className="mt-8 space-y-4">
            <FilterRow
              label="What sounds good?"
              options={categories.map((value) => ({
                value,
                label: value === "all" ? "Anything" : value,
              }))}
              active={category}
              onChange={setCategory}
            />
            <FilterRow
              label="Where in Texas?"
              options={[
                { value: "all", label: "Anywhere" },
                ...regions.map((item) => ({ value: item.id, label: item.name })),
              ]}
              active={region}
              onChange={setRegion}
            />
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              {filtered.length > 0 ? (
                <ul>
                  {filtered.map((event) => (
                    <li id={event.id} key={event.id}>
                      <EventCard event={event} regionLabel={regionName(event.region)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="border-t border-border py-10 text-sm text-muted-foreground">
                  Nothing fits those choices right now. Try another part of the state or a different kind of outing.
                </p>
              )}
            </div>

            <aside className="h-fit border border-border bg-secondary/50 p-6 lg:sticky lg:top-24">
              <p className="eyebrow text-muted-foreground">Go by region</p>
              <ul className="mt-4 space-y-3">
                {regions.map((item) => {
                  const count = events.filter((event) => event.region === item.id).length;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setRegion(item.id)}
                        className="flex w-full items-baseline justify-between gap-4 border-b border-border/70 pb-2 text-left transition-colors hover:text-primary"
                      >
                        <span className="font-display text-lg">{item.name}</span>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">
                          {count} pick{count === 1 ? "" : "s"}
                        </span>
                      </button>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.blurb}</p>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

function FilterRow({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-sm font-medium text-foreground">{label}</span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={active === option.value}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            active === option.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
