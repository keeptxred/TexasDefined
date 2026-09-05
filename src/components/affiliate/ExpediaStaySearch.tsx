import { useEffect } from 'react';

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

function ensureExpediaWidgetScript() {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${EXPEDIA_WIDGET_SCRIPT}"]`);
  if (existing) return;

  const script = document.createElement('script');
  script.className = 'eg-widgets-script';
  script.src = EXPEDIA_WIDGET_SCRIPT;
  script.defer = true;
  script.dataset.texasdefinedExpedia = 'true';
  document.body.appendChild(script);
}

export function ExpediaStaySearch({
  locationLabel = 'Texas',
  title,
  description,
  compact = false,
  id = 'expedia-stays',
}: ExpediaStaySearchProps) {
  useEffect(() => {
    ensureExpediaWidgetScript();
  }, []);

  const heading = title ?? `Find a place to stay near ${locationLabel}`;
  const copy = description
    ?? `Compare current hotel and lodging options for ${locationLabel} after you decide where the TexasDefined guide takes you.`;

  return <section
    id={id}
    className={`${compact ? 'py-9' : 'py-12 sm:py-14'} border-b border-border`}
    aria-labelledby={`${id}-heading`}
  >
    <div className="grid gap-7 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Hotels & places to stay</p>
        <h2 id={`${id}-heading`} className={`${compact ? 'text-3xl' : 'text-4xl'} mt-2 font-display leading-tight`}>{heading}</h2>
      </div>
      <div className="min-w-0">
        <p className="mb-6 max-w-3xl text-sm leading-7 text-muted-foreground">{copy}</p>
        <div className="rounded-md border border-border bg-surface p-4 sm:p-5">
          <div
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
    <script className="eg-widgets-script" src={EXPEDIA_WIDGET_SCRIPT} defer />
  </section>;
}
