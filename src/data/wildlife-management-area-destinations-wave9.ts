import type { Destination } from "./types";

/**
 * Compatibility export retained for the preserved destination catalog.
 *
 * The four records that originally lived in this wave — Caddo National
 * Grasslands, Cooper, M.O. Neasloney and Pat Mayse — are already canonicalized
 * in Wave 2, which is imported earlier by the preserved catalog. Keeping a
 * second copy only adds dead payload because slug deduplication can never select
 * the Wave 9 versions.
 */
export const wildlifeManagementAreaWave9Destinations: Destination[] = [];
