import type { ReactNode } from "react";

/**
 * Original, actionable editorial comparisons. Operator price and access
 * examples are snapshots, NOT machine-verified live ticket inventory.
 * Reviewed against the linked official sources November 20, 2026.
 * Do not make this a general FAQPage rich-result generator.
 */
const danceChoices = [
  { venue: "Gruene Hall", context: "New Braunfels · working historic hall", access: "Free lot opposite the hall. Operator says admission does not guarantee a chair or a dance floor; most ticketed shows are standing-room unless noted.", ticket: "Free public sets and paid performances coexist; use the specific event listing.", source: "https://gruenehall.com/faq/", check: "Ask directly about step-free entry and seating accommodations for the chosen show." },
  { venue: "Luckenbach", context: "Fredericksburg area · outdoor pickers circle + dance hall", access: "Use the operator's own driving directions; music on the outdoor stage and ticketed dance-hall sets are different visits.", ticket: "Public calendar distinguishes free gatherings and ticket-required shows; a ticket for one event does not cover another.", source: "https://www.luckenbachtexas.com/calendar", check: "Confirm show venue, parking and accessible route with the operator before departure." },
  { venue: "Twin Sisters", context: "Blanco County · community-owned heritage dance hall", access: "Events are date-specific, not an assumption of daily open hours; individual dates can offer reserved tables.", ticket: "The published December 31, 2026 dance lists adults $15 and children 11-and-under $5; this is one dated event, not a standing admission rate.", source: "https://twinsistersdancehall.com/calendar/", check: "Ask the event contact about parking surface, step-free restroom and seating for the selected night." },
  { venue: "Anhalt Hall", context: "Spring Branch · historic community event hall", access: "Public music, fundraisers and private-use dates have different arrangements; do not drive there expecting a nightly bar.", ticket: "Event-specific; use the operator's calendar or phone instead of a generic price estimate.", source: "https://anhalthalle.com/events/", check: "Confirm entry, available chairs, parking and accessible access directly." },
  { venue: "Broken Spoke", context: "Austin · honky-tonk / dance-floor visit", access: "Choose a listed music or lesson night; restaurant service and the dance floor may have different schedules.", ticket: "Cover, dance lessons and any age rules depend on the chosen event; verify with the venue.", source: "https://www.brokenspokeaustintx.net/", check: "Request exact parking, access and seating arrangements before booking." },
  { venue: "Floore's Country Store", context: "Helotes · concert-oriented landmark", access: "A ticketed outdoor or indoor show can differ from the next performance; check its published format and venue map.", ticket: "Purchase only through the operator's event listing; do not assume admission includes reserved seating.", source: "https://www.liveatfloores.com/", check: "Use the named show's accessibility and entry contact for accommodations." },
  { venue: "SPJST National Hall", context: "Fort Worth · historic lodge reference", access: "A historic hall listing alone is not evidence of a currently scheduled public dance.", ticket: "Do not imply public ticket sales without a current operator event notice.", source: "https://spjst.org/", check: "Confirm that the hall is operating and whether any visitor event is actually scheduled." },
  { venue: "Kendalia Halle", context: "Kendalia · historic building, not a confirmed current performance option", access: "Operations ended in July 2024; August–September 2026 reporting still described the property as closed and for sale.", ticket: "Not an active ticket-buying recommendation. Do not plan entry without a confirmed reopening.", source: "https://www.ksat.com/news/local/2024/08/01/kendalia-halle-one-of-texas-oldest-dance-halls-suspends-operations-for-immediate-future/", check: "Treat it as heritage context, not a guaranteed public attraction." },
] as const;

const mumPrices = [
  { option: "Single DIY kit", example: "$79.00", scope: "Melz Mumz single complete kit; components/selection are set by the maker, and hands-on assembly is still required.", source: "https://www.melzmumz.com/online-store/Melz-Mum-DIY-Kits-c52590977" },
  { option: "Double DIY kit", example: "$86.00", scope: "Same seller, double kit. Compare the actual included ribbons and flowers, not only the listed number.", source: "https://www.melzmumz.com/online-store/Melz-Mum-DIY-Kits-c52590977" },
  { option: "Classic commissioned mum", example: "From $139.00", scope: "Melz Mumz classic size-configurable custom listing displays $139.00 before choosing options; final price depends on the configuration.", source: "https://www.melzmumz.com/online-store/Classic-Single-Double-Triple-%26-Quad-Homecoming-Mums-p204726247" },
  { option: "Deluxe arm garter", example: "$139.00", scope: "Melz Mumz published deluxe single garter with a flower, layered backing, double satin garter and other listed materials.", source: "https://www.melzmumz.com/deluxe-single-garter" },
] as const;

const buildSteps = [
  { number: 1, title: "Measure and label", measure: "Trace the backing and mark the two rear attachment points. Set the wearer's comfortable streamer drop before buying extra ribbon.", visual: "backing" },
  { number: 2, title: "Lay out the skirt", measure: "Alternate school-color strips, then make separate decorative braids. Keep the name strip legible before adding charms.", visual: "ribbon" },
  { number: 3, title: "Reinforce the centerpiece", measure: "Secure the artificial flower to the structural base, conceal sharp attachments and reinforce the backer.", visual: "flower" },
  { number: 4, title: "Fit-test, then finish", measure: "Add light accents last. Test walking, sitting and stair movement; reduce mass if it tips, pinches or blocks visibility.", visual: "final" },
] as const;

