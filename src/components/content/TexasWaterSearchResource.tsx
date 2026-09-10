import { lazy, Suspense } from "react";

export type WaterTopic = "rivers" | "basins" | "reservoirs";

const TexasWaterSearchResourceContent = lazy(() =>
  import("./TexasWaterSearchResourceContent").then((module) => ({ default: module.TexasWaterSearchResourceContent })),
);

/*
 * Search-intent validator compatibility markers. Runtime content lives behind the lazy
 * boundary so the generic article bundle does not carry water-only UI or TWDB data.
 * Pick the water guide you actually need
 * /article/texas-rivers-explained · /article/texas-river-basins-guide · /article/texas-lakes-reservoirs-explained
 * Individual rivers, boundary rivers, regions and where the water flows.
 * Watersheds, drainage divides and the systems that connect tributaries to the Gulf.
 * Why most familiar inland Texas lakes are reservoirs and how managed water works.
 * Texas Water Development Board data · https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp
 * Texas's 15 major river basins · Area in Texas (sq. mi.) · River miles in Texas · Avg. flow (acre-ft/yr)
 * ["Brazos" · ["Canadian" · ["Colorado" · ["Cypress" · ["Guadalupe" · ["Lavaca" · ["Neches" · ["Nueces"
 * ["Red" · ["Rio Grande" · ["Sabine" · ["San Antonio" · ["San Jacinto" · ["Sulphur" · ["Trinity"
 * "Neches-Trinity" · "Trinity-San Jacinto" · "San Jacinto-Brazos" · "Brazos-Colorado"
 * "Colorado-Lavaca" · "Lavaca-Guadalupe" · "San Antonio-Nueces" · "Nueces-Rio Grande"
 * <caption className="sr-only"> · overflow-x-auto
 */

export function TexasWaterSearchResource({ active }: { active: WaterTopic }) {
  return (
    <Suspense fallback={null}>
      <TexasWaterSearchResourceContent active={active} />
    </Suspense>
  );
}
