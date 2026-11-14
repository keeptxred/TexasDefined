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

## Nov 11 postdeploy recovery incident

The first deploy after merging PR #7007 was blocked safely before Worker replacement because an unrelated previous published release (#43113183643; source f3a5e960c37aada735fd605a6caab4dcc5fb3664; active Worker 72bd1a88-a91e-47ef-8738-4cc8c44ee60c) failed its post-deploy unusual-businesses photo provenance check. A read-only browser-neutral SSR diagnostic in PR #7016 confirmed both public origins, cached and query-busted, emitted the correct Britten photograph credit but omitted structured license/creator metadata. The image rights loader's lazy gate recognized Britten%20USA but not the live /media/remote doubly encoded Britten%2520USA. PR #7016 fixes that source matcher and adds a regression test.

The existing prior Worker asset-restoration system proved 139 emitted built assets, 6,368 original-byte dual-origin SHA records, Worker version and source SHA match, and critical publication/health/asset verifiers succeeded, yet correctly rejected the failed postdeploy job step. A precisely pinned historical incident exception (run 43113183643, job 130834293835, the single failed non-asset step only) allows ONLY the immutable verified old asset hash history to be carried forward when the genuine image metadata fix is present. It cannot pass a missing, incorrect or inaccessible JS/CSS hash, wrong Worker, wrong source, additional failing step, missing current code fix, or arbitrary failed run. The original failed job remains a failure. This is a guarded recovery of old assets, not a waiver of publishing checks.

The next release must verify the live structured image rights and complete fishing 13-page SSR/Chrome checks. If any fails, fix the underlying cause rather than rerunning unchanged.
