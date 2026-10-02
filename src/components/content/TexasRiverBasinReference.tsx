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

const basinHighlights = [
  {
    label: "Largest basin in Texas",
    value: "Rio Grande",
    detail: "49,387 sq. mi. in Texas",
  },
  {
    label: "Longest Texas reach",
    value: "Rio Grande",
    detail: "889 river miles in Texas",
  },
  {
    label: "Highest average flow",
    value: "Brazos",
    detail: "6.074 million acre-feet/year",
  },
] as const;

export function TexasRiverBasinReference() {
  return (
    <div className="mt-8" aria-labelledby="major-basin-reference-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-primary">Compare the river basins</p>
          <h3 id="major-basin-reference-heading" className="mt-2 font-display text-2xl">Texas's 15 major river basins</h3>
        </div>
        <a
          href="https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-primary underline decoration-border underline-offset-4"
        >
          Texas Water Development Board data ↗
        </a>
      </div>

      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
        The statewide numbers are useful for comparison, but the full table does not need to dominate the story. Start with three scale markers, then open the complete TWDB reference when you want basin-by-basin detail.
      </p>

      <dl className="mt-5 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
        {basinHighlights.map((item) => (
          <div key={item.label} className="bg-background p-4 sm:p-5">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</dt>
            <dd className="mt-2 font-display text-2xl text-foreground">{item.value}</dd>
            <dd className="mt-1 text-sm text-primary">{item.detail}</dd>
          </div>
        ))}
      </dl>

      <details className="group mt-5 overflow-hidden rounded-sm border border-border bg-background">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-foreground marker:hidden sm:p-5">
          <span>
            <span className="block font-display text-lg">Open the full 15-basin comparison</span>
            <span className="mt-1 block text-xs font-normal leading-5 text-muted-foreground">Area, Texas river miles and average annual flow from TWDB.</span>
          </span>
          <span aria-hidden="true" className="text-xl text-primary transition-transform group-open:rotate-45">+</span>
        </summary>

        <div className="border-t border-border px-4 pb-4 sm:px-5 sm:pb-5">
          <p className="py-4 text-sm leading-7 text-muted-foreground">
            Average flow is shown in acre-feet per year. One acre-foot is about 325,851 gallons — enough water to cover one acre to a depth of one foot.
          </p>
          <div className="overflow-x-auto border border-border">
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
                  <tr key={name}>
                    <th scope="row" className="px-4 py-3 font-semibold text-foreground">{name}</th>
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

      <div className="mt-6 border-t border-border pt-6">
        <div className="max-w-3xl">
          <p className="eyebrow text-muted-foreground">Between the major rivers</p>
          <h3 className="mt-2 font-display text-xl">Eight coastal basins drain directly toward bays and the Gulf</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">These smaller drainage areas fill the gaps between the major named river systems, so the entire Texas coast is still part of the statewide watershed story.</p>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Eight designated Texas coastal basins">
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
