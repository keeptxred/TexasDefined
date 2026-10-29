import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import speciesCalendar from "@/data/hunting/species-season-calendar.json";
import deerCalendar from "@/data/hunting/deer-season-dates.json";
import { HUNTING_REGULATION_FRESHNESS } from "@/data/hunting/freshness";
import turkeyCalendar from "@/data/hunting/turkey-season-calendar.json";
import { deerSeasonRange, type DeerSeasonId } from "@/data/hunting/deer-season-format";
import { windowStatus, statusLabel, type WindowRow } from "@/data/hunting/season-window-status.mjs";

type SpeciesCalendar = { id: string; heading: string; slug: string; source: string; checkedAt: string; rows: WindowRow[] };

const calendars: SpeciesCalendar[] = [
  {
    id: "deer",
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
    id: "turkey",
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
    id: "species:" + section.heading,
    heading: section.heading,
    slug: section.heading === "Goose" ? "goose-hunting" : section.slugs[0],
    source: speciesCalendar.source,
    checkedAt: speciesCalendar.checkedAt,
    rows: section.rows.map((row) => ({
      season: row.season,
      zone: row.zone,
      dates: row.dates,
    })),
  })),
];

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
  const [selected, setSelected] = useState(calendars[0].id);
  const today = useTexasDate();
  const calendar = useMemo(() => calendars.find((entry) => entry.id === selected) ?? calendars[0], [selected]);
  const archived = Boolean(today && today > HUNTING_REGULATION_FRESHNESS.validThrough);
  const rows = calendar.rows.map((row) => ({ ...row, status: today && !archived ? windowStatus(row, today) : null }));
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
          {archived ? <p role="status" className="mt-5 border-l-4 border-primary bg-background p-4 text-sm leading-7"><strong>Archived 2026–27 season snapshot.</strong> These dates no longer establish the current season. Use TPWD’s newest Outdoor Annual and area-specific rules before planning a hunt. Our source monitor must verify the next calendar before the published dates can advance.</p> : null}
          <div className="mt-7 grid gap-5 rounded-sm border border-border bg-background p-5 md:grid-cols-2 md:items-end">
            <div>
              <label htmlFor="hunting-species-select" className="block text-sm font-semibold">Species or game category</label>
              <select
                id="hunting-species-select"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {calendars.map((entry) => <option key={entry.id} value={entry.id}>{entry.heading}</option>)}
              </select>
            </div>
            <Link to={"/hunting/" + calendar.slug} className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-muted">
              Read the {calendar.heading.toLowerCase()} guide →
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl">{calendar.heading} · {calendar.rows.length} season/zone entries</h3>
            <p className="text-xs text-muted-foreground">Official calendar checked {calendar.checkedAt}</p>
          </div>
          <div aria-live="polite" className="mt-3 text-sm leading-7 text-muted-foreground">
            {archived ? "The selected entries are historical. No current-season open status is inferred from them." : today
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
            <a href="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Current TPWD hunting regulations ↗</a>
            <a href={calendar.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Official TPWD calendar or species rule ↗</a>
            <a href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">TPWD legal-game and area finder ↗</a>
            <Link to="/hunting/texas-hunting-license" className="font-semibold text-primary underline underline-offset-4">License and endorsements →</Link>
            <Link to="/browse/counties" className="font-semibold text-primary underline underline-offset-4">Browse Texas counties →</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
