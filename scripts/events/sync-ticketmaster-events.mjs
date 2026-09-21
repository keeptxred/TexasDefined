import { writeFile, rename } from 'node:fs/promises';
import { fetchTexasEvents } from './ticketmaster-discovery.mjs';

try {
  const catalog = await fetchTexasEvents({ apiKey: process.env.TICKETMASTER_API_KEY, trackingBase: process.env.TICKETMASTER_IMPACT_BASE_URL });
  const target = 'src/data/generated/ticketmaster-events.json';
  await writeFile(`${target}.tmp`, `${JSON.stringify(catalog)}\n`);
  await rename(`${target}.tmp`, target);
  console.log(`Refreshed ${catalog.events.length} Ticketmaster Texas events.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
