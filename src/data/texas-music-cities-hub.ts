import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";
import { getTexasMusicCityGuide } from "@/data/texas-music-city-guides";

const baseGuide = getTexasMusicCityGuide("texas-music-cities");

export const TEXAS_MUSIC_CITIES_HUB_GUIDE: TexasEvergreenGuide = {
  ...baseGuide,
  eyebrow: "Six scenes, one statewide story",
  title: "Texas Music Cities: Austin, Houston, San Antonio, Lubbock, Dallas–Fort Worth and Corpus Christi",
  quickAnswer:
    "No single city explains Texas music. Austin became a meeting point for progressive country, blues and public-television performance; Houston built deep blues, gospel, R&B and hip-hop systems; San Antonio fused border, Black, Mexican American and Anglo traditions; Lubbock and the South Plains helped launch a globally influential strain of rock and roll; Dallas–Fort Worth connected Deep Ellum blues, jazz, country, recording and later experimental music; and Corpus Christi supplied record stores, labels, studios and South Texas dance circuits that helped Tejano and conjunto reach wider audiences. Together these scenes show how local institutions turn individual talent into durable musical culture.",
  sections: [
    ...baseGuide.sections,
    {
      heading: "Corpus Christi: Tejano records, studios and a Coastal Bend circuit",
      body: [
        "Corpus Christi adds a distinct South Texas layer to the statewide city map. Its importance comes not only from performers but from the infrastructure around them: Spanish-language record retail, independent Tejano and conjunto labels, recording studios and a regional dance circuit linking the Coastal Bend with San Antonio, the Rio Grande Valley and other South Texas communities.",
        "Selena y Los Dinos built their career from Corpus Christi inside that existing ecosystem. Reading Corpus alongside San Antonio makes the larger pattern clearer: Texas music cities often mattered because they connected artists, businesses, venues and audiences across a region rather than because one city could claim a genre as its exclusive birthplace.",
      ],
      links: [
        { href: "/corpus-christi-music-history", label: "Corpus Christi music history" },
        { href: "/texas-conjunto-tejano", label: "Texas conjunto and Tejano" },
      ],
    },
  ],
  related: [
    { href: "/corpus-christi-music-history", label: "Corpus Christi Music History", description: "Go deeper on the Coastal Bend record stores, labels, studios, regional dance circuit and Selena story." },
    { href: "/texas-music-timeline", label: "Texas Music Timeline", description: "Place each city scene inside the statewide sequence of venues, recordings, movements and institutions." },
    ...baseGuide.related,
  ],
};
