export type PoliticalHistoricSiteProfileLink = {
  slug: string;
  label: string;
  description: string;
};

export type PoliticalHistoricSiteDestinationLink = {
  path: string;
  label: string;
  description: string;
};

const DESTINATION_TO_PROFILES: Record<string, readonly PoliticalHistoricSiteProfileLink[]> = {
  "eisenhower-birthplace": [
    {
      slug: "dwight-d-eisenhower",
      label: "Read the Dwight D. Eisenhower biography",
      description: "Connect the preserved Denison birthplace with Eisenhower's Texas-born childhood chapter, Army service and later national career.",
    },
  ],
  "casa-navarro": [
    {
      slug: "jose-antonio-navarro",
      label: "Read the José Antonio Navarro biography",
      description: "Continue from Navarro's San Antonio home into his Tejano political career across Mexican Texas, the Republic and statehood.",
    },
  ],
  "barrington-living-history-farm": [
    {
      slug: "anson-jones",
      label: "Read the Anson Jones biography",
      description: "Connect Barrington with the final president of the Republic of Texas, annexation and the enslaved labor that sustained the farm.",
    },
  ],
  "bush-family-home": [
    {
      slug: "george-h-w-bush",
      label: "Read the George H. W. Bush biography",
      description: "Place the Midland family home in the West Texas oil-business and political story that preceded Bush's national offices and presidency.",
    },
    {
      slug: "george-w-bush",
      label: "Read the George W. Bush biography",
      description: "Follow the Midland childhood connection into Bush's Texas business, baseball and gubernatorial years and his later presidency.",
    },
  ],
};

const PROFILE_TO_DESTINATIONS: Record<string, readonly PoliticalHistoricSiteDestinationLink[]> = {
  "dwight-d-eisenhower": [
    {
      path: "/destination/eisenhower-birthplace",
      label: "Visit Eisenhower Birthplace State Historic Site",
      description: "See the modest Denison house where Dwight D. Eisenhower was born in 1890 and place that brief Texas chapter in its railroad-town setting.",
    },
  ],
  "jose-antonio-navarro": [
    {
      path: "/destination/casa-navarro",
      label: "Visit Casa Navarro",
      description: "Explore Navarro's surviving San Antonio home and office complex and the Tejano political, commercial and family history preserved there.",
    },
  ],
  "anson-jones": [
    {
      path: "/destination/barrington-living-history-farm",
      label: "Visit Barrington Living History Farm",
      description: "Visit Jones's final home and cotton farm near Washington-on-the-Brazos, interpreted with the history of the enslaved people who lived and worked there.",
    },
  ],
  "george-h-w-bush": [
    {
      path: "/destination/bush-family-home",
      label: "Visit the Bush Family Home",
      description: "See the Midland home that places the Bush family's early Texas years inside the postwar Permian Basin oil-boom story.",
    },
  ],
  "george-w-bush": [
    {
      path: "/destination/bush-family-home",
      label: "Visit the Bush Family Home",
      description: "See the Midland home associated with George W. Bush's childhood and the family's early years in West Texas.",
    },
  ],
};

export function politicalProfilesForDestination(destinationSlug: string) {
  return DESTINATION_TO_PROFILES[destinationSlug] ?? [];
}

export function politicalDestinationsForProfile(profileSlug: string) {
  return PROFILE_TO_DESTINATIONS[profileSlug] ?? [];
}
