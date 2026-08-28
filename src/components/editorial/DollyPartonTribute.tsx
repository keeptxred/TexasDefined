import { lazy, Suspense } from "react";

const TRIBUTE_EXPIRES_AT = Date.parse("2026-09-04T20:28:00Z");
const TributeContent = lazy(() => import("./DollyPartonTributeContent"));

export function DollyPartonTribute() {
  if (Date.now() >= TRIBUTE_EXPIRES_AT) return null;
  return <Suspense fallback={null}><TributeContent /></Suspense>;
}
