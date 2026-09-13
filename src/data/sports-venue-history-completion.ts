export type SportsVenueHistoryCompletion = {
  history: string;
  source: {
    label: string;
    url: string;
  };
};

const SPORTS_VENUE_HISTORY_COMPLETION: Record<string, SportsVenueHistoryCompletion> = {
  'att-stadium': {
    history: 'AT&T Stadium has been the Dallas Cowboys’ Arlington home since 2009. The Cowboys played their first regular-season game there on September 20, 2009, beginning the venue’s role as the franchise’s home field and a major North Texas event destination.',
    source: {
      label: 'Dallas Cowboys AT&T Stadium history',
      url: 'https://attstadium.com/wp-content/uploads/2025/01/Commanders-Game-Notes.pdf',
    },
  },
  'comerica-center': {
    history: 'The Frisco arena opened in 2003 as Deja Blue Arena at StarCenter. A later partnership among the Dallas Stars, the City of Frisco and Frisco ISD produced a major renovation that nearly doubled capacity from about 3,500 to just over 6,000, establishing the facility now known as Comerica Center.',
    source: {
      label: 'Comerica Center arena history',
      url: 'https://www.comericacenter.com/arena-information/arena-information',
    },
  },
  'moody-coliseum-smu': {
    history: 'Moody Coliseum has been home to SMU basketball since 1956. A major renovation and expansion completed in December 2013 added expanded concourses, premium seating, suites, event space, offices, locker rooms and meeting areas before SMU basketball returned to the renovated arena in January 2014.',
    source: {
      label: 'SMU Moody Coliseum history',
      url: 'https://smumustangs.com/facilities/moody-coliseum/3',
    },
  },
  'shell-energy-stadium': {
    history: 'Shell Energy Stadium opened on May 12, 2012, with a Houston Dynamo victory over D.C. United. The downtown, soccer-specific stadium was the first Major League Soccer venue of its kind located in a city downtown district and remains home to the Dynamo and Houston Dash.',
    source: {
      label: 'Shell Energy Stadium history',
      url: 'https://www.houstondynamofc.com/shell-energy-stadium/about',
    },
  },
  'toyota-center-houston': {
    history: 'Toyota Center opened in October 2003 as the downtown home of the Houston Rockets. The arena has since served as Houston’s primary NBA venue while also hosting major concerts, touring shows and other live entertainment.',
    source: {
      label: 'Toyota Center arena information',
      url: 'https://www.toyotacenter.com/arena-info',
    },
  },
};

export function getSportsVenueHistoryCompletion(slug: string) {
  return SPORTS_VENUE_HISTORY_COMPLETION[slug];
}
