import type { Destination } from "./types";

const WILDLIFE_NAME_PATTERN = /wildlife refuge|wildlife management area|wildlife center|wildlife sanctuary|birding center|zoo|aquarium|animal preserve/i;

export function wildlifeCollectionDestinations(destinations: Destination[]): Destination[] {
  return destinations
    .filter((destination) => destination.slug && (
      destination.managingAuthority === "U.S. Fish and Wildlife Service"
      || WILDLIFE_NAME_PATTERN.test(destination.name)
      || WILDLIFE_NAME_PATTERN.test(destination.summary ?? "")
    ))
    .sort((left, right) => {
      const leftFederal = left.managingAuthority === "U.S. Fish and Wildlife Service" ? 0 : 1;
      const rightFederal = right.managingAuthority === "U.S. Fish and Wildlife Service" ? 0 : 1;
      return leftFederal - rightFederal || left.name.localeCompare(right.name);
    });
}
