import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export type EvergreenFunnelKind = "home" | "moving" | "travel";

const internalPaths = {
  home: [
    { to: "/texas-homeownership-cost-calculator", label: "See the full cost of owning", description: "Put mortgage, taxes, insurance, utilities, maintenance and fees in one monthly planning view." },
    { to: "/texas-home-insurance-calculator", label: "Estimate Texas home insurance", description: "Build a planning range before comparing real policy quotes and coverage details." },
    { to: "/browse/counties", label: "Check the county context", description: "Connect the property to appraisal, tax and local-record research paths." },
    { to: "/property", label: "Open the Texas property guide", description: "Continue into taxes, exemptions, insurance, ownership costs and practical property research." },
  ],
  moving: [
    { to: "/moving-to-texas-checklist", label: "Use the moving checklist", description: "Keep the before-and-after tasks for a Texas move in one practical sequence." },
    { to: "/texas-moving-cost-calculator", label: "Estimate the move itself", description: "Model transportation, packing, setup costs and a reasonable moving cushion." },
    { to: "/texas-cost-of-living-calculator", label: "Compare cost of living", description: "Put housing and everyday household costs next to the city or region you are considering." },
    { to: "/browse/cities", label: "Compare Texas cities", description: "Move from statewide averages into specific city, county and regional context." },
  ],
  travel: [
    { to: "/explore", label: "Explore Texas", description: "Browse parks, water, road trips, small towns and places worth making the drive for." },
    { to: "/events", label: "Check Texas events", description: "Add festivals, fairs, rodeos, music and seasonal events to the trip plan." },
    { to: "/guides", label: "Open the Texas guidebook", description: "Use practical destination and trip-planning guides before you go." },
    { to: "/shop", label: "Browse Texas Defined picks", description: "See the site's curated shop without interrupting the editorial guide." },
  ],
} as const;

const partnerUrls = {
  insurance: String(import.meta.env.VITE_TEXASDEFINED_INSURANCE_PARTNER_URL || "").trim(),
  mortgage: String(import.meta.env.VITE_TEXASDEFINED_MORTGAGE_PARTNER_URL || "").trim(),
  realEstate: String(import.meta.env.VITE_TEXASDEFINED_REAL_ESTATE_PARTNER_URL || "").trim(),
  moving: String(import.meta.env.VITE_TEXASDEFINED_MOVING_PARTNER_URL || "").trim(),
  travel: String(import.meta.env.VITE_TEXASDEFINED_TRAVEL_PARTNER_URL || "").trim(),
} as const;

const partnerDefinitions = {
  home: [
    { id: "insurance", label: "Compare real insurance options", description: "Use your planning estimate as a baseline, then compare actual coverage, deductibles and quotes." },
    { id: "mortgage", label: "Compare mortgage options", description: "Check real rates, fees and loan terms after you understand the monthly ownership budget." },
    { id: "realEstate", label: "Connect with a real-estate resource", description: "Move from statewide planning numbers to a specific home, neighborhood and local market." },
  ],
  moving: [
    { id: "moving", label: "Compare moving options", description: "Use the calculator result to compare actual moving services, dates and included services." },
    { id: "realEstate", label: "Connect with a Texas real-estate resource", description: "Turn a city shortlist into specific neighborhoods, homes and local market context." },
  ],
  travel: [
    { id: "travel", label: "Check travel options", description: "Compare real lodging or trip options only after you have narrowed down where and when you want to go." },
  ],
} as const;

function safePartnerUrl(value: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function inferEvergreenFunnel({ category, title }: { category?: string; title?: string }): EvergreenFunnelKind | null {
  const normalizedCategory = (category ?? "").toLowerCase();
  if (normalizedCategory === "moving-to-texas") return "moving";
  if (["real-estate", "property-taxes", "home-garden"].includes(normalizedCategory)) return "home";
  if (["road-trips", "small-towns", "state-parks", "national-parks", "lakes-rivers", "beaches-coast", "outdoors", "food-bbq", "events", "major-springs", "caverns", "historic-sites"].includes(normalizedCategory)) return "travel";

  const normalizedTitle = (title ?? "").toLowerCase();
  if (/moving|cost of living|salary|utility/.test(normalizedTitle)) return "moving";
  if (/home|mortgage|property|tax|insurance|afford|escrow|closing|loan/.test(normalizedTitle)) return "home";
  return null;
}

export function EvergreenNextSteps({ category, title }: { category?: string; title?: string }) {
  const kind = inferEvergreenFunnel({ category, title });
  if (!kind) return null;

  const partners = partnerDefinitions[kind].flatMap((partner) => {
    const href = safePartnerUrl(partnerUrls[partner.id]);
    return href ? [{ ...partner, href }] : [];
  });

  const heading = kind === "home"
    ? "Turn the estimate into a real-world comparison"
    : kind === "moving"
      ? "Turn the plan into a move-ready shortlist"
      : "Turn the idea into a Texas trip";
  const description = kind === "home"
    ? "Keep the planning number, then add the local property context and real provider terms before making a decision."
    : kind === "moving"
      ? "Use Texas Defined to narrow the place and budget first, then compare real services only when you know what you need."
      : "Choose the place and timing first. Booking and shopping should come after the trip itself makes sense.";

  return (
    <section className="border-y border-border bg-surface/55" aria-labelledby="evergreen-next-steps-heading">
      <Container className="py-10 sm:py-12">
        <p className="eyebrow text-primary">Useful next steps</p>
        <h2 id="evergreen-next-steps-heading" className="mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">{heading}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>

        <nav aria-label="Planning next steps" className="mt-7">
          <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {internalPaths[kind].map((item) => (
              <li key={item.to} className="border-b border-border sm:px-5 sm:first:pl-0">
                <Link to={item.to} className="group block h-full py-5">
                  <span className="font-display text-lg leading-tight transition-colors group-hover:text-primary">{item.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {partners.length > 0 ? (
          <aside className="mt-8 border-t border-border pt-6" aria-label="Commercial comparison options">
            <p className="eyebrow text-muted-foreground">When you are ready to compare</p>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    data-commercial-partner={partner.id}
                    className="group block h-full border border-border bg-background p-5 transition-colors hover:border-primary/60"
                  >
                    <span className="font-display text-lg leading-tight transition-colors group-hover:text-primary">{partner.label}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{partner.description}</span>
                    <span className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Compare options →</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-3xl text-xs leading-6 text-muted-foreground">Some links in this section may be partner links. Texas Defined may receive compensation if you use them. That does not change our planning guidance or the order in which we present editorial information.</p>
          </aside>
        ) : null}
      </Container>
    </section>
  );
}
