/** A destination named for its town must never be described as "near itself". */
export function destinationLocationAnswer(input: {
  name: string;
  nearestTown: string;
  countyLabel?: string;
  regionName?: string;
  address?: string;
}): string {
  const { name, nearestTown, countyLabel, regionName, address } = input;
  const samePlace = name.trim().localeCompare(nearestTown.trim(), undefined, { sensitivity: "base" }) === 0;
  if (samePlace) {
    const place = countyLabel ? `${countyLabel}, Texas` : "Texas";
    return `${name} is a community in ${place}${regionName ? `, in the ${regionName} region` : ""}.`;
  }
  // Postal cities include remote state parks outside municipal boundaries.
  // Show the actual street/park-road address without claiming city-limit status.
  const validAddress = (address ?? "").trim();
  const isStreetAddress = /^\d+\s/.test(validAddress) || /^(?:FM|RR|CR|US|State Highway|County Road|Park Road)\s+\d/i.test(validAddress);
  if (isStreetAddress) {
    return `${name} is at ${validAddress}${countyLabel ? `, in ${countyLabel}` : ""}.`;
  }
  const locality = nearestTown.trim() ? `near ${nearestTown}, Texas` : "in Texas";
  return `${name} is ${locality}${countyLabel ? `, in ${countyLabel}` : ""}.`;
}
