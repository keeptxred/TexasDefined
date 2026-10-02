export type WildlifeAuthorityProfile = {
  overviewHeading?: string;
  intro: string[];
  sections: { heading: string; body: string[] }[];
  answers: { question: string; answer: string }[];
};
