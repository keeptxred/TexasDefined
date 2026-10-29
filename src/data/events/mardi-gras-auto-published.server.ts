// A source-verified, protected-PR-published 2027 date overrides ONLY the two
// formerly unannounced guides that have editorial-safe source-aware 2027 copy.
// The file is never populated from guesswork or old-season data.
// Their event page, calendar and Event schema all consume getMajorEventRecordServer.
import registry from "./mardi-gras-verified-source-updates.json";
import type { MajorEventAuthorityRecord } from "../major-event-authority.server";

export interface AutoPublishedMardiGrasFact {
  eventSlug: string;
  sourceId: string;
  sourceUrl: string;
  eventName: string;
  organizer: string;
  city: string;
  startDate: string;
  endDate: string;
  startDateTime: string | null;
  endDateTime: string | null;
  timeType: string;
  checkedAt: string;
  evidenceType: string;
}
const authorized: Record<string, { sourceId: string; sourceUrl: string; city: string }> = {
  "mardi-gras-on-the-sabine-orange": {
    sourceId: "orange-sabine", city: "Orange",
    sourceUrl: "https://orangetexas.gov/407/Mardi-Gras-on-the-Sabine",
  },
  "mardi-gras-southeast-texas-beaumont": {
    sourceId: "beaumont-festival", city: "Beaumont",
    sourceUrl: "https://mardigrastx.com/",
  },
};
const records = (registry.records || {}) as Record<string, AutoPublishedMardiGrasFact>;
function day(iso: string) {
  if (!/^2027-(?:01|02|03)-\d{2}$/.test(iso)) return null;
  const value = new Date(iso + "T12:00:00Z");
  return Number.isFinite(value.getTime()) && value.toISOString().slice(0, 10) === iso ? value : null;
}
export function verifiedMardiGrasFactForSlug(slug: string): AutoPublishedMardiGrasFact | null {
  const fact = records[slug], expected = authorized[slug];
  if (!fact || !expected || fact.eventSlug !== slug || fact.sourceId !== expected.sourceId
      || fact.sourceUrl !== expected.sourceUrl || fact.city !== expected.city
      || fact.evidenceType !== "official-event-jsonld"
      || fact.timeType !== "published-event-occurrence-not-parade-start"
      || !/^2026-\d{2}-\d{2}T/.test(fact.checkedAt)) return null;
  const start = day(fact.startDate), end = day(fact.endDate);
  if (!start || !end || end.getTime() < start.getTime() || end.getTime() - start.getTime() > 7 * 86400000) return null;
  return fact;
}
const prettyDay = (iso: string) => new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(iso + "T12:00:00Z"));
export function verifiedMardiGrasDateLabel(fact: AutoPublishedMardiGrasFact) {
  return fact.startDate === fact.endDate
    ? prettyDay(fact.startDate)
    : prettyDay(fact.startDate) + " – " + prettyDay(fact.endDate);
}
export function applyVerifiedMardiGrasSourceFacts(event: MajorEventAuthorityRecord): MajorEventAuthorityRecord {
  const fact = verifiedMardiGrasFactForSlug(event.slug);
  if (!fact) return event;
  const date = verifiedMardiGrasDateLabel(fact);
  const orange = event.slug === "mardi-gras-on-the-sabine-orange";
  const identity = orange ? "City of Orange" : "Mardi Gras Southeast Texas";
  const historicalNote = orange
    ? "Its 2026 festival occupied the downtown riverfront. The 2027 parade routes, hours, vendors and admission details require current confirmation."
    : "The nonprofit festival previously held its 2026 season at Doggett Ford Park in Beaumont. Do not assume the prior venue, gate prices or lineup applies to 2027.";
  return {
    ...event,
    startDate: fact.startDate,
    endDate: fact.endDate,
    startDateTime: undefined, // source Event window is not a verified parade start
    endDateTime: undefined,
    sourceCheckedAt: fact.checkedAt.slice(0, 10),
    venue: orange ? "Downtown Orange riverfront — confirm 2027 route and venue map" : "Beaumont — confirm 2027 entrance, venue and parade route",
    dateNote: "Source-verified 2027 " + date + " event occurrence published by " + identity + ". Individual parade starts and venue details are not inferred from event dates.",
    whyItMatters: orange
      ? "Orange's Mardi Gras on the Sabine brings Cajun food, music and traditional Mardi Gras community parades to its riverfront. " + identity + " now identifies " + date + " for the 2027 event. " + historicalNote
      : "Mardi Gras Southeast Texas is an established nonprofit celebration featuring parades, concerts, carnival entertainment and food. After relocating from Port Arthur to Beaumont it remains distinct from the newly reintroduced Mardi Gras Port Arthur and Circle of Hope's Pardi Gras charity. " + identity + " now identifies " + date + " for the 2027 festival. " + historicalNote,
    quickFacts: [
      { label: "Verified 2027 event occurrence", value: date },
      { label: "Verified source", value: identity + " — official organizer/city Event listing" },
      { label: "Individual parade time", value: "Not established by this event-date announcement; see the organizer's current schedule" },
      { label: "Historic 2026 event", value: orange ? "February 7, 2026 (past season)" : "February 12–15, 2026 (past season)" },
    ],
    planningSections: orange ? [
      { title: "Use the new 2027 organizer dates, not the old 2026 program",
        body: "The city's event-specific announcement now identifies " + date + ". This is the confirmed overall event occurrence, not proof of each parade's separate departure time, exact route or road closure. Check the City of Orange closer to travel." },
      { title: "Understand the riverfront event's historic format",
        body: "In the 2026 program the Boardwalk and Pavilion hosted concerts and festivities alongside a second-line procession, a children's parade and Krewe of Krewes. Treat these as historical context until the city confirms what returns in 2027." },
      { title: "Check family participation and accessible access",
        body: "Past years permitted registered children's entries and public participation in a brass-band second line. The city must confirm 2027 registration, age limits, wheelchair access, stroller restrictions and safe viewing zones." },
      { title: "Confirm pricing and entertainment",
        body: "The 2026 festival advertised free admission, but this is not authorization to advertise free 2027 entry, concerts or vendor access. Review the city's new program before booking." },
      { title: "Plan a Sabine River day trip",
        body: "Downtown Orange's museums and riverfront are worth exploring around the event. Verify current parking, weather plans and downtown street access before driving." },
    ] : [
      { title: "Recheck the exact Beaumont festival program",
        body: "The organizer lists the 2027 festival occurrence as " + date + ". This does not establish individual parade times, route maps, ticket types or a current festival-grounds entrance." },
      { title: "Distinguish free viewing from paid entertainment",
        body: "Previous Beaumont programs separated public street viewing from gated concerts and entertainment. Do not reuse former-year ticket offers, parking, or fee rules; verify current organizer notices." },
      { title: "Plan for families without promising a repeat lineup",
        body: "Earlier seasons included marching units, carnival rides and children's activities. Verify the 2027 family schedule, admission conditions and age guidance before making plans." },
      { title: "Use current parking and accessibility maps",
        body: "Parade routes and concert sites can have different arrival routes and access gates. Do not assume Doggett Ford Park's prior map applies until the event organizer explicitly reconfirms it." },
      { title: "Keep the three Beaumont-area Mardi Gras organizers separate",
        body: "Mardi Gras Southeast Texas is not the independently organized Mardi Gras Port Arthur celebration and is not Circle of Hope's ticketed January Beaumont Pardi Gras charity night. Use the current event-specific organizer ticket page." },
    ],
  };
}
