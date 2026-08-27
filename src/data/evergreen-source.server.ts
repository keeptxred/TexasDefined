import type { EvergreenSource } from "./evergreen-source";

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function loadEvergreenSourceServer(slug: string): Promise<EvergreenSource | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("texasdefined_articles")
    .select("source_name,source_url")
    .eq("slug", slug)
    .eq("status", "published")
    .is("source_feed_id", null)
    .maybeSingle();

  if (error) {
    console.error(`[Evergreen source] Failed to load source metadata for ${slug}: ${error.message}`);
    return null;
  }

  const sourceName = text(data?.source_name);
  const sourceUrl = text(data?.source_url);
  return sourceName && sourceUrl ? { sourceName, sourceUrl } : null;
}
