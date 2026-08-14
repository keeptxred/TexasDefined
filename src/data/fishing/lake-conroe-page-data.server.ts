import {
  lakeConroeAccess,
  lakeConroeBoatingNotes,
  lakeConroeCamping,
  lakeConroeFish,
  lakeConroeHabitat,
  lakeConroeNearby,
  lakeConroeOverview,
  lakeConroeRegulations,
  lakeConroeReportSnapshot,
  lakeConroeSources,
} from "./lake-conroe-prototype";

export function loadLakeConroePageDataServer() {
  return {
    overview: lakeConroeOverview,
    habitat: lakeConroeHabitat,
    boatingNotes: lakeConroeBoatingNotes,
    reportSnapshot: lakeConroeReportSnapshot,
    sources: lakeConroeSources,
    fish: lakeConroeFish,
    access: lakeConroeAccess,
    regulations: lakeConroeRegulations,
    camping: lakeConroeCamping,
    nearby: lakeConroeNearby,
  };
}
