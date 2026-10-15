import { createServerFn } from "@tanstack/react-start";

export const getSwimmingAuthorityHtml = createServerFn({ method: "GET" }).handler(async () => {
  const { swimmingAuthorityHtml } = await import("./swimming-authority-content.server");
  return swimmingAuthorityHtml;
});
