/**
 * Whole-site production crawler guard: do not advertise an edition as live
 * after the *page itself* says its most recent confirmed occurrence is over.
 * This reads public HTML and does not guess event dates from recurrence.
 */
export function expiredEventSnippetIssues({ url, title = "", description = "", renderedText = "" }) {
  if (!new URL(url).pathname.startsWith("/event/")) return [];
  const ended = /Latest confirmed occurrence has ended\b|Date status\s+Last confirmed occurrence\b/i.exec(renderedText);
  if (!ended) return [];

  // The most recent confirmed occurrence year appears in the event header
  // preceding its expired-status signal. A future *projected* edition is not
  // the expired occurrence and must not become a false positive.
  const precedingYears = [...renderedText.slice(0, ended.index).matchAll(/\b20\d{2}\b/g)];
  const expiredYear = precedingYears.at(-1)?.[0];
  if (!expiredYear) return [];
  const year = new RegExp("\\b" + expiredYear + "\\b");
  const archived = /\b(?:archive|recap|retrospective|history)\b/i.test(title);
  const issues = [];
  if (!archived && year.test(title) && /\b(?:dates?|tickets?|schedule|hours?|visitor guide)\b/i.test(title)) {
    issues.push({ code: "expired-event-title", detail: expiredYear + " edition already ended" });
  }
  if (!archived && year.test(description) && /\b(?:plan|runs|returns|tickets?|schedule|buy)\b/i.test(description)) {
    issues.push({ code: "expired-event-description", detail: expiredYear + " edition already ended" });
  }
  return issues;
}
