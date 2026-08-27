import { createServerFn } from "@tanstack/react-start";

export type EvergreenSource = {
  sourceName: string;
  sourceUrl: string;
};

const loadEvergreenSourceServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadEvergreenSourceServer } = await import("./evergreen-source.server");
    return loadEvergreenSourceServer(data.slug);
  });

export function loadEvergreenSource(slug: string): Promise<EvergreenSource | null> {
  return loadEvergreenSourceServerFn({ data: { slug } });
}
