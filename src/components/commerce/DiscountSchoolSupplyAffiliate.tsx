const DISCOUNT_SCHOOL_SUPPLY_CJ_URL = "https://www.anrdoezrs.net/click-101876465-17106455";
const DISCOUNT_SCHOOL_SUPPLY_CJ_PIXEL = "https://www.lduhtrp.net/image-101876465-17106455";

export const DISCOUNT_SCHOOL_SUPPLY_ARTICLE_SLUGS = new Set([
  "texas-school-districts-explained",
  "texas-schools-family-life",
]);

export function DiscountSchoolSupplyAffiliate() {
  return (
    <aside className="relative mt-12 overflow-hidden border-y border-border bg-surface px-6 py-8 sm:px-8" aria-label="Discount School Supply affiliate offer">
      <p className="eyebrow text-primary">Teacher &amp; classroom supplies</p>
      <h2 className="mt-3 font-display text-2xl sm:text-3xl">Classroom basics, arts &amp; crafts and teacher favorites</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        Shop Discount School Supply for classroom supplies, learning materials and arts-and-crafts products. The current CJ offer advertises free shipping and $10 off qualifying $50+ orders with code SAVE10NOW.
      </p>
      <a
        href={DISCOUNT_SCHOOL_SUPPLY_CJ_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Shop Discount School Supply →
      </a>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Affiliate disclosure: TexasDefined may earn a commission from qualifying purchases, at no additional cost to you. Offer terms can change; confirm current pricing and eligibility at checkout.
      </p>
      <img
        src={DISCOUNT_SCHOOL_SUPPLY_CJ_PIXEL}
        width="1"
        height="1"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute size-px opacity-0"
      />
    </aside>
  );
}
