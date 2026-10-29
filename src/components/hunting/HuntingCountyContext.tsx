import { createContext, useContext, useState, type ReactNode } from "react";

type HuntingCountySelection = {
  countySlug: string;
  setCountySlug: (slug: string) => void;
};

const HuntingCountyContext = createContext<HuntingCountySelection | null>(null);

/** The two hub planners refer to the same county, without claiming county-filtered season data. */
export function HuntingCountyProvider({ children }: { children: ReactNode }) {
  const [countySlug, setCountySlug] = useState("");
  return (
    <HuntingCountyContext.Provider value={{ countySlug, setCountySlug }}>
      {children}
    </HuntingCountyContext.Provider>
  );
}

export function useHuntingCounty() {
  const context = useContext(HuntingCountyContext);
  if (!context) throw new Error("Hunting planning tools must be rendered inside HuntingCountyProvider");
  return context;
}
