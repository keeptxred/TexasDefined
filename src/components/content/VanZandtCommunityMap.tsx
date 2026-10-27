/**
 * Source: TXGenWeb's USGS-origin populated-place coordinates for Van Zandt County.
 * https://www.txgenweb.org/research/landmarks/vanzandt.htm
 *
 * The existing community list and OSM search links remain the authoritative
 * navigation surface. This lightweight, geographic point diagram adds no map
 * libraries, remote tile requests, fabricated county borders or city routes.
 * Points locate named settlements, not city limits or parcel jurisdictions.
 */
export const VAN_ZANDT_COMMUNITY_POINTS = [
  { name: 'Canton', latitude: 32.556389, longitude: -95.863056 },
  { name: 'Wills Point', latitude: 32.709167, longitude: -96.008056 },
  { name: 'Grand Saline', latitude: 32.673333, longitude: -95.709167 },
  { name: 'Van', latitude: 32.524722, longitude: -95.636944 },
  { name: 'Edgewood', latitude: 32.698056, longitude: -95.885000 },
  { name: 'Fruitvale', latitude: 32.683056, longitude: -95.803056 },
  { name: 'Ben Wheeler', latitude: 32.445833, longitude: -95.703611 },
  { name: 'Martins Mill', latitude: 32.416111, longitude: -95.790000 },
  { name: 'Edom', latitude: 32.372222, longitude: -95.608611 },
] as const;

const bounds = { west: -96.10, east: -95.53, south: 32.32, north: 32.78 };
const chart = { left: 80, right: 890, top: 50, bottom: 490 };
function pointPosition(latitude: number, longitude: number) {
  return {
    x: chart.left + ((longitude - bounds.west) / (bounds.east - bounds.west)) * (chart.right - chart.left),
    y: chart.top + ((bounds.north - latitude) / (bounds.north - bounds.south)) * (chart.bottom - chart.top),
  };
}

export function VanZandtCommunityMap() {
  return (
    <figure className="mt-7 min-w-0" data-van-zandt-community-map="">
      <div className="overflow-x-auto rounded-lg border border-border" tabIndex={0} aria-label="Scrollable map of nine Van Zandt County communities">
        <svg className="block h-auto w-full" style={{ minWidth: 760 }} viewBox="0 0 960 540" role="group" aria-labelledby="van-zandt-community-map-title van-zandt-community-map-description" xmlns="http://www.w3.org/2000/svg">
          <title id="van-zandt-community-map-title">Nine Van Zandt County communities by geographic position</title>
          <desc id="van-zandt-community-map-description">North is up, east is right. Select a place to open its OpenStreetMap search. Point locations are approximate settlement locations, not municipal boundaries.</desc>
          <rect x="24" y="20" width="912" height="502" rx="12" className="fill-background stroke-border" strokeWidth="1.5" />
          <g className="stroke-border" strokeDasharray="4 7" aria-hidden="true">
            <path d="M80 50V490 M282 50V490 M485 50V490 M688 50V490 M890 50V490" />
            <path d="M80 50H890 M80 160H890 M80 270H890 M80 380H890 M80 490H890" />
          </g>
          <g aria-hidden="true" className="fill-muted-foreground" fontSize="13">
            <text x="47" y="62">N</text>
            <path d="M52 105V74 M44 84L52 74L60 84" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="482" y="520" textAnchor="middle">Locations shown proportionally · not a street map or county-boundary survey</text>
          </g>
          {VAN_ZANDT_COMMUNITY_POINTS.map((place) => {
            const { x, y } = pointPosition(place.latitude, place.longitude);
            const href = `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${place.name}, Van Zandt County, Texas`)}`;
            return (
              <a key={place.name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open map for ${place.name}, Van Zandt County`} data-van-zandt-community-point={place.name} className="group">
                <circle cx={x} cy={y} r="16" className="fill-primary stroke-background" strokeWidth="3" />
                <circle cx={x} cy={y} r="5" className="fill-background" />
                <text x={x} y={y + 36} textAnchor="middle" fontSize="17" fontWeight="600" className="fill-foreground">{place.name}</text>
              </a>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
        A geographic overview of nine verified settlements, including unincorporated communities. Points are approximate, not municipal boundaries. Geographic coordinates: <a href="https://www.txgenweb.org/research/landmarks/vanzandt.htm" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">USGS-origin populated-place records via TXGenWeb ↗</a>. Select a marker or use the individual OpenStreetMap links below for a detailed street map.
      </figcaption>
    </figure>
  );
}
