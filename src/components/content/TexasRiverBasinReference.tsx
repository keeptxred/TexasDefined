const sourceUrl = "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp";
const lastVerified = "2026-10-09";
const canonicalPage = "https://texasdefined.com/article/texas-rivers-explained";

const majorBasins = [
  ["Brazos", "42,865", "840", "6,074,000"],
  ["Canadian", "12,865", "213", "196,000"],
  ["Colorado", "39,428", "865", "1,904,000"],
  ["Cypress", "2,929", "75", "493,700"],
  ["Guadalupe", "5,953", "409", "1,422,000"],
  ["Lavaca", "2,309", "117", "277,000"],
  ["Neches", "9,937", "416", "4,323,000"],
  ["Nueces", "16,700", "315", "539,700"],
  ["Red", "24,297", "695", "3,464,000"],
  ["Rio Grande", "49,387", "889", "645,500"],
  ["Sabine", "7,570", "360", "5,864,000"],
  ["San Antonio", "4,180", "238", "562,700"],
  ["San Jacinto", "3,936", "85", "1,365,000"],
  ["Sulphur", "3,580", "200", "932,700"],
  ["Trinity", "17,913", "550", "5,727,000"],
] as const;

const coastalBasins = [
  "Neches-Trinity",
  "Trinity-San Jacinto",
  "San Jacinto-Brazos",
  "Brazos-Colorado",
  "Colorado-Lavaca",
  "Lavaca-Guadalupe",
  "San Antonio-Nueces",
  "Nueces-Rio Grande",
] as const;

// Keep only verified published profiles here; all other major basins link to TWDB's official directory.
const researchedProfiles: Record<string, string> = {
  Brazos: "/article/texas-brazos-river-guide",
  Colorado: "/article/texas-colorado-river-guide",
  Guadalupe: "/article/texas-guadalupe-river-guide",
  Trinity: "/article/texas-trinity-river-guide",
  "Rio Grande": "/article/texas-rio-grande-river-guide",
  Canadian: "/article/texas-canadian-river-guide",
  Cypress: "/article/texas-cypress-river-basin-guide",
  Lavaca: "/article/texas-lavaca-river-guide",
  Neches: "/article/texas-neches-river-guide",
  Nueces: "/article/texas-nueces-river-guide",
  Red: "/article/texas-red-river-guide",
  Sabine: "/article/texas-sabine-river-guide",
  "San Antonio": "/article/texas-san-antonio-river-guide",
  "San Jacinto": "/article/texas-san-jacinto-river-guide",
  Sulphur: "/article/texas-sulphur-river-guide",
};

const comparisonMetrics = [
  { label: "Largest watersheds within Texas", column: 1, unit: "sq. mi." },
  { label: "Longest river reaches within Texas", column: 2, unit: "miles" },
  { label: "Highest historical average annual flow", column: 3, unit: "acre-feet/year" },
] as const;

const basinHighlights = [
  { label: "Largest basin in Texas", value: "Rio Grande", detail: "49,387 sq. mi. in Texas" },
  { label: "Longest Texas reach", value: "Rio Grande", detail: "889 river miles in Texas" },
  { label: "Highest average flow", value: "Brazos", detail: "6.074 million acre-feet/year" },
] as const;

const csvHeaders = [
  "basin",
  "basin_type",
  "area_in_texas_square_miles",
  "river_length_in_texas_miles",
  "average_annual_flow_acre_feet",
  "source_url",
  "last_verified",
  "canonical_page",
] as const;

function csvCell(value: string) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

const normalizeNumber = (value: string) => value.replaceAll(",", "");

const csvRows = [
  ...majorBasins.map(([basin, area, miles, flow]) => [
    basin,
    "major",
    normalizeNumber(area),
    normalizeNumber(miles),
    normalizeNumber(flow),
    sourceUrl,
    lastVerified,
    canonicalPage,
  ]),
  ...coastalBasins.map((basin) => [basin, "coastal", "", "", "", sourceUrl, lastVerified, canonicalPage]),
];

