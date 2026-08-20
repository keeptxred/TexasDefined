import type { PaintedChurchMapPoint } from "./painted-church-map-points-legacy";

export const preindexPaintedChurchMapPoints: PaintedChurchMapPoint[] = [
  {
    slug: "palestine-first-presbyterian-church",
    lat: 31.762824,
    lon: -95.629489,
    precision: "exact-property",
    sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth25805/",
    sourceLabel: "Portal to Texas History — precise 410 Avenue A coordinate",
  },
  {
    slug: "houston-annunciation-catholic-church",
    lat: 29.756410,
    lon: -95.357300,
    precision: "exact-property",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Annunciation_Church_Houston_Texas.JPG",
    sourceLabel: "Wikimedia Commons geotagged church photograph / THC-linked property identity",
  },
  {
    slug: "waco-st-francis-on-the-brazos",
    lat: 31.560990,
    lon: -97.134050,
    precision: "near-property",
    sourceUrl: "https://mapcarta.com/W362324228",
    sourceLabel: "OpenStreetMap-derived St. Francis church-office coordinate at 315 Jefferson Avenue; church is immediately adjacent",
  },
];
