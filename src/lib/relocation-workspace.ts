export const RELOCATION_WORKSPACE_STORAGE_KEY = "texasdefined:my-texas-move:v1";
export const RELOCATION_WORKSPACE_UPDATE_EVENT = "texasdefined:my-texas-move:update";
export const RELOCATION_ADDRESS_RESEARCH_EVENT = "texasdefined:my-texas-move:research-address";
export const RELOCATION_CHECKLIST_TOTAL = 16;

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


export function requestRelocationAddressResearch(address: string) {
  const normalized = address.trim().slice(0, 240);
  if (!normalized || typeof window === "undefined") return false;

  window.dispatchEvent(new CustomEvent(RELOCATION_ADDRESS_RESEARCH_EVENT, {
    detail: { address: normalized },
  }));
  return true;
}


function readWorkspaceRecord() {
  if (typeof window === "undefined") return {} as Record<string, unknown>;
  try {
    const raw = window.localStorage.getItem(RELOCATION_WORKSPACE_STORAGE_KEY);
    return raw ? JSON.parse(raw) as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

export function readRelocationSavedAddresses() {
  const existing = readWorkspaceRecord();
  if (!Array.isArray(existing.savedAddresses)) return [];
  return existing.savedAddresses
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim().slice(0, 240))
    .filter(Boolean)
    .slice(0, 20);
}

export function readRelocationChecklistProgress() {
  const existing = readWorkspaceRecord();
  return Array.isArray(existing.completedChecklistItems)
    ? existing.completedChecklistItems.filter((value): value is string => typeof value === "string")
    : [];
}

export function setRelocationChecklistItemComplete(itemId: string, complete: boolean) {
  const normalized = itemId.trim().toLowerCase();
  if (!/^[a-z0-9-]{1,80}$/.test(normalized) || typeof window === "undefined") {
    return readRelocationChecklistProgress();
  }

  try {
    const existing = readWorkspaceRecord();
    const current = Array.isArray(existing.completedChecklistItems)
      ? existing.completedChecklistItems.filter((value): value is string => typeof value === "string")
      : [];
    const next = complete
      ? (current.includes(normalized) ? current : current.concat(normalized))
      : current.filter((value) => value !== normalized);

    window.localStorage.setItem(
      RELOCATION_WORKSPACE_STORAGE_KEY,
      JSON.stringify({ ...existing, completedChecklistItems: next }),
    );

    window.dispatchEvent(new CustomEvent(RELOCATION_WORKSPACE_UPDATE_EVENT, {
      detail: { completedChecklistItems: next },
    }));

    return next;
  } catch {
    return readRelocationChecklistProgress();
  }
}
