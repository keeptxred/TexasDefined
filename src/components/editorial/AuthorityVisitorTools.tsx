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
    }} />
  );
}
