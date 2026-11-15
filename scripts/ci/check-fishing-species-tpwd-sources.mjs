/**
 * Independent periodic TPWD fact-sheet watch for the nine new freshwater species.
 * Checks species identity and reachability only. Does not extend "verifiedAt"
 * or mutate content when a page responds; changed facts require human research.
 */
const species = [
  ["Bowfin", "Amia calva", "bowfin"],
  ["Common Carp", "Cyprinus carpio", "crp"],
  ["Spotted Gar", "Lepisosteus oculatus", "spottedgar"],
  ["Redear Sunfish", "Lepomis microlophus", "sunfish"],
  ["Green Sunfish", "Lepomis cyanellus", "greensunfish"],
  ["Warmouth", "Lepomis gulosus", "war"],
  ["Longear Sunfish", "Lepomis megalotis", "longearsunfish"],
  ["Redbreast Sunfish", "Lepomis auritus", "redbreastsunfish"],
  ["Rio Grande Cichlid", "Herichthys cyanoguttatus", "cichlid"],
];
const errors = [];
const batches = [species.slice(0, 3), species.slice(3, 6), species.slice(6)];
for (const batch of batches) {
  const results = await Promise.all(batch.map(async ([name, scientific, path]) => {
    const url = `https://tpwd.texas.gov/huntwild/wild/species/${path}/`;
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "TexasDefined-FishingSourceMonitor/1.0 (+https://texasdefined.com/fishing/species)",
          "accept": "text/html, text/plain;q=0.8",
        },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const searchable = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      for (const identity of [name, scientific]) if (!searchable.toLowerCase().includes(identity.toLowerCase()))
        throw new Error(`Agency fact sheet identity changed or omitted: ${identity}`);
      console.log(`Confirmed TPWD source identity: ${name} (${scientific})`);
      return null;
    } catch (err) {
      return `TPWD source for ${name}: ${err instanceof Error ? err.message : String(err)}. Investigate before treating source as current: ${url}`;
    }
  }));
  errors.push(...results.filter(Boolean));
}
if (errors.length) {
  errors.forEach((line) => console.error(line));
  process.exitCode = 1;
} else {
  console.log("PASS: Nine new TPWD freshwater species source identities are reachable and unchanged.");
}
