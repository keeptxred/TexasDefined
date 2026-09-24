import { trackAffiliateClick } from "@/lib/affiliate-click";

type RexingOfferKey = "dash-cams" | "trail-h6" | "jump-starters";

type RexingOffer = {
  key: RexingOfferKey;
  title: string;
  copy: string;
  label: string;
  url: string;
};

const REXING_OFFERS: Record<RexingOfferKey, RexingOffer> = {
  "dash-cams": {
    key: "dash-cams",
    title: "Compare current dash-camera options",
    copy: "If you are shopping after deciding which channels, storage and power setup you need, compare Rexing’s current dash-camera lineup and verify the specifications for the exact model before buying.",
    label: "Browse Rexing dash cameras",
    url: "https://www.jdoqocy.com/click-101876465-15019509",
  },
  "trail-h6": {
    key: "trail-h6",
    title: "A current trail-camera option to compare",
    copy: "Rexing currently lists its H6 Woodlens trail camera for outdoor wildlife monitoring. Check the current product page for included accessories, storage requirements, weather rating and other model-specific details before deploying it.",
    label: "See the Rexing H6 trail camera",
    url: "https://www.tkqlhce.com/click-101876465-14424553",
  },
  "jump-starters": {
    key: "jump-starters",
    title: "Compare portable jump-start options",
    copy: "A portable jump starter can be useful road-trip backup when it is compatible with the vehicle, kept charged and used according to its instructions. Compare Rexing’s current jump-starter lineup rather than choosing only by peak-current marketing.",
    label: "Browse Rexing jump starters",
    url: "https://www.dpbolvw.net/click-101876465-17195894",
  },
};

const ARTICLE_OFFERS: Partial<Record<string, RexingOfferKey>> = {
  "dash-cams-in-texas": "dash-cams",
  "dash-cam-setup-texas-road-trips": "dash-cams",
  "rideshare-dash-cams-texas": "dash-cams",
  "texas-heat-vehicle-electronics": "dash-cams",
  "trail-cameras-in-texas": "trail-h6",
  "texas-wildlife-camera-guide": "trail-h6",
  "cameras-texas-camping-outdoors": "trail-h6",
  "rural-texas-property-monitoring": "trail-h6",
  "texas-road-trip-vehicle-checklist": "jump-starters",
  "texas-car-emergency-kit": "jump-starters",
};

export function rexingOfferForArticle(slug: string): RexingOffer | null {
  const key = ARTICLE_OFFERS[slug];
  return key ? REXING_OFFERS[key] : null;
}

export function RexingAffiliateCard({ offer, placement }: { offer: RexingOffer; placement: string }) {
  return (
    <aside className="mt-10 border border-border bg-surface p-6 sm:p-7" aria-label="Optional vehicle and camera gear">
      <p className="eyebrow text-primary">Optional gear</p>
      <h2 className="mt-3 font-display text-2xl">{offer.title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{offer.copy}</p>
      <a
        href={offer.url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        data-affiliate-partner="rexing"
        data-affiliate-placement={placement}
        data-commercial-partner="rexing"
        data-commercial-placement={placement}
        data-affiliate-destination={offer.key}
        onClick={() => trackAffiliateClick({
          partner: "rexing",
          label: offer.label,
          placement,
          module: offer.key,
        })}
      >
        {offer.label} ↗
      </a>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Affiliate disclosure: TexasDefined may earn a commission from qualifying Rexing purchases, at no additional cost to you.
      </p>
    </aside>
  );
}

export const rexingAffiliateDestinations = REXING_OFFERS;
