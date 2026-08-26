export type TexasIconCategory =
  | "history-politics"
  | "music-culture"
  | "sports"
  | "business-science"
  | "media-arts"
  | "symbols-food";

export type TexasIconSubjectType = "person" | "group" | "brand" | "place" | "food" | "symbol";

export type TexasIconRosterEntry = {
  rank: number;
  slug: string;
  name: string;
  category: TexasIconCategory;
  subjectType: TexasIconSubjectType;
  rosterNote: string;
  aliases: readonly string[];
  canonicalPath?: string;
};

export const TEXAS_ICON_CATEGORIES: ReadonlyArray<{
  id: TexasIconCategory;
  label: string;
  description: string;
}> = [
  {
    id: "history-politics",
    label: "History & Politics",
    description: "Presidents, governors, revolutionaries, civic leaders, military figures and historians who shaped Texas public life.",
  },
  {
    id: "music-culture",
    label: "Music & Culture",
    description: "Musicians, bands and cultural figures whose work is tied to Texas scenes, sounds and identity.",
  },
  {
    id: "sports",
    label: "Sports",
    description: "Athletes, coaches, owners and competitors whose careers are part of Texas sports history.",
  },
  {
    id: "business-science",
    label: "Business & Science",
    description: "Entrepreneurs, engineers, physicians, scientists, spaceflight figures and institution builders with major Texas connections.",
  },
  {
    id: "media-arts",
    label: "Media & Arts",
    description: "Actors, filmmakers, writers, broadcasters, animators and performers connected to Texas.",
  },
  {
    id: "symbols-food",
    label: "Symbols & Food",
    description: "Places, brands, foods, landscapes and symbols that have become shorthand for Texas.",
  },
];
