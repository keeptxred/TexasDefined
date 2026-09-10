#!/usr/bin/env node

import { pathToFileURL } from 'node:url';
import { runCli } from './verify-brand-location-sources.mjs';

export {
  compareBuceesOfficialToRegistry as compareOfficialToRegistry,
  parseBuceesOfficialTexasLocations as parseOfficialTexasLocations,
} from './verify-brand-location-sources.mjs';

const invokedDirectly = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) await runCli(process.argv.slice(2), { forcedBrand: 'bucees' });
