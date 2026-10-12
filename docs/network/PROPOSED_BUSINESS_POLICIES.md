> **CURRENT PRODUCTION STATUS — October 11, 2026 (supersedes older prelaunch paragraphs below).** Owner requested production release. Network foundation PR [#4545](https://github.com/keeptxred/TexasDefined/pull/4545) **merged** into `main` as `b49764dcc6f8ad3a212338e5786a4ea77e66dd14` after four exact-HEAD green workflows on `7880c94984404dc683770da3e58446fc9eed3273`. The four security migrations below were **successfully installed in shared production Supabase** and independently confirmed by query. PostgreSQL assigned versions `20261011183108` (owner SELECT revocation), `20261011183126` (sensitive-action audit), `20261011183129` (manual Graph reconciliation), `20261011183131` (atomic private Storage quota). Protected policy includes `access_enabled=true` and `membership_tier='featured'`; all three atomic quota triggers and both private audit tables are present. Zero Network applications/objects preceded migration. No hosted test customer, Stripe charge, Graph send, public activation or website deployment verification has occurred. The `supabase/pending/` copies now represent historical, **already-applied** source mirrors for CI; normal versioned source files are tracked under `supabase/migrations/`. No additional application of these SQL files is authorized or needed. Payment, Graph delivery, owner-portal and public indexing launch decisions remain separate. This is an accurate *repository/database release*, not proof of successful Cloudflare live route deployment.

# TexasDefined Business Network — draft owner-facing business policies

**STATUS: PROPOSED ONLY / NOT APPROVED / NOT PUBLISHED.**
This file is a decision-ready draft for the **sole TexasDefined administrator**. It is not legal advice, an enforceable contract, an approved pricing announcement, a launch authorization or a substitute for review of applicable law. Do not copy it to production pages, mail customers, activate enrollment or charge anyone until the administrator approves the final wording.

## 1. Directory eligibility and accuracy — proposed customer copy

> TexasDefined accepts listings for legitimate businesses with a verifiable connection to Texas. Applicants must have authority to represent the business and must provide accurate names, service locations, contact details, descriptions and relevant credentials. We may request independently verifiable information before approving a listing. Submitting an application does not guarantee acceptance, publication, search placement or traffic.

**Owner approval required:** Define Texas operating-area minimum, acceptable business categories, home-service/online-only rules, prohibited content, regulated businesses, and the specific evidence acceptable for the business's legal/operator identity.

## 2. Plans and benefits — provisional commercial framework

| Plan | Currently configured | Approval still required |
|---|---|---|
| Basic | Free application/listing framework | Exact included fields, media, promotion promises and permanence |
| Plus | $19.99 per month in existing Stripe price configuration; live product inactive | Exact media/field benefits, renewal disclosure, tax treatment and price changes |
| Featured | Draft/revision infrastructure exists; no approved price | Price, criteria, tier provisioning, feature inventory and any downgrade transition |

> Prices, availability and benefits displayed at enrollment will be confirmed before any paid order. A paid plan does not purchase favorable editorial reviews, a guaranteed ranking or automatic publication.

**Never publish or accept money under an undecided Featured offer.** Do not silently promise any benefit the software does not actually deliver.

## 3. Ownership verification and owner accounts — proposed customer copy

> Business profile access is issued only after TexasDefined independently verifies the applicant's relationship to that business. We may verify control of an official company domain, examine reliable business-registration records, call a previously published business contact number, or use another documented method. A matching email address or application checkbox is not sufficient by itself. Verified owners may access only records they are authorized to manage, and access may be disabled if ownership is disputed or cannot be confirmed.

**Operations:** Keep evidence reference, method, reviewer label, verification date and decision in protected audit records. Never request passwords, full personal IDs or unrelated financial account credentials.

## 4. Editorial review, corrections and appeals — proposed customer copy

> Listings are reviewed before publication. TexasDefined may reject, request changes to, suspend or remove submissions that are inaccurate, misleading, unverified, infringing, abusive or inconsistent with the published eligibility rules. Verified owners can request corrections or appeal decisions by writing to admin@texasdefined.com. We will review supporting evidence and keep relevant decision records as permitted by applicable law.

**Owner approval required:** Define review and appeal process, whether any response-time target will be offered, and documentary retention. Avoid promises of fixed review turnaround before it is operationally supported.

## 5. Photos, descriptions and intellectual-property rights — proposed customer copy

> By submitting text or media, you confirm you own it or have permission to use and authorize its public display in your approved TexasDefined listing. You retain ownership of your content, subject to a limited permission for TexasDefined to store, edit for formatting, display and distribute the approved listing and media. Do not submit third-party logos, photos, copyrighted descriptions or identifiable individuals without the rights and permissions needed for that use. Contact admin@texasdefined.com to request a correction or report an alleged rights violation.

**Owner approval required:** Final license scope, withdrawals, takedown/documentation handling, and whether licensed stock images are eligible. Do not automate destructive media cleanup; media may be referenced by prior approved revisions.

## 6. Subscription cancellation, refunds and lapse — decisions needed before charging

**The owner must choose and approve**: cancellation effective immediately or at end of paid term; any prorating; refund eligibility for duplicate/erroneous charges or non-delivery; handling when the listing is rejected or suspended; taxes; dispute process; notice cadence; and access to cancellation when the owner portal is closed.

**Proposed operational invariant (already part of code safeguards):**
> A paid listing may be taken out of public view when the subscription is not eligible or payment fails. Restoring payment eligibility does not automatically republish an unreviewed or previously suspended listing; separate editorial authorization may still be required.

No final cancellation/refund promise is approved by this draft. Ensure the actual billing portal/cancellation and support path work **before** paid subscriptions can begin.

## 7. Data, consent, retention and deletion — proposal pending privacy review

Data anticipated: contact/business information, owner Auth identity, proof-of-ownership references, private images and draft revisions, public listing content, Stripe subscription identifiers (not card numbers), moderation/audit history and notification state.

**Proposed public-language direction:**
> TexasDefined uses information supplied for application review, verified-owner access, billing administration, publication of approved business information, security and account notices. Unapproved identity evidence and private media will not be intentionally published. Public business information may become searchable only after a separate publication decision. You may contact admin@texasdefined.com about inaccurate, outdated or inappropriate listing data.

**Owner decisions required:** Exact retention by data class; rights/requests workflow; minimum hold for pending appeals or fraud disputes; access/deletion procedure, backup retention, vendor processing details and privacy-law review. Existing **45-day media inventory** is only a read-only orphan diagnostic, *not* a deletion deadline. A **90-day post-moderation/appeal hold** was suggested in the runbook but is NOT an approved guarantee or cleanup schedule.

## 8. Notices and marketing — proposed copy

> We may send essential application, verification, membership, billing or moderation notices to the verified contact address. Optional marketing communications require a separate, freely chosen consent where required. You can ask for corrections or assistance at admin@texasdefined.com.

**Operational limits:** The only intended sender is **admin@texasdefined.com** on the approved TexasDefined Office 365 service. The outbox is currently non-sending. Do not use a personal Gmail account; do not infer provider delivery from a Graph HTTP 202; do not send even test mail absent express authorization.

## 9. Search indexing, launch and publication — proposed public-facing promise

> A submitted business is not public until TexasDefined approves and publishes it. Draft applications, private media, review notes and verified-owner account details are not public directory content. A published listing may be visible through search engines once directory indexing has been separately enabled.

**Launch gates:** Keep all Network preview routes noindex, public promotion off, checkout off, notification sending off and editorial publication off until the sole administrator authorizes their specific activation and the required Auth/Storage/Stripe/Graph staging tests are satisfied.

## Approval register — complete before exposing final terms

- [ ] Confirm eligibility/category/ownership evidence rules.
- [ ] Approve exact Basic and Plus benefits and whether $19.99/month remains the live Plus price.
- [ ] Decide Featured price, benefits, upgrades and downgrades.
- [ ] Approve image/text permission wording, license/takedown process and privacy statement.
- [ ] Approve review, rejection, correction and appeal procedure.
- [ ] Approve cancellation effective date, refunds/proration, tax/dispute handling and subscription-lapse visibility.
- [ ] Approve retention/deletion schedules by data type and orphan cleanup authorization/audit.
- [ ] Approve owner notices and separate marketing consent.
- [ ] Authorize isolated non-live staging service credentials and test identities.
- [ ] Separately approve Graph test messages, merge, production deployment, payment collection, public directory indexing, and publication.

**Until approved:** all sections remain drafts, no new legal or commercial promise has been made, and the current release decision remains **UNSAFE TO MERGE — NOT READY TO LAUNCH**.

## Sole-owner consolidated commercial decision sheet — proposed defaults ONLY (October 11)

**No box below is approved.** The sole administrator must approve/amend in a single written decision before binding customer copy, enabling paid plans or inviting real businesses. The recommendations are planning defaults, not legal advice.

| Decision | Proposed operational default for owner approval | Open choice / exception |
|---|---|---|
| Eligibility | Actual Texas-facing operating business; independently verify Texas service/physical presence and responsible representative | Purely remote/non-Texas merchants and regulated categories require explicit editorial rule |
| Authority proof | Business registration or authoritative public listing **plus** independent control of official company domain or call to independently published phone; store evidence reference, date and reviewer | Alternate verified method for sole proprietors without registration |
| Basic | Free, reviewed public core identity, category, city/area and approved contact/website where supported; no placement/traffic guarantee | Confirm exact form fields, limits and permitted photos in deployed UI |
| Plus | **Proposed** $19.99/month recurring for enhanced reviewed listing and already-supported links/gallery/events/insights where implemented; no ranking or publication guarantee | Confirm included limits/benefits and tax/renewal disclosures with actual UI and live configuration |
| Featured | **Do not sell until price, benefits and provisioning workflow are specified**; reviewed revisions only, 24 private draft objects max is an operational quota, not commercial promise | Owner must set price, prominence rules, renewal, add/remove benefits and downgrade behavior |
| Editorial process | Sole owner reviews all submissions, change requests and independent ownership evidence; provide corrections and appeals via admin@texasdefined.com; no fixed response-time SLA | Record rejection/suspension grounds and independent final approval |
| Intellectual property | Applicants warrant rights to publish submitted photos/logos/text; grant limited listing-use license; investigate documented takedown requests; do not reuse for unrelated ads without permission | Final rights/license, stock-photo permissions, withdrawal and backup handling |
| Cancellation | **Proposed** cancellation stops auto-renewal at end of current paid billing cycle, with access ending when entitlement ends; no automatic republish upon payment recovery | Choose immediate versus term-end, exceptions for suspension, and accurate portal behavior |
| Refunds / tax | **Proposed** review erroneous/duplicate charges individually; no promise of automatic prorated refund; disclose correct tax collection per tax advice/configuration before charging | Legal/tax review of sales tax, refunds, disputes and required consumer disclosures |
| Failed payment | Restrict paid entitlement and public visibility upon ineligibility; owner can resolve through billing support even if dashboard is unavailable | Determine grace period and notice cadence |
| Retention | Minimum necessary proof, audit, account and media data; preserve legal disputes/appeals; inventory orphaned media read-only first; owner approval before deletion | Approve exact retention periods, backups, deletion requests and incident holds by data class |
| Messages | Essential transactional account/application/billing notices only when authorized; distinct voluntary consent for marketing | Approve sender, consent language, unsubscribe/support procedure |
| Discovery | Only editorially approved and separately published listings indexable after launch authorization; private drafts/verification NEVER indexed; label paid promotion | Approve sponsor/featured disclosure and indexing launch timing |

**Owner response required:** Mark each row `APPROVE` / `AMEND: …` / `DEFER`, assign exact Featured price or leave Featured disabled, and confirm whether sole-admin release permissions (SQL, staging, test mail, merge, live billing, indexing) are each individually granted. Absence of a response is **not** approval. Security revocation, hosted provider testing, and legal review remain release blockers regardless of commercial decisions.
