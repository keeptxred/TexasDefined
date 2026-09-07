export function TexasBrandLocator() {
  return (
    <section data-texas-brand-locator aria-labelledby="texas-brand-locator-heading" className="mb-12 border-y border-border bg-muted/20 py-8 sm:px-8">
      <div className="px-6 sm:px-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Texas brand locator</p>
        <h2 id="texas-brand-locator-heading" className="mt-2 font-display text-4xl">Find your H-E-B or Buc-ee's</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Enter a Texas street address and choose what you want to find. TexasDefined uses the U.S. Census geocoder for the search location, H-E-B's live store locator for H-E-B results, and an editorially verified snapshot of Buc-ee's official Texas location list for Buc-ee's results.
        </p>

        <form data-texas-brand-locator-form className="mt-6 grid gap-4 lg:grid-cols-[220px_1fr_auto] lg:items-end">
          <label className="grid gap-2 text-sm font-semibold" htmlFor="texas-brand-choice">
            Find
            <select id="texas-brand-choice" name="brand" defaultValue="both" className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground">
              <option value="both">H-E-B + Buc-ee's</option>
              <option value="heb">H-E-B</option>
              <option value="bucees">Buc-ee's</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold" htmlFor="texas-brand-address">
            Texas street address
            <input
              id="texas-brand-address"
              name="address"
              type="text"
              required
              minLength={8}
              maxLength={240}
              autoComplete="street-address"
              placeholder="Example: 123 Main St, Katy, TX 77494"
              className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground"
            />
          </label>
          <button type="submit" className="min-h-11 border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            Find nearby locations
          </button>
        </form>

        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Your address is used to perform this search and is not stored or displayed publicly. Distances are approximate; use the official brand link or directions link before traveling.
        </p>
        <div data-texas-brand-locator-status className="mt-6 text-sm text-muted-foreground" aria-live="polite" hidden />
        <div data-texas-brand-locator-results className="mt-8" aria-live="polite" />
      </div>
    </section>
  );
}
