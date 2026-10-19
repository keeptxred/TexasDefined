import { Container } from "@/components/layout/Container";
import { TEXAS_NPS_DIRECTORY } from "@/data/texas-national-park-service-directory";
import { NPS_LOCAL_GUIDES } from "@/data/texas-nps-directory-ssr-fallback";

/**
 * Always render the official 18-entry Texas NPS inventory as ordinary React
 * DOM/SSR output. The mapped destination cards are independently curated and
 * may include fewer sites; historic trails and a river do not have one pin.
 * Never imply every federal listing passed destination editorial acceptance.
 */
export function TexasNpsInventory() {
  const groups = [
    {
      title: "The two designated National Parks",
      records: TEXAS_NPS_DIRECTORY.filter((item) => item.designation === "national park"),
    },
    {
      title: "Other federally protected sites",
      records: TEXAS_NPS_DIRECTORY.filter((item) =>
        item.designation !== "national park"
        && !item.designation.includes("trail")
        && item.designation !== "wild and scenic river"),
    },
    {
      title: "Historic trails and the wild and scenic river",
      records: TEXAS_NPS_DIRECTORY.filter((item) =>
        item.designation.includes("trail") || item.designation === "wild and scenic river"),
    },
  ];

  return (
    <section className="border-y border-border bg-surface/40" id="complete-texas-nps-inventory" aria-labelledby="complete-texas-nps-heading">
      <Container className="py-10 sm:py-14">
        <p className="eyebrow text-primary">Official National Park Service inventory</p>
        <h2 className="mt-3 max-w-4xl font-display text-3xl leading-tight sm:text-4xl" id="complete-texas-nps-heading">
          All 18 National Park Service designations in Texas
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          Texas has two places formally designated National Parks: Big Bend and Guadalupe Mountains. The NPS
          also lists monuments, national historical parks and sites, recreation areas, a preserve, a seashore,
          three historic trails and a protected river. Those 18 official designations are listed below.
          The mapped cards elsewhere on this page show only destination records that pass TexasDefined's
          separate content, photo and location-quality checks.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
          Use the federal links for current hours, permits, closures and official directions. TexasDefined
          guides appear only where a local guide exists; inclusion in this directory does not mean its
          editorial or production acceptance has been certified. Historic trails and the Rio Grande corridor
          are not single-entrance parks or continuously accessible hiking routes.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {groups.map(({ title, records }) => (
            <div key={title}>
              <h3 className="font-display text-xl text-foreground">{title}</h3>
              <ul className="mt-4 space-y-3">
                {records.map((item) => {
                  const guide = NPS_LOCAL_GUIDES[item.slug];
                  return (
                    <li key={item.npsCode} className="text-sm leading-6 text-muted-foreground">
                      <a href={`https://www.nps.gov/${item.npsCode}/`} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-foreground">
                        {item.name}
                      </a>
                      {guide ? (
                        <>
                          <span aria-hidden="true"> · </span>
                          <a href={guide} className="underline decoration-border underline-offset-4 hover:text-foreground">TexasDefined guide</a>
                        </>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-7 text-sm text-muted-foreground">
          Source:{" "}
          <a href="https://www.nps.gov/state/tx/list.htm" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-foreground">
            National Park Service — Texas parks directory
          </a>.
        </p>
      </Container>
    </section>
  );
}
