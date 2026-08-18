import { createServerFn } from "@tanstack/react-start";

export const getPaintedChurchesPageData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadPaintedChurchesPageDataServer } = await import("./painted-churches.server");
  return loadPaintedChurchesPageDataServer();
});

export const getPaintedChurchDetail = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadPaintedChurchDetailServer } = await import("./painted-churches.server");
    return loadPaintedChurchDetailServer(data.slug);
  });
