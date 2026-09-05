import { createServerFn } from "@tanstack/react-start";

export const getVerifiedTournamentProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadVerifiedTournamentProfileDataServer } = await import("./verified-profile-data.server");
    return loadVerifiedTournamentProfileDataServer(data.slug);
  });
