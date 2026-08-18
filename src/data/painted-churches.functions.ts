import { createServerFn } from "@tanstack/react-start";

export const getPaintedChurchesDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadPaintedChurchesDirectoryDataServer } = await import("./painted-churches.server");
  return loadPaintedChurchesDirectoryDataServer();
});

export const getPaintedChurchProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadPaintedChurchProfileDataServer } = await import("./painted-churches.server");
    return loadPaintedChurchProfileDataServer(data.slug);
  });
