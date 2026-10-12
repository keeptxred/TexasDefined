import { Link } from "@tanstack/react-router";
import type { Destination, DestinationAreaItem } from "@/data/types";

type Props = { destination: Destination };

function commonsPhotoCredit(destination: Destination) {
  const { src, credit } = destination.hero;
  if (!credit || !src.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")) return null;
  const encodedFile = src.split("/file/")[1]?.split("?")[0];
  if (!encodedFile) return null;
  const fileUrl = "https://commons.wikimedia.org/wiki/File:" + encodedFile;
  const licenseCode = credit.match(/CC BY(?:-SA)? [0-9]+(?:\.[0-9]+)?/i)?.[0];
  const licenseUrl = licenseCode
    ? "https://creativecommons.org/licenses/" +
      (licenseCode.includes("BY-SA") ? "by-sa/" : "by/") +
      licenseCode.match(/[0-9]+(?:\.[0-9]+)?/)?.[0] + "/"
    : null;
  return { fileUrl, licenseCode, licenseUrl, credit };
}

const textGroupNames = {
  nearbyAttractions: "Attractions worth planning around",
  foodAndDrink: "Food and drink areas",
  lodging: "Where to stay",
  neighborhoods: "Neighborhoods and historic centers",
  familyStops: "Family-friendly options",
  sideTrips: "Nearby places and longer outings",
} as const;

function SafeAreaLink({ item }: { item: DestinationAreaItem }) {
  if (!item.href) return <strong className="font-semibold text-foreground">{item.name}</strong>;
  if (item.href.startsWith("/")) {
    return <Link to={item.href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{item.name}</Link>;
  }
  if (/^https:\/\//.test(item.href)) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{item.name} ↗</a>;
  }
  return <strong className="font-semibold text-foreground">{item.name}</strong>;
}

/**
 * Shared, server-renderable authority presentation:
 * - renders existing researched content rather than hiding it in schema-only metadata
 * - provides walkable planning, family and accessibility context
 * - differentiates primary sources from editorial judgment
 * - works for all future destinations using the DestinationAuthorityGuide contract
 */
export function DestinationAuthoritySections({ destination }: Props) {
  const guide = destination.authorityGuide;
  const area = destination.areaGuide;
  const imageCredit = commonsPhotoCredit(destination);
  if (!guide && !area) return null;

  const groups = area ? (Object.keys(textGroupNames) as Array<keyof typeof textGroupNames>)
    .map((key) => ({ key, label: textGroupNames[key], entries: area[key] }))
    .filter(({ entries }) => entries.length > 0) : [];

  return <div data-destination-authority-sections className="mt-12 space-y-12">
    {imageCredit && <section aria-label="Photograph attribution" className="border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
      <p>Hero image: {imageCredit.credit}. <a href={imageCredit.fileUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Photograph and creator details ↗</a>{imageCredit.licenseUrl && <> · <a href={imageCredit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{imageCredit.licenseCode} license ↗</a></>}.</p>
    </section>}
    {guide && <section aria-labelledby="destination-authority-assessment" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Independent Texas Defined research</p>
      <h2 id="destination-authority-assessment" className="mt-3 font-display text-3xl">Why this place matters</h2>
      <p className="mt-5 leading-8 text-foreground/90">{guide.whyItMatters}</p>
      <h3 className="mt-8 font-display text-2xl">Our trip-planning assessment</h3>
      <dl className="mt-5 grid gap-x-7 gap-y-6 border-y border-border py-6 text-sm leading-6 sm:grid-cols-2">
        {([
          ["Recommended visit", guide.assessment.recommendedVisit],
          ["Physical effort", guide.assessment.physicalEffort],
          ["Weather exposure", guide.assessment.weatherExposure],
          ["Planning required", guide.assessment.planningLevel],
          ["Family fit", guide.assessment.familyFit],
          ["First-visit value", guide.assessment.firstTimeValue],
        ] as const).map(([label, value]) => <div key={label}>
          <dt className="font-semibold text-foreground">{label}</dt>
          <dd className="mt-1 text-muted-foreground">{value}</dd>
        </div>)}
      </dl>
      <h3 className="mt-9 font-display text-2xl">Itineraries that fit real trips</h3>
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {guide.itineraries.map((trip) => <section key={trip.label} className="border-t-2 border-primary/40 pt-5">
          <p className="eyebrow text-primary">{trip.duration}</p>
          <h4 className="mt-2 font-display text-xl">{trip.label}</h4>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
            {trip.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>)}
      </div>
    </section>}

    {area && <section aria-labelledby="destination-authority-local" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Local-area guide</p>
      <h2 id="destination-authority-local" className="mt-3 font-display text-3xl">Explore {destination.name} by interest</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/85">{area.intro}</p>
      <div className="mt-8 grid gap-x-9 gap-y-9 sm:grid-cols-2">
        {groups.map((group) => <section key={group.key} className="border-t border-border pt-5">
          <h3 className="font-display text-xl">{group.label}</h3>
          <ul className="mt-4 space-y-5">
            {group.entries.map((item, index) => <li key={item.name + index} className="text-sm leading-6">
              <SafeAreaLink item={item} />
              {item.proximity && <span className="ml-2 text-xs text-muted-foreground">· {item.proximity}</span>}
              <p className="mt-1 text-muted-foreground">{item.description}</p>
            </li>)}
          </ul>
        </section>)}
      </div>
    </section>}

    {guide && guide.sources.length > 0 && <section aria-labelledby="destination-authority-sources" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Verify before you travel</p>
      <h2 id="destination-authority-sources" className="mt-3 font-display text-3xl">Primary sources and fact checks</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Our itineraries and recommendations are independent editorial judgments. Hours, ticket prices, access, closures and conditions belong to the official operators and can change after our most recent review.</p>
      {destination.sourceCheckedAt && <p className="mt-3 text-xs text-muted-foreground">Last source review: <time dateTime={destination.sourceCheckedAt}>{destination.sourceCheckedAt}</time></p>}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {guide.sources.filter((source) => /^https:\/\//.test(source.url)).map((source) => <li key={source.url} className="border-t border-border pt-4 text-sm leading-6">
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
          <p className="mt-1 text-muted-foreground">{source.scope}</p>
        </li>)}
      </ul>
    </section>}
  </div>;
}
