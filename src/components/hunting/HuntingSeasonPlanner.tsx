import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import speciesCalendar from "@/data/hunting/species-season-calendar.json";
import deerCalendar from "@/data/hunting/deer-season-dates.json";
import turkeyCalendar from "@/data/hunting/turkey-season-calendar.json";
import { deerSeasonRange, type DeerSeasonId } from "@/data/hunting/deer-season-format";

type WindowRow = { season: string; zone: string; dates: string; start?: string; end?: string };
type SpeciesCalendar = { heading: string; slug: string; source: string; checkedAt: string; rows: WindowRow[] };
type WindowStatus = "today" | "upcoming" | "ended" | "unknown" | "year-round";

const calendars: SpeciesCalendar[] = [
  {
    heading: "White-tailed deer",
    slug: "texas-deer-hunting",
    source: deerCalendar.officialDeerUrl,
    checkedAt: deerCalendar.sourceCheckedAt,
    rows: deerCalendar.rows.map((row) => ({
      season: row.season,
      zone: row.area,
      dates: deerSeasonRange(row.id as DeerSeasonId, "short"),
      start: row.start,
      end: row.end,
    })),
  },
  {
    heading: "Wild turkey",
    slug: "turkey-hunting",
    source: turkeyCalendar.source,
    checkedAt: turkeyCalendar.checkedAt,
    rows: turkeyCalendar.rows.map((row) => ({
      season: row.season,
      zone: row.area,
      dates: row.dates,
    })),
  },
  ...speciesCalendar.sections.map((section) => ({
    heading: section.heading,
    slug: section.slugs[0],
    source: speciesCalendar.source,
    checkedAt: speciesCalendar.checkedAt,
    rows: section.rows.map((row) => ({
      season: row.season,
      zone: row.zone,
      dates: row.dates,
    })),
  })),
];

const monthNumbers: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

function isoDate(year: number, month: number, day: number) {
  if (!month || year < 2020 || year > 2100 || day < 1 || day > 31) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return null;
  return String(year) + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");
}

/** Accept only the date formats in TPWD's governed source files; never guess unparsed dates. */
function readRange(fragment: string): { start: string; end: string } | null {
  const match = fragment.trim().match(/^([A-Za-z]{3,9})\\.?\\s+(\\d{1,2})(?:,\\s*(20\\d{2}))?\\s*[-–]\\s*(?:([A-Za-z]{3,9})\\.?\\s+)?(\\d{1,2}),?\\s*(20\\d{2})$/);
  if (!match) return null;
  const firstMonth = monthNumbers[match[1].slice(0, 3).toLowerCase()];
  const lastMonth = match[4] ? monthNumbers[match[4].slice(0, 3).toLowerCase()] : firstMonth;
  const endYear = Number(match[6]);
  const startYear = match[3] ? Number(match[3]) : endYear - (firstMonth > lastMonth ? 1 : 0);
  const start = isoDate(startYear, firstMonth, Number(match[2]));
  const end = isoDate(endYear, lastMonth, Number(match[5]));
  return start && end && start <= end ? { start, end } : null;
}

function windowStatus(row: WindowRow, today: string): WindowStatus {
  if (/^no closed season$/i.test(row.dates.trim())) return "year-round";
  const periods = row.start && row.end
    ? [{ start: row.start, end: row.end }]
    : row.dates.split(/\\s*(?:&|;)\\s*/).map(readRange);
  if (!periods.length || periods.some((period) => period === null)) return "unknown";
  if (periods.some((period) => period && period.start <= today && today <= period.end)) return "today";
  if (periods.some((period) => period && period.start > today)) return "upcoming";
  return "ended";
}

function statusLabel(status: WindowStatus) {
  switch (status) {
    case "today": return "Date window includes today";
    case "upcoming": return "Upcoming listed dates";
    case "ended": return "Listed dates have passed";
    case "year-round": return "No closed season in statewide table";
    default: return "Confirm dates with TPWD";
  }
}

function useTexasDate() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(new Date());
    const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? "";
    setToday(part("year") + "-" + part("month") + "-" + part("day"));
  }, []);
  return today;
}

export function HuntingSeasonPlanner() {
  const [selected, setSelected] = useState(calendars[0].slug);
  const today = useTexasDate();
  const calendar = useMemo(() => calendars.find((entry) => entry.slug === selected) ?? calendars[0], [selected]);
  const rows = calendar.rows.map((row) => ({ ...row, status: today ? windowStatus(row, today) : null }));
  const activeCount = rows.filter((row) => row.status === "today" || row.status === "year-round").length;
  return (
    <section id="hunting-season-planner" aria-labelledby="hunting-season-planner-title" className="scroll-mt-28 border-b border-border bg-surface py-12 md:py-16">
      <Container>
        <div className="max-w-5xl">
          <p className="eyebrow text-primary">Find a species and season</p>
          <h2 id="hunting-season-planner-title" className="mt-3 font-display text-3xl md:text-4xl">Texas hunting season planner</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
            Compare the official {speciesCalendar.seasonYear} statewide dates for deer, turkey and 17 other game categories. Select a species to see its zones and dates. A date window that includes today does not establish that hunting is legal in your county or on your property.
          </p>
          <div className="mt-7 grid gap-5 rounded-sm border border-border bg-background p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <label htmlFor="hunting-species-select" className="block text-sm font-semibold">Species or game category</label>
              <select
                id="hunting-species-select"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {calendars.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.heading}</option>)}
              </select>
            </div>
            <Link to={"/hunting/" + calendar.slug} className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
              Read the {calendar.heading.toLowerCase()} guide →
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl">{calendar.heading} · {calendar.rows.length} season/zone entries</h3>
            <p className="text-xs text-muted-foreground">Official calendar checked {calendar.checkedAt}</p>
          </div>
          <div aria-live="polite" className="mt-3 text-sm leading-7 text-muted-foreground">
            {today
              ? activeCount > 0
                ? activeCount + " listed season/zone entries include " + today + " (Texas Central Time); confirm county, eligibility and permit restrictions."
                : "No selected entries are confidently identified as open today (" + today + "). Review all published dates and confirm the exact rules with TPWD."
              : "Dates are shown below. Live date-window indicators appear after the page loads."}
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2" aria-label={calendar.heading + " current season and zone dates"}>
            {rows.map((row, index) => <li key={row.season + row.zone + String(index)} className="border border-border bg-background p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <h4 className="text-base font-semibold">{row.season}</h4>
                {row.status ? <span className="text-xs text-muted-foreground">{statusLabel(row.status)}</span> : null}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{row.zone}</p>
              <p className="mt-3 text-sm font-semibold">{row.dates}</p>
            </li>)}
          </ul>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
            These are statewide calendar entries only. Zone boundaries, open counties, bag limits, age restrictions, legal equipment, wildlife management areas, APH access and drawn-hunt dates are separate requirements. Dates may change; always consult the current TPWD regulations and the exact area's legal-game listing.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href={calendar.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Official TPWD species rules ↗</a>
            <a href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">TPWD legal-game and area finder ↗</a>
            <Link to="/hunting/texas-hunting-license" className="font-semibold text-primary underline underline-offset-4">License and endorsements →</Link>
            <Link to="/browse/counties" className="font-semibold text-primary underline underline-offset-4">Browse Texas counties →</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
