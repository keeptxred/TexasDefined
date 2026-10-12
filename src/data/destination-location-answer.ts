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
  const normalizedAddress = (address ?? "").toLowerCase().replace(/\s+/g, " ");
  const localitySuffix = `, ${nearestTown.toLowerCase()}, tx`;
  const isInTown = normalizedAddress.includes(localitySuffix);
  const locality = nearestTown.trim() ? `${isInTown ? "in" : "near"} ${nearestTown}, Texas` : "in Texas";
  return `${name} is ${locality}${countyLabel ? `, in ${countyLabel}` : ""}.`;
}
