import { createFileRoute } from "@tanstack/react-router";

import { getTexasTalentReverseLinkAudit } from "@/data/texas-talent.functions";

export const Route = createFileRoute("/admin/texas-talent/relationships")({
  beforeLoad: async () => ({
    reverseLinkAudit: await getTexasTalentReverseLinkAudit(),
  }),
  head: () => ({
    meta: [
      { title: "Texas Talent Relationship Audit | Texas Defined" },
      {
        name: "description",
        content: "Internal Texas Talent audit for safe reverse links from Texas Defined county, city and cultural pages.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
