import { useState } from 'react';

export function EntityImportReview() {
  const [value, setValue] = useState('{\n  "proposed": []\n}');
  const [result, setResult] = useState<unknown>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function preview() {
    setLoading(true); setError(''); setResult(undefined);
    try {
      const parsed = JSON.parse(value);
      const response = await fetch('/api/entity-import-preview', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(parsed),
      });
      const body = await response.json();
      setResult(body);
      if (!response.ok && !body?.manifest) setError(body?.error ?? `Preview failed with HTTP ${response.status}.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally { setLoading(false); }
  }

  return <section className="mt-10">
    <h2 className="font-display text-3xl">Import promotion review</h2>
    <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Paste a proposed entity payload to generate a read-only manifest. Previewing cannot write production data. Promotion requires the exact manifest ID as an external approval token and creates a rollback snapshot first.</p>
    <textarea className="mt-5 min-h-64 w-full rounded-md border border-border bg-background p-4 font-mono text-xs" value={value} onChange={(event) => setValue(event.target.value)} spellCheck={false} />
    <button type="button" onClick={preview} disabled={loading} className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">{loading ? 'Building manifest…' : 'Preview promotion'}</button>
    {error && <p className="mt-4 rounded-md border border-destructive/40 p-4 text-sm">{error}</p>}
    {result !== undefined && <pre className="mt-5 max-h-[40rem] overflow-auto rounded-md border border-border bg-muted p-4 text-xs">{JSON.stringify(result, null, 2)}</pre>}
  </section>;
}
