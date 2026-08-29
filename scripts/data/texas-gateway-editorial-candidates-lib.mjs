export function nonEditorialBlockers(entry) {
  return entry.blockers.filter((blocker) => !blocker.startsWith("editorial-status:"));
}

export function classifyGatewayEditorialEntries(entries) {
  const contentReadyStaged = [];
  const needsRemediation = [];
  const intentionallyStaged = [];
  const productionReady = [];
  const unexpected = [];

  for (const entry of entries) {
    const substantiveBlockers = nonEditorialBlockers(entry);

    if (entry.editorialStatus === "needs-expansion") {
      if (substantiveBlockers.length === 0) contentReadyStaged.push(entry);
      else needsRemediation.push(entry);
      continue;
    }

    if (entry.editorialStatus === "remain-staged") {
      intentionallyStaged.push(entry);
      continue;
    }

    if (entry.editorialStatus === "index-ready" && entry.readinessResult === "pass") {
      productionReady.push(entry);
      continue;
    }

    unexpected.push(entry);
  }

  return { contentReadyStaged, needsRemediation, intentionallyStaged, productionReady, unexpected };
}
