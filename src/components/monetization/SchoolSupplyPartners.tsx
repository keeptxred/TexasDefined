// CJ advertiser 7552520 expired 2026-10-01. Keep the editorial retailer reference;
// restore affiliate tracking only after a new approved relationship and Get Code review.
const reallyGoodStuffUrl = "https://www.reallygoodstuff.com/";

export function SchoolSupplyPartners({ placement = "inline", className = "", context = "school" }: { placement?: "inline" | "rail"; className?: string; context?: "school" | "homecoming" }) {
  const isRail = placement === "rail";
  const isHomecoming = context === "homecoming";
  const heading = isHomecoming ? "DIY mum materials and craft supplies" : "Useful supplies after you know the school plan";
  const intro = isHomecoming
    ? "Building a homecoming mum yourself? Start with your school's rules and local traditions, then browse retailer supplies when they fit your project."
    : "Use the district and campus to confirm classroom lists, program requirements and any teacher requests first. The retailer below is an option for families, educators and home-school households buying supplies—not a substitute for school-specific instructions.";
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
          rel="noopener noreferrer"
          className={isRail ? "group block border-b border-border pb-4 transition-colors hover:text-primary" : "group block border border-border bg-background p-5 transition-colors hover:border-primary/60"}
        >
          <span className="font-display text-xl group-hover:text-primary">Really Good Stuff</span>
          <span className="mt-2 block text-sm leading-6 text-muted-foreground">{description}</span>
          <span className="mt-3 inline-block border-b border-primary pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">{ctaLabel} ↗</span>
        </a>
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">This link goes directly to Really Good Stuff. TexasDefined does not earn an affiliate commission from this link. Retailer availability, prices and promotions can change.</p>
    </aside>
  );
}
