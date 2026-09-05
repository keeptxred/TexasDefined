(() => {
  const SURFACE_ID = "expedia-travel-surface";
  const TRAVEL_PATH = /^\/(?:explore(?:\/|$)|destination\/|county\/|sports-venue\/|sports-venues\/|event\/|best-places-to-go-camping-in-texas(?:\/|$))/;
  const VENDOR_SCRIPT = "https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js";
  let observer;

  function buildSurface() {
    const section = document.createElement("section");
    section.id = SURFACE_ID;
    section.className = "border-y border-border py-8";
    section.innerHTML = `<div class="mx-auto max-w-7xl px-5">
      <p class="eyebrow text-primary">Hotels & places to stay</p>
      <h2 class="mt-2 font-display text-3xl">Find a place to stay nearby</h2>
      <button type="button" class="mt-5 inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Search Expedia stays →</button>
      <div class="eg-widget" data-widget="search" data-program="us-expedia" data-lobs="stays" data-network="pz" data-camref="1110lMy6E" data-pubref="texasdefined-stays"></div>
      <p class="mt-3 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.</p>
    </div>`;

    section.querySelector("button").addEventListener("click", (event) => {
      const script = document.createElement("script");
      script.className = "eg-widgets-script";
      script.src = VENDOR_SCRIPT;
      script.async = true;
      event.currentTarget.hidden = true;
      document.body.appendChild(script);
    }, { once: true });

    return section;
  }

  function syncSurface() {
    const current = document.getElementById(SURFACE_ID);
    if (!TRAVEL_PATH.test(window.location.pathname)) {
      current?.remove();
      return;
    }

    const main = document.getElementById("main");
    if (!main || (current && main.contains(current))) return;
    current?.remove();
    main.appendChild(buildSurface());
  }

  function scheduleSync() {
    window.requestAnimationFrame(syncSurface);
  }

  function start() {
    syncSurface();
    const main = document.getElementById("main");
    if (main) {
      observer = new MutationObserver(scheduleSync);
      observer.observe(main, { childList: true });
    }

    window.addEventListener("popstate", scheduleSync);
    for (const method of ["pushState", "replaceState"]) {
      const original = history[method];
      history[method] = function (...args) {
        const result = original.apply(this, args);
        scheduleSync();
        return result;
      };
    }
  }

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
})();
