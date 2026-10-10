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
            note: "Statewide mapped basin locations with county context; the agency labels the map January 2014 and cautions mapped boundaries are approximate.",
          },
          {
            name: "TWDB Groundwater Modeling — 2023 official river basin polygons",
            url: "https://gis1.twdb.texas.gov/server/rest/services/WSC-GW-Modeling/GM_Admin_Boundaries/MapServer/0",
            note: "TWDB official major/coastal river basin polygons, edited August 7, 2023. Used in the optional interactive watershed map; maps drainage boundaries rather than river channels, public access, or legal parcel boundaries.",
          },
          {
            name: "Texas Water Development Board — GIS datasets",
            url: "https://www.twdb.texas.gov/mapping/gisdata.asp",
            note: "Underlying geographic layers and metadata for mapping work. Its USGS-derived 23-basin layer is explicitly not the official TWDB basin-boundary dataset; do not substitute the two.",
          },
          {
            name: "US Geological Survey — Rivers, Streams, and Creeks",
            url: "https://www.usgs.gov/water-science-school/science/rivers-streams-and-creeks",
            note: "Scientific explanation of river formation, headwaters, gravity, drainage, groundwater and runoff.",
          },
          {
            name: "US Geological Survey — Rivers and the Landscape",
            url: "https://www.usgs.gov/water-science-school/science/rivers-and-landscape",
            note: "Explains tributaries, river valleys and the development of channels and watersheds.",
          },
          {
            name: "USGS — Current water conditions",
            url: "https://waterdata.usgs.gov/tx/nwis/rt",
            note: "Locate measured streamflow and gauge levels before visiting; these are not the same thing as long-term TWDB reference averages.",
          },
          {
            name: "Texas Parks and Wildlife — Public boater access",
            url: "https://tpwd.texas.gov/landwater/water/habitats/rivers/access/index.phtml",
            note: "Authoritative statewide directory of paddling trails, leased access and water-access resources.",
          },
          {
            name: "Texas Parks and Wildlife — Navigable stream public access",
            url: "https://tpwd.texas.gov/publications/nonpwdpubs/water_issues/rivers/navigation/riddell/publicaccess.phtml",
            note: "Explains the critical distinction between public river use and crossing private land to reach a river.",
          },
          {
            name: "National Weather Service — Flood safety",
            url: "https://www.weather.gov/safety/flood",
            note: "Weather and flood preparedness reference, separate from current local watches, warnings and gauge readings.",
          },
        ]}
        methodology="Texas Defined transcribed all 15 major-basin figures from the TWDB statewide reference table and lists eight designated coastal basins without fabricating missing comparative figures. Three separate measures are presented: basin drainage area within Texas, main-river length within Texas, and average annual volume. TWDB does not specify the averaging period in its public summary table, so we do not describe these numbers as current streamflow. The lead geographical map is the TWDB January 2014 basin reference and carries the agency’s approximation disclaimer; the separately downloadable TexasDefined graphic is schematic only. USGS supplies the hydrology explanation; TPWD supplies access guidance; NWS supplies flood-safety guidance. Editorial examples and linked destinations are not agency certifications of access or conditions."
        lastVerified="October 9, 2026"
      />
      <div className="border-b border-border py-6 text-sm leading-7 text-muted-foreground">
        <h3 className="font-semibold text-foreground">Recommended citation</h3>
        <p className="mt-2">Texas Defined. “Texas Rivers Explained.” Last verified October 9, 2026. {RIVERS_CANONICAL_URL}</p>
        <p className="mt-2 text-xs">Use the stable canonical URL above when citing this guide. For individual basin statistics, cite the linked Texas Water Development Board source directly when practical.</p>
      </div>
    </div>
  );
}

export default TexasRiversCitationTrust;
