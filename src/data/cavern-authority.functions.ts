import { createServerFn } from "@tanstack/react-start";

export const getCavernAuthorityHtml = createServerFn({ method: "GET" }).handler(async () => {
  const { cavernAuthorityHtml } = await import("./cavern-authority.server");
  return cavernAuthorityHtml;
});
