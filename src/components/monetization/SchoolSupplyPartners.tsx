import { trackAffiliateClick } from "@/lib/affiliate-click";

const reallyGoodStuffUrl = "https://www.anrdoezrs.net/click-101876465-17106455";
const paidTermsEndAt = Date.parse("2026-10-01T17:00:00Z");

const discountSchoolSupplyUrls = {
  artsAndCrafts:
    "https://email.cj.com/c/eJxEzLFuhSAUgOGngU0ieEAYGJo0Dk2b9BWOHKwkKkbwen37pkvv9i__R95OhMCjl7211ra6BT57Q8H1EUakcXQGjNMG0EoFTsveBeDJy66XFqRWQmlwvfj_lQIjPvCBX5gWseUx082gXeM6xqPBPTWGzGS1AaMbXcxFfPFzrTvr3pgamBqu6xKUSsjnVkuYc17Kue_LLUJemRq-j0xnqK_6TKUKLPuTdUPAGn_ycbPuXTl-eKQ1bQzaGp9YKE5pi_Tn8IdXvwEAAP__4s5OOg",
  curriculum:
    "https://email.cj.com/c/eJxEzLFuhSAUgOGngU2CBw7iwNCkcWjapK-AHqgkKkbwen37pkvv9i__R85G8poH13bWWitRaj47LVEijL0Nqg8jxWgpBmilwhF66JEn16qutbpFEIC678T_D6CN-PAP_-XTIrY8ZrqZlmtYx3A0fk-NIRMtGm2wwWIu4ouba92ZemMwMBiu6xKUypTPrZZpznkp574vt5jyymD4PjKdU33VZypV-LI_mRomX8NPPm6m3sEgP5ynNW1MyxqevlCIaQv0B_GHg98AAAD__z-eTo4",
  specialNeeds:
    "https://email.cj.com/c/eJxEzD1urDAUQOHV2B2W__EULp70RBElUrZwudcES4ARNsOw-yhN0p3mfBTDRGB5iqoPIQTppOVzDH5EOXppRuOUwaDQ9BOBeni0qFLPc1SmV8Eqp4V29tGL319r68UbPOED8iK2Mha6mZVrWsd0dLDnzpOfgvPWu85VfxFf4tzazsw_pgemh-u6BOWK5dxaxbmUpZ77vtwCy8r08HkUOrH91XuuTUDdX8wMCC19leNm5r_2RvMjAq15Y1a29IJKacpboh-JP6P-DgAA__-fOE7b",
};

