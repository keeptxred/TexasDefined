export type PaintedChurchItinerary = {
  slug: string;
  name: string;
  summary: string;
  duration: string;
  churchSlugs: string[];
  planningNotes: string[];
  theme: string;
};

export const paintedChurchItineraries: PaintedChurchItinerary[] = [
  {
    slug: "classic-four",
    name: "Classic Four Painted Churches Day",
    summary: "A focused first-day route through Dubina, Ammannsville, High Hill and Praha—the most practical introduction to the Schulenburg-area Painted Churches.",
    duration: "One day",
    churchSlugs: ["dubina-saints-cyril-methodius", "ammannsville-st-john-the-baptist", "high-hill-nativity-of-mary", "praha-st-marys-assumption"],
    planningNotes: ["Use Schulenburg as the practical base.", "Verify current church access before leaving; worship and parish events take priority.", "Spend enough time inside each church to compare technique and preservation, not just exterior architecture."],
    theme: "first trip",
  },
  {
    slug: "all-six-schulenburg",
    name: "Complete Six-Church Schulenburg Circuit",
    summary: "The full local circuit: Dubina, Ammannsville, High Hill, Praha, Moravia and St. John, matching the six-church cluster promoted by the Greater Schulenburg Chamber.",
    duration: "Long day or relaxed overnight",
    churchSlugs: ["dubina-saints-cyril-methodius", "ammannsville-st-john-the-baptist", "high-hill-nativity-of-mary", "praha-st-marys-assumption", "moravia-ascension-of-our-lord", "st-john-texas-st-john-the-baptist"],
    planningNotes: ["The official Chamber controls current guided-tour and access information.", "A full six-church day rewards an early start.", "Moravia is especially useful for comparing a comparatively unaltered decorative program with Dubina's restored interior."],
    theme: "complete Schulenburg cluster",
  },
  {
    slug: "fayette-lavaca-weekend",
    name: "Fayette and Lavaca Painted Churches Weekend",
    summary: "A two-day route combining the Schulenburg core with Shiner, Sweet Home and St. Mary's in Lavaca County for a deeper comparison of Czech/German communities and decorative traditions.",
    duration: "Two days",
    churchSlugs: ["high-hill-nativity-of-mary", "praha-st-marys-assumption", "dubina-saints-cyril-methodius", "ammannsville-st-john-the-baptist", "moravia-ascension-of-our-lord", "shiner-saints-cyril-methodius", "sweet-home-queen-of-peace", "st-marys-immaculate-conception-lavaca"],
    planningNotes: ["Split the Schulenburg-area stops from the Lavaca County stops rather than rushing all eight.", "Use the comparison page to choose churches by integrity, artist or technique.", "Check parish schedules separately outside the Chamber's local touring system."],
    theme: "regional weekend",
  },
  {
    slug: "czech-moravian-heritage",
    name: "Czech and Moravian Painted Churches Route",
    summary: "A heritage route linking Praha, Dubina, Moravia, Shiner, Corn Hill and Wesley to the Czech/Moravian story behind multiple Painted Churches traditions.",
    duration: "Two to three days",
    churchSlugs: ["praha-st-marys-assumption", "dubina-saints-cyril-methodius", "moravia-ascension-of-our-lord", "shiner-saints-cyril-methodius", "corn-hill-holy-trinity-catholic-church", "wesley-brethren-church"],
    planningNotes: ["This is a cultural-history route, not a claim that every church shares identical ethnic or denominational identity.", "Pair the route with Texas Czech Heritage and Cultural Center research in La Grange.", "Wesley adds a Protestant Brethren perspective to a route otherwise dominated by Catholic examples."],
    theme: "Czech and Moravian heritage",
  },
  {
    slug: "german-heritage",
    name: "German Texas Painted Churches Route",
    summary: "High Hill, Fredericksburg, Wallis, Plantersville and Ammannsville form a cross-regional route for studying German Catholic architecture, parish life and decorative traditions.",
    duration: "Multi-day",
    churchSlugs: ["high-hill-nativity-of-mary", "fredericksburg-st-marys-catholic-church", "wallis-guardian-angel", "plantersville-st-marys-catholic-church", "ammannsville-st-john-the-baptist"],
    planningNotes: ["The churches are geographically dispersed; treat this as a thematic trip rather than a single-day driving loop.", "Fredericksburg and High Hill make a useful Leo Dielmann architecture comparison.", "Use heritage pages to keep German, Czech/Moravian and mixed parish histories distinct."],
    theme: "German Texas heritage",
  },
  {
    slug: "polish-silesian-heritage",
    name: "Polish and Silesian Painted Churches Route",
    summary: "A South Texas heritage route connecting Panna Maria and Bandera, two communities directly tied to the earliest organized Polish/Silesian Catholic settlement in Texas.",
    duration: "One to two days",
    churchSlugs: ["panna-maria-immaculate-conception", "bandera-st-stanislaus-catholic-church"],
    planningNotes: ["Add the Polish Heritage Center at Panna Maria for migration context.", "Panna Maria's nineteenth-century parish history and Bandera's modern painted campaign represent different layers of the tradition.", "Verify current church access independently before travel."],
    theme: "Polish and Silesian heritage",
  },
  {
    slug: "wendish-serbin",
    name: "Wendish Serbin Painted Church Trip",
    summary: "A focused Serbin trip centered on St. Paul Lutheran Church and the Texas Wendish Heritage Museum, combining decorative-interior study with the history of the 1854 Wendish migration.",
    duration: "Half day to one day",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
    planningNotes: ["Treat the church and Wendish Heritage Museum as a combined cultural-history visit.", "The church's two-level worship arrangement and Lutheran history differ sharply from the Catholic Painted Churches.", "Check museum and church schedules separately."],
    theme: "Wendish heritage",
  },
  {
    slug: "statewide-enthusiast",
    name: "Statewide Texas Painted Churches Enthusiast Route",
    summary: "A serious multi-region itinerary spanning the Panhandle, North Texas, Central Texas, Hill Country, East Texas and South Texas to compare the full breadth of the verified collection.",
    duration: "Multiple trips or extended road trip",
    churchSlugs: ["amarillo-first-baptist-church", "umbarger-st-marys-catholic-church", "lindsay-st-peters-catholic-church", "paris-first-united-methodist-church", "serbin-st-paul-lutheran-church", "high-hill-nativity-of-mary", "praha-st-marys-assumption", "moravia-ascension-of-our-lord", "fredericksburg-st-marys-catholic-church", "panna-maria-immaculate-conception", "bandera-st-stanislaus-catholic-church", "palestine-sacred-heart-catholic-church"],
    planningNotes: ["This is a collection strategy, not a single efficient continuous drive.", "Break the route into regional segments and verify access for each active church.", "Use classification and integrity fields to compare formal NR properties, broader traditions, restored interiors and modern campaigns."],
    theme: "statewide research trip",
  },
];

export const paintedChurchItineraryBySlug = new Map(paintedChurchItineraries.map((itinerary) => [itinerary.slug, itinerary]));
