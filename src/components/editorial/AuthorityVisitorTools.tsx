import { VisitorPlanningToolkit } from "./VisitorPlanningToolkit";
import {
  currentVerifiedOffers,
  fredericksburgWineExperience,
  fredericksburgWineryPlaces,
} from "@/data/authority/experience-registry";

/** Fredericksburg supplies its unique context to a shared visitor component. */
export function AuthorityVisitorTools() {
  return (
    <VisitorPlanningToolkit profile={{
      title: "Fredericksburg winery",
      subjectPlural: "winery experiences",
      destinationSlug: fredericksburgWineExperience.primaryDestination,
      places: fredericksburgWineryPlaces(),
      offers: currentVerifiedOffers(),
      routes: fredericksburgWineExperience.routes,
      comparisonNote: "These are selected, source-backed experiences, not a complete Fredericksburg winery directory. Individual winery pages own their detailed history, visitor facilities and operator information.",
      mapNote: "Compare downtown tasting rooms with the Highway 290, Stonewall and Hye estate locations. An operator may have multiple, non-interchangeable addresses.",
      safetyNote: "Route stops do not imply operator availability or live drive times. Reserve tastings and use sober transportation after any drinking.",
    }} />
  );
}
