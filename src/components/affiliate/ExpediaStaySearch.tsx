const EXPEDIA_WIDGET_SCRIPT = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
const EXPEDIA_CAMREF = '1110lMy6E';
const EXPEDIA_PUBREF = 'texasdefined-stays';

export function ExpediaStaySearch() {
  function loadExpediaWidget(button: HTMLButtonElement) {
    const script = document.createElement('script');
    script.className = 'eg-widgets-script';
    script.src = EXPEDIA_WIDGET_SCRIPT;
    script.async = true;
    button.hidden = true;
    document.body.appendChild(script);
  }

  return <section className="border-b border-border py-10">
    <h2 className="font-display text-3xl">Find a place to stay nearby</h2>
    <button type="button" onClick={(event) => loadExpediaWidget(event.currentTarget)} className="mt-5 inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Search Expedia stays →</button>
    <div className="eg-widget mt-4" data-widget="search" data-program="us-expedia" data-lobs="stays" data-network="pz" data-camref={EXPEDIA_CAMREF} data-pubref={EXPEDIA_PUBREF} />
    <p className="mt-3 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.</p>
  </section>;
}
