import heroHillCountry from "@/assets/hero-hill-country.jpg";
import homeMaintenanceHero from "@/assets/generated/texas-home-maintenance-calendar-unique.jpg";
import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const rentBuyHero: Article["hero"] = {
  src: "https://images.unsplash.com/photo-1758915576261-8da237f62126?auto=format&fit=crop&w=1600&q=82",
  alt: "A distinctive Texas house representing the choice between renting and buying",
  width: 1600,
  height: 1067,
  credit: "Dennis Lamberth · Unsplash",
};
const trueCostHero: Article["hero"] = { src: homeMaintenanceHero, alt: "Texas home maintenance and recurring ownership costs", width: 1600, height: 1067 };
const equityHero: Article["hero"] = {
  src: "https://images.unsplash.com/photo-1671410304582-1c2fb1390fbf?auto=format&fit=crop&w=1600&h=900&q=82",
  alt: "A Texas suburban neighborhood representing home equity and borrowing against a property",
  width: 1600,
  height: 900,
  credit: "Jose Losada · Unsplash",
};
const mortgageHero: Article["hero"] = { src: heroHillCountry, alt: "Texas homes and neighborhoods representing the full monthly mortgage payment", width: 1600, height: 1067 };

const base = (
  record: Omit<Article, "id" | "brandId" | "authorId" | "relatedCollections" | "relatedDestinations">,
  id: string,
): Article => ({ id, brandId: "texasdefined", authorId: "a-hollis", relatedCollections: [], relatedDestinations: [], ...record });

const rentingVsBuying = base({
  slug: "renting-vs-buying-in-texas",
  title: "Renting vs. Buying in Texas",
  dek: "A complete comparison of flexibility, equity, taxes, insurance, maintenance and the time it takes ownership costs to break even.",
  category: "real-estate",
  hero: rentBuyHero,
  publishedAt: "2026-07-25",
  readingMinutes: 11,
  tags: ["renting", "home buying", "affordability", "moving to texas"],
  internalLinks: [
    { href: "/texas-rent-vs-buy-calculator", label: "Texas rent vs buy calculator", description: "Compare the two paths across the same time horizon and adjustable cost assumptions." },
    { href: "/texas-homeownership-cost-calculator", label: "Texas homeownership cost calculator", description: "Build the ownership side from mortgage, taxes, insurance, utilities, maintenance and fees." },
    { href: "/texas-closing-cost-calculator", label: "Texas closing-cost calculator", description: "Include the upfront transaction costs that a monthly payment comparison can miss." },
    { href: "/texas-home-affordability-calculator", label: "Texas home affordability calculator", description: "Test whether the buying scenario fits household income, debts and housing costs." },
    { href: "https://www.consumerfinance.gov/owning-a-home/prepare/consider-whether-its-the-right-time-for-you-to-buy/", label: "CFPB: Is it the right time to buy?", description: "Official consumer guidance on rent-versus-buy tradeoffs, time horizon and homeownership risk." },
  ],
  body: [
    p("Renting and buying solve different problems. Renting purchases flexibility and transfers many property risks to the owner. Buying can provide stability and a path to equity, but it also concentrates cash in one property and makes the household responsible for transaction costs, taxes, insurance, maintenance and resale risk."),
    h("Compare the complete monthly costs"),
    p("The fair comparison is not rent versus principal and interest. A buyer should include the complete mortgage payment, property taxes, homeowners insurance, mortgage insurance when applicable, HOA dues, utilities, maintenance and a repair reserve. A renter should include rent, renters insurance, required fees, parking and utilities that are not included."),
    p("Use the same time horizon for both choices. If one side assumes five years and the other quietly assumes ten, the comparison is answering two different questions."),
    h("Time in the home can dominate the result"),
    p("Buying and selling create transaction costs, while principal reduction and any change in home value accumulate over time. A household expecting a job transfer, military move, family change or uncertain work location should explicitly test a shorter ownership period rather than assuming it will remain long enough to absorb those costs."),
    h("Do not make the result depend on appreciation"),
    p("Future home values are uncertain. Run at least one flat or conservative appreciation scenario. If buying only appears favorable under a strong future-price assumption, the model is relying on a market outcome rather than the household budget."),
    h("Renting can preserve option value"),
    list("The household expects to move within a relatively short or uncertain period.", "A purchase would drain emergency savings after down payment and closing.", "The household is new to the region and still learning commute, flood, school or neighborhood tradeoffs.", "Major repairs or property-value risk would be difficult to absorb."),
    h("Buying can fit when the full ownership plan works"),
    list("The household expects to remain long enough to justify the transaction costs.", "Cash reserves remain healthy after down payment and closing.", "Taxes, insurance, maintenance and utilities fit alongside the mortgage.", "A conservative scenario still leaves room for savings and ordinary life."),
    h("Compare flexibility as well as dollars"),
    p("A calculator can price many financial assumptions, but it cannot fully price the value of being able to relocate easily or the value of controlling a home for a long period. Put those preferences beside the financial result instead of forcing them into an artificial dollar estimate."),
    h("Use a stress test before choosing"),
    p("For the buying case, test a repair year, a higher insurance renewal and flat home value. For the renting case, test a rent increase and moving costs. The stronger choice is the one the household can still live with when the optimistic assumptions are removed."),
  ],
}, "migration-finance-depth-3-rent-buy");

