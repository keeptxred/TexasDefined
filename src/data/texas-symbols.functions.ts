import { createServerFn } from "@tanstack/react-start";

export const getTexasSymbolsDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTexasSymbolsDirectoryDataServer } = await import("./texas-symbols.server");
  return loadTexasSymbolsDirectoryDataServer();
});

export const getTexasSymbolProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasSymbolProfileDataServer } = await import("./texas-symbols.server");
    return loadTexasSymbolProfileDataServer(data.slug);
  });
