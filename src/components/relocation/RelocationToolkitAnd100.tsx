import { Link } from '@tanstack/react-router';

const toolGroups = [
  {
    title: 'Core planning tools',
    tools: [
      ['Texas moving cost calculator', '/texas-moving-cost-calculator', 'Estimate transportation, packing, travel, storage, deposits and setup costs.'],
      ['Texas cost-of-living calculator', '/texas-cost-of-living-calculator', 'Compare the recurring household budget using your own assumptions.'],
      ['Texas salary calculator', '/texas-salary-calculator', 'Estimate take-home pay and compare a Texas job offer with realistic deductions.'],
      ['Texas budget planner', '/texas-budget-planner', 'Combine housing, utilities, transportation, insurance, food and savings into one household budget.'],
      ['Home affordability calculator', '/texas-home-affordability-calculator', 'Model price, income, debt, taxes, insurance and recurring ownership costs.'],
      ['Rent vs. buy calculator', '/texas-rent-vs-buy-calculator', 'Compare renting and owning using transparent assumptions.'],
    ],
  },
  {
    title: 'Home, taxes and insurance',
    tools: [
      ['Property-tax calculators', '/property-tax-calculators', 'Use local and statewide property-tax planning tools before comparing homes.'],
      ['Homestead savings calculator', '/texas-homestead-savings-calculator', 'Estimate the effect of residence-homestead relief on a qualifying home.'],
      ['MUD tax impact calculator', '/texas-mud-tax-impact-calculator', 'Model the additional tax effect of a municipal utility district.'],
      ['Mortgage calculator', '/texas-mortgage-calculator', 'Estimate principal, interest and the broader monthly housing payment.'],
      ['Closing-cost calculator', '/texas-closing-cost-calculator', 'Estimate cash needed at closing beyond the down payment.'],
      ['Homeowners-insurance calculator', '/texas-home-insurance-calculator', 'Build a planning estimate before requesting actual quotes.'],
      ['Homeownership-cost calculator', '/texas-homeownership-cost-calculator', 'Combine recurring ownership costs that are easy to miss.'],
      ['Property-tax county comparison', '/texas-property-tax-county-comparison-calculator', 'Compare county-level property-tax planning assumptions.'],
    ],
  },
  {
    title: 'Schools, offices and address research',
    tools: [
      ['Find my school district', '/find-my-school-district', 'Start with an address-level district lookup, then verify enrollment and attendance zones locally.'],
      ['Find my DMV / county office', '/find-my-dmv', 'Route license, registration, title and county-tax-office tasks correctly.'],
      ['Research a Texas address', '/moving-to-texas', 'Resolve county, Census place and unified school-district context, then verify official boundaries.'],
      ['Find my appraisal district', 'https://comptroller.texas.gov/taxes/property-tax/county-directory/', 'Use the Texas Comptroller county directory for appraisal districts and property-tax offices.'],
      ['Register to vote', 'https://www.votetexas.gov/register-to-vote/', 'Use the official Texas election source for registration rules and deadlines.'],
      ['Find Texas public schools', 'https://tea.texas.gov/families-and-students/finding-school-your-child/finding-school', 'Use TEA resources to verify districts, campuses and enrollment information.'],
    ],
  },
  {
    title: 'Utilities and risk',
    tools: [
      ['Texas utility-cost calculator', '/texas-utility-cost-calculator', 'Estimate electricity, water, gas, internet and other recurring utility costs.'],
      ['Electricity plan shopping', 'https://www.powertochoose.org/', 'Use the Public Utility Commission marketplace where retail choice applies.'],
      ['Flood risk lookup', 'https://msc.fema.gov/portal/home', 'Check FEMA flood-map information for the exact property area.'],
      ['Texas insurance resources', 'https://www.tdi.texas.gov/', 'Use the Texas Department of Insurance for consumer guidance and current market information.'],
      ['Broadband availability', 'https://broadbandmap.fcc.gov/home', 'Check address-level fixed and mobile broadband availability on the FCC map.'],
    ],
  },
] as const;

