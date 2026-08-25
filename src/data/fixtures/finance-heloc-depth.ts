import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasHelocRulesArticle: Article = {
  id: "migration-finance-heloc-ranking-depth",
  brandId: "texasdefined",
  slug: "texas-home-equity-heloc-guide",
  title: "Texas HELOC and Home Equity Loan Rules",
  dek: "Texas allows home-equity loans and HELOCs, but homestead-secured borrowing has state-specific constitutional rules. Understand the 80% combined-lien ceiling, loan structures, risks and what to verify before applying.",
  category: "real-estate",
  hero: {
    src: "/images/editorial/texas-heloc-home-equity.svg",
    alt: "Texas home equity illustration with a house, an 80 percent ceiling marker and a value line chart",
    width: 1600,
    height: 1000,
  },
  authorId: "a-hollis",
  publishedAt: "2026-07-25",
  readingMinutes: 14,
  tags: ["home equity", "heloc", "heloc texas", "home equity loan texas", "texas heloc rules", "80 percent home equity rule", "texas constitution", "borrowing"],
  internalLinks: [
    { href: "/texas-home-equity-calculator", label: "Texas home-equity calculator", description: "Estimate current equity and loan-to-value before considering a borrowing product." },
    { href: "/texas-home-equity-growth-calculator", label: "Texas home-equity growth calculator", description: "Explore how loan paydown and hypothetical value changes could affect future equity." },
    { href: "/texas-refinance-savings-calculator", label: "Texas refinance calculator", description: "Compare a refinance structure with leaving the first mortgage in place." },
    { href: "/article/should-you-refinance-texas-mortgage", label: "Should you refinance a Texas mortgage?", description: "Compare break-even, loan terms and the consequences of replacing the first mortgage." },
    { href: "https://statutes.capitol.texas.gov/Docs/CN/htm/CN.16.htm#50", label: "Texas Constitution Article XVI, Section 50", description: "Official Texas constitutional requirements for liens and extensions of credit secured by a homestead." },
    { href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-home-equity-loan-and-a-home-equity-line-of-credit-heloc-en-247/", label: "CFPB: Home-equity loan vs. HELOC", description: "Official federal consumer explanation of lump-sum home-equity loans and revolving HELOCs." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Yes, HELOCs and home-equity loans are available in Texas. What makes Texas different is that credit secured by a residence homestead is governed by Article XVI, Section 50 of the Texas Constitution. The state rules affect how much homestead-secured debt can be placed against the property and impose protections beyond an ordinary lender loan-to-value calculation."),

    h("Are HELOCs allowed in Texas?"),
    p("Yes. A home-equity line of credit is an open-end line secured by home equity. The Consumer Financial Protection Bureau describes a HELOC as revolving credit that can be drawn repeatedly up to an available limit during its draw period. In Texas, when the line is secured by a homestead, the transaction also must satisfy the applicable Texas constitutional requirements."),
    p("That distinction matters because a lender saying a borrower has equity does not automatically mean the full equity amount can be borrowed. Texas law, lender underwriting, the property's value, existing liens, credit, income and the product's own terms all affect the actual credit available."),

    h("Texas's 80% rule is a combined-lien ceiling"),
    p("For covered home-equity credit secured by a Texas homestead, Article XVI, Section 50 generally limits the new extension of credit plus other valid liens secured by the homestead to 80% of the home's fair market value when the credit is established. The key word is combined: the calculation is not simply 80% of value available as new cash."),
    p("A useful first-pass formula is: 80% of fair market value minus existing valid secured debt. That produces a theoretical ceiling under the arithmetic, not a guaranteed loan amount. The constitutional text includes additional conditions and the lender can approve less based on its underwriting."),

    h("Worked example of the Texas 80% home-equity calculation"),
    p("Suppose a Texas residence homestead has a fair market value of $500,000 and $300,000 of existing debt secured by the home. Eighty percent of $500,000 is $400,000. Subtracting the $300,000 existing secured balance leaves $100,000 as the theoretical additional-lien room under that simplified calculation."),
    list(
      "Illustrative fair market value: $500,000.",
      "80% combined-lien ceiling: $400,000.",
      "Existing secured debt: $300,000.",
      "Simplified remaining room: $100,000 before other liens, product limits and underwriting."
    ),
    p("If the lender values the home at less than $500,000, identifies another valid lien, or applies a lower maximum loan-to-value ratio, the available amount can fall. Treat the calculation as a screening tool and use the lender's appraisal, title work and disclosures for the actual transaction."),

    h("Home-equity loan versus HELOC"),
    p("A home-equity loan generally advances a specific amount as a lump sum and repays it on a scheduled loan. The CFPB notes that home-equity loans commonly have fixed rates, although product terms vary. This structure can fit a known one-time expense when the borrower wants a defined balance and payment schedule."),
    p("A HELOC is revolving credit. During the draw period, the borrower can generally draw, repay and draw again up to the available limit subject to the agreement. HELOCs usually have adjustable interest rates, which means the payment can change as the rate or outstanding balance changes."),

    h("HELOC draw-period payments can understate later repayment"),
    p("Do not evaluate a HELOC only by the initial minimum payment. The draw period and repayment period can work differently. When the draw period ends, new advances stop and the required payment may rise as the outstanding balance is repaid. An adjustable rate can also change the payment before or during repayment."),
    p("Before opening the line, identify the index and margin used to set the rate, any caps or floors, the draw-period length, the repayment-period length, the minimum-payment method and whether any balance can convert to a fixed rate. Then stress-test a higher rate rather than assuming the opening payment will persist."),

    h("HELOC, home-equity loan or cash-out refinance?"),
    p("These products can reach similar goals but restructure the household's debt differently. A HELOC usually leaves the existing first mortgage in place and adds revolving secured debt. A home-equity loan also usually leaves the first mortgage in place but adds a closed-end lump-sum loan. A cash-out refinance replaces the existing first mortgage with a larger new mortgage and returns part of the difference as cash."),
    list(
      "HELOC: flexible repeated draws, usually adjustable rate, existing first mortgage remains.",
      "Home-equity loan: lump-sum advance, scheduled repayment, existing first mortgage remains.",
      "Cash-out refinance: replaces the first mortgage, so the rate and term on the entire refinanced balance matter."
    ),
    p("A homeowner with a low-rate first mortgage may value preserving it, while another borrower may prefer one consolidated payment. Compare total interest, closing costs, rate risk, term length and the amount of home equity exposed—not just the first monthly payment."),

    h("Texas home-equity eligibility is more than the 80% calculation"),
    p("The 80% ceiling is one prominent Texas rule, but it is not the complete legal test. Article XVI, Section 50 contains additional conditions, notices and procedural protections for homestead-secured credit. A lender and closing professionals must apply the rules to the actual transaction."),
    p("This guide is a planning reference, not legal advice. For a proposed Texas homestead loan, read the current lender disclosures and the official Texas constitutional text, and ask the lender or a qualified Texas professional about requirements that apply to the specific property and loan structure."),

    h("What to verify before applying for a Texas HELOC or home-equity loan"),
    list(
      "A realistic current property value rather than only a tax appraisal or automated website estimate.",
      "The payoff balance of the first mortgage and every other debt secured by the property.",
      "Whether the property is the Texas residence homestead subject to the applicable constitutional provisions.",
      "The lender's maximum loan-to-value or combined-loan-to-value policy, which may be below the constitutional ceiling.",
      "Interest-rate structure, index, margin, caps and whether the rate is fixed or adjustable.",
      "Draw period, repayment period, minimum payments and any balloon or maturity obligation.",
      "Application, appraisal, title, annual, inactivity, early-closure or other fees that apply to the product.",
      "How the payment behaves if rates rise or the full available line is drawn."
    ),

    h("Do not treat available equity as an emergency fund"),
    p("Home equity is not cash until the property is sold or a lender extends credit against it. A HELOC can also be reduced or frozen under circumstances allowed by the agreement and law. Maintain ordinary emergency savings separately when possible so a household shock does not automatically become debt secured by the home."),
    p("Borrowing against a home can be useful when the purpose, payment and risk fit the household. The stronger decision starts with the official Texas rules, conservative equity math and a comparison of the full product terms—not the largest number a calculator can produce."),
  ],
};
