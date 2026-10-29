import { Container } from "@/components/layout/Container";
import { buildCjAccountClick, type CjAccountProgram } from "@/lib/cj-account-links";
import { trackAffiliateClick } from "@/lib/affiliate-click";

type Offer = Readonly<{ program: CjAccountProgram; label: string; detail: string }>;

// Each program is an active, publisher-specific CJ Get Link creative.
// Avoid timed offers, price claims, coupons, and inferred deep links.
const offers = {
  apparel: { program: "kings-camo-shop", label: "Shop hunting apparel", detail: "Browse the Kings Camo general catalog." },
  pants: { program: "kings-camo-pants", label: "Compare hunting pants", detail: "Choose layers and fabrics for terrain and weather." },
  rain: { program: "kings-camo-rain-jacket", label: "Explore rain protection", detail: "Check waterproof outerwear and layering options." },
  packs: { program: "kings-camo-backpacks", label: "Browse hunting packs", detail: "Consider how far you'll carry equipment." },
  kids: { program: "kings-camo-kids", label: "Browse youth camouflage clothing", detail: "Check fit and the conditions for your trip." },
  women: { program: "kings-camo-women", label: "Browse women's hunting clothing", detail: "Compare fit, weather protection, and layers." },
  turkey: { program: "kings-camo-turkey-accessories", label: "Browse turkey-hunting accessories", detail: "Check what is useful for your specific hunt." },
  lightweight: { program: "kings-camo-lightweight-shirts", label: "Explore lightweight hunting shirts", detail: "Consider heat and sun exposure." },
  camping: { program: "kings-camo-camping", label: "Browse the camping collection", detail: "Review outdoor gear for an overnight trip." },
} as const satisfies Record<string, Offer>;

type OfferKey = keyof typeof offers;

const topicOffers: Readonly<Record<string, readonly OfferKey[]>> = {
  "texas-deer-hunting": ["pants", "rain"],
  "mule-deer": ["packs", "pants"],
  "dove-hunting": ["lightweight", "pants"],
  "turkey-hunting": ["turkey", "pants"],
  "quail-hunting": ["pants", "lightweight"],
  "waterfowl-hunting": ["rain", "pants"],
  "javelina-hunting": ["pants", "lightweight"],
  "feral-hogs": ["pants", "rain"],
  "exotic-game": ["packs", "pants"],
  "youth-hunting": ["kids"],
  "squirrel-hunting": ["pants"],
  "rabbit-hare-hunting": ["pants"],
  "pheasant-hunting": ["pants"],
  "chachalaca-hunting": ["lightweight"],
  "pronghorn-hunting": ["packs"],
  "goose-hunting": ["rain"],
  "teal-hunting": ["rain"],
  "sandhill-crane-hunting": ["rain"],
};

// Legal, license, regulatory and general wildlife-information guides intentionally
// do not carry shopping offers. Never expand via broad topic-keyword matching.
export function KingsCamoGearOffers({
  pathname,
  context,
  topicSlug,
}: {
  pathname: string;
  context: "hub" | "topic" | "camping";
  topicSlug?: string;
}) {
  const selected: readonly OfferKey[] =
    context === "hub" ? ["apparel", "women", "packs"]
    : context === "camping" ? ["camping"]
    : topicSlug ? topicOffers[topicSlug] ?? [] : [];
  if (!selected.length) return null;

  const placement = context === "topic" ? `hunting-${topicSlug}` : context === "hub" ? "hunting-hub" : "camping-guide";

  return (
    <section aria-label="Optional Kings Camo gear shopping" className="border-t border-border bg-surface/60 py-10">
      <Container>
        <div className="max-w-4xl">
          <p className="eyebrow text-primary">Optional gear shopping</p>
          <h2 className="mt-2 font-display text-3xl">
            {context === "camping" ? "Outdoor gear for camping trips" : "Hunting apparel and accessories"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {context === "camping"
              ? "Kings Camo offers an outdoor camping collection. Check what you actually need for your campsite and conditions before buying."
              : "Compare clothing and equipment for the weather and terrain. Shop only after checking your hunt's actual needs and official regulations."}
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((key) => {
            const offer = offers[key];
            const href = buildCjAccountClick(offer.program, pathname);
            return <div key={key} className="border border-border bg-background p-5">
              <h3 className="font-semibold">{offer.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{offer.detail}</p>
              <a href={href} target="_blank" rel="sponsored nofollow noopener noreferrer"
                data-affiliate-partner="kings-camo" data-affiliate-placement={placement}
                data-commercial-partner="kings-camo" data-commercial-placement={placement}
                onClick={() => trackAffiliateClick({ partner: "kings-camo", label: offer.label, placement, module: "outdoor-gear" })}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">
                View at Kings Camo ↗
              </a>
            </div>;
          })}
        </div>
        <p className="mt-5 max-w-4xl text-xs leading-6 text-muted-foreground">
          Affiliate disclosure: TexasDefined may earn a commission from qualifying Kings Camo purchases, at no additional cost to you.
          These third-party products are not TPWD recommendations or substitutes for licensing, season, access, or safety rules.
        </p>
      </Container>
    </section>
  );
}
