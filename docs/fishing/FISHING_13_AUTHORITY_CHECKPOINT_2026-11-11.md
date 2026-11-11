# Fishing thirteen-page authority rollout — 2026-11-11

## Scope
`/fishing/techniques`; all nine published technique pages; `/fishing/regulations`; `/fishing/species`; and `/fishing/species/largemouth-bass`. Preserve all canonical URLs.

## Implemented source and editorial repairs
- All nine technique pages receive distinct conditional rigging/presentation decisions and display the complete source-backed lake relations list as a collapsible, navigable set, separate from editorial examples.
- Year-round applicability is not represented as a fifth fishing season.
- Species directory distinguishes all published records from the smaller set of complete standalone species pages.
- The largemouth page uses source-backed quality tiers rather than unjustified ordinal ranks, adds identification and safe-handling guidance, and excludes officially closed Lake Abilene.
- Central `src/data/fishing/operational-closures.ts` gates the closed lake out of the related technique and species recommendations as well.
- Regulations content links current TPWD official rules and includes practical explanations of the 2026-27 license, exceptions, game-fish methods, bait transport, baitfish and invasive-species decisions. Source-review date reflects manual verification on Nov 11, 2026, never a timed build.
- Dedicated static CI runs on PRs; scheduled Mon/Thu official source watch raises a GitHub issue when TPWD changes or is unreachable.

## Review and completion criteria
- Validate CI and type/build checks. Investigate and repair errors rather than rerunning an unchanged failure.
- Merge after checks pass; wait for successful deployment verification; check all thirteen public pages for 200 status, canonical, crawl/index directives, links, and distinct visible content. A post-deploy GitHub workflow also verifies all thirteen in real 390px mobile Chrome (CSS settled, single H1, no overflow), including opening all technique lake relationships.
- Investigate any regulatory-year/source-signature changes before rewriting law. The source monitor deliberately does not invent legal updates or fake review dates.
- No claim of Google endorsement/ranking or 95+ editorial certification without live evidence.
