# 11-city independent WCAG and full rendered-link diagnostic — October 10, 2026

**Status: SCRIPT / WORKFLOW PROPOSED — NO DIAGNOSTIC RESULTS OR FULL CERTIFICATION CLAIMED.**

The previous live browser runner only tests Tab traversal and up to twelve internal URLs per city at a time. It does not prove WCAG compliance or external-link correctness.

This separate free runner (`scripts/ci/audit-city-authority-a11y-links.mjs`, workflow `.github/workflows/audit-city-authority-a11y-links.yml`) expands coverage without weakening the existing protected production/browser gates.

## What it checks

- Each of eleven city pages at mobile 390×844, tablet 768×1024 and desktop 1440×900: HTTP 200, visible H1, and automated axe-core WCAG A/AA rule testing tagged `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` (33 cases).
- Retains actual violation node targets, accessible failures, needs-review findings, affected city, viewport, status and representative HTML excerpt.
- Enumerates **all** visible anchors in each desktop city `main`, including official/external and internal resources. Deduplicates destinations across cities while retaining all context labels. Issues one or two network requests to each with redirect destination and statuses recorded.
- A 403/429/401, timeouts, unusual redirects or a single 404 are **not automatically declared confirmed editorial defects**. True 404/410 candidates must be reproduced and investigated for context; this runner only inventories them.
- Research artifact at `artifacts/city-authority-independent/independent-review.json`. Permanent artifacts retained by workflow for 30 days.
- A diagnostic run is started only on **protected main** after an exact-SHA protected production deploy. PR runs syntax check only, so a PR's working branch is never mistaken for deployed production.

## Interpretation and limitations

A zero-violation axe scan is **PASS_AUTOMATED_ONLY**; it does not establish image alt **meaning**, visual color contrast in all themes/states, keyboard focus order, accessible mobile-menu controls, touch target practicality, screen reader usability, user flows, link contextual correctness or full WCAG audit. An incomplete/needs-review node stays open for manual judgment. Not all external sites allow automated requests.

There is no claim of zero defects before the independent diagnostic has actually executed and its output has been reviewed. Full acceptance remains **PARTIAL / NOT CERTIFIED** per `docs/city-authority/INDEPENDENT_ACCEPTANCE_MATRIX_2026-10-10.md`.

## After the protected workflow executes

1. Retrieve the exact run ID, deployed SHA and JSON artifact; do not infer success from screenshot creation.
2. Triage each axe violation and link finding with URL, city, viewport, expected/actual behavior and severity. Reproduce high-impact issues in actual Chrome.
3. Fix shared confirmed defects once through focused PRs with protected checks, deploy and retest.
4. Independently exercise keyboard/menu/focus and manual contrast across mobile/tablet/desktop. Do not call this runner a WCAG certificate.
5. Update eleven-city acceptance matrix with exact source/run evidence; leave unsupported fact and GIS statuses UNVERIFIED.
