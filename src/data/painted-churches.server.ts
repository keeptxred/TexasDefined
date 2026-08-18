import {
  nationalRegisterDecorativeInteriorChurches,
  paintedChurchBySlug,
  paintedChurches,
  paintedChurchSources,
  schulenburgCoreRoute,
  schulenburgPaintedChurches,
} from "./painted-churches";

export function loadPaintedChurchesPageDataServer() {
  return {
    paintedChurches,
    paintedChurchSources,
    schulenburgCoreRoute,
    schulenburgPaintedChurchesCount: schulenburgPaintedChurches.length,
    nationalRegisterDecorativeInteriorChurchesCount: nationalRegisterDecorativeInteriorChurches.length,
  };
}

export function loadPaintedChurchDetailServer(slug: string) {
  const church = paintedChurchBySlug(slug);
  if (!church) return null;

  const related = paintedChurches
    .filter((candidate) => candidate.slug !== church.slug)
    .sort((a, b) => {
      const aCluster = church.schulenburgCluster && a.schulenburgCluster ? 0 : 1;
      const bCluster = church.schulenburgCluster && b.schulenburgCluster ? 0 : 1;
      if (aCluster !== bCluster) return aCluster - bCluster;
      if (a.county === church.county && b.county !== church.county) return -1;
      if (b.county === church.county && a.county !== church.county) return 1;
      return a.city.localeCompare(b.city);
    })
    .slice(0, 3);

  return { church, related };
}
