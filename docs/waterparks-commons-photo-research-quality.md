# Waterparks Commons research — bounded editorial leads

Date: 2026-10-17. Scope: TexasDefined individual waterparks.

## Baseline evidence

Initial production Commons research [run 39090557367](https://github.com/keeptxred/TexasDefined/actions/runs/39090557367) successfully requested 20 unphotographed waterpark facilities and produced **zero exact named-city licensed photo candidates**, with zero provider failures. This is not evidence that exact-site photography is unavailable; the initial long-name + city + Texas query is needlessly narrow for some Commons naming.

## Fail-closed update

The candidate research script tries one alternate distinctive venue-name query if the initial name+city+Texas query finds no exact-city match. For each park there are at most two bounded Commons requests (eight results each), with the existing maximum of 25 parks per run, 20 default and a 12-second timeout. No broad scan, no retry loop, no paid service.

A candidate still requires a commercial-compatible Commons license, an adequate image size, the park's city and at least one distinctive park-name token in the title or source description. Separately, weak brand-name results with two distinctive matching tokens but **without independent city verification** may be retained in a `provisionalLeads` review-only field with the explicit state `UNVERIFIED_LOCATION_POSSIBLY_OTHER_CITY_DO_NOT_PUBLISH`. The provisional leads are **not approved images**, and may depict an entirely different park, county or state. Human source, location, rights, timing and context checks remain mandatory.

The script never changes the site's waterpark registry, media credit, authority certification, publishing queue, indexability or production deployment. Its GitHub action only exports a JSON artifact for an editor. No one should equate a report with rights clearance, or assume all resulting photographs are usable without independent review.
