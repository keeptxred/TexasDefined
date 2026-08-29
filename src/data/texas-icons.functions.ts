import { createServerFn } from "@tanstack/react-start";
import { applyTexasIconLaunchCertification } from "@/data/texas-icons-launch";

export const getTexasIcons = createServerFn({ method: "GET" }).handler(async () => {
  const [
    { loadTexasIconsServer },
    { applyTexasIconEditorialHoldSummary },
    { applyTexasIconRosterCorrection },
  ] = await Promise.all([
    import("./texas-icons.server"),
    import("./texas-icons-editorial-holds.server"),
    import("./texas-icons-roster-corrections.server"),
  ]);
  const data = await loadTexasIconsServer();
  const present = (icon: (typeof data.icons)[number]) =>
    applyTexasIconLaunchCertification(
      applyTexasIconEditorialHoldSummary(applyTexasIconRosterCorrection(icon)),
    );
  const icons = data.icons.map(present);
  return {
    ...data,
    icons,
    categories: data.categories.map((category) => ({
      ...category,
      icons: category.icons.map(present),
    })),
    stats: {
      ...data.stats,
      researchedReady: icons.filter((entry) => entry.reuseKind === "icon-research-ready").length,
      researchedStaged: icons.filter((entry) => entry.reuseKind === "icon-research-staged").length,
      readyAtOwnRoute: icons.filter((entry) => entry.indexableAtOwnRoute).length,
      researchQueue: icons.filter((entry) =>
        entry.reuseKind === "new-starter"
        || entry.reuseKind === "texas-talent-staged"
        || entry.reuseKind === "icon-research-staged").length,
    },
  };
});

export const getTexasIconProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const [
      { loadTexasIconProfileServer },
      { applyTexasIconEditorialHoldSummary },
      {
        applyTexasIconRosterCorrection,
        texasIconCorrectedResearchProfile,
        texasIconCorrectionSourceSlug,
      },
    ] = await Promise.all([
      import("./texas-icons.server"),
      import("./texas-icons-editorial-holds.server"),
      import("./texas-icons-roster-corrections.server"),
    ]);
    const sourceSlug = texasIconCorrectionSourceSlug(data.slug);
    const profile = await loadTexasIconProfileServer(sourceSlug);
    if (!profile) return null;
    const sanitizedSourceIcon = applyTexasIconEditorialHoldSummary(profile.icon);
    const correctedIcon = applyTexasIconRosterCorrection(sanitizedSourceIcon);
    const icon = applyTexasIconLaunchCertification(applyTexasIconEditorialHoldSummary(correctedIcon));
    const correctedResearch = texasIconCorrectedResearchProfile(icon.slug);
    return {
      ...profile,
      icon,
      researchProfile: correctedResearch ?? profile.researchProfile,
      related: profile.related.map((candidate) =>
        applyTexasIconLaunchCertification(
          applyTexasIconEditorialHoldSummary(applyTexasIconRosterCorrection(candidate)),
        )),
    };
  });
