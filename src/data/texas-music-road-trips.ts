export type TexasMusicRoadTrip = {
  title: string;
  route: string;
  focus: string;
  stops: readonly { label: string; href: string }[];
};

export const TEXAS_MUSIC_ROAD_TRIPS: readonly TexasMusicRoadTrip[] = [
  {
    title: "Central Texas dance halls & Austin stages",
    route: "Austin → South Austin → Gruene → Fort Worth",
    focus: "Progressive country, blues clubs, dance halls and western swing",
    stops: [
      { label: "Austin music history", href: "/austin-music-history" },
      { label: "Broken Spoke", href: "/broken-spoke-austin-history" },
      { label: "Antone's", href: "/antones-austin-history" },
      { label: "Gruene Hall", href: "/gruene-hall-history" },
      { label: "Billy Bob's Texas", href: "/billy-bobs-texas-history" },
    ],
  },
  {
    title: "South Texas border-music route",
    route: "San Antonio → Corpus Christi → Rio Grande Valley",
    focus: "Conjunto, Tejano, borderland exchange and dance culture",
    stops: [
      { label: "San Antonio music history", href: "/san-antonio-music-history" },
      { label: "Conjunto & Tejano deep guide", href: "/texas-conjunto-tejano" },
      { label: "Texas dance halls", href: "/texas-dance-halls-honky-tonks" },
      { label: "Texas trip planner", href: "/explore/trip-planner" },
    ],
  },
  {
    title: "Houston-to-Gulf Coast sound trail",
    route: "Houston → Port Arthur → Gulf Coast",
    focus: "Blues, gospel, R&B, hip-hop and Gulf Coast independence",
    stops: [
      { label: "Houston music history", href: "/houston-music-history" },
      { label: "Texas blues", href: "/texas-blues" },
      { label: "Gospel, R&B & pop", href: "/texas-gospel-rnb-pop" },
      { label: "Texas hip-hop", href: "/texas-hip-hop" },
    ],
  },
  {
    title: "North & West Texas roots route",
    route: "Dallas → Fort Worth → Lubbock",
    focus: "Deep Ellum blues, jazz, western swing and early rock and roll",
    stops: [
      { label: "Dallas–Fort Worth music history", href: "/dallas-fort-worth-music-history" },
      { label: "Texas jazz", href: "/texas-jazz" },
      { label: "Texas western swing", href: "/texas-western-swing" },
      { label: "Lubbock music history", href: "/lubbock-music-history" },
      { label: "Texas rock & rockabilly", href: "/texas-rock-rockabilly" },
    ],
  },
] as const;
