export type TexasTalentMusicAuthorityTraditionId =
  | "western-swing"
  | "country-outlaw"
  | "blues"
  | "conjunto-tejano"
  | "rock-rockabilly"
  | "jazz"
  | "gospel-rnb-pop"
  | "hip-hop";

/**
 * Curated profile-to-tradition relationships for the hidden Texas Talent
 * workbench. These links strengthen the existing public Texas Music authority
 * cluster but do not alter stored Talent readiness or grant publication
 * approval.
 *
 * Deliberately omit ambiguous fits rather than forcing every musician into a
 * genre page. All music profiles still receive the general /texas-music link.
 */
export const TEXAS_TALENT_MUSIC_AUTHORITY_BY_PROFILE: Readonly<
  Record<string, readonly TexasTalentMusicAuthorityTraditionId[]>
> = {
  "willie-nelson": ["country-outlaw"],
  "george-strait": ["country-outlaw"],
  "waylon-jennings": ["country-outlaw"],
  "townes-van-zandt": ["country-outlaw"],
  "miranda-lambert": ["country-outlaw"],
  "kacey-musgraves": ["country-outlaw"],
  "stevie-ray-vaughan": ["blues"],
  "lightnin-hopkins": ["blues"],
  "t-bone-walker": ["blues"],
  "buddy-holly": ["rock-rockabilly"],
  "roy-orbison": ["rock-rockabilly"],
  "janis-joplin": ["rock-rockabilly"],
  "billy-gibbons": ["rock-rockabilly"],
  "don-henley": ["rock-rockabilly"],
  "ornette-coleman": ["jazz"],
  "selena": ["conjunto-tejano"],
  "beyonce": ["gospel-rnb-pop"],
  "kelly-clarkson": ["gospel-rnb-pop"],
  "leon-bridges": ["gospel-rnb-pop"],
  "erykah-badu": ["gospel-rnb-pop"],
  "megan-thee-stallion": ["hip-hop"],
};