const csvContent = `${csvHeaders.join(",")}\n${csvRows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
const csvDownloadHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

const jsonContent = JSON.stringify({
  name: "Texas river basin reference",
  description: "Texas Defined reference data for the 15 major Texas river basins and eight coastal basins.",
  source: { name: "Texas Water Development Board", url: sourceUrl },
  lastVerified,
  canonicalPage,
  methodology: "Texas Defined transcribes TWDB statewide basin statistics into normalized numeric fields for comparison. Coastal basin names are included without inferred statistics when the shared reference does not provide those values.",
  majorBasins: majorBasins.map(([basin, area, miles, flow]) => ({
    basin,
    areaInTexasSquareMiles: Number(normalizeNumber(area)),
    riverLengthInTexasMiles: Number(normalizeNumber(miles)),
    averageAnnualFlowAcreFeet: Number(normalizeNumber(flow)),
  })),
  coastalBasins,
}, null, 2);
const jsonDownloadHref = `data:application/json;charset=utf-8,${encodeURIComponent(jsonContent)}`;

export function TexasRiverBasinReference() {
  return (
    <div className="mt-8" aria-labelledby="major-basin-reference-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-primary">Compare the river basins</p>
          <h3 id="major-basin-reference-heading" className="mt-2 font-display text-2xl">Texas's 15 major river basins</h3>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-primary">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border underline-offset-4"
          >
            Texas Water Development Board data ↗
          </a>
          <a
            href={csvDownloadHref}
            download="texasdefined-texas-river-basins.csv"
            className="underline decoration-border underline-offset-4"
          >
            Download CSV ↓
          </a>
          <a
            href={jsonDownloadHref}
            download="texasdefined-texas-river-basins.json"
            className="underline decoration-border underline-offset-4"
          >
            Download JSON ↓
          </a>
        </div>
      </div>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
The TWDB numbers describe three distinct questions: area drained within Texas, miles of the named river inside Texas, and historical average annual water volume. None is a live river-level report. Compare the ranking charts or open the full source table and downloadable dataset.
      </p>

      <dl className="mt-5 flex flex-wrap gap-2">
        {basinHighlights.map((item) => (
          <div key={item.label} className="rounded-sm border border-border bg-surface px-3 py-2 text-xs font-semibold">
            <dt className="text-muted-foreground">{item.label}</dt>
            <dd className="mt-2 font-display text-xl text-foreground">{item.value}</dd>
            <dd className="mt-2 text-primary">{item.detail}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-7" aria-labelledby="basin-comparison-charts">
        <h4 id="basin-comparison-charts" className="font-display text-xl">Compare river systems by three different measures</h4>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Rankings below use the exact TWDB reference figures, not estimated contemporary flows.
          A long river need not have a big drainage area or a high average flow.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {comparisonMetrics.map((metric) => {
            const ranked = [...majorBasins]
              .sort((a, b) => Number(normalizeNumber(b[metric.column])) - Number(normalizeNumber(a[metric.column])))
              .slice(0, 5);
            const maximum = Number(normalizeNumber(ranked[0][metric.column]));
            return (
              <div key={metric.label} className="rounded-sm border border-border bg-background p-4">
                <h5 className="text-sm font-semibold text-foreground">{metric.label}</h5>
                <ol className="mt-4 space-y-3">
                  {ranked.map(([name, area, miles, flow]) => {
                    const numeric = Number(normalizeNumber([name, area, miles, flow][metric.column]));
                    return (
                      <li key={name}>
                        <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                          <span className="font-semibold text-foreground">{name}</span>
                          <span className="text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{numeric.toLocaleString("en-US")} {metric.unit}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-sm bg-surface" role="img" aria-label={name + ": " + numeric.toLocaleString("en-US") + " " + metric.unit}>
                          <div className="h-full bg-primary" style={{ width: `${Math.round((numeric / maximum) * 100)}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      </section>

      <details className="mt-5 border border-border">
        <summary className="px-4 py-3 font-semibold text-foreground">
          Open the full 15-basin comparison · <span className="text-xs text-muted-foreground">area, Texas river miles and average annual flow</span>
        </summary>

        <div className="px-4 py-3">
          <p className="text-sm leading-7 text-muted-foreground">
Average flow is shown in acre-feet per year. One acre-foot is about 325,851 gallons — enough water to cover one acre to a depth of one foot. TWDB does not state the averaging years in its public summary table, so do not treat these reference values as present-day discharge or compare them as though they share a recent time window.
          </p>
          <div className="mt-5 overflow-x-auto border border-border">
            <table className="w-full border-collapse text-left text-sm" style={{ minWidth: "42rem" }}>
              <caption className="sr-only">Texas Water Development Board statistics for the 15 major river basins</caption>
              <thead className="bg-surface text-xs uppercase text-muted-foreground" style={{ letterSpacing: "0.1em" }}>
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">River basin</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Area in Texas (sq. mi.)</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">River length in Texas (miles)</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Average annual flow (acre-feet/year)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {majorBasins.map(([name, area, miles, flow]) => (
                  <tr key={name} id={`texas-basin-${name.toLowerCase().replaceAll(" ", "-")}`}>
                    <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                      {researchedProfiles[name] ? <a className="text-primary underline underline-offset-2" href={researchedProfiles[name]}>{name} <span className="sr-only">independent river profile</span></a> : name}
                    </th>
                    <td className="px-4 py-3 text-right text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{area}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{miles}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{flow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>

      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Every major basin name opens its own TexasDefined guide. TWDB provides the underlying area, mileage and historical-flow figures;
        current conditions and public access require separate verification. Data verified {lastVerified}; downloading this reference
        preserves the source URL and verification date.
      </p>
      <div className="mt-6">
        <p className="eyebrow text-muted-foreground">Between the major rivers</p>
        <h3 className="mt-2 font-display text-xl">Eight coastal basins drain directly toward bays and the Gulf</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">These smaller drainage areas fill the gaps between the major named river systems, so the entire Texas coast is still part of the statewide watershed story.</p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Eight designated Texas coastal basins">
          {coastalBasins.map((basin) => (
            <li key={basin} className="rounded-sm border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground">
              {basin}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
