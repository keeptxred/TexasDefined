import type { Destination } from "@/data/types";
import { verifiedLocalParkCredit } from "@/data/verified-local-state-park-photo-credits";

type Props = { destination: Destination };

function commonsPhotoCredit(destination: Destination) {
  const { src, credit } = destination.hero;
  // The Chamizal hero is a licensed local copy, not a Commons redirect URL.
  if (destination.slug === "chamizal-national-memorial" &&
      src === "/images/explore/historic-sites/chamizal-national-memorial.jpg" &&
      credit?.includes("GoneBefore")) {
    return {
      fileUrl: "https://commons.wikimedia.org/wiki/File:Chamizal_National_Memorial.jpg",
      licenseCode: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      credit,
      note: null,
    };
  }
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
  return { fileUrl, licenseCode, licenseUrl, credit, note: null };
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
  const imageCredit = commonsPhotoCredit(destination) ?? verifiedLocalParkCredit(destination.hero);
  if (!guide && !destination.visitorFaqs?.length) return null;

  return <div data-destination-authority-sections className="mt-12 space-y-12">
    {imageCredit && <section aria-label="Photograph attribution" className="border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
      <p>Hero image: {imageCredit.credit}. <a href={imageCredit.fileUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Photograph and creator details ↗</a>{imageCredit.licenseUrl && <> · <a href={imageCredit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{imageCredit.licenseCode} license ↗</a></>}{imageCredit.note && <> · {imageCredit.note}</>}.</p>
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

    {destination.visitorFaqs && destination.visitorFaqs.length > 0 && <section aria-labelledby="destination-visitor-faqs" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Practical questions</p>
      <h2 id="destination-visitor-faqs" className="mt-3 font-display text-3xl">Frequently asked questions about {destination.name}</h2>
      <dl className="mt-6">
        {destination.visitorFaqs.map((item) => <div key={item.question} className="border-t border-border pt-5">
          <dt className="font-semibold text-foreground">{item.question}</dt>
          <dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}
            {item.sourceUrl && /^https:\/\//.test(item.sourceUrl) && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary underline underline-offset-4">Check official details ↗</a>}
          </dd>
        </div>)}
      </dl>
    </section>}

    {guide && destination.slug !== "chamizal-national-memorial" && guide.sources.length > 0 && <section aria-labelledby="destination-authority-sources" className="border-t border-border pt-8">
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
