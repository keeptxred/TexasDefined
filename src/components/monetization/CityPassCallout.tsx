import { lazy, Suspense } from "react";

import type { CityPassMarket } from "@/data/citypass";

export type { CityPassMarket } from "@/data/citypass";

const CityPassCalloutContent = lazy(() =>
  import("./CityPassCalloutContent").then((module) => ({ default: module.CityPassCalloutContent })),
);

export function CityPassCallout(props: { market: CityPassMarket; placement?: "inline" | "rail" }) {
  return <Suspense fallback={null}><CityPassCalloutContent {...props} /></Suspense>;
}
