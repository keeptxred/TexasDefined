import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentProfileCorrection = Partial<TexasTalentProfile>;

const reviewed = "2026-08-25";
const mirandaReviewed = "2026-08-26";

export const TEXAS_TALENT_PROFILE_CORRECTIONS: Readonly<Record<string, TexasTalentProfileCorrection>> = {
  "larry-mcmurtry": {
    texasConnection:
      "Born in Wichita Falls, raised first on his family's Archer County ranch and then in Archer City, whose ranch country, small-town life and contradictions became central to his writing.",
    primaryPlaces: ["Wichita Falls", "Archer County", "Archer City"],
    plannedCrossLinks: ["Wichita County", "Archer County", "Archer City", "Texas literature", "Texas history"],
    dek:
      "Larry McMurtry was born in Wichita Falls and grew up in Archer County, turning the ranch country and small-town life around Archer City into a body of fiction that reshaped how modern readers imagine Texas and the American West.",
    overview: [
      "Larry McMurtry was born in Wichita Falls, Texas, in 1936. His family lived with his paternal grandparents on an Archer County ranch before moving to Archer City before he entered second grade. The ranch country, small towns and tensions between old cattle culture and modern Texas later became central to his fiction.",
      "Works including Horseman, Pass By, The Last Picture Show and Lonesome Dove moved between contemporary small-town life and the mythic cattle-drive past. McMurtry was also a major bookseller, essayist and screenwriter, giving his career an unusually broad place in American letters.",
    ],
    timeline: [
      { year: "1936", event: "Born in Wichita Falls, Texas." },
      { year: "1940s", event: "Moves with his family from the Archer County ranch to Archer City before second grade." },
      { year: "1961", event: "Publishes Horseman, Pass By." },
      { year: "1986", event: "Lonesome Dove wins the Pulitzer Prize for Fiction." },
      { year: "2006", event: "Wins an Academy Award for co-writing Brokeback Mountain." },
    ],
    texasPlaces: [
      { name: "Wichita Falls", context: "Birthplace in Wichita County." },
      { name: "Archer County", context: "Early-childhood ranch country that shaped McMurtry's understanding of cattle culture and rural Texas." },
      { name: "Archer City", context: "Childhood home, later bookselling base and the small-town landscape most closely associated with his Texas fiction." },
    ],
    sources: [
      { label: "Texas State Historical Association — Larry McMurtry", url: "https://www.tshaonline.org/handbook/entries/mcmurtry-larry-jeff" },
      { label: "Pulitzer Prizes — Larry McMurtry", url: "https://www.pulitzer.org/winners/larry-mcmurtry" },
    ],
    lastReviewedAt: reviewed,
  },
  "miranda-lambert": {
    sources: [
      { label: "Recording Academy — Miranda Lambert", url: "https://www.grammy.com/artists/miranda-lambert/4851/" },
      { label: "Recording Academy — Miranda Lambert's early Texas career", url: "https://www.grammy.com/news/and-the-grammy-went-to-miranda-lambert/" },
      { label: "Country Music Hall of Fame — Miranda Lambert: Backstage Access", url: "https://countrymusichalloffame.org/press/releases/miranda-lambert-backstage-access-exhibition-to-open-may-16-at-the-country-music-hall-of-fame-and-museum-2/" },
    ],
    lastReviewedAt: mirandaReviewed,
  },
  "matthew-mcconaughey": {
    sources: [
      { label: "UT Austin Moody College — Matthew McConaughey faculty profile", url: "https://moody.utexas.edu/faculty/matthew-mcconaughey" },
      { label: "UT Austin Moody College — McConaughey joins faculty", url: "https://moody.utexas.edu/news/mcconaughey-joins-moody-college-faculty" },
    ],
    lastReviewedAt: reviewed,
  },
  "stevie-ray-vaughan": {
    sources: [
      { label: "Rock & Roll Hall of Fame — Stevie Ray Vaughan and Double Trouble", url: "https://rockhall.com/inductees/stevie-ray-vaughan-double-trouble/" },
      { label: "Rock & Roll Hall of Fame — Stevie Ray Vaughan induction materials", url: "https://www.rockhall.com/wp-content/uploads/2024/03/Stevie_Ray_Vaughan___Double_Trouble_2015.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
  "janis-joplin": {
    sources: [
      { label: "Rock & Roll Hall of Fame — Janis Joplin", url: "https://rockhall.com/inductees/janis-joplin/" },
      { label: "Rock & Roll Hall of Fame — Janis Joplin induction materials", url: "https://rockhall.com/wp-content/uploads/2024/03/Janis_Joplin_1995.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
  "lead-belly": {
    sources: [
      { label: "Smithsonian Folkways — Lead Belly", url: "https://folkways.si.edu/artists/lead-belly" },
      { label: "Rock & Roll Hall of Fame — Lead Belly", url: "https://www.rockhall.com/inductees/lead-belly" },
    ],
    lastReviewedAt: reviewed,
  },
  "billy-gibbons": {
    sources: [
      { label: "Rock & Roll Hall of Fame — ZZ Top", url: "https://rockhall.com/inductees/zz-top/" },
      { label: "Rock & Roll Hall of Fame — ZZ Top induction materials", url: "https://rockhall.com/wp-content/uploads/2024/03/ZZ_Top_2004.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
  "don-henley": {
    sources: [
      { label: "Texas Legislature — Resolution honoring Don Henley", url: "https://capitol.texas.gov/tlodocs/85R/billtext/html/HR01731F.htm" },
      { label: "Texas Historical Commission — Don Henley and Caddo Lake", url: "https://www.thc.texas.gov/blog/caddo-lake-state-park-don-henley-and-east-texas-conservation" },
    ],
    lastReviewedAt: reviewed,
  },
  "wes-anderson": {
    sources: [
      { label: "UT Austin Radio-Television-Film — Notable alumni", url: "https://rtf.utexas.edu/about/notable-alumni" },
      { label: "Biography — Wes Anderson", url: "https://www.biography.com/movies-tv/wes-anderson" },
    ],
    lastReviewedAt: reviewed,
  },
  "robert-rodriguez": {
    sources: [
      { label: "Austin Film Society — Robert Rodriguez", url: "https://www.austinfilm.org/press/austin-film-society-announces-new-board-members-2019/" },
      { label: "UT Austin Radio-Television-Film — Notable alumni", url: "https://rtf.utexas.edu/about/notable-alumni" },
      { label: "Encyclopedia.com — Robert Rodriguez", url: "https://www.encyclopedia.com/books/culture-magazines/rodriguez-robert" },
    ],
    lastReviewedAt: reviewed,
  },
  "ethan-hawke": {
    sources: [
      { label: "Biography — Ethan Hawke", url: "https://www.biography.com/actors/ethan-hawke" },
      { label: "Academy Awards — 87th nominations fact sheet", url: "https://www.oscars.org/sites/oscars/files/87th_noms_fact_sheet.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
  "dennis-quaid": {
    sources: [
      { label: "Biography — Dennis Quaid", url: "https://www.biography.com/actors/dennis-quaid" },
      { label: "University of Houston — Commencement record", url: "https://www.uh.edu/commencement/undergeaduate-comm-program-sp-13.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
  "richard-linklater": {
    sources: [
      { label: "Austin Film Society — Our story", url: "https://www.austinfilm.org/our-story/" },
      { label: "Texas Film Commission — Richard Linklater Trail", url: "https://gov.texas.gov/film/trail/richard-linklater-trail" },
      { label: "Texas Cultural Trust — Richard Linklater", url: "https://txculturaltrust.org/bio/richard-linklater/" },
    ],
    lastReviewedAt: reviewed,
  },
  "benjamin-alire-saenz": {
    sources: [
      { label: "UTEP — Homenaje to Benjamin Alire Sáenz", url: "https://www.utep.edu/liberalarts/news/april-2022/2022-04-22-liberal-arts-hosts-homenaje-to-ben-saenz.html" },
      { label: "PEN/Faulkner — Benjamin Alire Sáenz", url: "https://www.penfaulkner.org/2013/03/25/benjamin-alire-saenz-wins-2013-penfaulkner-award/" },
    ],
    lastReviewedAt: reviewed,
  },
  "tom-lea": {
    sources: [
      { label: "Smithsonian American Art Museum — Tom Lea", url: "https://americanart.si.edu/artist/tom-lea-27711" },
      { label: "Tom Lea Institute — Biography", url: "https://www.tomlea.com/biography" },
    ],
    lastReviewedAt: reviewed,
  },
  "dorothy-hood": {
    sources: [
      { label: "Museum of Fine Arts, Houston — Dorothy Hood", url: "https://emuseum.mfah.org/people/75/dorothy-hood" },
      { label: "University of Houston Libraries — Dorothy Hood Papers", url: "https://findingaids.lib.uh.edu/repositories/2/resources/404" },
      { label: "Art Museum of South Texas — About", url: "https://www.artmuseumofsouthtexas.org/about/" },
    ],
    lastReviewedAt: reviewed,
  },
  "julian-onderdonk": {
    sources: [
      { label: "Texas State Historical Association — Julian Onderdonk", url: "https://www.tshaonline.org/handbook/entries/onderdonk-julian" },
      { label: "San Antonio Museum of Art — Julian Onderdonk resources", url: "https://www.samuseum.org/" },
    ],
    lastReviewedAt: reviewed,
  },
  "donald-judd": {
    sources: [
      { label: "Judd Foundation — Donald Judd biography", url: "https://juddfoundation.org/donald-judd/biography/" },
      { label: "Judd Foundation — Chronology 1965–1974", url: "https://juddfoundation.org/chronology/1965-1974/" },
      { label: "Chinati Foundation — Donald Judd Records finding aid", url: "https://chinati.org/wp-content/uploads/2021/07/Finding-Aid-to-the-Donald-Judd-Records.pdf" },
    ],
    lastReviewedAt: reviewed,
  },
  "steve-martin": {
    sources: [
      { label: "Academy of Motion Picture Arts and Sciences — Steve Martin", url: "https://www.oscars.org/governors-awards/ceremonies/honoree-bio/steve-martin" },
      { label: "Television Academy — Steve Martin", url: "https://www.televisionacademy.com/bios/steve-martin" },
    ],
    lastReviewedAt: reviewed,
  },
  "bill-hicks": {
    sources: [
      { label: "Bill Hicks official biography", url: "https://www.billhicks.com/bio.html" },
      { label: "Houston Chronicle — Houston stand-up comedy history", url: "https://www.houstonchronicle.com/explained/article/houston-standup-comedy-texas-outlaws-19823378.php" },
    ],
    lastReviewedAt: reviewed,
  },
};
