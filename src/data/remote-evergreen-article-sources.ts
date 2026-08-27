import type { Article } from "./types";
import { remoteEvergreenAuthoritySources } from "./remote-evergreen-authority-sources";

const SOURCES_HEADING = "Sources and further reading";

export function withRemoteEvergreenAuthoritySources(article: Article): Article {
  const sources = remoteEvergreenAuthoritySources[article.slug];
  if (!sources?.length) return article;

  const primary = sources[0];
  const hasSourcesHeading = article.body.some(
    (block) => block.type === "heading" && block.text.trim().toLocaleLowerCase("en-US") === SOURCES_HEADING.toLocaleLowerCase("en-US"),
  );

  return {
    ...article,
    sourceUrl: article.sourceUrl ?? primary.url,
    sourceName: article.sourceName ?? primary.label,
    body: hasSourcesHeading
      ? article.body
      : [
          ...article.body,
          { type: "heading", text: SOURCES_HEADING },
          {
            type: "list",
            items: sources.map((source) => `${source.label} — ${source.scope}: ${source.url}`),
          },
        ],
  };
}
