import type { PaintedChurchVisitorStatus } from "./painted-church-visitor-status-legacy";

const CHECKED = "2026-08-20";

export const preindexPaintedChurchVisitorStatuses: PaintedChurchVisitorStatus[] = [
  {
    slug: "palestine-first-presbyterian-church",
    status: "verify-before-travel",
    summary: "First Presbyterian remains an active congregation at 410 Avenue A. Current denominational records establish the congregation and property, but Texas Defined has not located a congregation-published sightseeing-hours guarantee. Contact the church before traveling specifically to study the historic painted ceiling and memorial glass.",
    controllingSourceUrl: "https://pcusa.org/congregation/first-church-palestine-tx",
    controllingSourceLabel: "Presbyterian Church (U.S.A.) — First Presbyterian Church Palestine",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
  {
    slug: "houston-annunciation-catholic-church",
    status: "visitors-welcome",
    summary: "Annunciation's official parish site explicitly welcomes visitors and publishes a Plan Your Visit page with its current downtown address, parking and transit guidance. Worship, prayer and parish events remain the controlling use of the church.",
    controllingSourceUrl: "https://annunciationcc.org/visit",
    controllingSourceLabel: "Church of the Annunciation — official Plan Your Visit guidance",
    evidenceScope: "current-visitor-guidance",
    checkedAt: CHECKED,
  },
  {
    slug: "waco-st-francis-on-the-brazos",
    status: "verify-before-travel",
    summary: "St. Francis on the Brazos is an active Diocese of Austin parish with current address, Mass, confession and adoration information. Verify casual interior access and any photography restrictions before traveling specifically to study the historic paintings.",
    controllingSourceUrl: "https://www.austindiocese.org/parishfinder",
    controllingSourceLabel: "Diocese of Austin — St. Francis on the Brazos Parish",
    evidenceScope: "current-organization-information",
    checkedAt: CHECKED,
  },
];
