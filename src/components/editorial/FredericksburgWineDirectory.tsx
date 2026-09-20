import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import {
  FREDERICKSBURG_WINE_DIRECTORY,
  FREDERICKSBURG_WINE_DIRECTORY_AREAS,
  FREDERICKSBURG_WINE_DIRECTORY_VERIFIED_AT,
  fredericksburgWineDirectoryByArea,
  type FredericksburgWineLocationKind,
} from "@/data/fredericksburg-wine-directory";

const KIND_LABELS: Record<FredericksburgWineLocationKind, string> = {
  "estate-winery": "Estate / vineyard",
  winery: "Winery",
  "urban-tasting-room": "Urban tasting room",
  "tasting-room": "Tasting room",
  "wine-shop": "Wine shop & tasting",
  "winery-resort": "Winery resort",
};

const AREA_NOTES = {
  "Downtown Fredericksburg": "Best for a park-once day. These are urban tasting rooms, wine shops or winery locations in and around the walkable historic core.",
  "Highway 290 / east Fredericksburg": "The densest wine-tourism corridor. Build a cluster instead of zigzagging repeatedly between town and the eastern wineries.",
  "Fredericksburg area": "Properties near Fredericksburg that do not fit neatly into the downtown or Stonewall clusters.",
  "North / Ranch Road 965": "A smaller wine stop that fits naturally with a north-of-town drive toward granite country.",
  Stonewall: "Estate vineyards and winery properties east of Fredericksburg, often easy to combine with peaches and LBJ country.",
  Hye: "The wine route continues east of Stonewall into Hye, where several destination producers have vineyard or tasting properties.",
  "Johnson City corridor": "The eastern extension of the wine-country trip. Treat these as a separate cluster if Fredericksburg is your lodging base.",
} as const;

function readableDate(value: string) {
  return new Date(value + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FredericksburgWineDirectory() {
  return <Section id="fredericksburg-wine-directory" className="border-y border-border bg-surface py-10 sm:py-12 lg:py-14" aria-label="Fredericksburg winery and tasting-room directory">
    <Container>
      <SectionHeader
        eyebrow="Texas Wine Country"
        title="Fredericksburg winery & tasting-room directory"
        description={FREDERICKSBURG_WINE_DIRECTORY.length + " source-checked wine locations currently tracked by TexasDefined, separated by geography and location type so an estate vineyard is not confused with a downtown tasting room."}
      />

      <div className="mt-7 grid gap-5 border-y border-border py-6 text-sm sm:grid-cols-3">
        <div>
          <p className="eyebrow text-muted-foreground">Current inventory</p>
          <p className="mt-2 font-display text-3xl">{FREDERICKSBURG_WINE_DIRECTORY.length}</p>
          <p className="mt-1 leading-6 text-muted-foreground">Distinct source-checked wine locations.</p>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Official regional context</p>
          <p className="mt-2 leading-6">Visit Fredericksburg describes nearly 100 wineries, vineyards and tasting rooms across Fredericksburg and Gillespie County.</p>
          <a href="https://www.visitfredericksburgtx.com/things-to-do/wineries/" target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold text-primary underline decoration-primary/30 underline-offset-4">Official winery directory →</a>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Research date</p>
          <p className="mt-2 font-semibold">{readableDate(FREDERICKSBURG_WINE_DIRECTORY_VERIFIED_AT)}</p>
          <p className="mt-1 leading-6 text-muted-foreground">Operating hours, reservations, age policies and transportation can change; verify those directly before visiting.</p>
        </div>
      </div>

      <div className="mt-8">
        {FREDERICKSBURG_WINE_DIRECTORY_AREAS.map((area, index) => {
          const entries = fredericksburgWineDirectoryByArea(area);
          if (!entries.length) return null;
          return <details key={area} open={index < 2} className="group border-t border-border py-5 first:border-t-0">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
              <span>
                <span className="eyebrow text-primary">{entries.length} locations</span>
                <span className="mt-2 block font-display text-3xl">{area}</span>
              </span>
              <span aria-hidden className="mt-2 text-xl text-muted-foreground">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{AREA_NOTES[area]}</p>
            <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => <li key={entry.id} className="border-t border-border pt-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="eyebrow text-primary">{KIND_LABELS[entry.kind]}</p>
                  {entry.producer && entry.producer !== entry.name ? <p className="text-xs text-muted-foreground">{entry.producer}</p> : null}
                </div>
                <h3 className="mt-2 font-display text-xl leading-tight">{entry.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.summary}</p>
                <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4">
                  {entry.sourceLabel} →
                </a>
              </li>)}
            </ul>
          </details>;
        })}
      </div>

      <div className="mt-8 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
        <p>TexasDefined treats a producer's estate and a separate downtown tasting room as distinct visitor locations when both are verified. It also keeps wine retailers and tasting rooms labeled separately from working vineyards instead of implying every wine stop grows grapes on site.</p>
        <p className="mt-3">This is the verified layer, not a frozen claim that every operating wine business has already been captured. The regional inventory changes frequently; additions are promoted here only when a current official or official-destination source can support them.</p>
      </div>
    </Container>
  </Section>;
}
