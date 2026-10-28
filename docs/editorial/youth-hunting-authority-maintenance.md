# TexasDefined youth hunting authority — maintenance contract

Page: /hunting/youth-hunting
Official source: https://tpwd.texas.gov/regulations/outdoor-annual/regs/season-types/youth-only
Maintained snapshot: src/data/hunting/youth-hunting-data.ts

## GitHub schedule

.github/workflows/monitor-youth-hunting.yml runs every Monday at 12:23 UTC and supports workflow_dispatch. It verifies the official license-year heading, all 11 required season/zone rows and source-year bounds. It preserves the verification timestamp when official date data is unchanged.

The next official calendar cannot replace the active season before September 1. If the old season remains after August 31, monitoring fails closed and the public page marks the date table as an archive.

The monitor checks separate official youth license, hunter education and Texas Youth Hunting Program price/age markers. Changes to legal requirements, fees, access rights or nonstandard date/zone structures raise an issue instead of generating unverified rules.

## Protected updates

Routine verified dates update only src/data/hunting/youth-hunting-data.ts and create a GitHub bot PR using a run-linked automation/youth-hunting-dates branch. The separate .github/workflows/finish-youth-hunting-refresh.yml verifies exact bot identity and permitted file scope, reconciles main, dispatches full validate.yml and merge-gate.yml against the exact PR head, and enables protected auto-merge only after both pass. It never writes directly to main.

After the verified merge, the finisher explicitly starts the existing deploy-production.yml workflow because bot-created merges do not trigger normal push workflows. Existing Cloudflare release controls remain unchanged.

## Testing and recovery

Offline: node --test scripts/data/refresh-youth-hunting-calendar.test.mjs
Offline contract: node scripts/data/validate-youth-hunting.mjs
Existing hunting gate: node scripts/data/validate-hunting-authority.mjs
Official policy check: node scripts/data/validate-youth-hunting.mjs --online
Dry-run source comparison: node scripts/data/refresh-youth-hunting-calendar.mjs
Generate only verified date edit: node scripts/data/refresh-youth-hunting-calendar.mjs --write

Do not force publication after TPWD source failure, missing categories, changed age rules or unknown fees. Investigate the opened issue and reconcile each change against current official county and species regulations.

## Editorial principles

The guide is independent planning content, not a replacement for TPWD or federal legal rules. County, zone, access permission, public-property legal game, tagging and reporting still control individual hunts. A verified date does not imply a public property is open or a young hunter meets all eligibility requirements.

## Reader experience and image provenance

The published page uses the shared image contract in `src/data/hunting/youth-hunting-data.ts` for its visible hero, social preview, and Article structured data. Photo: Tony Ifland / U.S. Fish and Wildlife Service, public domain, source: https://www.fws.gov/media/youth-hunter. This photograph illustrates youth hunting in the United States and must never be captioned as a Texas-specific hunt. If the remote image becomes unavailable, replace it with a locally hosted, verified-rights image; do not silently revert to an unrelated state-park social fallback.

`src/data/hunting/youth-hunting-status.ts` classifies each semicolon-separated youth-season window independently according to the America/Chicago calendar date, including transitions on opening and closing days. Unknown formats show "Verify with TPWD" rather than inferred eligibility. The official TPWD county links are constructed from TexasDefined's existing 254-county slug registry; the selector does not state that a county or property is open.

The same `YOUTH_HUNTING_SECTIONS` drives the visible in-page links and the ItemList schema. Desktop uses the dated table; small screens use readable cards with identical source-linked entries. The youth-only information itself is still controlled by the existing verified TPWD calendar importer. Editorial corrections go to admin@texasdefined.com.

Regression tests: `node --test scripts/data/youth-hunting-calendar-status.test.mjs`. The scheduled youth-monitor workflow also runs them and the focused production canary verifies the county selector, image attribution, and calendar status.

TPWD county-slug exception: TexasDefined `la-salle` must link to official `/regs/counties/lasalle` (not `/la-salle`). This is asserted by the youth authority source contract.
