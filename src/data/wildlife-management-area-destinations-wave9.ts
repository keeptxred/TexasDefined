import { wildlifeManagementAreaWave10Destinations } from "./wildlife-management-area-destinations-wave10";
import type { Destination } from "./types";

/**
 * Compatibility bridge retained for the preserved destination catalog.
 *
 * The four records that originally lived in Wave 9 — Caddo National
 * Grasslands, Cooper, M.O. Neasloney and Pat Mayse — are already canonicalized
 * in Wave 2 and were removed as dead duplicates. The preserved catalog already
 * imports this Wave 9 export, so it now forwards the verified final current-name
 * gap set from Wave 10 without requiring another edit to the highly concurrent
 * central destination catalog. Revalidated against current protected main on
 * 2026-09-05.
 */
export const wildlifeManagementAreaWave9Destinations: Destination[] = [
  ...wildlifeManagementAreaWave10Destinations,
];
