# Destination authority rendering: one substantive guide per page

The canonical `/destination/:slug` route has two shared downstream content layers:

1. `DestinationVisitPlanner` mounts `DestinationAuthoritySections` within the trip-planning section.
2. `DestinationRelationships` may mount a complete `DestinationAuthorityGuide`.

For registered historic sites and ranked attractions, both layers could independently repeat the exact same `authorityGuide.whyItMatters`, three `authorityGuide.itineraries`, source references, and trip-planning assessment. That is a systemic duplicate-content problem, not a short-copy problem on one destination.

The shared `shouldRenderFullDestinationAuthorityGuide(destination)` predicate is now the single source of truth for both placements. When a full guide appears later, the inline visitor planner **keeps useful specific FAQ answers and documentary photo credits** without repeating the editorial guide. If there is no separate full guide, the inline guide still displays the complete research. Existing exceptional handling is preserved: Chamizal uses its inline guide, while Moody Gardens retains its dedicated spotlights. Source and access rules are unchanged.

The existing destination data-integrity gate now checks both render sites, the visitor-FAQ/photographic evidence preservation, and the shared decision. WhirlyBall-specific authority regression was updated to look at the canonical predicate, not the location of an inline set.

No paid dependencies, DB migration, general layout rewrite, or blanket field requirements. This must pass the protected merge gate before release and be verified on representative public pages after deployment.
