# Historic Churches of Texas — permanent authority and release standard

**Collection:** /explore/historic-churches  
**Source of truth:** src/data/historic-churches.ts  
**Template:** src/routes/explore.historic-churches.$slug.tsx  
**Verification:** npm run historic-churches:validate and npm run historic-churches:validate:strict  
**Initiated:** October 12, 2026

## Editorial boundaries

A **historic church** is an actively or formerly used religious property with a documentable contribution to Texas architecture, settlement, worship, community organization, education, preservation, cultural heritage or an event. It may be Catholic, Protestant, Orthodox, Jewish religious heritage should get its own accurate house-of-worship taxonomy as applicable, or another tradition, and is never designated by religious preference. Church age alone is not sufficient: show the historical significance and the controlling records.

**Historic Churches of Texas is NOT synonymous with Painted Churches of Texas.** Do not automatically add entries to the narrower Painted Churches census or claim NRHP/RTHL designations unless a primary register record verifies them. For decorative painting, require church-specific dated sources: visual documentation, original/restored artist or workmanship, technique, integrity and attribution. Commercial combined "painted and historic" tours are not proof of a Painted Church designation.

Maintain original building, replacement building, founding, parish formation, fire, relocation, restoration and current building as **separate events**. An earlier parish year must not be displayed as the construction date of today's sanctuary.

## Minimum authority dossier for every new church

- Unique permanent canonical slug, precise official name and aliases; locality and county based on verified church location, not an ambiguously named neighboring parish.
- One-sentence direct answer immediately visible; visitor-oriented summary; substantial historical narrative; sourced timeline of at least four decisive events.
- Architecture/materials/art and preservation analysis that does not invent unknown artists, construction dates, designations, interior access or tours.
- Historical significance tied to local community, migrant histories, worship and schools as documented; acknowledge unknowns and conflicting dates.
- Verified street address where available, official contact/visit source, access and service priority, parking and accessibility **only if verified**, practical nearby stops and relevant county links.
- At least three church-specific, well-researched FAQs that answer actual visitor and history questions (location, building dates, service access, art, differing classifications). The FAQ answers must cite the same controlling facts as the underlying profile; no generic AI filler.
- At least two attributable, current primary or reputable specialist source links. Historical claims should trace back to parish records, THC Atlas, National Register, TSHA or archive finding aids; label secondary marker transcription, oral history and independent travel journalism distinctly.
- At least one independently documented image **for release**: original property only, descriptive alt text, author, copyright license, source link, dimensions, no paid/copyrighted hotlinks without permission; a gallery is encouraged when real rights-cleared photos exist. No AI-fabricated representation of a real existing church as a documentary photo. Rights-cleared free-to-use material is not always free of attribution or share-alike conditions.
- Reciprocal contextual links: collection index, 2–4 related peer churches, the relevant county page, related settlement/heritage topics, and an optional Painted Churches crosslink **when informative**.
- Metadata: unique title, description, canonical URL, breadcrumbs, Church and WebPage/CollectionPage schema as appropriate, date last reviewed and preferred citation.
- Responsive, semantic headings, accessible image captions, link text and usable page on mobile and desktop.

## Release process

1. Research first. Capture a source ledger, dates and church-specific classification decision. Don't pad a guide with generic religion explanations.
2. Audit the repository for an existing canonical church page, redirect aliases if consolidating and prevent duplicate church records.
3. Verify each image file and permission directly. Record author, license, archive URL and changes; do not assume parish photos or third-party editorial images are free.
4. Add the complete typed record. The central template, site discovery pathways, reciprocal county context, sitemap and SEO should expand automatically.
5. Run **npm run historic-churches:validate** for baseline data integrity, then **npm run historic-churches:validate:strict**. The strict check blocks release if photo clearance is unresolved.
6. Run build, link/SEO tests, responsive keyboard and image checks and review the produced page against its primary sources. Only merge and deploy after release checks pass and published routes are observed in production.

## First-wave progress (2026-10-12)

| Church | Research | Image rights | Painted classification |
|---|---|---|---|
| St. Joseph's — Yoakum | Parish sources and timeline | Awaiting correctly licensed real photo | Not established |
| St. Mary's — Hostyn Hill near Ellinger | THC marker, 1983 National Register grouping and Houstonia interior description | Awaiting correctly licensed real photo | Related historic-church suggestion: gilded altar, statuary, simple blue ceiling; not listed in the 1983 decorative-interior group |
| St. Peter's — Blessing | Parish and published historical marker transcription | Awaiting correctly licensed real photo | Not established |
| St. Joseph's — Moulton | Parish, THC marker | Two CC BY-SA 4.0 church photos from Wikimedia Commons | Research candidate only |
| Sts. Peter and Paul — Frelsburg | Parish history | Two CC BY-SA 4.0 photographs from Wikimedia Commons (exterior, historic marker) | Research candidate only |

**Do not mistake early completion of five text profiles for fully cleared photography, independent browser validation or production acceptance.** No launch claim until those gates pass. Moulton's 1924 date denotes the present-church cornerstone, not a verified completion date. Ellinger/Hostyn Hill is distinct from Hostyn near La Grange and from other St. Mary's parishes. Frelsburg's subject is Saints Peter and Paul, not St. Mary's. Blessing's 1976 building and earlier sites are described on THC marker 15337, corroborated by marker photography and the local historical commission's 2009 dedication list. Yoakum's diocesan listing gives the church at 210 Schrimscher Street while the parish lists its office at 401 Orth Street: distinguish them in visitor mapping. The active St. Mary parish records the 2005 restoration and 815 St. Mary's Church Road address.
