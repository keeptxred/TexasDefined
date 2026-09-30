import type { ResolvedTemporalEventCollection, TemporalEventDirectoryItem } from "../event-temporal-collections.server";

export interface WeekendSocialCopy {
  facebook: string;
  instagram: string;
  x: string;
}

export interface WeekendEditorialPackage {
  subject: string;
  preheader: string;
  heading: string;
  intro: string;
  newsletterMarkdown: string;
  social: WeekendSocialCopy;
  sourcePaths: string[];
}

function shortDate(event: TemporalEventDirectoryItem) {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  const start = formatter.format(new Date(`${event.startDate}T12:00:00Z`));
  if (!event.endDate || event.endDate === event.startDate) return start;
  const end = formatter.format(new Date(`${event.endDate}T12:00:00Z`));
  return `${start}–${end}`;
}

function itemLine(event: TemporalEventDirectoryItem) {
  return `- [${event.name}](https://texasdefined.com${event.href}) — ${event.city} · ${shortDate(event)}`;
}

function compactNames(items: TemporalEventDirectoryItem[], max = 4) {
  return items.slice(0, max).map((event) => event.name).join(", ");
}

/**
 * Reusable, send-neutral copy for a future newsletter or social workflow.
 * This module never sends, schedules or posts anything; it only formats the
 * already source-qualified rolling weekend collection.
 */
export function buildWeekendEditorialPackageServer(collection: ResolvedTemporalEventCollection): WeekendEditorialPackage {
  if (collection.slug !== "this-weekend") throw new Error("Weekend editorial package requires the statewide this-weekend collection.");

  const items = collection.items.slice(0, 12);
  const sourcePaths = items.map((event) => event.href);
  const names = compactNames(items);
  const subject = `Texas This Weekend: ${collection.dateContext}`;
  const preheader = items.length
    ? `${items.length} source-verified Texas event guides, led by ${names}.`
    : "Source-verified Texas event guides for the current Friday-through-Sunday window.";
  const intro = `Texas Defined checked the current event authority catalog for ${collection.dateContext}. Use each permanent guide for the organizer source, date context and practical planning details, and recheck the official organizer before leaving.`;
  const newsletterMarkdown = [
    `# ${subject}`,
    "",
    intro,
    "",
    ...(items.length ? items.map(itemLine) : ["No source-verified event guides currently qualify for this weekend window."]),
    "",
    "Plan by region rather than trying to cross Texas in one weekend: https://texasdefined.com/events/this-weekend",
  ].join("\n");

  const lead = names || "source-verified events across Texas";
  const facebook = `Texas This Weekend (${collection.dateContext}): ${lead}. We built the list from permanent, source-checked event guides and keep the host city visible so you can plan a realistic trip. https://texasdefined.com/events/this-weekend`;
  const instagram = `Texas This Weekend · ${collection.dateContext}\n\n${lead}.\n\nEvery pick links to a source-checked permanent guide. Recheck the organizer before you go.\n\ntexasdefined.com/events/this-weekend`;
  const x = `Texas This Weekend (${collection.dateContext}): ${lead}. Source-checked guides + official organizer links: https://texasdefined.com/events/this-weekend`;

  return {
    subject,
    preheader,
    heading: subject,
    intro,
    newsletterMarkdown,
    social: { facebook, instagram, x },
    sourcePaths,
  };
}
