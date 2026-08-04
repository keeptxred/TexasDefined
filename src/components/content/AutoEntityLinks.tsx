import { Fragment, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { canonicalEntityPath } from '@/data/knowledge-graph/relationships';

export function autoLinkEntityMentions(text: string, entities: TexasEntityRecord[], maxLinks = 8): ReactNode[] {
  const candidates = entities
    .flatMap((entity) => [entity.name, ...entity.aliases].map((label) => ({ entity, label })))
    .filter((item) => item.label.length >= 4)
    .sort((a, b) => b.label.length - a.label.length);
  const used = new Set<string>();
  const matches: Array<{ start: number; end: number; entity: TexasEntityRecord }> = [];
  for (const candidate of candidates) {
    if (used.has(candidate.entity.id) || matches.length >= maxLinks) continue;
    const escaped = candidate.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = new RegExp(`\\b${escaped}\\b`, 'i').exec(text);
    if (!match) continue;
    const start = match.index;
    const end = start + match[0].length;
    if (matches.some((existing) => start < existing.end && end > existing.start)) continue;
    matches.push({ start, end, entity: candidate.entity });
    used.add(candidate.entity.id);
  }
  matches.sort((a, b) => a.start - b.start);
  if (!matches.length) return [text];
  const output: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((match, index) => {
    if (match.start > cursor) output.push(text.slice(cursor, match.start));
    output.push(<Link key={`${match.entity.id}-${index}`} to={canonicalEntityPath(match.entity)} className="underline decoration-primary/40 underline-offset-2 hover:text-primary">{text.slice(match.start, match.end)}</Link>);
    cursor = match.end;
  });
  if (cursor < text.length) output.push(text.slice(cursor));
  return output;
}

export function AutoEntityLinks({ text, entities, maxLinks = 8 }: { text: string; entities: TexasEntityRecord[]; maxLinks?: number }) {
  return <Fragment>{autoLinkEntityMentions(text, entities, maxLinks)}</Fragment>;
}
