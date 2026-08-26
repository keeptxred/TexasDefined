// Targeted editorial expansions for Texas-place blurbs that were too terse to
// carry useful geographic context on their own. The key deliberately combines
// profile slug and existing place name so these edits cannot invent or reorder
// a profile's geography.
export const TEXAS_TALENT_PLACE_CONTEXT_OVERRIDES: Readonly<Record<string, string>> = {
  "waylon-jennings::Littlefield":
    "Birthplace in Lamb County, where his West Texas upbringing preceded the radio work that launched his music career.",
  "townes-van-zandt::Fort Worth":
    "Birthplace and early family anchor before Houston's folk-club scene became central to his songwriting development.",
  "lightnin-hopkins::Centerville":
    "Leon County birthplace and early East Texas setting before Hopkins established his long recording and performance career in Houston.",
  "don-henley::Gilmer":
    "Upshur County birthplace in East Texas, part of the regional landscape that remained important to Henley's identity and conservation work.",
  "kelly-clarkson::Fort Worth":
    "Birthplace in Tarrant County before her family settled in nearby Burleson, where school performance shaped her early musical development.",
  "miranda-lambert::Longview":
    "Gregg County birthplace in East Texas before her family settled in Lindale, the hometown tied most closely to her early music career.",
  "kacey-musgraves::Golden":
    "Wood County birthplace and childhood community in East Texas, where she began writing songs and performing country and western swing.",
  "t-bone-walker::Linden":
    "Cass County birthplace before his family moved to Dallas, where Deep Ellum and the blues circuit shaped his musical education.",
  "eva-longoria::Corpus Christi":
    "Birthplace and South Texas hometown, grounding Longoria's early life before college in Kingsville and her television career.",
  "richard-linklater::Houston":
    "Houston birthplace and early Texas anchor before his later work made Austin one of the defining centers of American independent film.",
  "katherine-anne-porter::Indian Creek":
    "Brown County birthplace and earliest Texas home before her family moved to Kyle, another formative setting in her childhood.",
  "dorothy-hood::Bryan":
    "Birthplace in Brazos County before a life and career that later connected Houston, Mexico, New York and Corpus Christi.",
  "megan-thee-stallion::San Antonio":
    "Birthplace in Bexar County before she was raised in Houston, the city that became the central cultural setting for her rap career.",
};
