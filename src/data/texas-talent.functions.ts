import { createServerFn } from "@tanstack/react-start";

export const getTexasTalentProfiles = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTexasTalentProfilesServer } = await import("./texas-talent.server");
  return loadTexasTalentProfilesServer();
});

export const getTexasTalentLaunchAudit = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTexasTalentLaunchAuditServer } = await import("./texas-talent.server");
  return loadTexasTalentLaunchAuditServer();
});

export const getTexasTalentReverseLinkAudit = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTexasTalentReverseLinkAuditServer } = await import("./texas-talent-reverse-links.server");
  return loadTexasTalentReverseLinkAuditServer();
});

export const getTexasTalentProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasTalentProfileServer } = await import("./texas-talent.server");
    return loadTexasTalentProfileServer(data.slug);
  });

export const getTexasTalentProfileWithResolvedLinks = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasTalentProfileWithResolvedLinksServer } = await import("./texas-talent.server");
    return loadTexasTalentProfileWithResolvedLinksServer(data.slug);
  });

export const getTexasTalentRelatedProfiles = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string; limit?: number }) => data)
  .handler(async ({ data }) => {
    const { loadTexasTalentRelatedProfilesServer } = await import("./texas-talent-related.server");
    return loadTexasTalentRelatedProfilesServer(data.slug, data.limit);
  });
