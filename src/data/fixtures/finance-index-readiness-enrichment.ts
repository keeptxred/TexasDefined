import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const trueCostEnrichment: ArticleBlock[] = [
  h("Build a reserve ladder"),
  p("A useful Texas ownership reserve is easier to maintain when it is separated by time horizon. Start with the bills that repeat every month or year: property taxes, homeowners insurance, HOA dues, utilities and routine service. Then create a second layer for irregular but predictable work such as HVAC tune-ups, pest control, tree care, irrigation repairs, pool service, appliance replacement and minor plumbing or electrical calls. The final layer is for large property events that do not arrive on a convenient schedule, including a roof, major cooling equipment, water heater, sewer or supply-line work, foundation investigation and insurance deductibles."),
  p("The point of the ladder is not to predict the exact month when something will fail. It is to prevent several different risks from competing for the same checking-account balance. A household that has one generic emergency fund can discover too late that an insurance deductible, a summer air-conditioning failure and an annual tax or insurance adjustment all draw on the same cash. Separate sinking funds make those obligations visible before they become urgent."),
  h("Use the property itself to set the budget"),
  p("Walk the house system by system and record age, condition, service history and any known warning signs. Ask the seller for available maintenance records and keep inspection findings after closing. For major components, collect current local replacement or repair quotes instead of relying on a statewide average. A newer roof but aging HVAC system should produce a different reserve plan than an older roof with recently replaced mechanical equipment."),
  p("Revisit the worksheet after tax notices, insurance renewals and major repairs. If a premium rises, a deductible changes or a system is replaced, update the next twelve months rather than continuing to save against an obsolete estimate. Homeownership costs move over time even when the mortgage note does not."),
  h("Stress-test the Texas bad-luck year"),
  list("A higher property-tax or escrow requirement.", "An insurance renewal increase or a large percentage deductible.", "A peak-season HVAC repair or replacement.", "A roof, drainage, plumbing or foundation expense that insurance does not fully cover.", "Higher summer electricity or water use than the household expected."),
  p("If the budget can absorb a plausible combination of those events while preserving ordinary savings, the purchase is more resilient. If one repair would require high-cost debt immediately after closing, reduce the purchase budget, increase reserves or investigate the property more deeply before treating the monthly payment as affordable."),
];

const mortgagePaymentEnrichment: ArticleBlock[] = [
  h("Escrow is cash management, not free money"),
  p("Escrow changes when and how the household sends money, not who ultimately pays the bill. A servicer estimates upcoming property taxes and insurance, collects a monthly share and later pays the taxing authority or insurer. Because those underlying costs can change, an escrow analysis can produce a higher required payment even when the loan's principal-and-interest schedule has not changed."),
  p("For Texas homeowners, that distinction matters because a tax exemption, appraisal change, insurance renewal or corrected estimate can alter the cash collected through escrow. Review the annual escrow statement instead of assuming every payment change came from the mortgage rate. If a bill or exemption looks wrong, verify it with the taxing unit, appraisal district, insurer or servicer rather than treating the escrow account as the source of the charge."),
  h("Use a payment stack, not a teaser rate"),
  p("Compare homes and loan offers with a payment stack that begins with principal and interest and then adds property taxes, homeowners insurance, mortgage insurance when applicable, HOA dues and recurring district or neighborhood charges. Keep utilities, maintenance and repair reserves beside that stack even when they are not collected by the lender. The result is a household housing budget rather than a loan-advertising number."),
  p("When comparing two properties, use address-specific inputs wherever possible. Taxing units can differ across nearby addresses, insurance can change with roof, construction and location characteristics, and HOA or special-district obligations can vary by subdivision. A lower purchase price does not automatically create a lower total monthly cost if the surrounding obligations are higher."),
  h("Plan for the first escrow adjustment"),
  p("A new buyer should keep room in the budget for the first full tax and insurance cycle. Initial lender estimates can be based on information available before closing, while later escrow calculations use actual bills and renewal premiums. Preserve a cash buffer so a shortage repayment or higher monthly collection does not force the household to cut essential savings."),
  list("Keep the Loan Estimate and Closing Disclosure for comparison.", "Track the actual property-tax bills and applicable exemptions.", "Review each insurance renewal and deductible, not only the premium.", "Read the servicer's annual escrow analysis and question unexplained changes.", "Recalculate the complete housing payment before major household spending decisions."),
  p("The safest mortgage budget is one that still works after the estimated pieces become real bills. Treat principal and interest as the loan core, escrow as a collection system, and the remaining ownership costs as part of the same monthly decision."),
];

export function enrichFinanceIndexReadyArticle(article: Article): Article {
  if (article.slug === "true-cost-of-owning-a-home-in-texas") {
    return { ...article, readingMinutes: Math.max(article.readingMinutes, 14), body: [...article.body, ...trueCostEnrichment] };
  }
  if (article.slug === "texas-mortgage-payment-guide") {
    return { ...article, readingMinutes: Math.max(article.readingMinutes, 13), body: [...article.body, ...mortgagePaymentEnrichment] };
  }
  return article;
}
