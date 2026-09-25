import { trackAffiliateClick } from "@/lib/affiliate-click";

const reallyGoodStuffUrl = "https://www.anrdoezrs.net/click-101876465-17106455";

export function SchoolSupplyPartners({ placement = "inline", className = "", context = "school" }: { placement?: "inline" | "rail"; className?: string; context?: "school" | "homecoming" }) {
  const isRail = placement === "rail";
  const isHomecoming = context === "homecoming";
  const commercialPlacement = `school-supplies-${context}-${placement}`;
  const heading = isHomecoming ? "DIY mum materials and craft supplies" : "Useful supplies after you know the school plan";
  const intro = isHomecoming
    ? "Building a homecoming mum yourself? Start with your school's rules and local traditions, then use a paid partner only when its current program terms support qualifying purchases."
    : "Use the district and campus to confirm classroom lists, program requirements and any teacher requests first. The paid partner below is an option for families, educators and home-school households buying supplies—not a substitute for school-specific instructions.";
  const description = isHomecoming
    ? "Craft-ready classroom supplies, kits and materials for students, teachers and makers."
    : "Teacher-tested classroom supplies, curated kits and learning materials.";
  const ctaLabel = isHomecoming ? "Browse supplies for your DIY project" : "Shop classroom supplies";

  return (
    <aside className={`${isRail ? "border border-border bg-surface p-5" : "mt-12 border-y border-border bg-surface/55 py-8 sm:py-10"} ${className}`} aria-labelledby="school-supplies-heading">
      <p className="eyebrow text-primary">{isHomecoming ? "DIY homecoming mums" : "School & classroom supplies"}</p>
      <h2 id="school-supplies-heading" className={isRail ? "mt-2 font-display text-2xl" : "mt-3 font-display text-3xl"}>{heading}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{intro}</p>
      <div className={isRail ? "mt-5" : "mt-6 max-w-2xl"}>
        <a
          href={reallyGoodStuffUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="really-good-stuff"
          data-affiliate-placement={commercialPlacement}
          data-commercial-partner="really-good-stuff"
          data-commercial-placement={commercialPlacement}
          onClick={() => trackAffiliateClick({ partner: "really-good-stuff", label: "Really Good Stuff", placement: commercialPlacement, module: "school-supplies" })}
          className={isRail ? "group block border-b border-border pb-4 transition-colors hover:text-primary" : "group block border border-border bg-background p-5 transition-colors hover:border-primary/60"}
        >
          <span className="font-display text-xl group-hover:text-primary">Really Good Stuff</span>
          <span className="mt-2 block text-sm leading-6 text-muted-foreground">{description}</span>
          <span className="mt-3 inline-block border-b border-primary pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">{ctaLabel} ↗</span>
        </a>
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying purchases, at no additional cost to you. Retailer availability, prices and promotions can change.</p>
    </aside>
  );
}
