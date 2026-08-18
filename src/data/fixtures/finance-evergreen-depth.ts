import heroHillCountry from "@/assets/hero-hill-country.jpg";
import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const hero = {
  src: heroHillCountry,
  alt: "Texas homes and neighborhoods beneath a wide evening sky",
  width: 1600,
  height: 1067,
};

const base = (record: Omit<Article, "id" | "brandId" | "hero" | "authorId" | "relatedCollections" | "relatedDestinations">, id: string): Article => ({
  id,
  brandId: "texasdefined",
  hero,
  authorId: "a-hollis",
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

const closingCosts = base({
  slug: "texas-closing-costs-guide",
  title: "Texas Closing Costs and Cash to Close",
  dek: "Understand lender charges, title services, prepaids, escrow deposits and the final amount a buyer must bring to closing.",
  category: "real-estate",
  publishedAt: "2026-07-25",
  readingMinutes: 8,
  tags: ["closing costs", "cash to close", "loan estimate", "homebuyer"],
  body: [
    p("Texas homebuyers often save for a down payment and then discover a second number that matters just as much: cash to close. The down payment is only one part of the transaction. Loan charges, title and settlement services, prepaid interest, homeowners insurance, tax-related deposits, recording charges and other items can all change the amount due when ownership transfers."),
    h("Closing costs and cash to close are not the same number"),
    p("Closing costs are the transaction costs and prepaid amounts associated with obtaining the loan and completing the purchase. Cash to close starts with those costs, adds the down payment and other amounts due from the buyer, then subtracts deposits, lender credits, seller credits and other adjustments that have already been applied. That is why a buyer can have a modest closing-cost estimate but still need substantially more cash on closing day."),
    h("Read the Loan Estimate before comparing lenders"),
    p("For most covered mortgage applications, the lender provides a Loan Estimate after application. It is designed to show the requested loan terms, projected payment, estimated taxes and insurance, estimated closing costs and estimated cash to close. The useful comparison is not just the interest rate. Compare origination charges, points, lender credits, services you may shop for, projected monthly payment and how much money the transaction requires up front."),
    p("When two offers use different combinations of points and lender credits, compare them over the period you realistically expect to keep the loan. A lower rate bought with more cash at closing can be attractive for a long holding period, while a higher rate paired with a credit can reduce the immediate cash requirement. Neither structure is automatically better without the time horizon."),
    h("Know the common categories"),
    list(
      "Loan costs can include origination, underwriting, points, appraisal, credit-report and other lender-related charges.",
      "Title and settlement costs can include title services, settlement or escrow work and other transaction-specific services.",
      "Government charges can include recording and other fees tied to documenting the transaction.",
      "Prepaids can include interest between closing and the end of the month plus amounts collected for insurance or other items before they are due.",
      "Initial escrow deposits may fund an account the servicer will later use for property taxes and homeowners insurance.",
      "Contract-specific items can include inspections, surveys, HOA-related documents, negotiated repairs or credits and other property-specific expenses."
    ),
    h("Use the Closing Disclosure as the final comparison"),
    p("For a covered mortgage, the Closing Disclosure provides the final loan terms, projected payments and closing-cost details before closing. Compare it with the most recent Loan Estimate instead of reading it as a brand-new document. Changes deserve an explanation: confirm the loan amount, rate, points, lender credits, cash to close and any fees or adjustments that moved."),
    p("The federal disclosure timeline gives borrowers time to review the Closing Disclosure before the scheduled closing. Use that review period to ask questions rather than treating the closing table as the first time to study the numbers."),
    h("Keep a reserve outside the transaction"),
    p("A closing budget should not consume every available dollar. Moving, utility deposits, immediate repairs, appliance replacement, insurance deductibles and the first unexpected home expense can arrive quickly. Model the down payment, closing costs and a separate post-closing reserve at the same time so the purchase still works after the keys are handed over."),
    h("For sellers, separate proceeds from the sale price"),
    p("A seller should also avoid treating the contract price as the amount that will be deposited after closing. Mortgage payoff, transaction expenses, taxes, credits, repairs and other adjustments can reduce proceeds. A seller-side estimate is most useful when every expected deduction is entered separately and then replaced with actual figures as the title and settlement documents develop."),
  ],
}, "migration-finance-depth-closing");

const utilityCosts = base({
  slug: "texas-utility-costs-guide",
  title: "How to Estimate Texas Utility Costs",
  dek: "Build an address-specific budget for electricity, water, wastewater, gas, internet, trash, pools and irrigation.",
  category: "moving-to-texas",
  publishedAt: "2026-07-25",
  readingMinutes: 8,
  tags: ["utilities", "electricity", "water", "moving"],
  body: [
    p("A Texas utility budget should be built from the address and the household, not from one statewide average. A compact apartment, an older all-electric house, a newer high-efficiency home, a property with a pool and a home served by a municipal utility can all produce very different monthly totals even when they are in the same metro area."),
    h("Start with every recurring service"),
    p("List the services the property actually uses before assigning a dollar amount. Electricity is only one line. Water, wastewater, drainage, natural gas or propane, internet, trash and recycling can all be separate bills or bundled differently depending on the address."),
    list(
      "Electricity usage and delivery charges.",
      "Water, wastewater, drainage and any local service fees.",
      "Natural gas or propane where the property uses it.",
      "Internet service, equipment and post-promotion pricing.",
      "Trash, recycling and municipal service charges.",
      "Pool pumps, irrigation, wells, septic service or electric-vehicle charging when they apply."
    ),
    h("Use a full year when you can"),
    p("A single spring or fall bill can understate the annual cost of a Texas home. Air-conditioning demand can change electricity use sharply in hot months, while irrigation and pool equipment can add seasonal load. Ask for or reconstruct a twelve-month usage pattern when possible, then compare the current rate structure against that usage instead of multiplying one mild-weather month by twelve."),
    h("Separate usage from the rate plan"),
    p("Electricity cost is the result of both consumption and the price structure applied to that consumption. In competitive retail areas, plan design can matter: fixed charges, usage-based credits, minimum-use rules, contract terms and delivery charges can make a plan look inexpensive at one consumption level and less attractive at another. In areas served by municipal utilities or electric cooperatives, the available choices and rate structure can be different."),
    p("The most useful comparison uses realistic monthly kilowatt-hour levels for the specific home. If the household is moving from a small apartment to a larger detached house, carrying the old bill forward is usually a poor estimate."),
    h("Water and wastewater are local too"),
    p("Water costs vary with the local provider, meter size, rate tiers and household use. Outdoor irrigation can materially change summer consumption. Some bills also include wastewater, drainage or other local charges. A home with a large irrigated yard may have a very different pattern from a similar-size home with drought-tolerant landscaping."),
    h("Account for the house itself"),
    list(
      "Square footage and ceiling height affect how much conditioned space the HVAC system serves.",
      "Insulation, windows, duct condition and air leakage influence cooling and heating demand.",
      "HVAC age, efficiency and thermostat settings can materially change electricity use.",
      "Pools, hot tubs, irrigation systems, workshops and EV charging add loads that a basic household estimate may miss.",
      "Gas appliances shift some energy cost away from electricity but create a separate gas bill."
    ),
    h("Build a moving budget from three numbers"),
    p("For each utility, keep a low, expected and high monthly scenario. Use the expected case for the household budget, the high case to test whether summer or unusual usage would strain cash flow, and the low case only as a best-case comparison. Add one-time connection fees or deposits separately rather than hiding them inside the recurring monthly number."),
    h("Use the estimate as a question list"),
    p("The goal is not to predict every future bill to the dollar. A good estimate tells you which assumptions matter enough to verify before signing a lease or buying a home. Ask who provides each service, request historical usage when available, check the current plan or tariff, and make sure the total still fits after taxes, insurance, maintenance and transportation are included."),
  ],
}, "migration-finance-depth-utilities");

const salaryNeeded = base({
  slug: "salary-needed-to-buy-a-house-in-texas",
  title: "What Salary Do You Need to Buy a House in Texas?",
  dek: "Work backward from the complete payment, recurring debts and a comfortable budget instead of relying on one statewide income number.",
  category: "real-estate",
  publishedAt: "2026-07-25",
  readingMinutes: 8,
  tags: ["salary", "affordability", "debt to income", "home buying"],
  body: [
    p("There is no single salary that buys a house in Texas. The useful question is how much income a particular household needs for a particular home, loan and location while still leaving room for the rest of life. Purchase price alone cannot answer that because taxes, insurance, interest rate, down payment, existing debts and recurring household expenses can change the payment dramatically."),
    h("Start with the complete monthly housing cost"),
    p("Work backward from the payment rather than forward from salary. Estimate principal and interest from the loan amount and rate, then add property taxes, homeowners insurance, mortgage insurance when applicable and HOA dues or other recurring property charges. If the home has unusually high utility, maintenance or commuting costs, keep those visible in the household budget even if a lender does not include every item in the mortgage payment."),
    h("Debt-to-income is a lender measure, not a household budget"),
    p("Debt-to-income ratio compares monthly debt obligations with gross monthly income and is one way lenders evaluate repayment capacity. Different lenders and loan programs can use different limits and underwriting rules. More importantly, qualifying for a loan does not mean the resulting payment fits every household's priorities, savings goals or risk tolerance."),
    p("A household with childcare, medical costs, variable income, large transportation expenses or aggressive retirement savings may reasonably choose a lower housing payment than a lending formula would permit. Affordability should survive the household's real expenses, not only the debts that appear in underwriting."),
    h("The down payment changes more than the loan amount"),
    p("A larger down payment can reduce the amount borrowed and may affect mortgage insurance or loan pricing, but it also removes cash from the household balance sheet. Compare the monthly savings with the reserves left after the down payment, closing costs, moving expenses and immediate repairs. A purchase that leaves no emergency fund can be fragile even if the monthly payment looks manageable."),
    h("Texas taxes and insurance can move the answer"),
    p("Two homes with the same price can produce different monthly costs because local property-tax rates, exemptions, special districts and homeowners-insurance costs differ by address and property. Use address-specific information whenever possible. A statewide average is useful for orientation but weak for deciding whether one home fits a budget."),
    h("Run more than one interest-rate scenario"),
    p("Affordability is sensitive to the interest rate because the rate changes the principal-and-interest payment for the same loan amount. Compare the current working assumption with a somewhat higher rate so the home choice is not dependent on one perfect financing outcome. If a lower rate requires paying points, include the additional cash needed at closing in the comparison."),
    h("Use three affordability tests"),
    list(
      "Payment test: the complete monthly housing payment fits comfortably alongside current recurring expenses.",
      "Cash test: the down payment and closing costs do not eliminate emergency savings and near-term repair reserves.",
      "Stress test: a higher insurance renewal, repair, tax change or temporary income disruption would be uncomfortable but manageable rather than immediately destabilizing."
    ),
    h("Work from the home back to the salary"),
    p("Choose a candidate home price, estimate the complete monthly cost, add existing monthly debt and compare that with household gross and take-home income. Then adjust the home price, down payment or other assumptions until the result fits the household's own budget. This produces a salary requirement tied to the actual decision instead of a headline number that may not match the buyer, property or city."),
    h("Treat preapproval as a ceiling to evaluate, not a spending instruction"),
    p("A lender's preapproval can be useful for understanding available financing, but the buyer still decides what payment is sustainable. Keep room for savings, maintenance, utilities and ordinary life. The strongest home-buying budget is one that still works after the excitement of the purchase is over."),
  ],
}, "migration-finance-depth-salary");

export const financeEvergreenDepthArticles: Article[] = [closingCosts, utilityCosts, salaryNeeded];
