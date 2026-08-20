import { paintedChurchMapPoints as legacyMapPoints } from "./painted-church-map-points-legacy";
import { preindexPaintedChurchMapPoints } from "./painted-church-map-points-preindex";
import type { PaintedChurchMapPoint } from "./painted-church-map-points-legacy";

export type { PaintedChurchMapPoint, PaintedChurchMapPrecision } from "./painted-church-map-points-legacy";

export const paintedChurchMapPoints: PaintedChurchMapPoint[] = [
  ...legacyMapPoints,
  ...preindexPaintedChurchMapPoints,
];

export const paintedChurchMapPointBySlug = new Map(paintedChurchMapPoints.map((point) => [point.slug, point]));
