import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { useHuntingCounty } from "./HuntingCountyContext";
import { TEXAS_COUNTIES } from "@/data/texas-places";

const TPWD_AREAS = "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml";
const TPWD_DRAWN = "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/";
const TPWD_APH = "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/";
const TPWD_DAILY = "https://tpwd.texas.gov/huntwild/hunt/public/";
const TPWD_MAP = "https://tpwd.maps.arcgis.com/apps/webappviewer/index.html?id=c9788957300943559f7b49206e8ef153";

const species = ["White-tailed deer", "Feral hog", "Dove", "Waterfowl", "Quail", "Turkey", "Rabbit or hare", "Squirrel", "Other legal game"];
const accessPaths = [
  { id: "aph", name: "Annual Public Hunting / walk-in", url: TPWD_AREAS, description: "Search TPWD's current Area/Legal Game records and map booklet; the APH permit does not make every unit open for every species." },
  { id: "drawn", name: "Drawn or E-Postcard hunt", url: TPWD_DRAWN, description: "Use TPWD's drawn-hunt catalog and application dates. Availability depends on individual drawings, not general public-land access." },
  { id: "regular", name: "Regular daily-permit hunt", url: TPWD_DAILY, description: "Check the individual unit's regular permit season, fee, capacity and check-in rules before leaving home." },
  { id: "mentored", name: "Mentored or youth opportunity", url: TPWD_DAILY, description: "Look for TPWD mentored workshops and youth-specific permits; a general adult walk-in permit is not a substitute." },
] as const;

/** TPWD's authoritative search is JavaScript-driven and does not expose a stable
 * verified filter URL. This planner prepares the visitor's search; it does not
 * present unverified places as legally huntable or invent official results. */
export function HuntingPublicAccessPlanner() {
  const { countySlug, setCountySlug } = useHuntingCounty();
  const [game, setGame] = useState(species[0]);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "unavailable">("idle");
  const [mode, setMode] = useState<(typeof accessPaths)[number]["id"]>("aph");
  const county = TEXAS_COUNTIES.find((item) => item.slug === countySlug);
  const selectedPath = accessPaths.find((item) => item.id === mode) ?? accessPaths[0];
  const searchChecklist = [
    "Texas public-hunt planning checklist — verify with TPWD",
    "County: " + (county?.name ?? "Any Texas county"),
    "Intended game: " + game,
    "Access program: " + selectedPath.name,
    "Official TPWD starting page: " + selectedPath.url,
    "1. Locate the county or region and intended game in TPWD's current program listings.",
    "2. Open the individual hunt or area's Legal Game record; check actual species, dates, allowed methods and eligibility.",
    "3. Confirm the specific permit, license, endorsements, unit boundaries, check-in and closure notices before traveling.",
    "A selected county or game here does not prefilter TPWD or establish hunting permission.",
  ].join("\n");
  async function copySearchChecklist() {
    try {
      await navigator.clipboard.writeText(searchChecklist);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
    }
  }
  return (
    <section id="public-hunting-planner" aria-labelledby="public-hunting-planner-heading" className="scroll-mt-24 border-b border-border bg-surface py-12 md:py-16">
      <Container>
        <div className="max-w-5xl">
          <p className="eyebrow text-primary">Choose your public-hunt search</p>
          <h2 id="public-hunting-planner-heading" className="mt-3 font-display text-3xl md:text-4xl">Prepare your official TPWD public-hunt search</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            Choose a county, intended game and access program to prepare a search checklist. Apply those choices yourself in TPWD's official system: this page does not retrieve matching properties or grant hunting access. A state park, WMA, National Forest or public recreation area is not necessarily open to hunting.
          </p>
          <div className="mt-7 grid gap-5 border border-border bg-background p-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="hunting-access-county" className="block text-sm font-semibold">County to search (shared with season planner)</label>
              <select id="hunting-access-county" value={countySlug} onChange={(event) => { setCountySlug(event.target.value); setCopyStatus("idle"); }} className="mt-2 min-h-11 w-full border border-border bg-background px-3 py-2 text-foreground">
                <option value="">Any Texas county</option>
                {TEXAS_COUNTIES.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="hunting-access-game" className="block text-sm font-semibold">Legal game to verify</label>
              <select id="hunting-access-game" value={game} onChange={(event) => { setGame(event.target.value); setCopyStatus("idle"); }} className="mt-2 min-h-11 w-full border border-border bg-background px-3 py-2 text-foreground">
                {species.map((name) => <option key={name}>{name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="hunting-access-type" className="block text-sm font-semibold">Hunt access program</label>
              <select id="hunting-access-type" value={mode} onChange={(event) => { setMode(event.target.value as typeof mode); setCopyStatus("idle"); }} className="mt-2 min-h-11 w-full border border-border bg-background px-3 py-2 text-foreground">
                {accessPaths.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5 border-l-4 border-primary bg-background p-5" aria-live="polite">
            <h3 className="font-display text-xl">Your TPWD search checklist</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {county ? "Select " + county.name : "Select the counties or public hunting region you can reach"}, then locate {game.toLowerCase()} in the official Legal Game listing. {selectedPath.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href={selectedPath.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-primary px-5 py-3 font-semibold text-primary-foreground">Open TPWD's official {mode === "aph" ? "Area/Legal Game search" : "hunt program"} ↗</a>
              {county ? <a href={"https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/" + (county.slug === "la-salle" ? "lasalle" : county.slug) + "/"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Check {county.name} regulations ↗</a> : null}
              <a href={TPWD_MAP} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">View TPWD's official public-hunting map ↗</a>
              <a href={TPWD_APH} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Current TPWD APH maps and booklet ↗</a>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm leading-6 text-muted-foreground">Save your county, game and access choices before opening TPWD. The official site will not automatically receive these filters.</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button id="copy-hunting-search-checklist" type="button" onClick={() => void copySearchChecklist()} className="inline-flex min-h-11 items-center border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Copy planning checklist</button>
                <span role="status" className="text-sm text-muted-foreground">{copyStatus === "copied" ? "Checklist copied. Paste it into your notes while using TPWD." : copyStatus === "unavailable" ? "Clipboard unavailable. Select and copy the checklist below." : "Includes selected county, game, permit program and verification steps."}</span>
              </div>
              {copyStatus === "unavailable" ? <textarea aria-label="Planning checklist text to copy manually" readOnly rows={8} value={searchChecklist} onFocus={(event) => event.target.select()} className="mt-3 w-full max-w-full border border-border bg-background p-3 text-sm text-foreground" /> : null}
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            This page does not prefilter TPWD's website, display matching public-hunt units or certify an open hunt. Check the exact unit's Legal Game box, hunt date, land boundary, check-in procedure, applicable license and endorsements, and whether an APH, regular, drawn, E-Postcard, or youth/mentored authorization is required. If TPWD's live search is unavailable, use its current-year map booklet—not an older map or third-party property boundary.
          </p>
          <p className="mt-3 text-sm"><Link to="/hunting/public-hunting" className="font-semibold text-primary underline underline-offset-4">Understand how Texas public-hunting access works →</Link></p>
        </div>
      </Container>
    </section>
  );
}
