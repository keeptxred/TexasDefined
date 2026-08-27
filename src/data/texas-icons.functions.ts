import { createServerFn } from "@tanstack/react-start";

export const getTexasIcons = createServerFn({ method: "GET" }).handler(async () => {
  const [{ loadTexasIconsServer }, { applyTexasIconEditorialHoldSummary }] = await Promise.all([
    import("./texas-icons.server"),
    import("./texas-icons-editorial-holds.server"),
  ]);
  const data = await loadTexasIconsServer();
  return {
    ...data,
    icons: data.icons.map(applyTexasIconEditorialHoldSummary),
    categories: data.categories.map((category) => ({
      ...category,
      icons: category.icons.map(applyTexasIconEditorialHoldSummary),
    })),
  };
});

export const getTexasIconProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const [{ loadTexasIconProfileServer }, { applyTexasIconEditorialHoldSummary }] = await Promise.all([
      import("./texas-icons.server"),
      import("./texas-icons-editorial-holds.server"),
    ]);
    const profile = await loadTexasIconProfileServer(data.slug);
    if (!profile) return null;
    return {
      ...profile,
      icon: applyTexasIconEditorialHoldSummary(profile.icon),
      related: profile.related.map(applyTexasIconEditorialHoldSummary),
    };
  });
