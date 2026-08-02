import { createContext, useContext, type ReactNode } from "react";

import type { BrandConfig } from "./types";

const BrandContext = createContext<BrandConfig | null>(null);

export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandConfig;
  children: ReactNode;
}) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandConfig {
  const brand = useContext(BrandContext);
  if (!brand) {
    throw new Error("useBrand must be used inside a <BrandProvider>");
  }
  return brand;
}

export function useBrandCopy() {
  return useBrand().copy;
}

export function useFeature(flag: keyof BrandConfig["features"]): boolean {
  return useBrand().features[flag];
}
