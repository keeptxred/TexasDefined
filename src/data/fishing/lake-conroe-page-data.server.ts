import {
  lakeConroeAccess,
  lakeConroeCamping,
  lakeConroeFish,
  lakeConroeNearby,
  lakeConroeRegulations,
} from "./lake-conroe-prototype";

export function loadLakeConroePageDataServer() {
  return {
    fish: lakeConroeFish,
    access: lakeConroeAccess,
    regulations: lakeConroeRegulations,
    camping: lakeConroeCamping,
    nearby: lakeConroeNearby,
  };
}
