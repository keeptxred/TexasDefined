import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

export const CURRENT_PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES: Record<string, PrioritySearchPageData> = {
  "texas-toll-tags": {
    eyebrow: "Texas driving",
    title: "EZ TAG vs. TxTag vs. TollTag: Which Texas Toll Tag Do You Need?",
    intro: "Texas has several toll-tag names, but drivers do not generally need separate tags for Houston, Austin and Dallas. Texas toll tags interoperate broadly, and the biggest 2026 difference is account management: HCTRA now services migrated TxTag accounts and issues new or replacement EZ TAG stickers.",
    updated: "September 1, 2026",
    quickAnswer: "You generally do not need three Texas toll tags. Existing TxTag stickers still work, but TxDOT says migrated TxTag accounts are now managed through HCTRA and customers needing a new or replacement sticker must order an EZ TAG from HCTRA. NTTA TollTag also works on other Texas toll roads, including lanes marked EZ TAG or TxTag. Choose based on current account terms and useful features, not a belief that each tag only works in one region.",
    sections: [
      {
        heading: "TxTag still works, but HCTRA now manages migrated TxTag accounts",
        paragraphs: ["TxDOT says TxTag is not going away. Existing customers whose accounts were transferred to the Harris County Toll Road Authority may continue using their current TxTag. Account balances, payments, vehicles and other account details are now handled through HCTRA, and customers who need a new or replacement sticker must order an EZ TAG through HCTRA."],
        links: [
          { label: "TxDOT: how Texas toll tags work", href: "https://www.txdot.gov/discover/toll-roads-managed-lanes/paying-tolls/how-tags-work.html", external: true },
          { label: "HCTRA account management", href: "https://www.hctra.org/", external: true },
        ],
      },
      {
        heading: "TollTag, EZ TAG and existing TxTag stickers are interoperable",
        paragraphs: ["For ordinary toll-road travel, interoperability matters more than the logo on the windshield. NTTA says TollTag can be used on Texas toll roads from Austin to Houston and in lanes displaying EZ TAG or TxTag signs, subject to account and vehicle requirements. TxDOT also says TxTag and EZ TAG work across participating Texas toll facilities."],
        links: [
          { label: "NTTA TollTag travel coverage", href: "https://www.ntta.org/plan-your-trip", external: true },
          { label: "TxDOT toll-tag coverage", href: "https://www.txdot.gov/discover/toll-roads-managed-lanes/paying-tolls/how-tags-work.html", external: true },
        ],
      },
      {
        heading: "How to choose a Texas toll tag in 2026",
        paragraphs: ["If you already have a working TxTag, TxDOT says you may keep using it while managing the migrated account through HCTRA. If you need a new or replacement HCTRA-serviced sticker, the current option is EZ TAG. NTTA continues to issue TollTag. Compare account terms, customer service and extras you may use, such as airport-parking features, rather than opening multiple accounts for regional coverage."],
        links: [
          { label: "HCTRA EZ TAG", href: "https://www.hctra.org/", external: true },
          { label: "NTTA TollTag details", href: "https://www.ntta.org/plan-your-trip", external: true },
          { label: "Moving to Texas", href: "/moving-to-texas" },
        ],
      },
      {
        heading: "Avoid duplicate-tag billing problems",
        paragraphs: ["TxDOT specifically warns against installing more than one electronic toll tag in a vehicle because multiple tags can interfere with reads or cause duplicate charges. Keep one intended tag installed, and keep the correct license plate and payment method current on the account."],
        links: [{ label: "TxDOT common toll-tag mistakes", href: "https://www.txdot.gov/discover/toll-roads-managed-lanes/paying-tolls/how-tags-work.html", external: true }],
      },
    ],
    related: [
      { label: "Moving to Texas", href: "/moving-to-texas" },
      { label: "Texas vehicle registration", href: "/texas-vehicle-registration" },
      { label: "Texas DMV", href: "/texas-dmv" },
      { label: "Texas resources", href: "/texas-resources" },
    ],
    faq: [
      { question: "Do I need EZ TAG, TxTag and TollTag in Texas?", answer: "Generally, no. Texas toll tags are broadly interoperable. TxDOT also warns against installing more than one electronic toll tag in a vehicle because multiple tags can interfere with reads or produce duplicate charges." },
      { question: "Is TxTag going away?", answer: "TxDOT says no. Existing migrated TxTag customers may keep using their TxTag, but account management is now through HCTRA and new or replacement tag stickers are issued as EZ TAG." },
      { question: "Will a TollTag work in Houston and Austin?", answer: "NTTA says TollTag works on other Texas toll roads, including lanes displaying EZ TAG or TxTag signs, when the account is in good standing and the vehicle plate is correctly listed." },
    ],
  },
};
