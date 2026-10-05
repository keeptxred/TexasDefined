import { Link } from "@tanstack/react-router";

const metros = [
  ["Houston","2,304,580","Energy, health care, ports, aerospace, manufacturing","Hot, humid Gulf Coast; heavy-rain and hurricane exposure","Multiple job centers; commute depends heavily on exact destination","International scale, medical careers, energy, diverse food and culture","Flood exposure, insurance, humidity and long cross-metro drives"],
  ["Dallas–Fort Worth","Dallas 1,304,379 · Fort Worth 918,915","Finance, headquarters, technology, defense, aviation, logistics","Hot summers; stronger winter cold, hail and severe-storm exposure","Polycentric region with many independent cities and toll corridors","Corporate careers, air connectivity, suburban choice and a large job market","Do not choose housing from a Dallas label without mapping the actual office"],
  ["Austin","961,855","Technology, semiconductors, state government, higher education","Hot Central Texas; drought, flash-flood and Hill Country weather influences","Growth is concentrated along a limited set of major corridors","Technology, government, live music and quick Hill Country access","Housing cost and peak-hour congestion can erase the benefit of a short map distance"],
  ["San Antonio","1,434,625","Military, health care, tourism, cybersecurity and services","Hot South-Central Texas; generally drier than Houston","Large loop-and-spoke road network with fast-growing outer corridors","Military households, history, family life and strong Tejano culture","Growth corridors can change commute times and service patterns quickly"],
  ["El Paso","678,815","Defense, border trade, logistics, health care and government","Dry Chihuahuan Desert; large day-night temperature swings","Linear city constrained by mountains, the border and major east-west routes","Dry climate, mountain scenery, border culture and a distinct regional identity","It is on Mountain Time and geographically remote from the other major Texas metros"],
] as const;

const fitCards = [
  ["Energy or major medical employment","Houston","/article/texas-jobs-economy-industries"],
  ["Corporate HQ, finance or aviation","Dallas–Fort Worth","/texas-industries"],
  ["Technology and state government","Austin","/article/texas-jobs-economy-industries"],
  ["Military-connected household","San Antonio","/article/texas-jobs-economy-industries"],
  ["Dry climate and mountain landscape","El Paso","/browse/cities"],
  ["Smaller-city or rural lifestyle","Start with the regional guides","/article/texas-regions-explained"],
] as const;

const mapPoints = [
  ["El Paso","8%","58%"],["Amarillo","45%","12%"],["DFW","65%","35%"],["Austin","57%","58%"],["San Antonio","55%","72%"],["Houston","76%","66%"],["RGV","62%","92%"],
] as const;

const border = "1px solid hsl(var(--border))";
const text = "hsl(var(--foreground))";
const muted = "hsl(var(--muted-foreground))";
const primary = "hsl(var(--primary))";
const surface = "hsl(var(--surface))";

