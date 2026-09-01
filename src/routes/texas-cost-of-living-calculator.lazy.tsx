import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { CostOfLivingCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { LOCAL_COST_OF_LIVING_PROFILES } from '@/data/local-cost-of-living';

const description = 'Compare a current household budget with a possible Texas destination using adjustable housing, transportation, food, utilities and other cost assumptions rather than relying on one statewide average.';

const faqs = [
  { question: 'What does a Texas cost-of-living calculator compare?', answer: 'It compares selected household spending categories under different assumptions. The result is most useful as a scenario for a move or job decision rather than an exact prediction of what a particular household will spend.' },
  { question: 'Why can my cost of living differ from the city average?', answer: 'Housing choice, commute, household size, childcare, insurance, debt, utility use and lifestyle can differ substantially from an average household even inside the same metro.' },
  { question: 'Should I use rent or homeownership costs in the comparison?', answer: 'Use the housing path you realistically expect after the move. Buyers should include taxes, insurance and ownership costs; renters should include rent, fees, renters insurance and utilities that are not included.' },
  { question: 'How should I compare a job offer in another Texas city?', answer: 'Use the cost-of-living result as orientation, then estimate take-home pay and rebuild the monthly household budget around the actual housing and commute you are considering.' },
  { question: 'Why should I compare counties as well as cities?', answer: 'County and taxing-jurisdiction differences can affect property taxes, insurance exposure, commute patterns, utilities and local services. A city name alone does not describe every household cost tied to an address.' },
];

export const Route = createLazyFileRoute('/texas-cost-of-living-calculator')({ component: TexasCostOfLivingCalculatorPage });

function TexasCostOfLivingCalculatorPage() {
  return <CalculatorPage eyebrow="Texas moving and household budget" title="Texas cost of living calculator" description={description}>
    <CostOfLivingCalculator />
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="local-cost-living-heading">
      <p className="eyebrow text-primary">Local household planning</p>
      <h2 id="local-cost-living-heading" className="mt-3 font-display text-3xl">Build a city budget without pretending one average fits everyone</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">These local planners use your own current and target monthly costs. They add city-specific checks and direct links to the local property-tax, affordability, homeownership, insurance, mortgage and relocation tools already maintained for each market.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{LOCAL_COST_OF_LIVING_PROFILES.map((profile) => <Link key={profile.slug} to={profile.path} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} cost of living</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare your current household budget with an address-specific {profile.name} scenario.</span></Link>)}</div>
    </section>
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="cost-living-heading">
      <p className="eyebrow text-primary">Averages are a starting point</p>
      <h2 id="cost-living-heading" className="mt-3 font-display text-3xl">Build the comparison around the household you actually have</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>Metro averages are useful for orientation, but the household still has to choose a home, commute, utility setup and spending pattern. Adjust the categories that will actually change instead of assuming every cost moves by the same percentage.</p>
        <p>Housing and transportation often deserve the most attention because they can move together: a lower housing cost farther from work can create a higher vehicle, fuel, toll or time cost. Compare the combined effect rather than optimizing one line in isolation.</p>
        <p>For a serious move, use the calculator as the first draft of a household budget. Replace broad assumptions with the rent listing, mortgage scenario, insurance estimate, property-tax record, commute and utility information tied to the actual neighborhood you are considering.</p>
      </div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="cost-living-categories-heading">
      <p className="eyebrow text-primary">Compare the categories separately</p>
      <h2 id="cost-living-categories-heading" className="mt-3 font-display text-3xl">The biggest Texas cost differences may come from different places</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ['Housing', 'Compare the housing type you would actually choose, not an average home. Include rent or mortgage, taxes, insurance, fees and HOA costs as appropriate.'],
          ['Transportation', 'Commute distance, toll roads, vehicle count, parking and transit access can offset a lower housing cost in another part of a metro.'],
          ['Utilities', 'Electricity, water, gas, internet and trash depend on the home, provider, climate exposure and household usage rather than the city name alone.'],
          ['Insurance', 'Home, renters and auto insurance can vary with address, coverage, property characteristics and risk. Use real quotes once the move becomes specific.'],
          ['Food and household spending', 'Groceries and services matter, but household habits can produce a larger difference than a metro index. Start with your own current spending.'],
          ['Childcare, school and recurring services', 'Childcare, private school, after-school care, gyms, storage, pet care and other recurring services can materially change a family move budget.'],
        ].map(([title, copy]) => <div key={title} className="border border-border p-5"><strong className="font-display text-xl">{title}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
      </div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="cost-living-move-heading">
      <p className="eyebrow text-primary">Moving within Texas</p>
      <h2 id="cost-living-move-heading" className="mt-3 font-display text-3xl">Compare neighborhoods and counties, not just metro headlines</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>Dallas-Fort Worth, Houston, Austin and San Antonio each contain many cities, counties and taxing jurisdictions. A household can stay inside the same metro and still experience a meaningful change in property taxes, commute, utilities, insurance and neighborhood fees.</p>
        <p>If you are buying, identify the exact school district, city, county and special districts for the property. If you are renting, verify which utilities are included, how much parking or amenity fees add, and whether the commute creates recurring toll or fuel costs.</p>
        <p>Use the city or metro comparison to narrow the search, then rebuild the budget around two or three actual neighborhoods. That is much more useful than trying to find one universal answer to whether a Texas city is “cheap” or “expensive.”</p>
      </div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="cost-living-job-heading">
      <p className="eyebrow text-primary">Job-offer comparison</p>
      <h2 id="cost-living-job-heading" className="mt-3 font-display text-3xl">Compare take-home pay against the new household budget</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>A salary increase does not automatically improve the household position after a move. Estimate Texas take-home pay, then compare the change in housing, commute, utilities, childcare and recurring costs. Benefits and retirement contributions can also change the result.</p>
        <p>For a clean comparison, calculate the monthly difference in spendable income after the move rather than comparing gross salaries. That gives you a clearer answer about whether the new job creates more financial room, roughly breaks even or requires a lifestyle tradeoff.</p>
      </div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="cost-living-links-heading">
      <p className="eyebrow text-primary">Turn the index into a real budget</p>
      <h2 id="cost-living-links-heading" className="mt-3 font-display text-3xl">Verify the categories that matter most to the move</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link to="/texas-moving-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">One-time moving costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate transportation, packing, travel, storage, deposits and setup before comparing the monthly budget.</span></Link>
        <Link to="/texas-salary-comparison-by-city" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary comparison by city</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Translate a city-cost scenario into a comparable salary starting point.</span></Link>
        <Link to="/texas-salary-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Take-home pay</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the paycheck that would actually fund the new budget.</span></Link>
        <Link to="/texas-budget-planner" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Household budget</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Put income and recurring expenses together after the comparison.</span></Link>
        <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Break out electricity, water, gas, internet and trash assumptions.</span></Link>
        <Link to="/moving-to-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving to Texas</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare the counties, cities and local systems behind the numbers.</span></Link>
      </div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="cost-living-faq-heading">
      <p className="eyebrow text-primary">Common questions</p>
      <h2 id="cost-living-faq-heading" className="mt-3 font-display text-3xl">Texas cost of living calculator FAQ</h2>
      <div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
    </section>
  </CalculatorPage>;
}