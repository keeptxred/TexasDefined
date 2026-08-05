import { useCallback, useEffect, useState } from "react";

/**
 * Saved-product persistence for the Shop "Save for later" control.
 * Storage is namespaced to TexasDefined and degrades quietly when the browser
 * blocks localStorage (private mode, cookie-blocking extensions).
 */
const STORAGE_KEY = "texasdefined:saved-products";
const EVENT = "texasdefined:saved-products-changed";

function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeSaved(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage blocked or full: keep the in-memory state so the UI still responds.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useSavedProduct(productId: string) {
  const [saved, setSaved] = useState(false);

  // Read after hydration so server and client markup match.
  useEffect(() => {
    const sync = () => setSaved(readSaved().includes(productId));
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [productId]);

  const toggle = useCallback(() => {
    const current = readSaved();
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];
    setSaved(next.includes(productId));
    writeSaved(next);
  }, [productId]);

  return { saved, toggle };
}