export function TexasCitiesComparison() {
  return <section aria-labelledby="texas-city-comparison-heading" style={{ marginTop: "2rem" }}>
    <div style={{ border, background: surface, padding: "1.5rem", marginBottom: "2.5rem" }}>
      <p style={{ margin: 0, color: primary, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>Start here</p>
      <h2 id="texas-city-comparison-heading" style={{ margin: ".75rem 0 0", color: text, fontSize: "2rem", lineHeight: 1.1 }}>Texas cities compared at a glance</h2>
      <p style={{ margin: "1rem 0 0", maxWidth: "44rem", color: muted, lineHeight: 1.8 }}>The right Texas city depends less on a statewide ranking than on the exact job center, climate, commute pattern and household tradeoffs you are willing to accept. Population figures below are 2020 Census city counts, so they are a scale reference—not a current housing-market ranking.</p>
      <div style={{ marginTop: "1.75rem", overflowX: "auto" }}>
        <table style={{ minWidth: "980px", borderCollapse: "collapse", textAlign: "left", fontSize: ".875rem" }}>
          <thead><tr style={{ borderBottom: border, color: muted, fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".08em" }}>
            {["Place","2020 city population","Major job clusters","Climate / hazard pattern","Daily-life reality"].map(x=><th key={x} style={{ padding: ".75rem", fontWeight: 600 }}>{x}</th>)}
          </tr></thead>
          <tbody>{metros.map(([name,population,jobs,climate,mobility])=><tr key={name} style={{ borderBottom: border, verticalAlign: "top" }}>
            <th style={{ padding: "1rem .75rem", color: text, fontSize: "1.05rem" }}>{name}</th>
            {[population,jobs,climate,mobility].map(v=><td key={v} style={{ padding: "1rem .75rem", color: muted, lineHeight: 1.6 }}>{v}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <p style={{ margin: "1rem 0 0", color: muted, fontSize: ".75rem", lineHeight: 1.6 }}>Source for population counts: U.S. Census Bureau, 2020 Decennial Census. Climate and labor-market comparisons should be checked against current NOAA/NWS and BLS/Texas Workforce Commission data before a move.</p>
    </div>

    <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginBottom: "2.5rem" }}>
      <div style={{ border, padding: "1.5rem" }}>
        <p style={{ margin: 0, color: primary, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>Orientation map</p>
        <h2 style={{ margin: ".75rem 0 0", color: text, fontSize: "1.8rem" }}>Texas changes fast from west to east</h2>
        <p style={{ color: muted, lineHeight: 1.7 }}>This schematic is not to scale. It shows why “Texas weather” or “Texas lifestyle” is too broad to be useful.</p>
        <div style={{ aspectRatio: "4 / 3", position: "relative", overflow: "hidden", border, background: surface, marginTop: "1.5rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "10%", transform: "rotate(-2deg)", border: "2px solid hsl(var(--border))", borderRadius: "45% 30% 38% 28% / 35% 28% 42% 40%", background: "hsl(var(--background))" }} />
          {mapPoints.map(([label,left,top])=><div key={label} style={{ position: "absolute", left, top, transform: "translate(-50%,-50%)" }}>
            <span style={{ display: "block", width: ".75rem", height: ".75rem", borderRadius: "9999px", background: primary, border: "2px solid hsl(var(--background))" }} />
            <span style={{ display: "block", marginTop: ".25rem", color: text, fontSize: ".75rem", fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>
          </div>)}
        </div>
      </div>
      <div>
        <p style={{ margin: 0, color: primary, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>Decision guide</p>
        <h2 style={{ margin: ".75rem 0 0", color: text, fontSize: "1.8rem" }}>Best fit depends on the thing you cannot compromise on</h2>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", marginTop: "1.5rem" }}>
          {metros.map(([name,,,,,bestFor,watch])=><article key={name} style={{ borderTop: border, paddingTop: "1rem" }}>
            <h3 style={{ margin: 0, color: text, fontSize: "1.25rem" }}>{name}</h3>
            <p style={{ color: muted, lineHeight: 1.6 }}><strong style={{ color: text }}>Best fit:</strong> {bestFor}</p>
            <p style={{ color: muted, lineHeight: 1.6 }}><strong style={{ color: text }}>Watch:</strong> {watch}</p>
          </article>)}
        </div>
      </div>
    </div>

    <div style={{ borderTop: border, borderBottom: border, padding: "2rem 0", marginBottom: "2.5rem" }}>
      <p style={{ margin: 0, color: primary, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>Choose your next comparison</p>
      <h2 style={{ margin: ".75rem 0 0", color: text, fontSize: "1.8rem" }}>What matters most to your household?</h2>
      <div style={{ display: "grid", gap: ".75rem", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", marginTop: "1.5rem" }}>
        {fitCards.map(([need,answer,href])=><Link key={need} to={href} style={{ border, padding: "1rem", color: "inherit", textDecoration: "none" }}>
          <span style={{ display: "block", color: muted, fontSize: ".75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>{need}</span>
          <span style={{ display: "block", marginTop: ".5rem", color: primary, fontSize: "1.25rem" }}>{answer} →</span>
        </Link>)}
      </div>
      <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <Link to="/texas-cost-of-living-calculator" style={{ color: primary, fontWeight: 600 }}>Compare cost of living →</Link>
        <Link to="/browse/cities" style={{ color: primary, fontWeight: 600 }}>Browse city guides →</Link>
        <Link to="/browse/counties" style={{ color: primary, fontWeight: 600 }}>Compare counties →</Link>
      </div>
    </div>

    <aside aria-label="Official comparison sources" style={{ border, background: surface, padding: "1.5rem", color: muted, lineHeight: 1.7 }}>
      <p style={{ marginTop: 0, color: text, fontWeight: 600 }}>Use current official data for a final move decision.</p>
      <p style={{ marginBottom: 0 }}>
        Population and demographics: <a href="https://www.census.gov/quickfacts/" target="_blank" rel="noreferrer">U.S. Census Bureau QuickFacts ↗</a>. Employment: <a href="https://www.bls.gov/regions/southwest/" target="_blank" rel="noreferrer">U.S. Bureau of Labor Statistics Southwest ↗</a> and <a href="https://www.twc.texas.gov/data-reports/labor-market-information" target="_blank" rel="noreferrer">Texas Workforce Commission ↗</a>. Climate normals and hazards: <a href="https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals" target="_blank" rel="noreferrer">NOAA U.S. Climate Normals ↗</a> and <a href="https://msc.fema.gov/portal/home" target="_blank" rel="noreferrer">FEMA Flood Map Service Center ↗</a>.
      </p>
    </aside>
  </section>;
}
