import { createServerFn } from "@tanstack/react-start";

const loadPromotedPaintedChurchDetailProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadPromotedPaintedChurchDetailProfileServer } = await import("./painted-church-detail-profile.server");
    return loadPromotedPaintedChurchDetailProfileServer(data.slug);
  });

export function getPromotedPaintedChurchDetailProfile(slug: string) {
  return loadPromotedPaintedChurchDetailProfile({ data: { slug } });
}
