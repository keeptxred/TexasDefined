import { lazy, Suspense } from "react";

export type CityPassMarket = "Dallas" | "Houston" | "San Antonio";
export type CityPassSurface = "destination" | "city" | "sports-venue";

type CityPassCalloutProps = { market?: CityPassMarket; surface?: CityPassSurface; slug?: string; placement?: "inline" | "rail" };

const CityPassCalloutContent = lazy(() => import("./CityPassCalloutContent").then((module) => ({ default: module.CityPassCalloutContent })));

export function CityPassCallout(props: CityPassCalloutProps) {
  return <Suspense fallback={null}><CityPassCalloutContent {...props} /></Suspense>;
}