function StepSketch({ kind }: { kind: (typeof buildSteps)[number]["visual"] }) {
  const showRibbon = kind === "ribbon" || kind === "flower" || kind === "final";
  const showFlower = kind === "flower" || kind === "final";
  return <svg viewBox="0 0 260 170" role="img" aria-label={kind === "backing" ? "Rear circular mum backing with two reinforced attachment points" : kind === "ribbon" ? "Backer with school-color ribbon streamers attached" : kind === "flower" ? "Artificial chrysanthemum layered on the ribbon backing" : "Finished mum assembled with balanced ribbons and flower"} className="h-auto w-full" style={{maxWidth:260}}>
    <rect x="0" y="0" width="260" height="170" rx="12" fill="#f6f1e8"/>
    {showRibbon && <g>
      <path d="M94 61 L90 157 L111 157 L118 59Z" fill="#bc3336"/><path d="M116 61 L119 157 L138 157 L140 61Z" fill="#f0ce72"/>
      <path d="M141 62 L147 157 L170 157 L165 60Z" fill="#bc3336"/>
    </g>}
    <circle cx="131" cy="54" r="37" fill="#ffffff" stroke="#77604b" strokeWidth="3"/>
    {showFlower ? <g fill="#f7df95" stroke="#9b6d38" strokeWidth="1.8">
      {[0,45,90,135,180,225,270,315].map(deg=><ellipse key={deg} cx="131" cy="35" rx="11" ry="21" transform={`rotate(${deg} 131 54)`}/>)}
      <circle cx="131" cy="54" r="12" fill="#bf913e"/>
    </g> : <g stroke="#77604b" strokeWidth="2" fill="none"><path d="M117 42 L123 35 L129 42"/><path d="M136 42 L142 35 L148 42"/><path d="M114 60 L151 60" strokeDasharray="3 4"/></g>}
    {kind === "final" && <g fill="#35517b"><circle cx="108" cy="103" r="6"/><circle cx="155" cy="116" r="6"/><path d="M121 100 L125 115 L116 123Z"/></g>}
    <text x="9" y="162" fontSize="10" fill="#5a5246">Original instructional schematic · not a photograph</text>
  </svg>;
}

function GuideSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return <section aria-labelledby={id} className="border-b border-border py-9">
    <p className="eyebrow text-primary">{eyebrow}</p>
    <h2 id={id} className="mt-2 font-display text-3xl sm:text-4xl">{title}</h2>
    {children}
  </section>;
}