const trueCost = base({
  slug: "true-cost-of-owning-a-home-in-texas",
  title: "The True Cost of Owning a Home in Texas",
  dek: "Mortgage, taxes and insurance are only the beginning. Build a realistic budget for heat, roofs, foundations, pools, districts and repairs.",
  category: "real-estate",
  hero: trueCostHero,
  publishedAt: "2026-07-25",
  readingMinutes: 12,
  tags: ["homeownership", "maintenance", "property taxes", "insurance"],
  internalLinks: [
    { href: "/texas-homeownership-cost-calculator", label: "Texas homeownership cost calculator", description: "Combine mortgage, taxes, insurance, utilities, maintenance and recurring property costs." },
    { href: "/texas-utility-cost-calculator", label: "Texas utility-cost calculator", description: "Build electricity, water, gas, internet and trash assumptions separately." },
    { href: "/texas-home-insurance-calculator", label: "Texas home-insurance calculator", description: "Create a planning estimate before collecting address-specific insurer quotes." },
    { href: "/article/muds-pids-hoas-special-districts-texas", label: "MUDs, PIDs, HOAs and special districts", description: "Understand recurring local taxes, assessments and fees that can sit outside the base mortgage." },
    { href: "https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/", label: "CFPB homeownership budget guidance", description: "Official guidance on total housing payment, maintenance, repairs, utilities and emergency savings." },
  ],
  body: [
    p("The true cost of owning a Texas home is the amount required to finance, tax, insure, operate, maintain and repair the property while preserving enough cash for the rest of the household. A listing price and a lender payment reveal only part of that obligation."),
    h("Start with the complete housing payment"),
    p("Principal and interest sit at the center, but property taxes, homeowners insurance, mortgage insurance and HOA dues can materially change the monthly amount. If taxes or insurance are escrowed, the cash still belongs in the ownership budget even though the lender collects it with the mortgage."),
    h("Utilities belong in affordability"),
    p("Electricity, water, wastewater, gas, internet and trash are not optional simply because they sit outside the mortgage statement. Texas summer cooling, irrigation and pool equipment can make the property itself an important part of the utility estimate. Ask for historical usage when available and apply current provider rates."),
    h("Maintenance should be tied to the house"),
    p("A generic annual percentage can be a rough starting point, but an address-specific plan is stronger. List the roof, HVAC, water heater, plumbing, electrical system, foundation, drainage, appliances, fencing, trees, irrigation and pool equipment. Record age, known condition and the next likely service or replacement window."),
    h("Texas weather changes the repair reserve"),
    list("Hail and wind can create roof and exterior claims and large percentage deductibles.", "Heat places sustained demand on cooling equipment and can expose insulation or duct problems.", "Expansive soils and drainage problems can affect foundations and plumbing in some areas.", "Freeze events can damage exposed plumbing and landscaping when a property is not prepared.", "Coastal and flood-prone properties can require separate insurance and mitigation decisions."),
    h("Neighborhood costs can sit outside the lender estimate"),
    p("HOA dues, special assessments, MUD taxes, PID assessments and other district charges can make two similarly priced homes carry different recurring costs. Verify the complete local stack before comparing neighborhoods."),
    h("Insurance deductibles are part of ownership risk"),
    p("A premium is only one insurance number. Convert wind or hail percentage deductibles into dollars and keep enough liquidity to handle the household's share of a covered loss. Also confirm whether flood or coastal wind coverage is separate for the property."),
    h("Transportation can be a property cost"),
    p("A house farther from work, school or medical care can move money from the housing line to vehicles, fuel, tolls and time. When comparing two addresses, keep the commute on the same worksheet as taxes and utilities rather than treating location as free."),
    h("Build reserves in layers"),
    list("Emergency savings for income or household disruptions.", "A recurring maintenance reserve for ordinary service and repairs.", "Known replacement sinking funds for large systems approaching the end of useful life.", "Cash for insurance deductibles and costs excluded from coverage."),
    p("A home is affordable when the complete ownership budget can absorb ordinary bad luck. If the purchase only works when taxes, insurance, utilities and repairs all stay unusually low, the budget is not finished yet."),
  ],
}, "migration-finance-depth-3-true-cost");

