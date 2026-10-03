const sourceUrl = "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp";
const lastVerified = "2026-10-03";
const canonicalPage = "https://texasdefined.com/article/texas-rivers-explained";

const majorBasins = [
  { basin: "Brazos", areaSquareMiles: 42865, riverMilesInTexas: 840, averageAnnualFlowAcreFeet: 6074000 },
  { basin: "Canadian", areaSquareMiles: 12865, riverMilesInTexas: 213, averageAnnualFlowAcreFeet: 196000 },
  { basin: "Colorado", areaSquareMiles: 39428, riverMilesInTexas: 865, averageAnnualFlowAcreFeet: 1904000 },
  { basin: "Cypress", areaSquareMiles: 2929, riverMilesInTexas: 75, averageAnnualFlowAcreFeet: 493700 },
  { basin: "Guadalupe", areaSquareMiles: 5953, riverMilesInTexas: 409, averageAnnualFlowAcreFeet: 1422000 },
  { basin: "Lavaca", areaSquareMiles: 2309, riverMilesInTexas: 117, averageAnnualFlowAcreFeet: 277000 },
  { basin: "Neches", areaSquareMiles: 9937, riverMilesInTexas: 416, averageAnnualFlowAcreFeet: 4323000 },
  { basin: "Nueces", areaSquareMiles: 16700, riverMilesInTexas: 315, averageAnnualFlowAcreFeet: 539700 },
  { basin: "Red", areaSquareMiles: 24297, riverMilesInTexas: 695, averageAnnualFlowAcreFeet: 3464000 },
  { basin: "Rio Grande", areaSquareMiles: 49387, riverMilesInTexas: 889, averageAnnualFlowAcreFeet: 645500 },
  { basin: "Sabine", areaSquareMiles: 7570, riverMilesInTexas: 360, averageAnnualFlowAcreFeet: 5864000 },
  { basin: "San Antonio", areaSquareMiles: 4180, riverMilesInTexas: 238, averageAnnualFlowAcreFeet: 562700 },
  { basin: "San Jacinto", areaSquareMiles: 3936, riverMilesInTexas: 85, averageAnnualFlowAcreFeet: 1365000 },
  { basin: "Sulphur", areaSquareMiles: 3580, riverMilesInTexas: 200, averageAnnualFlowAcreFeet: 932700 },
  { basin: "Trinity", areaSquareMiles: 17913, riverMilesInTexas: 550, averageAnnualFlowAcreFeet: 5727000 },
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

const csvRows = [
  ...majorBasins.map((row) => [
    row.basin,
    "major",
    String(row.areaSquareMiles),
    String(row.riverMilesInTexas),
    String(row.averageAnnualFlowAcreFeet),
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
  majorBasins,
  coastalBasins,
}, null, 2);
const jsonDownloadHref = `data:application/json;charset=utf-8,${encodeURIComponent(jsonContent)}`;

const number = new Intl.NumberFormat("en-US");

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
        The statewide numbers are useful for comparison, but the full table does not need to dominate the story. Start with three scale markers, then open the complete TWDB reference when you want basin-by-basin detail.
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

      <details className="mt-5 border border-border">
        <summary className="px-4 py-3 font-semibold text-foreground">
          Open the full 15-basin comparison · <span className="text-xs text-muted-foreground">area, Texas river miles and average annual flow</span>
        </summary>

        <div className="px-4 py-3">
          <p className="text-sm leading-7 text-muted-foreground">
            Average flow is shown in acre-feet per year. One acre-foot is about 325,851 gallons — enough water to cover one acre to a depth of one foot.
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
                {majorBasins.map((row) => (
                  <tr key={row.basin}>
                    <th scope="row" className="px-4 py-3 font-semibold text-foreground">{row.basin}</th>
                    <td className="px-4 py-3 text-right text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{number.format(row.areaSquareMiles)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{number.format(row.riverMilesInTexas)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>{number.format(row.averageAnnualFlowAcreFeet)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>

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