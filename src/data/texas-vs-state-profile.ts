import { createServerFn } from "@tanstack/react-start";
import type { TexasVsStateProfile } from "@/data/texas-vs-states-index";

const loadTexasVsStateProfileServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { name: string }) => data)
  .handler(async ({ data }) => {
    const { texasVsStateProfile } = await import("./texas-vs-states");
    return texasVsStateProfile(data.name);
  });

export function loadTexasVsStateProfile(name: string): Promise<TexasVsStateProfile | null> {
  return loadTexasVsStateProfileServerFn({ data: { name } });
}