const homeEquity = base({
  slug: "texas-home-equity-heloc-guide",
  title: "Texas Home Equity Loans and HELOCs",
  dek: "How Texas homestead equity limits work, how loans differ from revolving lines and what to compare before borrowing against a home.",
  category: "real-estate",
  hero: equityHero,
  publishedAt: "2026-07-25",
  readingMinutes: 12,
  tags: ["home equity", "heloc", "texas constitution", "borrowing"],
  internalLinks: [
    { href: "/texas-home-equity-calculator", label: "Texas home-equity calculator", description: "Estimate current equity and loan-to-value before considering a borrowing product." },
    { href: "/texas-home-equity-growth-calculator", label: "Texas home-equity growth calculator", description: "Explore how loan paydown and hypothetical value changes could affect future equity." },
    { href: "/texas-refinance-savings-calculator", label: "Texas refinance calculator", description: "Compare a refinance structure with leaving the first mortgage in place." },
    { href: "https://statutes.capitol.texas.gov/Docs/CN/htm/CN.16.htm#50", label: "Texas Constitution Article XVI, Section 50", description: "Official constitutional requirements for liens and extensions of credit secured by a Texas homestead." },
    { href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-home-equity-loan-and-a-home-equity-line-of-credit-heloc-en-247/", label: "CFPB: Home-equity loan vs. HELOC", description: "Official consumer explanation of lump-sum home-equity loans and revolving HELOCs." },
  ],
  body: [
    p("Home equity is the difference between a home's current value and debts secured by it. Borrowing against that equity can provide a lump sum or revolving credit, but it also places the home behind another debt. Estimated equity is therefore not the same thing as affordable or legally available borrowing."),
    h("Home-equity loan and HELOC are different structures"),
    p("A home-equity loan generally provides a defined amount up front and repays under a scheduled loan. A HELOC is an open-end line that can allow repeated draws up to the available limit during a draw period. HELOC rates are commonly adjustable, so the payment can change with the rate and outstanding balance."),
    h("Texas homestead equity credit has constitutional limits"),
    p("Article XVI, Section 50 of the Texas Constitution establishes special requirements for extensions of credit secured by a homestead. For covered Section 50(a)(6) credit, the principal amount plus other valid liens secured by the homestead may not exceed 80 percent of the home's fair market value when the extension is made. The constitutional text contains additional conditions, notices and protections, so a simple 80 percent calculation is not a complete eligibility test."),
    h("Start with a conservative value"),
    p("Equity depends on the value used. A website estimate, tax appraisal and lender appraisal can differ. Test a lower value as well as the working estimate before treating an equity number as available borrowing capacity."),
    h("Count every secured balance"),
    p("The first mortgage is not the only number that can matter. Include balances of other debt secured by the property when estimating the current equity and loan-to-value position. A lender will verify liens and use its own underwriting and appraisal process."),
    h("Compare the payment after the draw period too"),
    p("A HELOC can have separate draw and repayment periods. The payment that looks manageable while the line is open may change when draws stop or when an adjustable rate changes. Review the index, margin, caps, minimum payment calculation and repayment structure rather than focusing only on the initial rate."),
    h("Fees and product terms matter"),
    list("Application, appraisal, title or closing costs.", "Annual, inactivity or early-closure fees when applicable.", "Fixed versus adjustable rate and any conversion option.", "Draw period, repayment period and minimum draw rules.", "Whether the household could still make the payment under a higher-rate scenario."),
    h("Compare alternatives before securing more debt with the home"),
    p("A refinance, cash savings, staged project, unsecured credit or simply delaying the expense can produce a different risk profile. A HELOC preserves the existing first mortgage but adds a variable revolving lien; a cash-out refinance replaces the first mortgage. Compare both the cost and the collateral risk."),
    h("Do not turn appreciation into an emergency fund"),
    p("Home equity is illiquid until the home is sold or a lender extends credit against it. Keep ordinary emergency savings separate so an unexpected expense does not force the household to borrow against the property under poor terms."),
    p("Before signing, use the lender's current disclosures and the official Texas constitutional requirements. The right amount to borrow can be materially lower than the maximum amount a formula suggests."),
  ],
}, "migration-finance-depth-3-equity");

const mortgagePayment = base({
  slug: "texas-mortgage-payment-guide",
  title: "What Is Included in a Texas Mortgage Payment?",
  dek: "Principal and interest are only the core. Add property taxes, insurance, mortgage insurance and other housing costs to understand the real payment.",
  category: "real-estate",
  hero: mortgageHero,
  publishedAt: "2026-07-25",
  readingMinutes: 10,
  tags: ["mortgage payment", "escrow", "property taxes", "home insurance"],
  internalLinks: [
    { href: "/texas-mortgage-calculator", label: "Texas mortgage calculator", description: "Estimate principal, interest, property taxes and homeowners insurance in one monthly view." },
    { href: "/texas-homeownership-cost-calculator", label: "Texas homeownership cost calculator", description: "Add maintenance, utilities, HOA or district costs that may sit outside the mortgage payment." },
    { href: "/property-tax-calculators", label: "Texas property-tax calculators", description: "Explore homestead, escrow, county comparison and other property-tax scenarios." },
    { href: "/texas-home-insurance-calculator", label: "Texas home-insurance calculator", description: "Build a planning estimate for the insurance part of the housing budget." },
    { href: "https://www.consumerfinance.gov/ask-cfpb/on-a-mortgage-whats-the-difference-between-my-principal-and-interest-payment-and-my-total-monthly-payment-en-1941/", label: "CFPB: Total monthly mortgage payment", description: "Official explanation of principal, interest, taxes, insurance, mortgage insurance and escrow." },
  ],
  body: [
    p("A Texas mortgage payment is rarely just principal and interest. The number that matters to a household budget is the complete monthly housing obligation: the loan payment plus property taxes, homeowners insurance, mortgage insurance when applicable and any recurring property costs paid separately."),
    h("Principal reduces the balance"),
    p("Principal is the amount borrowed. Each scheduled payment can include an amount that reduces that balance. The principal portion generally changes over the life of an amortizing loan even when the combined principal-and-interest payment is fixed."),
    h("Interest is the cost of borrowing"),
    p("Interest is calculated from the loan terms and remaining balance. Early in a typical amortizing mortgage, more of the scheduled principal-and-interest payment goes toward interest because the outstanding balance is larger."),
    h("Property taxes can be collected through escrow"),
    p("Many borrowers send a monthly amount to the servicer for projected property taxes. The servicer holds those funds in escrow and pays the tax bills when due. Escrow is a collection method, not a discount: the household still bears the underlying tax cost."),
    h("Homeowners insurance can also sit inside escrow"),
    p("A servicer may collect the expected homeowners insurance premium with the monthly payment and pay the insurer from escrow. The premium can change at renewal, which can change the escrow requirement even when the mortgage interest rate itself is fixed."),
    h("Mortgage insurance is separate from homeowners insurance"),
    p("Mortgage insurance protects the lender or guarantor under the applicable loan program; homeowners insurance covers specified risks to the property and liability under the policy. Depending on the mortgage, mortgage-insurance charges may appear in the total monthly payment."),
    h("HOA dues and special districts may sit outside the statement"),
    p("A lender's projected payment does not necessarily include HOA dues, PID assessments, MUD-related taxes or every recurring neighborhood cost. Add those separately before deciding that the lender payment represents the full cost of the address."),
    h("Why a fixed-rate payment can still rise"),
    p("The principal-and-interest portion of a fixed-rate mortgage can remain stable while the total payment changes because property taxes, insurance premiums or escrow requirements changed. Review the servicer's escrow analysis and verify that exemptions and insurance information are current."),
    h("Use the Loan Estimate for the whole payment"),
    p("The federal Loan Estimate shows projected payments and separates loan terms from taxes, insurance and other costs. Compare offers using the complete projected payment, then replace estimates with address-specific taxes and insurance quotes as those become available."),
    h("Keep ownership costs outside the mortgage visible"),
    p("Utilities, maintenance and repairs do not become optional because the servicer does not collect them. Pair the mortgage estimate with a complete homeownership budget before deciding what payment the household can comfortably carry."),
  ],
}, "migration-finance-depth-3-mortgage-payment");

export const financeEvergreenDepth3Articles: Article[] = [rentingVsBuying, trueCost, homeEquity, mortgagePayment];
