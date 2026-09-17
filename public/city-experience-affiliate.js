(() => {
  const markets = {
    austin: ["Austin", "/Austin/d5021"],
    "fort-worth": ["Fort Worth", "/Fort-Worth/d33749"],
    galveston: ["Galveston", "/Galveston/d4385"],
    fredericksburg: ["Fredericksburg", "/Fredericksburg/d50796"],
    waco: ["Waco", "/Waco/d50076"],
    "corpus-christi": ["Corpus Christi", "/Corpus-Christi/d28078"],
    "port-aransas": ["Port Aransas", "/Port-Aransas/d50797-ttd"],
    "south-padre-island": ["South Padre Island", "/South-Padre-Island/d22446-ttd"],
    "el-paso": ["El Paso", "/El-Paso/d50135"],
    amarillo: ["Amarillo", "/Amarillo/d29045"],
  };

  function citySlug() {
    const match = window.location.pathname.match(/^\/city\/([^/?#]+)\/?$/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  function removeCard() {
    document.querySelector('[data-city-experience-affiliate="viator"]')?.remove();
  }

  function trackClick(slug, label, placement) {
    const detail = {
      event: "affiliate_click",
      affiliate_partner: "viator",
      affiliate_label: label,
      affiliate_placement: placement,
      affiliate_module: "city-experiences",
      page_path: window.location.pathname,
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent("texasdefined:affiliate-click", { detail }));
  }

  function render() {
    const slug = citySlug();
    const market = slug ? markets[slug] : null;
    const existing = document.querySelector('[data-city-experience-affiliate="viator"]');

    if (!market) {
      existing?.remove();
      return;
    }
    if (existing?.getAttribute("data-city-slug") === slug) return;
    removeCard();

    const article = document.querySelector("#main article");
    if (!article) return;
    const mapLink = article.querySelector('a[href*="google.com/maps/search"]');
    const anchor = mapLink?.closest("div") || article.querySelector("header");
    if (!anchor) return;

    const [name, path] = market;
    const placement = `viator-city-${slug}`;
    const label = `Browse current ${name} experiences`;
    const href = `https://www.viator.com${path}?pid=P00318227&mcid=42383&campaign=texasdefined-city-${slug}`;
    const section = document.createElement("section");
    section.setAttribute("data-city-experience-affiliate", "viator");
    section.setAttribute("data-city-slug", slug);
    section.className = "border-b border-border bg-surface/55 py-7 sm:py-8";
    section.innerHTML = `<p class="eyebrow text-primary">Tours &amp; bookable experiences</p><h2 class="mt-2 font-display text-3xl leading-tight">Find things to do in ${name}</h2><p class="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Check current guided tours, tickets and organized experiences on Viator.</p><a href="${href}" target="_blank" rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="viator" data-affiliate-placement="${placement}" data-commercial-partner="viator" data-commercial-placement="${placement}" class="mt-5 inline-flex min-h-11 items-center bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">${label} ↗</a><p class="mt-4 max-w-3xl text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you.</p>`;
    section.querySelector("a")?.addEventListener("click", () => trackClick(slug, label, placement));
    anchor.insertAdjacentElement("afterend", section);
  }

  let scheduled = false;
  function scheduleRender() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      render();
    });
  }

  render();
  window.addEventListener("popstate", scheduleRender);
  const root = document.getElementById("main") || document.body;
  new MutationObserver(scheduleRender).observe(root, { childList: true, subtree: true });
})();
