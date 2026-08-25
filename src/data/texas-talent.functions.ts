import { createServerFn } from "@tanstack/react-start";

export const getTexasTalentProfiles = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTexasTalentProfilesServer } = await import("./texas-talent.server");
  return loadTexasTalentProfilesServer();
});

export const getTexasTalentProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasTalentProfileServer } = await import("./texas-talent.server");
    return loadTexasTalentProfileServer(data.slug);
  });
