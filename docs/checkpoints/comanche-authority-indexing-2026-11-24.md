# Comanche authority and indexing checkpoint — 2026-11-24

## Published and merged
- PR #7726 commit 20a4002423c7434eb753ee7d4b10426ad77ced54: Comanche rail history, licensed street photo, reciprocal links, visitor access and SEO metadata. Production workflow 45412181091 completed successfully; live city, county and museum checks showed content and links.
- PR #7729 merged commit 999d1ab44f5db6e7491e224b64fde1d219e80bbf: NPS National Register identifier 100001872 for the Frisco depot; Preservation Texas 2012 conservation reopening; research integrated into city, county and museum source guides; monthly source review and live checks. That commit's deployment 45423249403 ended 'superseded source' after a newer main revision, not a substantive failed page validation.
- Monthly editorial GitHub issue schedule: .github/workflows/refresh-comanche-editorial-monthly.yml (1st of month at 14:37 UTC); weekly/postdeploy live checks: .github/workflows/verify-comanche-authority-production.yml.
- Latest authenticated Search Console URL Inspection snapshot still historical: city soft 404 (2026-10-19 crawl); county crawled-not-indexed (2026-10-13); museum old noindex (2026-10-07). These cannot certify November revisions have been crawled.

## Outstanding fix on this branch
- Primary /sitemap.xml still displayed /county/comanche <lastmod>2026-08-04</lastmod> despite substantive November 24 county editorial revision; city and museum were discoverable in /sitemap-explore.xml.
- Updated sitemap primary county override to 2026-11-24 and versioned edge cache key; expanded Comanche live acceptance to check exact three sitemap URLs and lastmod.
- PR #7731: https://github.com/keeptxred/TexasDefined/pull/7731. Required protected 'Merge Gate' status was not yet reported to GitHub after PR creation. Auto-merge enabled; manual merge returned 405 required status check expected.

## Exact next action
1. Wait for or recover required GitHub Merge Gate on PR #7731; troubleshoot trigger if absent, then merge through protected branch.
2. Verify production deploy for new merge commit; if superseded by later main, verify the newer successful deploy contains same changes.
3. Independently fetch fresh XML for /sitemap.xml and /sitemap-explore.xml and confirm /county/comanche /destination/comanche and /destination/comanche-county-historical-museum are present with <lastmod>2026-11-24</lastmod>; run the 4-page Comanche live acceptance.
4. Reinspect all three URLs through connected owner Google Search Console on a future recrawl; never claim a fresh Google crawl until GSC reports one. Investigate any current live noindex and duplicate canonical first.
5. Close or update any new checkpoint issues with exact pass/fail evidence. Do not claim all sitewide checks successful merely from this Comanche work.
