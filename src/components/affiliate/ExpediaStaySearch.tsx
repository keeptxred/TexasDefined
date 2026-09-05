const EXPEDIA_WIDGET_SCRIPT = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
const EXPEDIA_CAMREF = '1110lMy6E';
const EXPEDIA_PUBREF = 'texasdefined-stays';

type ExpediaStaySearchProps = {
  locationLabel?: string;
  title?: string;
  description?: string;
  compact?: boolean;
  id?: string;
};

function loadExpediaWidget(button: HTMLButtonElement) {
  if (typeof document === 'undefined') return;
  document.querySelector<HTMLScriptElement>(`script[src="${EXPEDIA_WIDGET_SCRIPT}"]`)?.remove();
  const script = document.createElement('script');
  script.className = 'eg-widgets-script';
  script.src = EXPEDIA_WIDGET_SCRIPT;
  script.async = true;
  button.hidden = true;
  document.body.appendChild(script);
}

export function ExpediaStaySearch({
  locationLabel = 'Texas',
  title,
  description,
  compact = false,
  id = 'expedia-stays',
}: ExpediaStaySearchProps) {
  return <section id={id} className={`${compact ? 'py-9' : 'py-12 sm:py-14'} border-b border-border`} aria-labelledby={`${id}-heading`}>
    <div className="grid gap-7 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Hotels & places to stay</p>
        <h2 id={`${id}-heading`} className={`${compact ? 'text-3xl' : 'text-4xl'} mt-2 font-display leading-tight`}>
          {title ?? `Find a place to stay near ${locationLabel}`}
        </h2>
      </div>
      <div className="min-w-0">
        <p className="mb-6 max-w-3xl text-sm leading-7 text-muted-foreground">
          {description ?? `Compare current hotel and lodging options for ${locationLabel} after you decide where the TexasDefined guide takes you.`}
        </p>
        <div className="rounded-md border border-border bg-surface p-4 sm:p-5">
          <button
            type="button"
            onClick={(event) => loadExpediaWidget(event.currentTarget)}
            className="inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            aria-controls={`${id}-expedia-widget`}
          >
            Search Expedia stays for {locationLabel} →
          </button>
          <div
            id={`${id}-expedia-widget`}
            className="eg-widget"
            data-widget="search"
            data-program="us-expedia"
            data-lobs="stays"
            data-network="pz"
            data-camref={EXPEDIA_CAMREF}
            data-pubref={EXPEDIA_PUBREF}
          />
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.</p>
      </div>
    </div>
  </section>;
}
