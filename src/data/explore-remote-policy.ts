const remoteExploreEnabled = ["1", "true", "yes"].includes(
  String(import.meta.env.VITE_TEXASDEFINED_REMOTE_EXPLORE_ENABLED || "").trim().toLowerCase(),
);

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "").trim();
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "").trim();

export function hasExploreRemoteData(): boolean {
  return remoteExploreEnabled && Boolean(supabaseUrl && supabaseKey);
}
