# TexasDefined Backlink Command Center

This document defines the operating rules for earned-link acquisition. Private prospect names, email addresses, notes and outreach history **must not** be committed here; those fields live in the protected Supabase table and admin command center.

## What counts as a legitimate backlink

A backlink counts toward TexasDefined's referring-domain goals when all of the following are true:

1. A real third-party page contains a verifiable hyperlink to a canonical `https://texasdefined.com/...` URL.
2. The page and domain are relevant by topic, geography, institution, audience or cited source relationship.
3. The publisher independently chose to cite, recommend, credit or resource-link TexasDefined.
4. The link was not purchased for ranking credit, contractually required, mass-generated, or contingent on a reciprocal link.
5. The linking URL and destination URL are recorded, along with first-discovered and last-verified dates.

Follow and nofollow links are both legitimate relationship outcomes when they meet the rules above. The command center records the attribute separately so reporting does not confuse link legitimacy with link equity.

## Prohibited acquisition methods

Reject: Paid links intended to pass ranking credit; Private blog networks (PBNs) and expired-domain networks; low-quality directory submissions; automated profile/comment/forum links; sitewide widget/footer link schemes; bulk guest-post packages; guaranteed-link vendors; and excessive reciprocal-link networks.

Google's current spam policies describe buying or selling ranking links, excessive link exchanges, automated link creation and low-quality directory/bookmark links as link spam. Paid or sponsored links that are legitimate advertising should be appropriately qualified rather than treated as earned editorial backlinks.

Reference: https://developers.google.com/search/docs/essentials/spam-policies

## Relationship-first prioritization

Source outreach is prioritized on six factors. The protected editorial-outreach dashboard exposes these as a scorecard rather than relying on one opaque rank:

1. **Page strength** — whether TexasDefined's page is already complete enough to deserve review, correction, photography or citation.
2. **Organization authority** — the institutional authority of the tourism office, government body, museum, park, university, nonprofit, event organizer or other official source.
3. **Relationship likelihood** — the practical chance of building a useful communications or subject-matter relationship.
4. **Official assets opportunity** — access to approved photography, video, data, media kits or expert contacts.
5. **Recurring update opportunity** — whether dates, visitor details, exhibits, programs, closures, events or operating information change over time.
6. **Legitimate reference opportunity** — whether an independent TexasDefined guide could reasonably be useful enough to earn an optional reference without making a backlink the price of the relationship.

Relationship quality is weighted above backlink potential. A target with lower backlink probability can still rank highly if it can materially improve accuracy, official-source access or future reporting.

## Source-relationship workflow

The editorial source system and backlink command center work together as one pipeline:

`Published authority page → quality/indexability gate → managing authority or named source detected → contact research → verified communications/media contact → relationship-first outreach → correction/update/photo exchange → recurring source relationship → optional independent reference → verified backlink record if one appears`

Rules for each stage:

- **Published authority page:** only canonical public pages are eligible.
- **Quality gate:** a destination must pass the site's indexing audit before outreach. Failed pages go to the `Improve first` queue.
- **Automatic intake:** index-ready destinations with a current official URL and managing authority enter contact research automatically. Upcoming event guides and source-backed authority articles have separate conservative intake queues.
- **Contact research:** verify the current official media, communications, visitor-services or subject-matter channel. Never invent an address from a domain pattern.
- **Ready to contact:** the organization, contact path, page value and relationship reason are all specific.
- **Outreach:** lead with factual verification, updates, approved imagery, expert access or future notices. The backlink/reference sentence is optional and secondary.
- **Relationship maintenance:** record useful replies, future update channels, image permissions, correction contacts and press-release subscriptions.
- **Reference outcome:** if an organization independently references TexasDefined, record and verify the linking URL in the backlink command center. Do not turn the relationship into reciprocal-link trading.

Newly published destinations can therefore enter the queue without manual prospect creation while still requiring human contact verification before any message is sent.

## Pipeline

`Prospect → Researched → Ready to Contact → Contacted → Follow-Up → Replied → Link Won`

Terminal or cooling-off stages are `Declined`, `No Response`, and `Disqualified`.

- **Prospect:** plausible organization/domain, not yet researched.
- **Researched:** relevance, target page and likely contact channel verified.
- **Ready to Contact:** quality/relevance checks passed and outreach reason is specific.
- **Contacted:** first outreach sent; record the outreach date.
- **Follow-Up:** at least one reasonable follow-up sent; record the latest follow-up date.
- **Replied:** a substantive reply arrived, regardless of outcome.
- **Link Won:** verified live link exists; linking URL is required and backlink status must be Won.
- **Declined:** organization explicitly declined the request/relationship.
- **No Response:** reasonable outreach cycle ended without a reply.
- **Disqualified:** prospect fails quality, relevance, legitimacy or contactability checks.

## Outreach message structure

Use the protected dashboard's generated draft as the starting point. A good first email should contain, in this order:

