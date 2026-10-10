# Batch 004: independently restricted Austin city-school reciprocal links
Date: October 10, 2026. All are branch-only, not verified live.

Austin ISD [official school directory](https://www.austinisd.org/schools) supplies each mapped school campus identity in Austin. School district service areas, stadiums and mailing postal city are **not** interchangeable with municipal location.

Twelve campus slugs have inbound /city/austin cards and matching school-to-/city/austin links:
- `austin` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-akins` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-anderson` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-bowie` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-crockett` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-eastside` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-johnson` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-lasa` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-mccallum` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-navarro` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-northeast` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-travis` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.

Excluded from city mapping on purpose: Lake Travis High (unincorporated Travis County); Westlake (West Lake Hills/Eanes jurisdiction), Vandegrift (Leander ISD campus); and Austin Achieve (charter, distinct campus and district addresses). All four retain properly scoped county links without an unverified city inference.

Code: src/routes/$kind.$slug.lazy.tsx inbound cards; src/routes/texas-high-school-football-teams_.$slug.lazy.tsx outbound Austin link; docs/football-authority/REGISTRY.json /city/austin per-school route. These are code-level commitments. A real /city/austin page and school render/browser regression is outstanding.
