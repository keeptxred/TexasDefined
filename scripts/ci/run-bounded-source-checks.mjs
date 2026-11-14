/**
 * Bounded, dependency-free work queue for external source checks.
 * A source failure remains the caller's responsibility: do not use allSettled
 * or silently convert a thrown check into a successful run.
 */
export async function runBoundedSourceChecks(tasks, concurrency = 4) {
  if (!Array.isArray(tasks) || !Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) {
    throw new Error("Invalid source-check tasks or concurrency (expected integer 1..8)");
  }
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, async () => {
    while (cursor < tasks.length) {
      const current = tasks[cursor++];
      await current();
    }
  }));
}
