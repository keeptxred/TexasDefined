import { Fragment, type ReactNode } from 'react';
import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { resolveInternalEntityLinks, type InternalLinkPolicy } from '@/platform/internal-linking';

export function autoLinkEntityMentions(
  text: string,
  entities: TexasEntityRecord[],
  maxLinks = 8,
  policy: Partial<InternalLinkPolicy> = {},
): ReactNode[] {
  const { matches } = resolveInternalEntityLinks(text, entities, { ...policy, maxLinks });
  if (!matches.length) return [text];
  const output: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((match, index) => {
    if (match.start > cursor) output.push(text.slice(cursor, match.start));
    output.push(
      <a
        key={`${match.entity.id}-${index}`}
        href={match.href}
        data-entity-id={match.entity.id}
        data-entity-kind={match.entity.kind}
        className="underline decoration-primary/40 underline-offset-2 hover:text-primary"
      >
        {text.slice(match.start, match.end)}
      </a>,
    );
    cursor = match.end;
  });
  if (cursor < text.length) output.push(text.slice(cursor));
  return output;
}

export function AutoEntityLinks({
  text,
  entities,
  maxLinks = 8,
  policy,
}: {
  text: string;
  entities: TexasEntityRecord[];
  maxLinks?: number;
  policy?: Partial<InternalLinkPolicy>;
}) {
  return <Fragment>{autoLinkEntityMentions(text, entities, maxLinks, policy)}</Fragment>;
}
