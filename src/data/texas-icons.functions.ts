import { createServerFn } from "@tanstack/react-start";

export const getTexasIcons = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTexasIconsServer } = await import("./texas-icons.server");
  return loadTexasIconsServer();
});

export const getTexasIconProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasIconProfileServer } = await import("./texas-icons.server");
    return loadTexasIconProfileServer(data.slug);
  });