1. The exact TexasDefined resource being maintained.
2. A short explanation that the purpose is to keep it accurate and useful.
3. Two to four specific asks such as factual review, approved images, update notices, media lists or expert contacts.
4. A clear statement that TexasDefined is not asking for paid placement or a reciprocal-link arrangement.
5. Only when appropriate, a final optional note that the organization may reference the resource if it is genuinely useful to its audience; no link is required.

For recurring events, explicitly ask to receive next year's dates, presales and planning updates before the public planning cycle begins. For museums, parks and attractions, prioritize access changes, exhibits, closures, public programs and approved editorial assets. For tourism offices and chambers, prioritize destination updates, press materials, local-source introductions and reusable imagery.

## Goals

Track distinct verified referring domains, not raw link count.

| Goal | Meaning |
| --- | --- |
| 10 domains | Establish the first credible external citation base. |
| 25 domains | Prove repeatable acquisition across multiple content clusters. |
| 50 domains | Expand beyond one-off relationships into a durable statewide network. |
| 100 domains | Maintain a broad, diversified referring-domain footprint with ongoing verification. |

The admin dashboard computes progress, remaining domains and percentage complete for 10, 25, 50 and 100.

## Duplicate prospect control

The database prevents an exact duplicate `referring_domain + destination_url`. The server also groups a domain that appears in more than one campaign and surfaces it as a cross-campaign duplicate warning.

Before contacting a flagged domain again, inspect the existing relationship, previous reply and most recent follow-up. A second destination can be legitimate; duplicated outreach should not be.

## Core campaign metrics

Every reporting period should include:

- prospects added
- prospects contacted
- replies
- links won
- unique referring domains won
- declines
- no responses
- Prospect → Contact rate
- Contact → Reply rate
- Contact → Link rate
- Reply → Link rate
- current total verified referring domains
- links needing re-verification
- duplicate domains across campaigns

Conversion denominators should be explicit. The command center uses cumulative lifecycle eligibility: Contacted includes records at Contacted or any later outreach stage; Replies include Replied, Link Won and Declined; Links Won includes only stage Link Won with backlink status Won.

## Monthly reporting format

Use this structure in the monthly SEO review:

### Backlink acquisition — YYYY-MM

**Outcome:** X new referring domains won; Y total verified referring domains.

**Pipeline**
- Prospects added:
- Contacted:
- Replies:
- Links won:
- Declined:
- No response:

**Conversion**
- Prospect → Contact:
- Contact → Reply:
- Contact → Link:
- Reply → Link:

**Quality**
- Follow links:
- Nofollow links:
- Links removed since prior verification:
- Won links overdue for verification:
- Cross-campaign duplicate domains requiring review:

**Best wins**
- Referring domain → TexasDefined destination → why the citation is relevant

**Next month**
- campaigns to continue
- pages/assets that need improvement before outreach
- relationships needing follow-up
- stale won links to re-verify

## Outreach governance

Outreach should lead with accuracy, useful resources, official data, media access, corrections, event updates or a genuinely useful TexasDefined guide. The link is not the price of coverage, citation, sponsorship, product, service or reciprocal placement.

Never promise coverage in exchange for a link. Never require a link in a contract. Never alter editorial rankings or facts because an organization linked to TexasDefined.

## Data handling

The public repository contains schema, policy and application code only. Private contact fields are stored in `public.texasdefined_backlink_prospects`, which has RLS enabled, no anon/authenticated grants, no public RLS policy, and service-role-only access through server-side code after the existing TexasDefined admin-key check.

## Reconciliation snapshot — 2026-10-09

This public-safe snapshot records aggregate command-center state only; private contact identities and message history remain in Supabase.

- 101 tracked outreach targets.
- 100 targets have a verified contact email; one researched record intentionally remains email-null while its official contact-form path is reviewed. This does not indicate an incomplete bulk contact-email backfill.
- 47 targets have been contacted; 46 are awaiting a response and one has replied.
- Three contacted records are eligible for their first relationship-first follow-up on or after 2026-10-09.
- 43 records have already received a follow-up: 4 on 2026-10-01 and 39 on 2026-10-08. Their recorded next actions are to wait/monitor rather than send repeated messages.
- The one reply is a source-relationship win (media-update access), not a backlink and not a recorded correction/asset delivery.
- 0 verified backlinks and 0 verified referring domains are currently recorded.
- 0 linking URLs are sitting in a discovered-but-unverified state.
- 0 exact duplicate `referring_domain + destination_url` rows exist.
- One referring domain legitimately spans three different destinations across two campaigns; the command center's cross-campaign duplicate warning is therefore relevant, but the rows are not exact duplicates and must be reviewed together before any additional outreach.

The discovery-first priority remains the maintained citation-magnet scorecard rather than increasing email volume. Highest-priority reference assets are the structured Texas Data datasets, county property-tax comparison/detail resources, appraisal-district explainer, statewide Texas Data hub, property-tax explainer, and verified utility lookups. Strengthen sources, methodology, verification dates, concise answer layers, and downloadable data on those canonical resources before expanding outreach.

