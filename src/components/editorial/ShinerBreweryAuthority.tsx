type Beer = {
  name: string;
  firstBrewed: string;
  abv: string;
  ibu?: string;
  note: string;
};

const mainstays: Beer[] = [
  { name: "Shiner Bock", firstBrewed: "1913", abv: "4.4%", ibu: "13", note: "Amber lager with roasted barley malt and German specialty hops; year-round since 1973." },
  { name: "Shiner Light", firstBrewed: "2011", abv: "4.2%", ibu: "9", note: "Light lager with 99 calories and a crisp, clean finish." },
  { name: "Shiner Off-Road IPA", firstBrewed: "2026", abv: "6.8%", ibu: "40", note: "Hazy, fruit-forward IPA built around juicy hop character." },
  { name: "Shiner Mango Kölsch", firstBrewed: "2025", abv: "4.9%", ibu: "20", note: "Kölsch-style brew with mango flavor and a crisp finish." },
  { name: "Shiner Kosmos Reserve", firstBrewed: "2022", abv: "5.0%", ibu: "13", note: "Hop-forward lager named for Kosmos Spoetzl." },
  { name: "Shiner Premium", firstBrewed: "1909", abv: "4.4%", ibu: "13", note: "Golden lager inspired by the brewery's original hometown beer." },
  { name: "Shiner ¡Órale! Limón", firstBrewed: "2024", abv: "4.5%", ibu: "9", note: "Mexican-style cerveza with natural lime flavor." },
  { name: "Shiner Ruby Sunburst", firstBrewed: "2025", abv: "3.2%", ibu: "5", note: "Tangerine-forward lager with grapefruit aroma." },
  { name: "Shiner Ruby Redbird", firstBrewed: "2018", abv: "3.2%", ibu: "5", note: "Ruby Red grapefruit and ginger lager." },
  { name: "Shiner Prickly Pear", firstBrewed: "2012", abv: "4.9%", ibu: "12", note: "Crisp lager brewed with cactus fruit." },
  { name: "Shiner Black Lager", firstBrewed: "2007", abv: "4.9%", ibu: "18", note: "Bohemian-style dark lager with roasted malt and Czech Saaz and Styrian hops." },
  { name: "Shiner Texas Hard Tea", firstBrewed: "2026", abv: "5.0%", note: "Sweet-tea and lemon-inspired brew." },
  { name: "Shiner Shockwave Blue Razz", firstBrewed: "2026", abv: "8.0%", note: "High-ABV fruit-forward brew with blue raspberry and citrus." },
  { name: "Shiner Shockwave Cherry Limeade", firstBrewed: "2026", abv: "8.0%", note: "High-ABV cherry and limeade release." },
  { name: "Shiner Shockwave Strawberry Lemonade", firstBrewed: "2025", abv: "8.0%", note: "Strawberry-lemonade shandy-style release." },
];

const limited: Beer[] = [
  { name: "Shiner Dandelion Honey Kölsch", firstBrewed: "2026", abv: "4.5%", ibu: "14", note: "Limited-release Kölsch with floral notes and wildflower honey." },
];

const seasonal: Beer[] = [
  { name: "Shiner Peach Wheat", firstBrewed: "2022", abv: "4.5%", ibu: "15", note: "Wheat beer brewed with Hill Country peaches." },
  { name: "Shiner Raspberry Lemonade Shandy", firstBrewed: "2024", abv: "4.2%", ibu: "7", note: "Raspberry-and-lemonade seasonal shandy." },
  { name: "Shiner Holiday Cheer", firstBrewed: "2010", abv: "5.4%", ibu: "22", note: "Dunkelweizen brewed with Texas peaches and roasted pecans." },
  { name: "Shiner Oktoberfest", firstBrewed: "2005", abv: "5.7%", ibu: "18", note: "Märzen-style seasonal with Munich and caramel malts and German-grown hops." },
];

const nonAlcoholic: Beer[] = [
  { name: "Shiner Bock Non-Alcoholic", firstBrewed: "2026", abv: "<0.5%", ibu: "3", note: "Non-alcoholic take on the Bock profile with roasted malt and German specialty hops." },
  { name: "Shiner Rodeo Golden Brew", firstBrewed: "2023", abv: "<0.5%", ibu: "8", note: "Crisp non-alcoholic golden lager-style brew." },
];

