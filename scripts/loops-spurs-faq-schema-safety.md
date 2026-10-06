## Safety invariant

Do not replace `src/routes/article.$slug.tsx` from a historical blob to land this fix. The patch must be applied to the current branch copy and must change only the FAQ slug registration and FAQ start-heading mapping. The transformer in this branch enforces those anchors and is idempotent.
