import { trackAffiliateClick } from "@/lib/affiliate-click";

const VIATOR_CITY_PATHS: Readonly<Record<string, string>> = {
  austin: "/Austin/d5021",
  "fort-worth": "/Fort-Worth/d33749",
  galveston: "/Galveston/d4385",
  fredericksburg: "/Fredericksburg/d50796",
  waco: "/Waco/d50076",
  "corpus-christi": "/Corpus-Christi/d28078",
  "port-aransas": "/Port-Aransas/d50797-ttd",
  "south-padre-island": "/South-Padre-Island/d22446-ttd",
  "el-paso": "/El-Paso/d50135",
  amarillo: "/Amarillo/d29045",
};

function cityName(slug: string) {
  return slug.split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(" ");
}

export function CityViatorBooking({ citySlug }: { citySlug: string }) {
  const path = VIATOR_CITY_PATHS[citySlug];
  if (!path) return null;

  const name = cityName(citySlug);
  const placement = `viator-city-${citySlug}`;
  const label = `Browse current ${name} experiences`;
  const href = `https://www.viator.com${path}?pid=P00318227&mcid=42383&campaign=texasdefined-city-${citySlug}`;

  return (
    <section className="border-b border-border bg-surface/55 px-0 py-7 sm:py-8">
      <p className="eyebrow text-primary">Tours & bookable experiences</p>
      <h2 className="mt-2 font-display text-3xl leading-tight">Find things to do in {name}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Check current guided tours, tickets and organized experiences on Viator.</p>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        data-affiliate-partner="viator"
        data-affiliate-placement={placement}
        data-commercial-partner="viator"
        data-commercial-placement={placement}
        onClick={() => trackAffiliateClick({ partner: "viator", label, placement, module: "city-experiences" })}
        className="mt-5 inline-flex min-h-11 items-center bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {label} ↗
      </a>
      <p className="mt-4 max-w-3xl text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you.</p>
    </section>
  );
}