const spirits = [
  ["Shiner Texas Vodka", "Texas-made vodka using Shiner artesian well water."],
  ["Shiner Texas Gin", "Small-batch gin with Texas botanicals including Ashe juniper, Ruby Red grapefruit peel and San Saba pecans."],
  ["Shiner 'Shine", "90-proof corn whiskey made from a four-grain mash and double copper-pot distilled."],
  ["Shiner Cinnamon 'Shine", "Shiner 'Shine infused with cinnamon and cane sugar."],
] as const;

const sustainabilityFacts = [
  ["30%", "of brewery power comes from solar panels"],
  ["98%", "of brewery waste is recycled"],
  ["200+ tons", "of paper are recycled each year"],
  ["300+ tons", "of glass are recycled each year"],
  ["200+ tons", "of spent yeast go to local animal-food producers each year"],
  ["13,000+ tons", "of spent grain go to local farmers for animal feed each year"],
] as const;

const awardHighlights = [
  ["Shiner Bock", "Gold — 2025 Australian International Beer Awards; Gold — 2025 U.S. Open Beer Championship; Silver — 2025 World Beer Cup"],
  ["Shiner Light", "Silver — 2025 Australian International Beer Awards; Silver — 2022 Australian International Beer Awards; Gold — 2021 Australian International Beer Awards"],
  ["Shiner Oktoberfest", "Silver — 2024 European Beer Star; Gold — 2012 Great American Beer Festival; Silver — 2012 Australian International Beer Awards"],
  ["Shiner Texas Vodka", "Gold — San Francisco World Spirits Competition; Gold — Bartender Spirits Awards; Silver — International Wine & Spirits Competition"],
] as const;

