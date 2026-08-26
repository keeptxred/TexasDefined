import { createFileRoute } from "@tanstack/react-router";

import {
  getTexasTalentLaunchAudit,
  getTexasTalentProfiles,
} from "@/data/texas-talent.functions";

const description = "Internal public-style preview for the Texas Talent pillar: The Stars of Texas Shine Bright.";

export const Route = createFileRoute("/admin/texas-talent/preview")({
  beforeLoad: async () => {
    const [profiles, launchAudit] = await Promise.all([
      getTexasTalentProfiles(),
      getTexasTalentLaunchAudit(),
    ]);
    return { profiles, launchAudit };
  },
  head: () => ({
    meta: [
      { title: "Texas Talent Public Preview | Texas Defined" },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
