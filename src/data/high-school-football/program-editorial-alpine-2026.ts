import type { FootballProgramEditorial } from './program-editorial';

// Independently reviewed, completed regular-season schedule.
export const alpine2026Scorecard = {
  "slug": "alpine",
  "season": {
    "record": "3–7 overall · 1–4 district (final 2026 season record)",
    "recordLabel": "2026 regular-season results",
    "verifiedAt": "2026-11-21",
    "sourceUrl": "https://txprepfootball.com/schools/alpine-bucks/2026/",
    "sourceLabel": "Texas Prep Football and Texas Football Roundup, independently reviewed November 21, 2026",
    "latestResultSourceUrl": "https://texasfootballroundup.com/teams/alpine/",
    "games": [
      {
        "date": "2026-08-28",
        "opponent": "McCamey",
        "site": "Home",
        "result": "L 0–51"
      },
      {
        "date": "2026-09-04",
        "opponent": "Fabens",
        "site": "Away",
        "result": "W 19–16"
      },
      {
        "date": "2026-09-11",
        "opponent": "Clint Mountain View",
        "site": "Home",
        "result": "L 9–34"
      },
      {
        "date": "2026-09-18",
        "opponent": "Kermit",
        "site": "Away",
        "result": "L 14–34"
      },
      {
        "date": "2026-10-02",
        "opponent": "Van Horn",
        "site": "Home",
        "result": "W 41–12"
      },
      {
        "date": "2026-10-09",
        "opponent": "Coahoma",
        "site": "Away",
        "result": "L 17–49",
        "district": true
      },
      {
        "date": "2026-10-16",
        "opponent": "Crane",
        "site": "Away",
        "result": "L 18–34",
        "district": true
      },
      {
        "date": "2026-10-23",
        "opponent": "Stanton",
        "site": "Home",
        "result": "L 13–78",
        "district": true
      },
      {
        "date": "2026-10-30",
        "opponent": "Anthony",
        "site": "Away",
        "result": "W 33–14",
        "district": true
      },
      {
        "date": "2026-11-06",
        "opponent": "Grape Creek",
        "site": "Home",
        "result": "L 17–35",
        "district": true
      }
    ]
  }
} satisfies Pick<FootballProgramEditorial,'slug'|'season'>;
