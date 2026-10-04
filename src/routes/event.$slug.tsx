import { createFileRoute, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { getMajorEventAuthority } from "@/data/major-event-authority";
import { getMajorEventParkingMap } from "@/data/parking-maps.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

function eventSearchTitle(name: string, city: string, startDate: string) {
  const year = startDate.slice(0, 4);
  const normalizedName = name.replace(new RegExp(`\\s${year}$`), "");
  return `${normalizedName} ${year}: Dates, Schedule, Tickets & ${city}`;
}

function eventSearchDescription(name: string, city: string, startDate: string, endDate?: string) {
  const format = (value: string) => new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
  const dates = endDate && endDate !== startDate
    ? `${format(startDate)}–${format(endDate)}`
    : format(startDate);
  return `Plan ${name} in ${city}: ${dates}. Check schedule, tickets, parking, venue details, official links and practical visitor guidance before you go.`;
}

export const Route = createFileRoute("/event/$slug")({
  loader: async ({ params }) => {
    const [page, parkingMap] = await Promise.all([
      getMajorEventAuthority(params.slug),
      getMajorEventParkingMap(params.slug),
    ]);
    if (!page) throw notFound();
    return { page, parkingMap };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { page } = loaderData;
    const canonicalPath = `/event/${page.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: eventSearchTitle(page.name, page.city, page.startDate),
        description: eventSearchDescription(page.name, page.city, page.startDate, page.endDate),
        image: page.image,
        imageAlt: page.imageAlt,
        type: "article",
        robots: page.imageCompliant ? undefined : "noindex, follow, max-image-preview:large",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});