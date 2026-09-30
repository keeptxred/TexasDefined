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
