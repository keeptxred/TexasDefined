import report from "@/data/generated/lost-maples-foliage-report.json";

// Only dated first-party observations are displayed, and only briefly after
// publication. This widget does not invent a live peak estimate or assume
// that Lost Maples observations apply to Garner or Guadalupe River parks.
const MAX_AGE_DAYS = 14;
const sourceDate = new Date(report.reportDate + "T00:00:00Z");
const formattedDate = Number.isNaN(sourceDate.valueOf()) ? null : new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(sourceDate);

export function LostMaplesFoliageStatus() {
  const ageDays = Math.floor((Date.now() - sourceDate.getTime()) / 86_400_000);
  const recent = formattedDate !== null && ageDays >= 0 && ageDays <= MAX_AGE_DAYS;
  return (
    <section aria-label="Dated TPWD Lost Maples foliage observation" className="mt-6 max-w-3xl border-l-2 border-primary bg-surface px-5 py-4">
      <h3 className="font-semibold text-foreground">Latest stored official Lost Maples foliage observation</h3>
      {recent ? (
        <>
          <p className="mt-2 text-sm leading-7 text-foreground">
            TPWD report dated {formattedDate}. This is the agency's published observation, not today's verified conditions or a prediction for your visit.
          </p>
          {report.observations.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-foreground">
              {report.observations.map(observation => <li key={observation}>{observation}</li>)}
            </ul>
          ) : null}
        </>
      ) : (
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          The last retrieved report was dated {formattedDate ?? "an unverified date"} and is no longer recent enough to describe current foliage. Open TPWD's official report for newer observations.
        </p>
      )}
      <a href={report.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">
        Read TPWD's dated foliage report ↗
      </a>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">Automatically refreshed from TPWD when a new dated entry is verified. Current park entry and trail alerts must also be checked separately.</p>
    </section>
  );
}
