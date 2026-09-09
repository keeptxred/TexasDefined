import type { Destination } from "./types";
import { viatorDestinationExpansion as viatorDestinationExpansionBase } from "./viator-destination-expansion-base";
import { viatorDestinationExpansionWave5 } from "./viator-destination-expansion-wave5";
import { viatorDestinationExpansionWave6 } from "./viator-destination-expansion-wave6";
import { viatorDestinationExpansionWave7 } from "./viator-destination-expansion-wave7";
import { viatorDestinationExpansionWave8 } from "./viator-destination-expansion-wave8";
import { viatorDestinationExpansionWave9 } from "./viator-destination-expansion-wave9";
import { viatorDestinationExpansionWave10 } from "./viator-destination-expansion-wave10";
import { viatorDestinationExpansionWave11 } from "./viator-destination-expansion-wave11";

/**
 * Durable TexasDefined destination pages discovered through Viator inventory
 * review. Keep prior reviewed waves immutable in the base module and append
 * new vetted waves here so later batches do not rewrite established records.
 */
export const viatorDestinationExpansion: Destination[] = [
  ...viatorDestinationExpansionBase,
  ...viatorDestinationExpansionWave5,
  ...viatorDestinationExpansionWave6,
  ...viatorDestinationExpansionWave7,
  ...viatorDestinationExpansionWave8,
  ...viatorDestinationExpansionWave9,
  ...viatorDestinationExpansionWave10,
  ...viatorDestinationExpansionWave11,
];