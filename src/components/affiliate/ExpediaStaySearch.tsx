const EXPEDIA_WIDGET_SCRIPT = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
const EXPEDIA_CAMREF = '1110lMy6E';
const EXPEDIA_PUBREF = 'texasdefined-stays';

export function ExpediaStaySearch({ locationLabel = 'Texas' }: { locationLabel?: string }) {
  function loadExpediaWidget(button: HTMLButtonElement) {
    const script = document.createElement('script');
    script.className = 'eg-widgets-script';
    script.src = EXPEDIA_WIDGET_SCRIPT;
    script.async = true;
    button.hidden = true;
    document.body.appendChild(script);
  }

  return <section className="border-b border-border py-10">
    <p className="eyebrow text-primary">Hotels & places to stay</p>
    <h2 className="mt-2 font-display text-3xl">Stay near {locationLabel}</h2>
    <p className="mt-3 text-sm text-muted-foreground">Compare current Expedia lodging options for your trip.</p>
    <div className="mt-5 rounded-md border border-border bg-surface p-4">
      <button type="button" onClick={(event) => loadExpediaWidget(event.currentTarget)} className="inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Search Expedia stays →</button>
      <div className="eg-widget" data-widget="search" data-program="us-expedia" data-lobs="stays" data-network="pz" data-camref={EXPEDIA_CAMREF} data-pubref={EXPEDIA_PUBREF} />
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.</p>
  </section>;
}
