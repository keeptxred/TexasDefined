import { createFileRoute, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { getMajorEventAuthority } from "@/data/major-event-authority";
import { getMajorEventParkingMap } from "@/data/parking-maps.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

const SEARCH_TITLE_TARGET = 65;

function eventYearFromTitle(title: string) {
  return title.match(/\b(20\d{2})\b/)?.[1];
}

function eventNameWithoutYear(name: string, year?: string) {
  if (!year) return name.trim();
  return name.replace(new RegExp(`\\s+${year}\\b`, "g"), "").trim();
}

function buildEventSearchTitle(page: { name: string; city: string; title: string }) {
  const year = eventYearFromTitle(page.title);
  const name = eventNameWithoutYear(page.name, year);
  const prefix = year ? `${name} ${year}` : name;
  const candidates = [
    `${prefix}: Dates, Schedule & ${page.city} Guide`,
    `${prefix}: Dates & ${page.city} Guide`,
    `${prefix}: Dates & Visitor Guide`,
    `${prefix}: Dates & Guide`,
  ];
  return candidates.find((candidate) => candidate.length <= SEARCH_TITLE_TARGET) ?? candidates.at(-1)!;
}

function buildEventSearchDescription(page: { name: string; city: string; title: string }) {
  const year = eventYearFromTitle(page.title);
  const name = eventNameWithoutYear(page.name, year);
  const datedName = year ? `${name} ${year}` : name;
  return `${datedName} in ${page.city}, Texas: dates, schedule, hours, official sources and practical visitor planning.`;
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
        title: buildEventSearchTitle(page),
        description: buildEventSearchDescription(page),
        image: page.image,
        imageAlt: page.imageAlt,
        type: "article",
        robots: page.imageCompliant ? undefined : "noindex, follow, max-image-preview:large",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});