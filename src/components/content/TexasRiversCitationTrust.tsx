import { CitationTrustPanel } from "@/components/authority/CitationTrustPanel";

const RIVERS_CANONICAL_URL = "https://texasdefined.com/article/texas-rivers-explained";

export function TexasRiversCitationTrust() {
  return (
    <div className="mt-10">
      <CitationTrustPanel
        title="Sources, methodology and verification"
        sources={[
          {
            name: "Texas Water Development Board — River Basins",
            url: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp",
            note: "Primary reference for Texas's 15 major river basins, eight coastal basins and statewide basin statistics used in the comparison reference.",
          },
          {
            name: "Texas Water Development Board — Major River Basins Map",
            url: "https://www.twdb.texas.gov/mapping/doc/maps/Major_River_Basins_8x11.pdf",
            note: "Official basin map used to check statewide orientation and drainage relationships.",
          },
        ]}
        methodology="Texas Defined uses TWDB basin definitions and statewide statistics as the primary reference, then organizes the material editorially by region and individual river system. The simplified on-page map is an orientation graphic, not a surveyed basin-boundary map; readers who need exact boundaries should use the linked TWDB map. River descriptions synthesize geographic context from the cited primary material and clearly separate that explanation from the official basin statistics."
        lastVerified="October 3, 2026"
      />
      <div className="border-b border-border py-6 text-sm leading-7 text-muted-foreground">
        <h3 className="font-semibold text-foreground">Recommended citation</h3>
        <p className="mt-2">Texas Defined. “Texas Rivers Explained.” Last verified October 3, 2026. {RIVERS_CANONICAL_URL}</p>
        <p className="mt-2 text-xs">Use the stable canonical URL above when citing this guide. For individual basin statistics, cite the linked Texas Water Development Board source directly when practical.</p>
      </div>
    </div>
  );
}

export default TexasRiversCitationTrust;
