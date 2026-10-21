import fs from "node:fs";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(path, "utf8");
const card = read("src/components/editorial/EventCard.tsx");
const eventsHub = read("src/components/events/EventsLandingPage.tsx");
const fixtures = read("src/data/fixtures/texas.ts");
const index = read("src/data/major-event-index.ts");
const authority = read("src/data/major-event-authority.server.ts");
const expanded = read("src/data/major-event-expanded-authority.server.ts");
const viva = read("src/data/major-event-expanded-authority-tranche20.server.ts");
const musical = read("src/data/major-event-expanded-authority-tranche22.server.ts");

// Public home cards must lead with our permanent guide, without removing the official source.
for (const token of [
  'base.startsWith("houston-livestock-")', 'base === "wurstfest-new-braunfels"',
  '"viva-el-paso"', '"texas-outdoor-musical"', '"/texas-state-fair"',
  'Visitor guide →', 'Official site ↗',
]) assert(card.includes(token), `Homepage event guide navigation missing: ${token}`);
assert(!card.includes('Event details ↗'), "Event cards must not send the primary guide CTA off-site");

// The statewide calendar hero must also lead to the permanent in-site guide.
for (const token of ["featuredCanonicalSlug", "featuredGuide.href", "Texas Defined event guide →", "Event details ↗"]) {
  assert(eventsHub.includes(token), `Event hub featured guide missing: ${token}`);
}
assert(!eventsHub.includes('title="State Fair of Texas 2026"'), "Evergreen event hub must not hardcode a concluded fair year");

// Past wrong dates must never be republished by fixture fallback.
assert(fixtures.includes('startDate: "2027-03-02"') && fixtures.includes('endDate: "2027-03-21"'), "Houston 2027 fixture dates are wrong");
assert(!fixtures.includes('startDate: "2027-02-23"'), "Old Houston Rodeo date regression");
for (const slug of ["wurstfest", "sxsw", "texas-sandfest", "houston-livestock-show-rodeo", "fiesta-san-antonio"]) {
  assert(index.includes(`slug: "${slug}"`), `Missing active authority occurrence: ${slug}`);
}
assert(index.includes('startDate: "2027-04-16"') && index.includes('endDate: "2027-04-18"'), "SandFest 2027 dates must remain verified");
assert(index.includes('startDate: "2027-04-15"') && index.includes('endDate: "2027-04-25"'), "Fiesta 2027 dates must remain verified");
assert(!index.includes('slug: "fiesta-de-la-flor"'), "Discontinued Fiesta de la Flor must not be in active events");
for (const token of ["November 6-15, 2026", "beach markers", "shuttle route", "accessible parking", "badge-only"]) {
  // Content intent may use alternate capitalization; check against all current major guides.
  const combined = (authority + expanded).toLowerCase();
  assert(combined.includes(token.toLowerCase()), `Missing actionable event detail: ${token}`);
}
for (const token of ["NIOSA", "April 19", "April 23", "April 24", "March 2-21, 2027", "February 25-27"]) {
  assert(expanded.includes(token), `Missing confirmed Rodeo/Fiesta update: ${token}`);
}
for (const token of ["McKelligon Canyon", "/destination/chamizal-national-memorial", "/metro-area/el-paso-metro"]) {
  assert(viva.includes(token), `Viva! El Paso needs ${token}`);
}
for (const token of ["check back in January", "/destination/palo-duro-canyon-state-park", "2027 dates"]) {
  assert(musical.includes(token), `TEXAS Outdoor Musical needs ${token}`);
}
assert(!musical.includes('href: "/state-park/palo-duro-canyon-state-park"'), "Redirect-only park paths must not be linked");
console.log("Key Texas event authority coverage and homepage link regression checks passed.");