export function SchoolSupplyPartners({ placement = "inline", className = "", context = "school" }: { placement?: "inline" | "rail"; className?: string; context?: "school" | "homecoming" }) {
  const isRail = placement === "rail";
  const isHomecoming = context === "homecoming";
  const discountSchoolSupplyUrl = isHomecoming ? discountSchoolSupplyUrls.artsAndCrafts : discountSchoolSupplyUrls.curriculum;
  const commercialPlacement = `school-supplies-${context}-${placement}`;
  const paidTermsActive = Date.now() < paidTermsEndAt;
  const heading = isHomecoming ? "DIY mum materials and craft supplies" : "Useful supplies after you know the school plan";
  const intro = isHomecoming
    ? "Building a homecoming mum yourself? These retailers carry craft and classroom materials that can help with the ribbons, accents and personalization. Check your school's rules and local traditions before you buy."
    : "Use the district and campus to confirm classroom lists, program requirements and any teacher requests first. These retailers are options for families, educators and home-school households buying supplies—not a substitute for school-specific instructions.";
  if (!paidTermsActive) {
    return (
      <aside className={`${isRail ? "border border-border bg-surface p-5" : "mt-12 border-y border-border bg-surface/55 py-8 sm:py-10"} ${className}`} aria-labelledby="school-supplies-heading">
        <p className="eyebrow text-primary">{isHomecoming ? "DIY homecoming mums" : "School & classroom supplies"}</p>
        <h2 id="school-supplies-heading" className={isRail ? "mt-2 font-display text-2xl" : "mt-3 font-display text-3xl"}>{heading}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{intro}</p>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">Retailer affiliate offers are temporarily unavailable while TexasDefined reviews updated program terms. Use your school-specific supply list and compare retailers directly before buying.</p>
      </aside>
    );
  }
  return (
    <aside className={`${isRail ? "border border-border bg-surface p-5" : "mt-12 border-y border-border bg-surface/55 py-8 sm:py-10"} ${className}`} aria-labelledby="school-supplies-heading">
      <p className="eyebrow text-primary">{isHomecoming ? "DIY homecoming mums" : "School & classroom supplies"}</p>
      <h2 id="school-supplies-heading" className={isRail ? "mt-2 font-display text-2xl" : "mt-3 font-display text-3xl"}>{heading}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{intro}</p>
      <div className={isRail ? "mt-5 grid gap-3" : "mt-6 grid gap-4 sm:grid-cols-2"}>
        <a
          href={reallyGoodStuffUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="really-good-stuff"
          data-affiliate-placement={commercialPlacement}
          data-commercial-partner="really-good-stuff"
          data-commercial-placement={commercialPlacement}
          onClick={() => trackAffiliateClick({ partner: "really-good-stuff", label: "Really Good Stuff", placement: commercialPlacement, module: "school-supplies" })}
          className={isRail ? "group border-b border-border pb-4 transition-colors hover:text-primary" : "group border border-border bg-background p-5 transition-colors hover:border-primary/60"}
        >
          <span className="font-display text-xl group-hover:text-primary">Really Good Stuff</span>
          <span className="mt-2 block text-sm leading-6 text-muted-foreground">{isHomecoming ? "Craft-ready classroom supplies, kits and materials for students, teachers and makers." : "Teacher-tested classroom supplies, curated kits and learning materials."}</span>
          <span className="mt-3 inline-block border-b border-primary pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">{isHomecoming ? "Browse supplies for your DIY project ↗" : "Shop classroom supplies ↗"}</span>
        </a>
        <a
          href={discountSchoolSupplyUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="discount-school-supply"
          data-affiliate-placement={commercialPlacement}
          data-commercial-partner="discount-school-supply"
          data-commercial-placement={commercialPlacement}
          onClick={() => trackAffiliateClick({ partner: "discount-school-supply", label: isHomecoming ? "Discount School Supply arts and crafts" : "Discount School Supply curriculum", placement: commercialPlacement, module: "school-supplies" })}
          className="group border border-border bg-background p-5 transition-colors hover:border-primary/60"
        >
          <span className="font-display text-xl group-hover:text-primary">Discount School Supply</span>
          <span className="mt-2 block text-sm leading-6 text-muted-foreground">{isHomecoming ? "Arts, crafts and early-learning materials for personalized projects and hands-on making." : "Curriculum, classroom essentials, arts and crafts, special-needs resources and early-learning supplies."}</span>
          <span className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">{isHomecoming ? "Browse arts & crafts ↗" : "Browse curriculum & classroom supplies ↗"}</span>
        </a>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm font-semibold">
        <a
          href={discountSchoolSupplyUrls.artsAndCrafts}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="discount-school-supply"
          data-affiliate-placement={`${commercialPlacement}-arts-crafts`}
          data-commercial-partner="discount-school-supply"
          data-commercial-placement={`${commercialPlacement}-arts-crafts`}
          onClick={() => trackAffiliateClick({ partner: "discount-school-supply", label: "Discount School Supply arts and crafts", placement: `${commercialPlacement}-arts-crafts`, module: "school-supplies" })}
          className="border-b border-primary pb-1 text-primary"
        >Arts & crafts ↗</a>
        <a
          href={discountSchoolSupplyUrls.specialNeeds}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="discount-school-supply"
          data-affiliate-placement={`${commercialPlacement}-special-needs`}
          data-commercial-partner="discount-school-supply"
          data-commercial-placement={`${commercialPlacement}-special-needs`}
          onClick={() => trackAffiliateClick({ partner: "discount-school-supply", label: "Discount School Supply special-needs resources", placement: `${commercialPlacement}-special-needs`, module: "school-supplies" })}
          className="border-b border-primary pb-1 text-primary"
        >Special-needs resources ↗</a>
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying purchases, at no additional cost to you. Retailer availability, prices and promotions can change.</p>
    </aside>
  );
}
