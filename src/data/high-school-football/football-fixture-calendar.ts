// Calendar-only dates from the authored 2026 football editorial. Never
// compare display strings lexicographically against ISO dates.
export function footballFixtureCalendarDate(raw: string): string | null {
  const value=raw.trim();
  let iso=value;
  if (!/^2026-\d{2}-\d{2}$/.test(value)) {
    const m=/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})(?:,?\s+2026)?$/i.exec(value);
    if (!m) return null;
    const months: Record<string,string>={jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',jul:'07',aug:'08',sep:'09',sept:'09',oct:'10',nov:'11',dec:'12'};
    iso='2026-'+months[m[1].toLowerCase()]+'-'+m[2].padStart(2,'0');
  }
  const parsed=new Date(iso+'T12:00:00Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10)===iso ? iso : null;
}
export function footballFixtureCalendarStatus(raw: string, todayTexas: string): 'past' | 'future-or-today' | 'unknown' {
  const iso=footballFixtureCalendarDate(raw);
  return iso===null ? 'unknown' : iso<todayTexas ? 'past' : 'future-or-today';
}