function BeerTable({ title, description, beers }: { title: string; description: string; beers: Beer[] }) {
  return <section className="mt-10">
    <h3 className="font-display text-3xl">{title}</h3>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p>
    <div className="mt-5 overflow-x-auto border-y border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-border text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
          <tr>
            <th className="px-3 py-3">Beer</th>
            <th className="px-3 py-3">First brewed</th>
            <th className="px-3 py-3">ABV</th>
            <th className="px-3 py-3">IBU</th>
            <th className="px-3 py-3">What to know</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {beers.map((beer) => <tr key={beer.name}>
            <th className="px-3 py-4 font-semibold">{beer.name}</th>
            <td className="px-3 py-4">{beer.firstBrewed}</td>
            <td className="px-3 py-4">{beer.abv}</td>
            <td className="px-3 py-4">{beer.ibu ?? "—"}</td>
            <td className="px-3 py-4 leading-6 text-muted-foreground">{beer.note}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </section>;
}

export default function ShinerBreweryAuthority() {
  const beerCount = mainstays.length + limited.length + seasonal.length + nonAlcoholic.length;

  return <section className="mt-14 border-t border-border pt-10" aria-labelledby="shiner-brewery-current">
    <p className="eyebrow text-primary">Current brewery guide</p>
    <h2 id="shiner-brewery-current" className="mt-3 font-display text-4xl">What Shiner is brewing — and what visitors can do</h2>
    <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
      This is a September 19, 2026 snapshot of Shiner's official beer, spirits and visitor pages. The brewery currently surfaces {beerCount} beer or non-alcoholic beer product pages across its main, limited, seasonal and non-alcoholic lineup. Availability can change, so the official brewery catalog remains the final source for what is on shelves or pouring at the brewery.
    </p>

    <BeerTable title="Mainstays and current year-round releases" description="The broad current lineup shown before Shiner's seasonal and non-alcoholic sections on the brewery's official beer catalog." beers={mainstays} />
    <BeerTable title="Limited release" description="A current limited-time release with its own live Shiner product page." beers={limited} />
    <BeerTable title="Seasonal beers" description="Rotating releases that Shiner currently groups as seasonal rather than year-round." beers={seasonal} />
    <BeerTable title="Non-alcoholic brews" description="Current Shiner products listed in the brewery's Non-Alc collection." beers={nonAlcoholic} />

    <section className="mt-12 border-y border-border py-8">
      <p className="eyebrow text-primary">How Shiner is made</p>
      <h3 className="mt-2 font-display text-3xl">The operating brewery behind the brand</h3>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div>
          <h4 className="font-display text-2xl">Artesian well water</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Shiner's official brewery history traces the operation to an artesian-water source discovered by the German and Czech community in 1909. That water became the foundation of the original brewery and remains part of the brewery's modern identity.</p>
        </div>
        <div>
          <h4 className="font-display text-2xl">Brewing continuity</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">The brewery still produces beer in Shiner rather than treating the town as a heritage label. The current lineup mixes long-running lagers with newer IPAs, fruit beers, seasonal releases and non-alcoholic products while keeping Shiner as the production home.</p>
        </div>
        <div>
          <h4 className="font-display text-2xl">Beer and spirits share the campus</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Shiner's distillery, added in 2023, uses the same malts and artesian water as the beer operation. The brewery says its spirits also pass through the original copper grant associated with Kosmos Spoetzl, linking the modern distillery to older brewery equipment and tradition.</p>
        </div>
      </div>
    </section>

    <section className="mt-10 grid gap-8 lg:grid-cols-2">
      <div>
        <p className="eyebrow text-primary">Sustainability</p>
        <h3 className="mt-2 font-display text-3xl">What the brewery says it recycles and reuses</h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">These figures are a September 19, 2026 snapshot from Shiner's official sustainability page. They are brewery-reported operating metrics rather than independent environmental ratings.</p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {sustainabilityFacts.map(([value, label]) => <div key={label} className="border-t border-border pt-4">
            <dt className="font-display text-2xl">{value}</dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground">{label}</dd>
          </div>)}
        </dl>
        <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
          <li><strong className="text-foreground">Biogas:</strong> the brewery says its water-treatment system produces biogas used to heat brew kettles.</li>
          <li><strong className="text-foreground">Wastewater:</strong> treated wastewater is reused to irrigate nearby fields.</li>
          <li><strong className="text-foreground">Daylight:</strong> skylights reduce the need for daytime electric lighting in parts of the facility.</li>
        </ul>
        <a href="https://shiner.com/sustainability/" target="_blank" rel="noreferrer noopener" className="mt-5 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Official sustainability page ↗</a>
      </div>

      <div>
        <p className="eyebrow text-primary">Awards</p>
        <h3 className="mt-2 font-display text-3xl">Recent and notable competition results</h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Shiner publishes a long awards archive. These highlights favor current products and newer results where the official product pages publish them.</p>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {awardHighlights.map(([name, note]) => <div key={name} className="py-4">
            <h4 className="font-semibold">{name}</h4>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{note}</p>
          </div>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <a href="https://shiner.com/awards/" target="_blank" rel="noreferrer noopener" className="text-primary underline decoration-primary/40 underline-offset-4">Official awards archive ↗</a>
          <a href="https://shiner.com/beer/shiner-bock/" target="_blank" rel="noreferrer noopener" className="text-primary underline decoration-primary/40 underline-offset-4">Current Bock awards ↗</a>
          <a href="https://shiner.com/spirits/" target="_blank" rel="noreferrer noopener" className="text-primary underline decoration-primary/40 underline-offset-4">Current spirits awards ↗</a>
        </div>
      </div>
    </section>

    <section className="mt-12 grid gap-8 border-y border-border py-8 lg:grid-cols-2">
      <div>
        <p className="eyebrow text-primary">Beyond beer</p>
        <h3 className="mt-2 font-display text-3xl">The distillery</h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Spoetzl added craft spirits in 2023. Its current core spirits lineup includes:</p>
        <ul className="mt-5 space-y-4">
          {spirits.map(([name, note]) => <li key={name} className="border-t border-border pt-4">
            <strong className="block">{name}</strong>
            <span className="mt-1 block text-sm leading-6 text-muted-foreground">{note}</span>
          </li>)}
        </ul>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">Shiner also describes a small-batch, hand-numbered Texas Legend whiskey program. Spirit availability and bottle-sale rules are controlled by the distillery and Texas law.</p>
      </div>

      <div>
        <p className="eyebrow text-primary">The visitor campus</p>
        <h3 className="mt-2 font-display text-3xl">More than the brewery tour</h3>
        <ul className="mt-5 space-y-4 text-sm leading-7">
          <li><strong>Signature Brewery Tour:</strong> about 45 minutes, with production-floor education, branded items and complimentary beer pours for guests of legal drinking age. The posted price reviewed September 19, 2026 is $35 plus tax.</li>
          <li><strong>Distillery Tour:</strong> about 45 minutes with a distillery and speakeasy visit, a tasting flight and branded merchandise. The posted price is $35 plus tax; minors are not allowed on this tour.</li>
          <li><strong>K. Spoetzl BBQ Co.:</strong> on-site Texas-style barbecue, currently open during daytime brewery hours.</li>
          <li><strong>Rickhouse:</strong> Thursday-through-Saturday restaurant and bar serving Texas comfort food and cocktails.</li>
          <li><strong>Gift shop and outdoor spaces:</strong> Shiner merchandise, brewery grounds and outdoor bar areas make the campus a longer stop than the guided tour alone.</li>
          <li><strong>Reservations:</strong> tours can fill. Shiner asks guests to reserve ahead and check in at least 15 minutes early.</li>
        </ul>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">Shiner's current visit page and FAQ show slightly different first-tour times on some days. Use the live booking calendar, not a copied schedule, as the final authority for your date.</p>
      </div>
    </section>

    <section className="mt-10 border-y border-border py-8">
      <p className="eyebrow text-primary">Hours & events</p>
      <h3 className="mt-2 font-display text-3xl">Current planning snapshot</h3>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        These hours were reviewed September 19, 2026 from Shiner's official visitor page. Special events, holidays and private functions can change normal operations, so recheck the live brewery pages before leaving home.
      </p>
      <dl className="mt-6 grid border-y border-border sm:grid-cols-2">
        <div className="border-b border-border py-4 sm:border-r sm:pr-6"><dt className="font-semibold">Brewery visitor hours</dt><dd className="mt-1 text-sm leading-6 text-muted-foreground">Monday-Saturday 10:30 a.m.-6 p.m.; Sunday 11 a.m.-6 p.m.</dd></div>
        <div className="border-b border-border py-4 sm:pl-6"><dt className="font-semibold">Outdoor bars</dt><dd className="mt-1 text-sm leading-6 text-muted-foreground">Friday-Saturday noon-8 p.m.; Sunday noon-6 p.m.</dd></div>
        <div className="border-b border-border py-4 sm:border-r sm:pr-6"><dt className="font-semibold">Distillery tours</dt><dd className="mt-1 text-sm leading-6 text-muted-foreground">Saturday 11:30 a.m.-4:30 p.m.; Sunday-Friday 12:30-4:30 p.m., generally hourly.</dd></div>
        <div className="border-b border-border py-4 sm:pl-6"><dt className="font-semibold">Rickhouse</dt><dd className="mt-1 text-sm leading-6 text-muted-foreground">Thursday noon-9 p.m.; Friday-Saturday noon-10 p.m.</dd></div>
      </dl>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="font-display text-2xl">Brewery events</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">The Spoetzl campus hosts recurring and seasonal programming including Oktoberfest weekends, ShinerFest, Market Days, live music, holiday events and the annual Shiner Beer Run. Event dates change, so the official calendar remains the final authority for the complete schedule.</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <a href="/event/shiner-oktoberfest-weekends" className="text-primary underline decoration-primary/40 underline-offset-4">Oktoberfest guide →</a>
            <a href="/event/shinerfest" className="text-primary underline decoration-primary/40 underline-offset-4">ShinerFest guide →</a>
            <a href="/event/shiner-beer-run" className="text-primary underline decoration-primary/40 underline-offset-4">Beer Run guide →</a>
          </div>
          <a href="https://shiner.com/events/" target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">See Shiner's live event calendar ↗</a>
        </div>
        <div>
          <h4 className="font-display text-2xl">Tour-time note</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Shiner's visitor page and FAQ do not currently show identical first-tour times on every day. The reservation calendar is therefore the controlling planning source for your date. Reserve before a long drive, check in at least 15 minutes early, and leave extra time between brewery and distillery tours.</p>
          <a href="https://shiner.com/book-your-tour/" target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Check live tour availability ↗</a>
        </div>
      </div>
    </section>

    <nav aria-label="Official Shiner brewery sources" className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
      <a href="https://shiner.com/beer/" target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Official beer catalog ↗</a>
      <a href="https://shiner.com/spirits/" target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Official spirits catalog ↗</a>
      <a href="https://shiner.com/brewery/" target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Official brewery history ↗</a>
      <a href="https://shiner.com/sustainability/" target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Sustainability ↗</a>
      <a href="https://shiner.com/awards/" target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Awards archive ↗</a>
      <a href="https://shiner.com/visit/" target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Plan a visit ↗</a>
      <a href="https://shiner.com/book-your-tour/" target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Tour booking ↗</a>
    </nav>
  </section>;
}