export function TexasCultureGuideFieldwork({ slug }: { slug: string }) {
  if (slug === "texas-tall-tales-folklore") return <GuideSection id="primary-evidence-comparison" eyebrow="Primary documents compared" title="Three source trails, three different kinds of evidence">
    <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">An early record proves what it actually says, not the whole later legend. Comparing original documents and scholarly reconstructions makes the limits visible.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {[
        { name: "Emily D. West, passport request", proof: "Moreland's letter treats West as a free woman who came from New York with James Morgan and sought travel papers. It is independent evidence that she lived in the Republic of Texas.", limit: "It does not identify a song, document an affair with Santa Anna, or prove she decided the battle.", url: "https://www.tsl.texas.gov/exhibits/texas175/emilywest.html" },
        { name: "Yellow Rose, published lyrics", proof: "The 1853 and 1858 song texts are period evidence of nineteenth-century popular-song circulation. TSHA compares the lyrics with West's biographical record.", limit: "Those lyrics do not name West or corroborate the battle-romance story; a later association is not a period attribution.", url: "https://www.tshaonline.org/handbook/entries/yellow-rose-of-texas" },
        { name: "Pecos Bill, October 1923", proof: "O'Reilly's Century Magazine publication establishes a dated literary Pecos Bill. Later folklorists examined his claimed oral pedigree.", limit: "One dated publication cannot prove an identical oral hero circulated among nineteenth-century cowboys; general cowboy tall tales certainly did.", url: "https://texashistory.unt.edu/ark:/67531/metadc271470/m1/196/" },
      ].map(row=><article className="border border-border p-5" key={row.name}>
        <h3 className="font-display text-xl">{row.name}</h3>
        <p className="mt-3 text-sm leading-7"><strong>What is supported:</strong> {row.proof}</p>
        <p className="mt-2 text-sm leading-7"><strong>What is not supported:</strong> {row.limit}</p>
        <a href={row.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-2">Read the underlying record ↗</a>
      </article>)}
    </div>
    <p className="mt-5 text-sm leading-7 text-muted-foreground">TexasDefined's synthesis: the archival passport request concerns a real person's identity, the song texts date a cultural work, and the 1923 magazine dates a named literary hero. These are different evidentiary questions; none should be used as proof of another. Source comparison: November 20, 2026.</p>
  </GuideSection>;

  if (slug === "texas-dance-halls-honky-tonks") return <GuideSection id="dance-hall-operator-matrix" eyebrow="Practical venue comparison" title="Compare the door, the dance floor and the trip">
    <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">This is not an events calendar or claim that a hall is open now. Published admission examples apply to a named event, and access accommodations need to be confirmed with the venue for the performance you select.</p>
    <div className="mt-6 overflow-x-auto rounded-sm border border-border">
      <table className="w-full text-left text-sm leading-6" style={{minWidth:750}}>
        <caption className="sr-only">Eight Texas dance halls compared on admission, visitor access and source verification</caption>
        <thead className="bg-muted"><tr><th className="p-3" scope="col">Venue and purpose</th><th className="p-3" scope="col">Entry and parking</th><th className="p-3" scope="col">Ticket or admission</th><th className="p-3" scope="col">Access question to resolve</th></tr></thead>
        <tbody>{danceChoices.map(item=><tr className="border-t border-border align-top" key={item.venue}>
          <th scope="row" className="p-3 font-semibold">{item.venue}<span className="mt-1 block font-normal text-muted-foreground">{item.context}</span><a href={item.source} target="_blank" rel="noreferrer noopener" className="mt-2 inline-block font-normal text-primary underline">Operator/source ↗</a></th>
          <td className="p-3">{item.access}</td><td className="p-3">{item.ticket}</td><td className="p-3">{item.check}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="mt-3 text-xs leading-6 text-muted-foreground">Primary/operator pages checked November 20, 2026. Unknown parking or wheelchair conditions are marked as questions, not silently treated as accessible. For Kendalia the linked closure announcement and 2026 follow-up reporting control status.</p>
  </GuideSection>;

  if (slug === "texas-homecoming-mums") return <>
    <GuideSection id="mum-build-four-stage" eyebrow="Original instructional graphics" title="Four separate stages of a comfortable mum build">
      <p className="mt-4 text-sm leading-7 text-muted-foreground">These are original TexasDefined vector construction diagrams, not photography of a real completed project. For actual step photography, open the linked independent photographed tutorial; its photos remain with their photographer and are not reused here.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {buildSteps.map(step=><figure className="border border-border p-4" key={step.number}>
          <StepSketch kind={step.visual} />
          <figcaption className="mt-3 text-sm leading-7"><strong>{step.number}. {step.title}.</strong> {step.measure}</figcaption>
        </figure>)}
      </div>
      <p className="mt-4 text-sm leading-7">Compare the stages with <a href="https://www.michaels.com/makerplace/howtos/making-a-homecoming-mum-292832781326106624" target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-2">Michaels MakerPlace's photographed craft tutorial ↗</a>. Its particular ribbon sizes are one maker's choices, not Texas school rules. Use adult supervision for cutting, hot tools and sharp fasteners.</p>
    </GuideSection>
    <GuideSection id="mum-real-price-examples" eyebrow="Itemized published examples" title="Actual maker and kit listings, not a made-up statewide average">
      <p className="mt-4 text-base leading-8">The figures below are examples captured from published seller pages on November 20, 2026, in U.S. dollars. They are <strong>not quotes received by TexasDefined</strong>, not checkout totals, and not a promise of ongoing availability. A finished custom mum and a build-it-yourself kit are not interchangeable.</p>
      <div className="mt-5 overflow-x-auto border border-border">
        <table className="w-full text-left text-sm leading-6" style={{minWidth:620}}><caption className="sr-only">Published maker and homecoming-mum kit asking prices November 20 2026</caption>
          <thead className="bg-muted"><tr><th className="p-3" scope="col">Comparable product</th><th className="p-3" scope="col">Published price</th><th className="p-3" scope="col">What that includes or omits</th></tr></thead>
          <tbody>{mumPrices.map(item=><tr key={item.option} className="border-t border-border align-top">
            <th className="p-3 font-semibold" scope="row"><a href={item.source} target="_blank" rel="noopener noreferrer" className="text-primary underline">{item.option} ↗</a></th>
            <td className="p-3 whitespace-nowrap font-semibold">{item.example}</td><td className="p-3">{item.scope}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">A transparent example of real itemized add-ons: Mum Factory Outlet's own November 2026 catalog lists one 10-inch artificial flower at $8.50, a three-pack of plain round backers at $2.99 and a sheet of adhesive rhinestone letters at $10.00. Buying these three listed products would total $21.49 <em>before</em> ribbon streamers, attachment hardware, other decorations, tax or delivery; the pack of backers is not three complete mums. This is not a finished-mum quote. <a href="https://www.mumfactoryoutlet.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Check the seller's itemized catalog ↗</a>.</p>
      <p className="mt-4 text-sm leading-7">School practices differ. Ask your campus about garter versus chest-worn mum, senior white/metallic colors, battery lights, noise, wearable size and which school day the decorations are allowed. A public exhibit or craft shop cannot substitute for this campus-level confirmation.</p>
    </GuideSection>
  </>;

  return null;
}
