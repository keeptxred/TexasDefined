import { useBrand } from "@/brand/context";

/**
 * Permission surface. Phase 1 has no auth: everyone is an anonymous reader.
 * When the shared Supabase project is connected, this hook reads brand-scoped
 * roles — components and routes already consume the final shape.
 */

export type PlatformRole = "reader" | "member" | "editor" | "admin";

export interface Permissions {
  role: PlatformRole;
  brandId: string;
  can: (action: "read" | "comment" | "publish" | "administer") => boolean;
}

const ROLE_ACTIONS: Record<PlatformRole, string[]> = {
  reader: ["read"],
  member: ["read", "comment"],
  editor: ["read", "comment", "publish"],
  admin: ["read", "comment", "publish", "administer"],
};

export function usePermissions(): Permissions {
  const brand = useBrand();
  const role: PlatformRole = "reader";
  return {
    role,
    brandId: brand.identity.id,
    can: (action) => ROLE_ACTIONS[role].includes(action),
  };
}
