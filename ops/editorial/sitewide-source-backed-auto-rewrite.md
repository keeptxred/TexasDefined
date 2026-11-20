# Sitewide scheduled content rewriting: source-backed, bounded and protected

## Coverage and execution

The new GitHub workflow \`.github/workflows/sitewide-source-backed-rewrite.yml\`
runs four times daily at 04:47, 10:47, 16:47 and 22:47 UTC and can also be dispatched manually. Its deterministic
selector enumerates scheduled workflows directly from \`.github/workflows/\`
instead of a fixed three-page list. It reads **open, actionable official-source
refresh issues** produced by the existing page-specific schedules, identifies
actual canonical TexasDefined paths and official HTTPS source documents, and
paginates the complete open GitHub issue backlog before applying strict
page/source eligibility. It never silently cuts off older alerts after a
45-issue or search-keyword threshold; unusually large incomplete GitHub
responses fail closed instead of claiming all-schedule coverage.
selects **at most one page per run** for source-backed rewriting. Multi-page editorial issues are processed as canonical/source pairs, rather than closed after just one page. Committed per-page evidence is used to prioritize previously unhandled pages and avoid endlessly reprocessing the first row of a shared issue.

The normal source/data refresh schedules continue unchanged, including county
tax facts, event feeds, fishing, football, heritage sites, museums and outdoor
guides. Their deterministic source snapshots remain the authoritative data.
Automatic editorial work happens **only** when a source-monitor has exposed
a real existing page, a specific source-review issue and reachable primary
evidence. A clean unchanged page is never rewritten solely because a timer fired.

A read-only GitHub Actions job runs Codex using the existing OPENAI_API_KEY
GitHub secret **only when eligible research work is present**. The model may
change up to five existing content files, never workflows, credentials, tests
or source-of-truth code. It must write a claim-by-claim ledger, with exact
official source quotes from captured official pages and the exact new page
copy. The publishing job has separate GitHub write permissions but no AI
API key. It independently validates that ledger against the actual changed
copy, limits diff size and rejects unsafe changes, then opens a PR.

The trusted \`finish-sitewide-source-backed-rewrite.yml\` workflow accepts
only a successful first-party source run and the exact bot-created PR. It
checks the GitHub issue identity, revalidates **current** official-source
quotes, rejects concurrent branch changes, runs all standard canonical
validation plus protected Merge Gate on the exact branch and enables
GitHub auto-merge. After an actual protected bot PR merge, the finisher explicitly dispatches the\nexisting serialized production workflow: GitHub does not start a push-triggered\ndeployment for merges made with its own GITHUB_TOKEN. It verifies the exact\nvalidated source commit is on main before dispatch; all existing production\nsource/asset/authority safety gates continue to apply. Failure at any stage leaves a reviewable PR/issue; it does not
bypass source verification, noindex rules or production controls.

## What this does not claim

This is **not** unconditional bulk AI rewriting of every indexed page.
Google discourages scaled content generation without original user value.
It does not automatically fix issues that only report inaccessible sources
without enough evidence, and it does not treat successful HTTP 200 as fact
verification. An editorial source review is not human field reporting.

This is one universal bounded *rewrite path* for the already scheduled
source-review backlog. It does **not** replace the specialist scheduled
deterministic updates or establish an independent all-URL review interval
for pages not already inventoried by a refresh workflow. Do not claim every
page received an editorial rewrite merely because GitHub Actions passed.

## Validation / acceptance

- \`node --test scripts/editorial/sitewide-rewrite-target.test.mjs\`
- \`node --check scripts/editorial/sitewide-rewrite-target.mjs\`
- \`node --check scripts/editorial/validate-sitewide-rewrite.mjs\`
- The default protected \`validate.yml\` and \`merge-gate.yml\` on the
  exact content PR head, followed by verified production deployment.
- Source-audit evidence ledger under
  \`ops/editorial/auto-rewrite-evidence/issue-<number>.json\`.

**Editorial principle:** factual/source changes are the trigger. Never
rewrite for freshness theater, silently restamp source-checked dates,
copy a third-party narrative, invent admissions or dates, dilute researched
material, or promise search-engine approval.

## Shared-source backlog safety

- Never use a source URL from another event/page's row, even when the issue has 150+ overdue pages.
- Preserve the multi-page source-monitor issue across generated PRs; the owning source monitor alone decides when all event pages are current.
- Use one evidence ledger per issue and canonical page; read legacy single-issue ledgers to prevent reworking already completed pages.
- A scheduled run with no substantive verified new copy is a successful no-op, not an invented edit or failed publication.
- Successive GitHub workflow run numbers rotate the full unreviewed source/page candidate queue. A no-change decision therefore does not stall remaining pages behind the same first source row; the next run still independently verifies the next candidate. This is queue fairness, not permission to rewrite unchanged facts.
- The cadence is four bounded selection windows each day, each attempting at most one approved content change under existing protected CI.
