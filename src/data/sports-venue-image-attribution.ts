import type { SportsVenuePhoto } from './sports-venue-images';

const GENERATED_SOURCE_NAME = 'Texas Defined generated media';

export function isGeneratedSportsVenueImage(photo: SportsVenuePhoto | undefined) {
  return Boolean(
    photo
    && (
      photo.sourceName === GENERATED_SOURCE_NAME
      || /^AI-generated\b/i.test(photo.licenseName)
    )
  );
}

export function sportsVenueImageCaption(venueName: string, photo: SportsVenuePhoto | undefined) {
  if (!photo) return `${venueName} — original TexasDefined sports venue illustration`;
  if (isGeneratedSportsVenueImage(photo)) {
    return `${venueName} — AI-generated representative editorial image by ${photo.author}; not documentary photography`;
  }
  return `${venueName} — photo by ${photo.author}, ${photo.licenseName}`;
}
