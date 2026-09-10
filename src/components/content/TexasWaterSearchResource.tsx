type WaterTopic = "rivers" | "basins" | "reservoirs";

const topicLinks: Array<{
  id: WaterTopic;
  href: string;
  title: string;
  description: string;
}> = [
  {
    id: "rivers",
    href: "/article/texas-rivers-explained",
    title: "Rivers",
    description: "Individual rivers, boundary rivers, regions and where the water flows.",
  },
  {
    id: "basins",
    href: "/article/texas-river-basins-guide",
    title: "River basins",
    description: "Watersheds, drainage divides and the systems that connect tributaries to the Gulf.",
  },
  {
    id: "reservoirs",
    href: "/article/texas-lakes-reservoirs-explained",
    title: "Lakes & reservoirs",
    description: "Why most familiar inland Texas lakes are reservoirs and how managed water works.",
  },
];

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

export function TexasWaterSearchResource({ active }: { active: WaterTopic }) {
  return (
    <section className="mt-8 border-y border-border py-7" aria-labelledby="texas-water-topic-heading">
      <p className="eyebrow text-primary">Texas water, organized by the question</p>
      <h2 id="texas-water-topic-heading" className="mt-3 font-display text-2xl sm:text-3xl">
        Pick the water guide you actually need
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        These pages intentionally cover different search intents so rivers, watersheds and reservoirs do not compete for the same job.
      </p>
      <nav aria-label="Texas river, basin and reservoir guides" className="mt-5 grid gap-3 sm:grid-cols-3">
        {topicLinks.map((topic) => {
          const isActive = topic.id === active;
          return (
            <a
              key={topic.id}
              href={topic.href}
              aria-current={isActive ? "page" : undefined}
              className={`block rounded-sm border p-4 transition-colors ${isActive ? "border-primary bg-surface" : "border-border hover:border-primary"}`}
            >
              <span className="font-display text-lg">{topic.title}</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">{topic.description}</span>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {isActive ? "You are here" : "Open guide →"}
              </span>
            </a>
          );
        })}
      </nav>

      {active === "basins" ? (
        <div className="mt-8" aria-labelledby="major-basin-reference-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-primary">Official basin reference</p>
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
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Texas also has eight designated coastal basins. The table below uses TWDB's statewide basin-area, river-length and average-flow figures so you can compare the major systems at a glance.
          </p>
          <div className="mt-5 overflow-x-auto border border-border">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <caption className="sr-only">Texas Water Development Board statistics for the 15 major river basins</caption>
              <thead className="bg-surface text-xs uppercase tracking-[0.1em] text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Major basin</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Area in Texas (sq. mi.)</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">River miles in Texas</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Avg. flow (acre-ft/yr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {majorBasins.map(([name, area, miles, flow]) => (
                  <tr key={name}>
                    <th scope="row" className="px-4 py-3 font-semibold text-foreground">{name}</th>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{area}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{miles}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{flow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <h3 className="font-display text-xl">The eight coastal basins</h3>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Eight designated Texas coastal basins">
              {coastalBasins.map((basin) => (
                <li key={basin} className="rounded-sm border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground/80">
                  {basin}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
