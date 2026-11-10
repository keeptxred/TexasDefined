// Evidence reviewed November 10, 2026: original PenFed Foundation 2026
// ranking, 2025 comparative study and SBA veteran-business guidance.
const texasMetroRankings = [
  { metro: "Austin–Round Rock–San Marcos", rank2026: 3, rank2025: 4, context: "Highest-ranked Texas large metro in the Foundation's 2026 study." },
  { metro: "Dallas–Fort Worth–Arlington", rank2026: 7, rank2025: 5, context: "A multi-city labor, supplier and capital market; rankings apply to the metro, not every suburb." },
  { metro: "San Antonio–New Braunfels", rank2026: 16, rank2025: 7, context: "Veteran-service networks and startup needs should be checked by sector and neighborhood." },
  { metro: "Houston–Pasadena–The Woodlands", rank2026: 19, rank2025: 18, context: "A broad metropolitan economy where a specific location's costs and market can differ substantially." },
] as const;

export function VeteranFounderMetro2026() {
  return (
    <section id="veteran-founders" className="border-b border-border py-10" aria-labelledby="veteran-founders-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Texas business research · 2026</p>
      <h2 id="veteran-founders-heading" className="mt-2 font-display text-3xl font-bold">
        Which Texas metros rank highly for veteran entrepreneurs?
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Four Texas metropolitan areas made the PenFed Foundation for Military Heroes'
        2026 national top 20 for veteran entrepreneurs. The Foundation worked with
        Polco and the National Research Center to assess 387 U.S. metro areas using
        52 indicators drawn from more than 30 sources. Its weighted categories cover
        livability, support for veterans, a growing economy, and the ability to
        start a business. The table below isolates the Texas entries and compares
        their published positions in the Foundation's 2025 report.
      </p>
      <div className="mt-6 overflow-x-auto border-y border-border" role="region" aria-label="Texas metro rankings for veteran entrepreneurs, 2026 versus 2025" tabIndex={0}>
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead><tr className="border-b border-border">
            <th className="p-3 font-semibold" scope="col">Texas metro area</th>
            <th className="p-3 font-semibold" scope="col">2026 U.S. rank</th>
            <th className="p-3 font-semibold" scope="col">2025 U.S. rank</th>
            <th className="p-3 font-semibold" scope="col">How to interpret it</th>
          </tr></thead>
          <tbody>{texasMetroRankings.map((metro) => (
            <tr key={metro.metro} className="border-b border-border last:border-b-0">
              <th className="p-3 align-top font-semibold" scope="row">{metro.metro}</th>
              <td className="p-3 align-top tabular-nums">#{metro.rank2026}</td>
              <td className="p-3 align-top tabular-nums">#{metro.rank2025}</td>
              <td className="p-3 align-top leading-6 text-muted-foreground">{metro.context}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        <strong className="text-foreground">Year-to-year limitation:</strong> The 2025
        study used 53 indicators and the 2026 study used 52. A rank movement does not
        prove that an individual metro's businesses improved or declined by the same
        amount. These are metro-level composite rankings, not an evaluation of a
        particular business, funding guarantee, city government program or county.
        A founder's actual decision still depends on customers, local permitting,
        accessible financing, facility costs and a support network.
      </p>
      <h3 className="mt-7 font-display text-2xl">What to do with the rankings</h3>
      <p className="mt-3 leading-7 text-muted-foreground">
        Use the list as a starting point for comparing regions, not a shortcut
        around the business-formation steps above. A veteran opening a service firm
        may prioritize nearby clients and professional licensing; a manufacturing
        founder may prioritize industrial sites and suppliers; and a home-based
        business may need to compare permitted uses by exact address. The SBA's
        Veterans Business Outreach Center program offers business planning,
        entrepreneurship training, counseling and referral help to eligible veterans,
        service members and military spouses. Its program locator identifies
        organizations serving several different Texas regions. The PenFed
        Foundation also publishes its separate mentor and accelerator program;
        participating in that program should not be confused with getting a
        particular loan, grant or government certification.
      </p>
      <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold" aria-label="Veteran founder research sources">
        <a href="https://penfedfoundation.org/topcities/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">PenFed 2026 study and methodology</a>
        <a href="https://penfedfoundation.org/wp-content/uploads/2025/11/2025-Top-Cities.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">PenFed 2025 comparison</a>
        <a href="https://www.sba.gov/veterans/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">SBA veteran business support</a>
        <a href="/texas-industries" className="text-primary underline underline-offset-4">Compare Texas industry sectors</a>
      </nav>
      <p className="mt-4 text-xs text-muted-foreground">Original research sources checked November 10, 2026.</p>
    </section>
  );
}