const sections = [
  ['Choose the right place', [
    'Texas is enormous, and its regions differ dramatically in climate, landscape, economy and lifestyle.',
    'Houston, Dallas–Fort Worth, Austin and San Antonio have very different job markets, housing patterns and transportation systems.',
    'Suburbs and exurbs can change the housing budget, commute and tax picture just as much as changing metros.',
    'County choice can materially affect property taxes, services and local government.',
    'School-district boundaries often do not match city boundaries.',
    'A mailing address does not always tell you the municipality that actually governs a property.',
    'Many homes are outside incorporated cities and rely more heavily on county, district and utility authorities.',
    'Extraterritorial jurisdictions are common around fast-growing Texas cities.',
    'Municipal utility districts can add meaningful property-tax costs.',
    'Public improvement districts and other special districts can create additional assessments.',
    'HOA prevalence varies sharply by neighborhood and subdivision.',
    'Flood exposure can change block by block, especially around bayous, rivers and low-lying drainage systems.',
    'Mileage alone is a poor way to estimate commute time in large Texas metros.',
    'Toll-road dependence can materially affect the monthly transportation budget.',
    'Homeowners-insurance costs can vary dramatically by location and house characteristics.',
    'Windstorm exposure matters most near the Gulf Coast but should be considered anywhere severe weather is common.',
    'Hail exposure is an important insurance and roof-maintenance consideration in North Texas and other storm-prone areas.',
    'Wildfire risk matters in portions of Central, West and rural Texas.',
    'Water supply and long-term water planning matter in fast-growing and drought-prone areas.',
    'Rural internet can still vary sharply by exact address, so verify service before signing a lease or contract.'
  ]],
  ['Buying or renting a home', [
    'Texas does not impose a state individual income tax, but that does not mean every household pays less overall.',
    'Property taxes can be a large part of the monthly housing cost and should be modeled before buying.',
    'A Texas property-tax bill combines multiple taxing units rather than one statewide property-tax rate.',
    'School districts are often one of the largest portions of the property-tax bill.',
    'Appraised value and purchase price are related but are not the same legal concept.',
    'Residence-homestead exemptions can materially reduce taxable value for eligible owner-occupants.',
    'Homeowners should learn how appraisal notices and protest deadlines work before the first notice arrives.',
    'Texas property owners have protest and appeal rights when they disagree with appraisal-district values or actions.',
    'State and local exemptions change over time, so confirm current amounts with official sources before relying on a savings estimate.',
    'Additional local exemptions may exist for qualifying homeowners.',
    'A property can carry municipal utility district taxes in addition to city, county and school taxes.',
    'Some developments include public-improvement-district or similar assessments outside the basic tax calculation.',
    'HOA dues are separate from property taxes and should be included in the monthly budget.',
    'New-construction tax bills can look artificially low when the prior appraisal covered only land or a partially built home.',
    'Estimate future taxes using the completed home and the likely taxing units, not only the seller or builder’s current bill.',
    'Price homeowners insurance before closing because premiums can materially alter affordability.',
    'Standard homeowners policies do not replace flood insurance where flood coverage is needed.',
    'Expansive clay soils can contribute to foundation movement in parts of Texas.',
    'Termite and wood-destroying-insect risk deserves attention during inspections.',
    'Pools, large yards and irrigation systems can materially change electricity, water and maintenance costs.'
  ]],
  ['Vehicles and driving', [
    'New residents should verify the current deadline and process for registering vehicles after establishing Texas residency.',
    'Vehicle registration and title work is often handled through county tax assessor-collector offices.',
    'The Texas Department of Public Safety handles driver licenses and identification cards.',
    'TxDMV and DPS are different agencies, so the correct office depends on the transaction.',
    'Vehicle-registration steps may need to be completed before some driver-license transactions.',
    'An out-of-state driver license is not a permanent substitute for obtaining a Texas license after a move.',
    'Driver-license appointments can book in advance, so scheduling early can save time.',
    'Texas residency documentation is required for many driver-license transactions.',
    'Keep multiple acceptable proofs of residency because document rules are specific.',
    'Texas auto-insurance requirements may differ from your previous state.',
    'Vehicle inspection and emissions requirements depend on current law and county, so verify them before visiting an office.',
    'Toll roads are common around the largest metros.',
    'Texas has multiple tolling agencies and interoperable tag systems; choose based on where you drive most.',
    'Driving distances between Texas cities are often much greater than newcomers expect.',
    'Transportation costs should include tolls, insurance, fuel, maintenance and parking—not only gasoline.'
  ]],
  ['Utilities and household setup', [
    'Texas electricity markets work differently from many other states.',
    'In many areas customers choose among competing retail electric providers, while other areas are served by municipal utilities or cooperatives.',
    'Advertised electricity rates can be misleading unless you compare the full electricity-facts label and your likely usage.',
    'Summer air-conditioning demand can make electricity one of the largest recurring household costs.',
    'Air-conditioning efficiency and insulation matter much more in a Texas home than many newcomers expect.',
    'Water providers depend on the exact address and may be a city, district, authority or other local provider.',
    'Municipal utility districts can provide water and wastewater service in addition to levying taxes.',
    'Trash and recycling can be municipal, district-provided, HOA-arranged or private depending on the neighborhood.',
    'Natural-gas availability varies by neighborhood and home.',
    'Broadband availability should be checked at the exact address, especially outside dense urban areas.'
  ]],
  ['Schools and children', [
    'Texas has more than a thousand public school districts, so district research needs to be address-specific.',
    'Public-school assignment generally begins with the student’s residence.',
    'A city name does not reliably identify the school district that serves an address.',
    'Attendance zones for individual campuses matter in addition to district boundaries.',
    'School boundaries can change as fast-growing communities open new campuses.',
    'Enrollment-document requirements should be checked before the move so records are ready.',
    'Texas also has public charter schools with different enrollment processes.',
    'Private-school availability varies widely by metro and suburb.',
    'Pre-K eligibility and enrollment rules differ from ordinary K–12 enrollment.',
    'Childcare price and availability can vary materially even within the same metro.',
    'School-trip time can matter more than straight-line distance in congested areas.',
    'District calendars differ, so start dates, holidays and teacher-work days should be checked locally.'
  ]],
  ['Weather and environment', [
    'Texas does not have one climate; coastal, Hill Country, Panhandle, Piney Woods, desert and prairie conditions differ sharply.',
    'Houston weather is fundamentally different from Amarillo weather.',
    'Summer heat is a serious planning issue for housing, vehicles, pets, outdoor work and utility budgets.',
    'High humidity makes Gulf Coast heat feel very different from dry West Texas heat.',
    'Severe thunderstorms can occur across much of the state.',
    'Hail can be a major property and vehicle risk, especially in storm-prone regions.',
    'Tornado risk varies by region but severe-weather planning is useful statewide.',
    'Gulf Coast residents need a hurricane and evacuation plan.',
    'Flash flooding can occur far beyond the coast and can develop quickly.',
    'Hard freezes do happen, even in areas known for heat.',
    'Homeowners should know how to protect pipes, irrigation and outdoor equipment during freezes.',
    'Seasonal allergies can be intense, including cedar pollen in Central Texas and other regional allergens.'
  ]],
  ['Becoming a Texan', [
    'Voter registration does not happen automatically because you changed your address.',
    'Election-registration deadlines should be checked against the next election you plan to vote in.',
    'County government handles more everyday functions than many newcomers expect.',
    'Your county is central to many vehicle, property-tax, court and records functions.',
    'The county appraisal district becomes important as soon as you own taxable property.',
    'Emergency-service arrangements can differ in unincorporated areas and special districts.',
    'Hunting and fishing generally require the appropriate Texas licenses unless an exception applies.',
    'Texas state parks are useful not only for recreation but also for understanding the state’s very different natural regions.',
    'Local emergency-alert systems are often separate from statewide warnings, so sign up for the city, county or regional alerts that serve your new address.',
    'Keep lease, closing, insurance and utility records because they can help establish residency for official transactions.',
    'The smoothest move is sequenced: research first, housing and utilities next, then vehicles, licensing, schools, voting and property-tax follow-up.'
  ]],
] as const;

