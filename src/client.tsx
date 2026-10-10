import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

// Preload streamed shell boundaries before beginning document hydration.
// This retains code-split Header/Footer bundles and avoids the mismatch
// from hydrating their Suspense fallbacks before their chunks are available.
async function beginHydration() {
  await Promise.all([
    import("@/components/layout/Header"),
    import("@/components/layout/Footer"),
  ]);
  hydrateRoot(document, <StrictMode><StartClient /></StrictMode>);
}

void beginHydration();
