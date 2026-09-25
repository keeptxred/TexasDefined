export const RELOCATION_WORKSPACE_STORAGE_KEY = "texasdefined:my-texas-move:v1";
export const RELOCATION_WORKSPACE_UPDATE_EVENT = "texasdefined:my-texas-move:update";

export function saveRelocationAddressToWorkspace(address: string) {
  const normalized = address.trim().slice(0, 240);
  if (!normalized || typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem(RELOCATION_WORKSPACE_STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) as Record<string, unknown> : {};
    const savedAddresses = Array.isArray(existing.savedAddresses)
      ? existing.savedAddresses.filter((value): value is string => typeof value === "string")
      : [];

    const nextAddresses = savedAddresses.includes(normalized)
      ? savedAddresses
      : savedAddresses.concat(normalized);

    window.localStorage.setItem(
      RELOCATION_WORKSPACE_STORAGE_KEY,
      JSON.stringify({ ...existing, savedAddresses: nextAddresses }),
    );

    window.dispatchEvent(new CustomEvent(RELOCATION_WORKSPACE_UPDATE_EVENT, {
      detail: { savedAddress: normalized },
    }));

    return true;
  } catch {
    return false;
  }
}
