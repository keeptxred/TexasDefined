import { createFileRoute } from "@tanstack/react-router";

import {
  getTexasTalentLaunchAudit,
  getTexasTalentProfiles,
} from "@/data/texas-talent.functions";

const description = "Texas Talent explores the musicians, actors, filmmakers, writers, artists and performers whose Texas stories helped shape their work and their influence.";

export const Route = createFileRoute("/admin/texas-talent")({
  beforeLoad: async () => {
    const [profiles, launchAudit] = await Promise.all([
      getTexasTalentProfiles(),
      getTexasTalentLaunchAudit(),
    ]);
    return { profiles, launchAudit };
  },
  head: () => ({
    meta: [
      { title: "Texas Talent Preview | Texas Defined" },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
