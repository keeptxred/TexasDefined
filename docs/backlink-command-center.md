# TexasDefined Backlink Command Center

Verified: 2026-09-29

## Purpose

The Backlink Command Center extends the existing Editorial Source Outreach system with measurement. It separates three different things that must not be conflated:

1. **Editorial relationships** — organizations TexasDefined works with for accuracy, current information, source access or approved imagery.
2. **Outreach activity** — contact research, sent outreach, replies, follow-ups and relationship status.
3. **Verified backlinks** — a concrete external HTTPS page that actually links to a canonical TexasDefined URL.

A relationship, email reply, press mention, citation request or organization name is not a backlink until a real external linking URL is recorded.

## Admin surfaces

- `/admin/editorial-outreach` — relationship-first target and research queue.
- `/admin/backlinks` — acquired-link ledger, referring-domain totals, outreach pipeline and conversion reporting.

The backlink page reuses the already-unlocked Editorial Outreach admin session. It does not introduce a second credential flow.

## Backlink ledger fields

Every acquired-link record must contain:

- referring domain
- linking URL
- TexasDefined destination URL
- topic/content cluster
- organization, when known
- source type
- link type
- anchor/context
- current status
- first-seen date
- last-checked date
- source evidence
- optional notes

The validator requires HTTPS external links, verifies that the referring domain matches the linking URL host, rejects internal TexasDefined URLs, rejects duplicate linking URLs, validates dates and preserves lost links rather than deleting history.

## Outreach activity fields

Manual outreach history supports:

- target ID
- organization
- TexasDefined destination
- topic/content cluster
- source type
- contact name/email/URL when actually known
- stage
- sent date
- last contact date
- follow-up date
- next action
- notes

Stages are: `research`, `ready`, `sent`, `replied`, `relationship`, `won-link`, and `closed`.

`won-link` should be used only when the corresponding concrete external linking URL can also be added to the verified backlink ledger.

## Reporting

The dashboard reports:

- verified live backlinks
- unique referring domains
- lost backlinks
- links needing review
- pipeline target count
- ready-to-contact count
- outreach sent
- replies
- active relationships
- won links
- response rate
- link conversion rate
- live links and pipeline targets by topic cluster
- live links and pipeline targets by source type

The initial verified-backlink count is intentionally zero until a concrete external link is observed and checked. The dashboard must never manufacture a backlink count from outreach relationships.

## Governance

The backlink system inherits TexasDefined's editorial outreach rules:

- no paid-link schemes
- no reciprocal-link schemes
- no guaranteed backlinks
- no fabricated contacts
- no backlink request as the primary purpose of editorial outreach
- accuracy, official updates, useful source access and approved imagery come first
- optional reference language is secondary and only appropriate when the TexasDefined resource is genuinely useful

The existing `editorial-outreach:validate` gate invokes the backlink-command-center validator, so repository validation fails if these contracts regress.

## Operating workflow

1. Improve the TexasDefined page until it is citation-worthy and index-ready.
2. Research the correct organization/contact through Editorial Outreach.
3. Contact the organization for fact verification, updates, source access or approved media.
4. Record real outreach activity when it occurs.
5. If a concrete external link appears, verify the external URL and add it to the backlink ledger.
6. Recheck live links periodically. Mark removed links `lost`; do not erase them.
7. Use response and link-conversion reporting to learn which topic clusters and source types produce durable relationships and legitimate references.
