const remoteExploreEnabled = import.meta.env.VITE_TEXASDEFINED_REMOTE_EXPLORE_ENABLED === "true";

export function hasExploreRemoteData(): boolean {
  return remoteExploreEnabled
    && Boolean(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL)
    && Boolean(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}