function isExternal(href: string) { return href.startsWith('http'); }

export function RelocationToolkitAnd100() {
  let count = 0;
  return <>
    <section className="mt-16 border-t-2 border-foreground pt-10" aria-labelledby="relocation-toolkit-heading">
      <p className="eyebrow text-primary">Texas relocation toolkit</p>
      <h2 id="relocation-toolkit-heading" className="mt-2 font-display text-4xl">Use the right tool for the next decision</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined uses calculators where estimates are useful and authoritative state or federal sources where an address, legal boundary, rate or official status must be verified.</p>
      <div className="mt-8 space-y-10">
        {toolGroups.map((group) => <section key={group.title}>
          <h3 className="font-display text-3xl">{group.title}</h3>
          <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {group.tools.map(([title, href, copy]) => {
              const className = 'group bg-background p-5 hover:bg-surface';
              const body = <><strong className="font-display text-2xl leading-tight group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{copy}</span><span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-primary">Open {isExternal(href) ? '↗' : '→'}</span></>;
              return isExternal(href) ? <a key={href} href={href} target="_blank" rel="noreferrer" className={className}>{body}</a> : <Link key={href} to={href} className={className}>{body}</Link>;
            })}
          </div>
        </section>)}
      </div>
    </section>

    <section className="mt-16 border-t-2 border-foreground pt-10" aria-labelledby="moving-100-heading">
      <p className="eyebrow text-primary">The newcomer field guide</p>
      <h2 id="moving-100-heading" className="mt-2 font-display text-4xl sm:text-5xl">100 things to know before moving to Texas</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Use this as orientation, then move into the calculators and official-source lookups above for the actual address and household.</p>
      <div className="mt-10 space-y-12">
        {sections.map(([title, items]) => <section key={title} className="border-t border-border pt-6">
          <h3 className="font-display text-3xl">{title}</h3>
          <ol className="mt-5 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {items.map((text) => { count += 1; return <li key={text} className="bg-background p-5"><span className="eyebrow text-primary">{String(count).padStart(2, '0')}</span><p className="mt-2 text-sm leading-7 text-foreground/90">{text}</p></li>; })}
          </ol>
        </section>)}
      </div>
    </section>
  </>;
}
