import foundationHeroAsset from "@/assets/generated/texas-foundation-clay-drought.jpg";
import roofHeroAsset from "@/assets/generated/texas-roofs-hail-wind-heat.jpg";
import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const downPaymentHero: Article["hero"] = {
  src: "https://images.unsplash.com/photo-1662166980304-8c927b110066?auto=format&fit=crop&w=1600&q=82",
  alt: "A Texas property representing the purchase price and cash needed to buy a home",
  width: 1600,
  height: 1067,
  credit: "Erin Decker · Unsplash",
};
const refinanceHero: Article["hero"] = {
  src: foundationHeroAsset,
  alt: "A Texas house and foundation representing the value behind a mortgage refinance decision",
  width: 1600,
  height: 1067,
};
const insuranceHero: Article["hero"] = {
  src: roofHeroAsset,
  alt: "A Texas roof exposed to hail, wind and heat for a homeowners insurance guide",
  width: 1600,
  height: 1067,
};

const base = (
  record: Omit<Article, "id" | "brandId" | "hero" | "authorId" | "relatedCollections" | "relatedDestinations">,
  id: string,
  hero: Article["hero"],
): Article => ({
  id,
  brandId: "texasdefined",
  hero,
  authorId: "a-hollis",
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

const downPayment = base({
  slug: "texas-house-down-payment-guide",
  title: "How Much Down Payment Do You Need for a Texas House?",
  dek: "Why 20 percent is not a universal minimum, how loan programs differ and how to preserve enough cash for closing and repairs.",
  category: "real-estate",
  publishedAt: "2026-07-25",
  readingMinutes: 9,
  tags: ["down payment", "mortgage", "homebuyer", "closing costs"],
  internalLinks: [
    { href: "/texas-down-payment-calculator", label: "Texas down-payment calculator", description: "Compare purchase price, down payment, closing-cost and reserve scenarios." },
    { href: "/texas-closing-cost-calculator", label: "Texas closing-cost calculator", description: "Separate the down payment from the other cash a buyer may need at closing." },
    { href: "/texas-home-affordability-calculator", label: "Texas home-affordability calculator", description: "Test the resulting payment against income, debts, taxes and insurance." },
    { href: "https://www.hud.gov/buying/loans", label: "HUD FHA loan overview", description: "Official HUD information about FHA-insured purchase loans and low-down-payment options." },
    { href: "https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/", label: "VA-backed purchase loans", description: "Official VA eligibility and no-down-payment purchase-loan guidance for qualifying borrowers." },
    { href: "https://welcomehome.tdhca.texas.gov/", label: "Texas Homebuyer Program", description: "Official TDHCA information about Texas down-payment and closing-cost assistance programs." },
  ],
  body: [
    p("There is no single down payment required to buy a house in Texas. The right amount depends on the mortgage program, borrower qualifications, property, appraisal, purchase price, source of funds and how much cash the household needs to keep after closing. Twenty percent is a familiar benchmark because it can reduce the loan balance and may avoid conventional private mortgage insurance, but it is not a universal entry requirement."),
    h("Down payment and cash to close are different"),
    p("The down payment is the buyer's equity contribution toward the purchase price. Cash to close is broader. It can include the down payment plus lender charges, title and settlement costs, prepaid interest, the first homeowners-insurance premium, initial escrow deposits and other transaction-specific items, minus credits and deposits already applied. A buyer who budgets only for the down payment can arrive at closing short of cash even when the mortgage itself is approved."),
    h("Compare the major mortgage paths"),
    list(
      "Conventional mortgages can be available with less than 20 percent down for qualified borrowers; mortgage insurance, pricing and eligibility vary by product and lender.",
      "FHA-insured purchase loans can permit a minimum investment as low as 3.5 percent for qualifying borrowers, with FHA mortgage-insurance requirements.",
      "Eligible Veterans, service members and certain surviving spouses may qualify for a VA-backed purchase loan with no down payment when the sales price does not exceed the appraised value and other requirements are met.",
      "Texas and local assistance programs may help with down payment or closing costs, but eligibility, lender participation, income limits, purchase-price rules and repayment terms must be checked against the current program."
    ),
    h("A larger down payment changes several numbers at once"),
    p("Putting more cash down reduces the amount borrowed and therefore principal-and-interest cost. It can also change mortgage-insurance requirements or loan pricing. But every extra dollar committed to the down payment is a dollar no longer available for closing costs, moving, repairs or emergency reserves. The strongest comparison shows the payment and the remaining cash position together."),
    h("Do not empty the emergency fund to hit a percentage target"),
    p("A buyer who reaches 20 percent down but has no cash left for an insurance deductible, air-conditioning failure, plumbing repair or income interruption may be in a weaker position than a buyer who uses a smaller permitted down payment and preserves reserves. Run several scenarios and keep a separate post-closing reserve visible in each one."),
    h("Assistance programs need current verification"),
    p("The Texas Department of Housing and Community Affairs offers homebuyer programs that can include down-payment or closing-cost assistance through participating professionals. Program rules can change. Treat eligibility tools and marketing summaries as a starting point, then verify the current mortgage product, assistance structure, approved lender requirements, education requirements and any repayment or recapture terms before counting assistance as available cash."),
    h("Compare the complete loan, not only the down payment"),
    p("Two loans with the same down payment can still differ in rate, points, lender credits, mortgage insurance, closing costs and long-term interest. Request and compare Loan Estimates for the specific property and loan structure. The lowest cash requirement is not automatically the lowest-cost loan, and the largest down payment is not automatically the best household decision."),
    h("A practical way to choose the amount"),
    list(
      "Choose a realistic purchase price and obtain address-specific tax and insurance assumptions.",
      "Run multiple down-payment amounts rather than one preferred percentage.",
      "Add closing costs and prepaid items to calculate total cash to close.",
      "Keep moving expenses and a post-closing emergency reserve outside that total.",
      "Compare the monthly payment, mortgage insurance and remaining liquidity for each scenario.",
      "Use the structure that still works after an ordinary first-year repair or budget surprise."
    ),
    p("The goal is not to put down the largest percentage possible. It is to enter homeownership with a payment and cash reserve that remain sustainable after the transaction is over."),
  ],
}, "migration-finance-depth-2-down-payment", downPaymentHero);

const refinance = base({
  slug: "should-you-refinance-texas-mortgage",
  title: "Should You Refinance a Texas Mortgage?",
  dek: "Calculate break-even, compare equal loan terms and avoid lowering the payment by quietly adding years to the debt.",
  category: "real-estate",
  publishedAt: "2026-07-25",
  readingMinutes: 9,
  tags: ["refinance", "mortgage", "interest rates", "home equity"],
  internalLinks: [
    { href: "/texas-refinance-savings-calculator", label: "Texas refinance-savings calculator", description: "Compare payment changes, estimated costs and a simple break-even period." },
    { href: "/texas-mortgage-payoff-calculator", label: "Mortgage payoff calculator", description: "See how the current loan may perform if you keep it and make extra principal payments." },
    { href: "/texas-home-equity-calculator", label: "Texas home-equity calculator", description: "Estimate current equity before considering a cash-out structure." },
    { href: "https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/", label: "CFPB mortgage and refinance guidance", description: "Official Consumer Financial Protection Bureau definitions and cautions for mortgage refinancing." },
    { href: "https://www.consumerfinance.gov/ask-cfpb/is-there-such-a-thing-as-a-no-cost-or-no-closing-loan-or-refinancing-en-141/", label: "CFPB no-closing-cost refinance explanation", description: "Official explanation of how lender credits, higher rates or larger balances can recover refinance costs." },
    { href: "https://www.consumerfinance.gov/owning-a-home/compare/", label: "CFPB loan-offer comparison", description: "Official guidance for comparing Loan Estimates, rates, points, credits and total loan costs." },
  ],
  body: [
    p("Refinancing replaces an existing mortgage with a new loan. It can reduce an interest rate, change the payment, shorten or extend the repayment term, alter mortgage-insurance costs or turn equity into cash. None of those outcomes is automatically a savings. A refinance makes sense only when the new loan advances a specific household goal after closing costs, timing and the remaining life of the old loan are considered."),
    h("Start with the goal before the rate"),
    list(
      "Lower the interest rate while keeping a comparable repayment timeline.",
      "Shorten the term and accelerate principal reduction.",
      "Replace an adjustable or otherwise unwanted loan structure.",
      "Remove or change mortgage-insurance costs when the loan and equity support it.",
      "Access home equity through a cash-out refinance after comparing alternatives and Texas-specific home-equity rules."
    ),
    p("A lower advertised rate is not a complete goal. Write down what must improve and what tradeoff is acceptable before comparing lender offers."),
    h("Calculate a break-even period"),
    p("A simple break-even estimate divides eligible upfront refinance costs by the expected monthly savings. If a refinance costs $6,000 and saves $250 per month, the simple break-even is 24 months. That calculation is only a first screen because it does not capture differences in principal reduction, loan term, points, mortgage insurance or the value of cash paid up front."),
    h("Compare equal clocks before extending the term"),
    p("A homeowner with 22 years left on a mortgage may receive an attractive payment quote on a new 30-year loan partly because eight years were added to the repayment schedule. Compare the proposed refinance at or near the current remaining term first. Only then compare a longer term and make the extra years an explicit choice rather than a hidden source of payment savings."),
    h("No-closing-cost does not mean no cost"),
    p("The Consumer Financial Protection Bureau explains that so-called no-closing-cost loans generally recover costs through a higher interest rate, lender credit or a larger loan balance. Compare the rate, lender credits, cash due, balance and total projected costs rather than treating a low upfront bill as free financing."),
    h("Use Loan Estimates to compare lenders"),
    p("Request Loan Estimates for the same refinance structure from more than one lender. Compare rate, points, lender credits, origination charges, projected payment, cash to close and the section showing costs over the first five years. Offers are easier to compare when the loan amount and term are held constant."),
    h("Cash-out refinancing is a different decision"),
    p("A cash-out refinance increases debt secured by the home in order to convert some equity into cash. The household should compare it with a home-equity loan, HELOC, savings or delaying the expense. Texas homestead lending has constitutional rules that make generic national cash-out summaries incomplete, so verify the proposed structure and total liens with the lender and closing professionals."),
    h("Stress-test the new payment and the holding period"),
    list(
      "How long do you realistically expect to keep the property and the new loan?",
      "Does the refinance still break even if you sell or refinance sooner than planned?",
      "How much principal will remain after five or ten years under the old and new loans?",
      "Are points being paid for a rate benefit you will keep long enough to use?",
      "Would using cash to reduce principal on the existing loan achieve the goal with less transaction cost?"
    ),
    p("The strongest refinance has a measurable objective, a break-even point inside the expected holding period and a loan term that does not hide the real cost of the lower payment."),
  ],
}, "migration-finance-depth-2-refinance", refinanceHero);

const homeownersInsurance = base({
  slug: "texas-homeowners-insurance-guide",
  title: "Texas Homeowners Insurance: What Buyers Should Compare",
  dek: "Coverage, roof settlement, percentage deductibles, flood exclusions and coastal wind protection can matter more than the cheapest premium.",
  category: "real-estate",
  publishedAt: "2026-07-25",
  readingMinutes: 9,
  tags: ["home insurance", "deductibles", "flood", "windstorm"],
  internalLinks: [
    { href: "/texas-home-insurance-calculator", label: "Texas home-insurance calculator", description: "Build a planning estimate before obtaining property-specific insurer quotes." },
    { href: "/article/texas-hurricane-preparation-homeowners-renters", label: "Texas hurricane preparation", description: "Connect insurance decisions with wind, flood and storm preparation." },
    { href: "/article/true-cost-of-owning-a-home-in-texas", label: "The true cost of owning a Texas home", description: "Put insurance premiums and deductibles into the complete ownership budget." },
    { href: "https://www.tdi.texas.gov/tips/replacing-your-roof.html", label: "Texas Department of Insurance roof coverage guide", description: "Official Texas guidance on replacement-cost versus actual-cash-value roof coverage and deductibles." },
    { href: "https://www.tdi.texas.gov/tips/deductibles.html", label: "Texas Department of Insurance deductible guide", description: "Official explanation of percentage and dollar deductibles and their out-of-pocket impact." },
    { href: "https://www.tdi.texas.gov/consumer/home-insurance.html", label: "Texas Department of Insurance homeowners resources", description: "Official Texas consumer guidance for shopping for and understanding homeowners insurance." },
  ],
  body: [
    p("Texas homeowners insurance is not a commodity where the cheapest premium automatically buys the best protection. Two policies can have similar prices and very different deductibles, roof settlement rules, exclusions and limits. A buyer should compare what the policy will pay after a loss, how much cash the household must absorb first and whether important Texas hazards require separate coverage."),
    h("Start with the coverage form, not the premium"),
    p("Ask what is covered for the dwelling, other structures, personal property, loss of use and personal liability. Then read the exclusions and endorsements. Policies and insurer forms differ. A low quote is difficult to evaluate until the coverage limits and settlement terms are placed side by side."),
    h("Translate percentage deductibles into dollars"),
    p("Texas home policies may use percentage deductibles for wind, hail or other losses. A 2 percent deductible on a $400,000 dwelling limit is $8,000. The Texas Department of Insurance recommends converting percentage deductibles to actual dollars before choosing a policy. The household should be able to fund that amount without relying on credit immediately after a storm."),
    h("Roof settlement can matter as much as the deductible"),
    p("Some policies pay replacement cost for a covered roof loss, while others may pay actual cash value that accounts for age and condition. TDI notes that insurers can change roof coverage as roofs age and that wind-and-hail deductibles may differ from other deductibles. Verify the roof age shown in the application, how the policy settles roof losses and whether cosmetic or matching limitations apply."),
    h("Flood is a separate question"),
    p("Standard homeowners policies generally do not provide flood insurance for rising water. A property outside a mapped high-risk flood area can still flood. Ask about flood history, drainage and available flood coverage separately from the homeowners quote, especially along the Gulf Coast, bayous, rivers and rapidly developing drainage basins."),
    h("Coastal wind coverage can follow different rules"),
    p("In parts of the Texas coast, wind and hail coverage may not be included in the same way it is inland, and some properties may rely on separate windstorm coverage. Buyers should identify the property's wind-coverage arrangement before closing rather than assuming the standard homeowners quote includes every coastal exposure."),
    h("Replacement cost and market value are different"),
    p("The amount needed to rebuild a structure is not the same as its market price or county appraisal value. Construction costs, debris removal, code requirements and local labor can move rebuilding cost differently from real-estate value. Review the dwelling limit and any extended-replacement-cost features rather than simply matching the purchase price."),
    h("Ask for comparable quotes"),
    list(
      "Use the same dwelling, liability and personal-property limits where possible.",
      "Match deductibles before comparing premiums.",
      "Confirm replacement-cost or actual-cash-value treatment for the roof and contents.",
      "List endorsements and exclusions that differ between quotes.",
      "Check whether water backup, foundation-related damage, ordinance or law, flood, wind or other property-specific exposures need separate treatment.",
      "Record the insurer and agent answers in writing when a detail affects the purchase decision."
    ),
    h("Budget the premium and the deductible"),
    p("Insurance affordability has two parts: the recurring premium and the cash needed after a claim. A policy that saves several hundred dollars per year but increases the storm deductible by thousands may be a poor fit for a household without sufficient reserves. Include both numbers in the homeownership budget."),
    p("The most useful insurance comparison is therefore not 'Which quote is cheapest?' It is 'Which policy gives this property the coverage we need at a premium and deductible we can actually carry?'"),
  ],
}, "migration-finance-depth-2-insurance", insuranceHero);

export const financeEvergreenDepth2Articles: Article[] = [downPayment, refinance, homeownersInsurance];
