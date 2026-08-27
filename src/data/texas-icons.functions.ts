import { createServerFn } from "@tanstack/react-start";

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
    applyTexasIconEditorialHoldSummary(applyTexasIconRosterCorrection(icon));
  return {
    ...data,
    icons: data.icons.map(present),
    categories: data.categories.map((category) => ({
      ...category,
      icons: category.icons.map(present),
    })),
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
    const correctedIcon = applyTexasIconRosterCorrection(profile.icon);
    const icon = applyTexasIconEditorialHoldSummary(correctedIcon);
    const correctedResearch = texasIconCorrectedResearchProfile(icon.slug);
    return {
      ...profile,
      icon,
      researchProfile: correctedResearch ?? profile.researchProfile,
      related: profile.related.map((candidate) =>
        applyTexasIconEditorialHoldSummary(applyTexasIconRosterCorrection(candidate))),
    };
  });
