export type PaintedChurchRegisterEvidence = {
  slug: string;
  nris: string;
  title: string;
  listed: string;
  multipleListing: "Churches with Decorative Interior Painting TR";
  areasOfSignificance: string[];
  architecturalStyle?: string;
  architects?: string[];
  significantYears?: string[];
  npsUrl: string;
  thcUrl: string;
  note?: string;
};

const listing = "Churches with Decorative Interior Painting TR" as const;
const nps = (nris: string) => `https://npgallery.nps.gov/AssetDetail/NRIS/${nris}`;

export const paintedChurchRegisterEvidence: PaintedChurchRegisterEvidence[] = [
  { slug: "wallis-guardian-angel", nris: "83003074", title: "Church of the Guardian Angel", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Gothic Revival", architects: ["Leo Dielman", "Mr. Bunch"], significantYears: ["1913"], npsUrl: nps("83003074"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003074" },
  { slug: "wesley-brethren-church", nris: "79002910", title: "Wesley Brethren Church", listed: "January 18, 1979", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], npsUrl: nps("79002910"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2079002910", note: "The surviving unfinished decorative program is attributed in Austin PBS research to Rev. Bohuslav Laciak." },
  { slug: "amarillo-first-baptist-church", nris: "83003158", title: "First Baptist Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architects: ["J. Carlander"], npsUrl: nps("83003158"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003158" },
  { slug: "umbarger-st-marys-catholic-church", nris: "83003159", title: "St. Mary's Catholic Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], npsUrl: nps("83003159"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003159", note: "Later church history is especially notable for murals created by Italian POWs during World War II; the NR record establishes the formal decorative-interior designation separately from that interpretive history." },
  { slug: "paris-first-united-methodist-church", nris: "83003146", title: "First United Methodist Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Colonial Revival / other revival", architects: ["Vanslyke & Woodruff"], npsUrl: nps("83003146"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003146" },
  { slug: "moravia-ascension-of-our-lord", nris: "83003148", title: "Ascension of Our Lord Catholic Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], npsUrl: nps("83003148"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003148", note: "Austin PBS research attributes the 1923 decorative campaign to Fred Donecker and his sons and describes the interior as comparatively little altered." },
  { slug: "sweet-home-queen-of-peace", nris: "83003149", title: "Church of the Blessed Virgin Mary, the Queen of Peace", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architects: ["Vincent Falbo", "M. Deodati"], significantYears: ["1918"], npsUrl: nps("83003149"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003149" },
  { slug: "st-marys-immaculate-conception-lavaca", nris: "83003150", title: "Church of the Immaculate Conception of Blessed Virgin Mary", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Late Gothic Revival", npsUrl: nps("83003150"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003150" },
  { slug: "shiner-saints-cyril-methodius", nris: "83003151", title: "Sts. Cyril and Methodius Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Romanesque", architects: ["F. Wahrenberger"], npsUrl: nps("83003151"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003151" },
  { slug: "lindsay-st-peters-catholic-church", nris: "79002927", title: "St. Peter's Roman Catholic Church", listed: "May 25, 1979", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Romanesque", architects: ["Frank A. Ludewig"], significantYears: ["1903", "1917"], npsUrl: nps("79002927"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2079002927", note: "NPS metadata gives significant years 1903 and 1917; parish/building chronologies should be kept distinct where later sources date the present church differently." },
  { slug: "high-hill-nativity-of-mary", nris: "83003136", title: "Nativity of Mary, Blessed Virgin Catholic Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Gothic Revival", architects: ["Leo M. J. Dielmann", "Frank Bohlmann"], significantYears: ["1906", "1912"], npsUrl: nps("83003136"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003136" },
  { slug: "ammannsville-st-john-the-baptist", nris: "83003137", title: "St. John the Baptist Catholic Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Gothic Revival", architects: ["John F. Bujnoch"], significantYears: ["1918", "1919"], npsUrl: nps("83003137"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003137" },
  { slug: "praha-st-marys-assumption", nris: "83003138", title: "St. Mary's Church of the Assumption", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Gothic Revival", architects: ["O. Kramer"], significantYears: ["1895"], npsUrl: nps("83003138"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003138" },
  { slug: "fredericksburg-st-marys-catholic-church", nris: "83003143", title: "St. Mary's Catholic Church", listed: "June 21, 1983", multipleListing: listing, areasOfSignificance: ["Art", "Architecture", "Religion"], architecturalStyle: "Gothic Revival", architects: ["Leo M. J. Dielmann", "Jacob Wagner"], significantYears: ["1906", "1908"], npsUrl: nps("83003143"), thcUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003143", note: "Texas Defined preserves the documented 1906–1908 construction chronology rather than forcing a single year where sources describe the campaign differently." },
];

export const paintedChurchRegisterEvidenceBySlug = new Map(paintedChurchRegisterEvidence.map((record) => [record.slug, record]));

export function paintedChurchRegisterRecordBySlug(slug: string) {
  return paintedChurchRegisterEvidenceBySlug.get(slug);
}
