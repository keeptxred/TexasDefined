// Compatibility entry point retained for existing workflows.
// The canonical pre-index publication contract begins in the readiness validator;
// specialized authority validators extend it without weakening the launch floor.
await import('./validate-painted-church-preindex-readiness.mjs');
await import('./validate-painted-church-preservation-authority.mjs');
await import('./validate-painted-church-authority-floor.mjs');
