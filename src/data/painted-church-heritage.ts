export type PaintedChurchHeritage = {
  slug: string;
  name: string;
  answer: string;
  context: string[];
  churchSlugs: string[];
  sourceLabel: string;
  sourceUrl: string;
};

export const paintedChurchHeritage: PaintedChurchHeritage[] = [
  {
    slug: "czech-moravian",
    name: "Czech and Moravian Texas",
    answer: "Czech and Moravian immigrants shaped some of the best-known Texas Painted Churches, especially in Fayette, Lavaca and Williamson counties. Their churches preserve language, devotional practice, community memory and decorative traditions carried into rural Texas.",
    context: ["Praha, Dubina, Moravia, Shiner and Corn Hill are central to the Czech/Moravian Painted Churches story.", "Texas Defined treats Czech, Moravian, Bohemian and broader Central European identities carefully rather than collapsing them into one modern nationality label.", "The Texas Czech Heritage and Cultural Center in La Grange is an important current institutional source for Czech-Texan history and culture."],
    churchSlugs: ["praha-st-marys-assumption", "dubina-saints-cyril-methodius", "moravia-ascension-of-our-lord", "shiner-saints-cyril-methodius", "corn-hill-holy-trinity-catholic-church", "wesley-brethren-church"],
    sourceLabel: "Texas Czech Heritage and Cultural Center",
    sourceUrl: "https://www.czechtexas.org/",
  },
  {
    slug: "german",
    name: "German Texas",
    answer: "German immigrant communities helped shape Painted Church architecture and decoration across Central Texas, the Hill Country and San Antonio, especially at High Hill, Fredericksburg, Wallis, Plantersville and St. Joseph.",
    context: ["Fredericksburg's St. Mary's parish traces its roots to German immigrants arriving in 1846.", "High Hill combines German settlement history with Leo Dielmann's Gothic Revival architecture and a major decorative campaign.", "St. Joseph in San Antonio was organized by German Catholics seeking worship in their own language and preserves Gothic architecture, Bavarian glass and archival fresco evidence.", "German Catholic communities often expressed cultural continuity through architecture, stained glass, language and interior ornament."],
    churchSlugs: ["high-hill-nativity-of-mary", "fredericksburg-st-marys-catholic-church", "wallis-guardian-angel", "plantersville-st-marys-catholic-church", "ammannsville-st-john-the-baptist", "san-antonio-st-joseph-catholic-church"],
    sourceLabel: "St. Mary's Catholic Church Fredericksburg — parish history",
    sourceUrl: "https://church.stmarysfbg.com/history",
  },
  {
    slug: "wendish",
    name: "Wendish Texas",
    answer: "The Wendish Painted Church story centers on Serbin, founded by a large Lutheran migration from Lusatia in the 1850s. St. Paul Lutheran Church is both a religious landmark and a surviving anchor of Texas Wendish identity.",
    context: ["The Texas Wendish Heritage Society documents the 1854 migration of more than 500 Wends and the establishment of Serbin.", "St. Paul Lutheran preserves a distinctive two-level worship arrangement and painted interior.", "Wendish identity should not be treated as simply German; the community came from Lusatia and maintained a distinct Slavic heritage."],
    churchSlugs: ["serbin-st-paul-lutheran-church"],
    sourceLabel: "Texas Wendish Heritage Society",
    sourceUrl: "https://www.texaswends.org/about",
  },
  {
    slug: "polish-silesian",
    name: "Polish and Silesian Texas",
    answer: "Texas's Polish Painted Church story begins with the 1854 settlement at Panna Maria and extends to Bandera and other communities founded by Upper Silesian Catholic immigrants.",
    context: ["Panna Maria is documented by its parish and Polish Heritage Center as the oldest permanent Polish settlement in the United States.", "The first Mass at Panna Maria was celebrated on Christmas Eve 1854; the present church dates to 1877.", "Bandera's St. Stanislaus traces its parish history to Silesian Polish immigrant families and later developed a modern painted program."],
    churchSlugs: ["panna-maria-immaculate-conception", "bandera-st-stanislaus-catholic-church"],
    sourceLabel: "Polish Heritage Center at Panna Maria",
    sourceUrl: "https://polishheritagecentertx.org/historic-panna-maria",
  },
  {
    slug: "mexican-american-south-texas",
    name: "Mexican American Sacred Art in South Texas",
    answer: "Sacred Heart in Corpus Christi expands the Painted Churches story through Antonio E. Garcia, a Mexican American South Texas artist whose monumental 1940s frescoes connect Catholic devotional art with regional art history.",
    context: ["Texas A&M University–Corpus Christi documents three true frescoes by Garcia painted between 1942 and 1948 at Sacred Heart.", "The Diocese of Corpus Christi documents Garcia as both a Catholic artist and a member of the Sacred Heart community.", "This story broadens the statewide Painted Churches framework beyond the Central European immigrant traditions that dominate the classic Schulenburg circuit."],
    churchSlugs: ["corpus-christi-sacred-heart-catholic-church"],
    sourceLabel: "Texas A&M University–Corpus Christi — Antonio E. Garcia",
    sourceUrl: "https://www.tamucc.edu/education/departments/garcia-center/antonio-e-garcia.php",
  },
  {
    slug: "italian-pow-umbarger",
    name: "Italian POW Artists at Umbarger",
    answer: "Umbarger's Painted Church story includes an unusual World War II chapter: Italian prisoners of war from the Hereford camp contributed murals and carved religious figures to St. Mary's in 1945.",
    context: ["This is not an immigrant-settlement origin story in the same sense as Praha, Serbin or Panna Maria.", "The Italian POW contribution belongs to the church's later decorative history and should be distinguished from the building's original construction.", "The episode broadens the statewide Painted Churches story beyond Central European settlement alone."],
    churchSlugs: ["umbarger-st-marys-catholic-church"],
    sourceLabel: "Texas Painted Churches / St. Mary's Umbarger historical research",
    sourceUrl: "https://austinpbs.org/paintedchurches/",
  },
];

export const paintedChurchHeritageBySlug = new Map(paintedChurchHeritage.map((heritage) => [heritage.slug, heritage]));
