import { createServerFn } from "@tanstack/react-start";

/** Serve researched swim and river tubing guidance without recursively
 * fetching a public Cloudflare asset while rendering the page. */
export const getSwimmingAuthorityHtml = createServerFn({ method: "GET" }).handler(async () => {
  const { swimmingAuthorityHtml } = await import("./swimming-authority.server");
  return swimmingAuthorityHtml;
});
