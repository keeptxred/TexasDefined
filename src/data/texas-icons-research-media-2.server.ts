import type { TexasIconResearchProfile } from "@/data/texas-icons-types";

const reviewed = "2026-08-26";
const staged = "First-pass authority profile remains noindex pending image-rights and internal-link certification.";

export const TEXAS_ICON_RESEARCH_MEDIA_BATCH_2: readonly TexasIconResearchProfile[] = [
  {
    slug: "dan-rather",
    editorialStatus: "researched-staged",
    publicationNote: staged,
    dek: "Wharton-born Dan Rather learned reporting in Huntsville and Houston before moving to CBS, making Texas local journalism the training ground for a six-decade national news career.",
    overview: [
      "Dan Rather was born in Wharton in 1931 and moved with his family to Houston Heights as a child. He earned a journalism degree from Sam Houston State College in 1953 while working in Huntsville radio and reporting, then developed his professional range at KTRH, the Houston Chronicle, KTRK and KHOU.",
      "Rather's coverage of Hurricane Carla helped propel him to CBS News, where he reported on civil rights, the Kennedy assassination, Vietnam, Watergate and presidential politics before anchoring the CBS Evening News from 1981 to 2005. His Texas biography is therefore unusually continuous: Wharton birth, Houston upbringing and newsroom work, Huntsville education, and a Dallas CBS bureau assignment all precede or accompany the national career.",
    ],
    definingWorks: ["Hurricane Carla coverage", "CBS Evening News", "60 Minutes", "Kennedy assassination coverage", "Watergate reporting"],
    timeline: [
      { year: "1931", event: "Born in Wharton, Texas." },
      { year: "1953", event: "Earns a journalism degree from Sam Houston State College." },
      { year: "1961", event: "Hurricane Carla coverage at KHOU draws national attention." },
      { year: "1962", event: "Joins CBS News." },
      { year: "1981", event: "Begins anchoring the CBS Evening News." },
    ],
    legacy: [
      "Rather's career spans local Texas radio, early television field reporting, network anchoring and later documentary and digital work.",
      "The Texas connection is not decorative: Houston and Huntsville supplied the reporting habits and broadcast experience that carried directly into CBS.",
    ],
    texasPlaces: [
      { name: "Wharton", context: "Birthplace." },
      { name: "Houston Heights", context: "Childhood home and city where his early professional reporting developed." },
      { name: "Huntsville", context: "Sam Houston State education and early radio/journalism work." },
    ],
    sources: [
      { label: "University of Texas hosted Dan Rather biography", url: "https://utw10866.utweb.utexas.edu/about-dan/biography.html" },
      { label: "Sam Houston State University — Journalism Icon Dan Rather", url: "https://todayatsam.shsu.edu/T@S/2018/rather-reader-event" },
      { label: "Sam Houston State University — Dan Rather Endowed Chair context", url: "https://www.shsu.edu/academics/mass-communication/faculty-staff/cv-resume/jean-bodon-cv.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
  {
    slug: "bill-moyers",
    editorialStatus: "researched-staged",
    publicationNote: staged,
    dek: "Marshall-raised Bill Moyers moved from East Texas newspaper work and UT Austin journalism into the Johnson administration, then built a long public-television career centered on politics, culture and civic life.",
    overview: [
      "Bill Moyers grew up in Marshall, Texas, and entered journalism at 16 as a cub reporter for the Marshall News Messenger. He later transferred to the University of Texas at Austin, wrote for The Daily Texan, worked for Lady Bird Johnson's KTBC stations and graduated with a journalism degree in 1956.",
      "That Texas political and media network led directly into Lyndon Johnson's orbit. Moyers served in the Peace Corps and White House, including as press secretary, before returning to journalism as a newspaper publisher, CBS correspondent and producer of influential public-television programs. His later work combined reporting with extended conversations about democracy, history, religion, inequality and culture.",
    ],
    definingWorks: ["White House press secretary", "Bill Moyers Journal", "Joseph Campbell and the Power of Myth", "NOW with Bill Moyers", "Public Affairs Television"],
    timeline: [
      { year: "1940s", event: "Begins journalism as a teenager at the Marshall News Messenger." },
      { year: "1956", event: "Graduates from the University of Texas at Austin with a journalism degree." },
      { year: "1960s", event: "Serves in the Peace Corps and Johnson White House, including as press secretary." },
      { year: "1967", event: "Leaves the White House and returns to journalism." },
      { year: "1986", event: "Establishes Public Affairs Television." },
    ],
    legacy: [
      "Moyers built a distinctive form of long-form public-affairs television that gave unusual space to history, philosophy, religion and civic argument.",
      "His Texas formation links Marshall local journalism, UT Austin and the Johnson political network in one continuous early-career story.",
    ],
    texasPlaces: [
      { name: "Marshall", context: "East Texas hometown and site of his first newspaper job." },
      { name: "Austin", context: "UT journalism education, Daily Texan work and KTBC employment." },
      { name: "LBJ Presidential Library", context: "Institution where Moyers repeatedly returned for public programs and Johnson-era historical reflection." },
    ],
    sources: [
      { label: "UT Austin News — Remembering Bill Moyers", url: "https://news.utexas.edu/2025/07/01/remembering-bill-moyers-a-ut-legend-and-national-treasure/" },
      { label: "LBJ Presidential Library — Bill Moyers legacy", url: "https://www.lbjlibrary.org/news-and-press/press-releases/bill-moyers-legacy" },
      { label: "UT Austin — Bill Moyers on his second birth at UT", url: "https://www.la.utexas.edu/users/bump/35017/Pages%20from%2035017.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
];
