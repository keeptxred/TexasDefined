(() => {
  const MODULE_ID = "td-angi-home-services";
  const PARTNER = "angi";

  const services = [
    { key: "roofing", label: "Roofing", cta: "Request roofing service options", patterns: [/\broof(?:ing| replacement| repair|er|ers)?\b/i], url: "http://request.angi.com/service-request/category/12061/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313936" },
    { key: "hvac", label: "HVAC & Air Conditioning", cta: "Request HVAC service options", patterns: [/\bhvac\b/i, /\bair conditioning\b/i, /\bac repair\b/i, /\bair conditioner\b/i], url: "http://request.angi.com/service-request/category/12002/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313937" },
    { key: "heating", label: "Heating & Furnace Systems", cta: "Request heating service options", patterns: [/\bfurnace\b/i, /\bheating system\b/i, /\bheater repair\b/i], url: "http://request.angi.com/service-request/category/12040/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313943" },
    { key: "plumbing", label: "Plumbing", cta: "Request plumbing service options", patterns: [/\bplumb(?:er|ers|ing)\b/i, /\bwater heater\b/i], url: "http://request.angi.com/service-request/category/12058/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43303139" },
    { key: "moving", label: "Moving", cta: "Request moving service options", patterns: [/\bmoving to texas\b/i, /\bmoving company\b/i, /\bmovers?\b/i, /\brelocat(?:e|ing|ion)\b/i], url: "http://request.angi.com/service-request/category/12050/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43303137" },
    { key: "foundation", label: "Foundation Services", cta: "Request foundation service options", patterns: [/\bfoundation (?:repair|company|companies|contractor|contractors|problem|problems|cost|costs)\b/i, /\bslab repair\b/i], url: "http://request.angi.com/service-request/category/12033/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=44920547" },
    { key: "remodeling", label: "Additions & Remodeling", cta: "Request remodeling service options", patterns: [/\bremodel(?:ing|er|ers)?\b/i, /\bhome renovation\b/i, /\bbathroom renovation\b/i, /\bkitchen renovation\b/i, /\bhome addition\b/i], url: "http://request.angi.com/service-request/category/12001/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313940" },
    { key: "windows", label: "Windows", cta: "Request window service options", patterns: [/\bwindow replacement\b/i, /\breplacement windows\b/i, /\bwindow installer\b/i, /\bwindow installation\b/i], url: "http://request.angi.com/service-request/category/12080/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313942" },
    { key: "fences", label: "Fences", cta: "Request fence service options", patterns: [/\bfence (?:repair|installation|installer|contractor|company|cost|costs)\b/i, /\bfencing contractor\b/i], url: "http://request.angi.com/service-request/category/12030/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313954" },
    { key: "pools", label: "Swimming Pools", cta: "Request pool service options", patterns: [/\bpool (?:builder|builders|contractor|contractors|installation|remodel|repair|resurfacing)\b/i, /\bswimming pool (?:builder|builders|contractor|contractors|installation)\b/i], url: "http://request.angi.com/service-request/category/12070/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313957" },
    { key: "landscaping", label: "Landscaping", cta: "Request landscaping service options", patterns: [/\blandscap(?:e|er|ers|ing)\b/i], url: "http://request.angi.com/service-request/category/12046/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313945" },
    { key: "concrete", label: "Concrete", cta: "Request concrete service options", patterns: [/\bconcrete (?:contractor|contractors|driveway|patio|repair|installation|cost|costs)\b/i], url: "http://request.angi.com/service-request/category/12015/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313956" },
    { key: "flooring", label: "Flooring & Carpet", cta: "Request flooring service options", patterns: [/\bflooring (?:installation|installer|installers|contractor|contractors|cost|costs)\b/i, /\bcarpet installation\b/i], url: "http://request.angi.com/service-request/category/12032/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313952" },
    { key: "painting", label: "Painting", cta: "Request painting service options", patterns: [/\bhouse paint(?:ing|er|ers)?\b/i, /\binterior painting\b/i, /\bexterior painting\b/i, /\bpainter(?:s)? cost\b/i], url: "http://request.angi.com/service-request/category/12054/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313950" },
    { key: "pest-control", label: "Pest Control", cta: "Request pest-control service options", patterns: [/\bpest control\b/i, /\bexterminator(?:s)?\b/i], url: "http://request.angi.com/service-request/category/12057/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43303140" },
    { key: "electrical", label: "Electrical", cta: "Request electrical service options", patterns: [/\belectrician(?:s)?\b/i, /\belectrical (?:repair|contractor|contractors|work|service|services)\b/i], url: "http://request.angi.com/service-request/category/12026/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313938" },
    { key: "handyman", label: "Handyman Services", cta: "Request handyman service options", patterns: [/\bhandyman\b/i, /\bhandyman services\b/i], url: "http://request.angi.com/service-request/category/12039/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43303138" },
    { key: "water-treatment", label: "Water Treatment Systems", cta: "Request water-treatment service options", patterns: [/\bwater softener\b/i, /\bwater treatment system\b/i, /\bwhole house water filter\b/i], url: "http://request.angi.com/service-request/category/12077/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=44954937" },
    { key: "siding", label: "Siding", cta: "Request siding service options", patterns: [/\bsiding (?:replacement|repair|installation|installer|contractor|cost|costs)\b/i], url: "http://request.angi.com/service-request/category/12064/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=46163723" },
    { key: "decks", label: "Decks", cta: "Request deck service options", patterns: [/\bdeck (?:builder|builders|contractor|contractors|repair|installation|cost|costs)\b/i], url: "http://request.angi.com/service-request/category/12017/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313951" },
    { key: "doors", label: "Doors", cta: "Request door service options", patterns: [/\bdoor (?:replacement|installation|installer|repair|cost|costs)\b/i], url: "http://request.angi.com/service-request/category/12024/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313944" },
    { key: "cleaning", label: "Cleaning & Maid Services", cta: "Request cleaning service options", patterns: [/\bmaid service\b/i, /\bhouse cleaning\b/i, /\bhome cleaning service\b/i], url: "http://request.angi.com/service-request/category/12014/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=43313939" },
    { key: "survey", label: "Land Surveyor", cta: "Request land-survey service options", patterns: [/\bland survey(?:or|ors|ing)?\b/i, /\bproperty survey(?:or|ors)?\b/i], url: "http://request.angi.com/service-request/category/12005/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=45292678" },
    { key: "paving", label: "Paving", cta: "Request paving service options", patterns: [/\bdriveway (?:paving|repaving|repair)\b/i, /\bpaving contractor\b/i], url: "http://request.angi.com/service-request/category/12055/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=46163719" },
    { key: "pressure-washing", label: "Pressure Washing", cta: "Request pressure-washing service options", patterns: [/\bpressure wash(?:ing|er|ers)?\b/i, /\bpower wash(?:ing|er|ers)?\b/i], url: "http://request.angi.com/service-request/category/14980/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=46163722" },
    { key: "custom-home", label: "Custom Home Builders", cta: "Request custom-home builder options", patterns: [/\bcustom home builder(?:s)?\b/i, /\bbuild a custom home\b/i], url: "http://request.angi.com/service-request/task/40105/?f_flg=MPLCJ-4396-scale-next-sr-traffic-ha&f_trt=next-sr-path&aid=157319271&m=comjuncaffnet&entry_point_id=44364980" }
  ];

  const commercialPath = /^\/(?:article|guides|texas-living|moving-to-texas|real-estate|home-garden|property-tax-guides)(?:\/|$)/i;

  function pageSignal() {
    const heading = document.querySelector("main h1")?.textContent || "";
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    const pathname = decodeURIComponent(window.location.pathname).replace(/[-_]/g, " ");
    return `${heading} ${description} ${pathname}`.replace(/\s+/g, " ").trim();
  }

  function chooseService(signal) {
    return services.find((service) => service.patterns.some((pattern) => pattern.test(signal))) || null;
  }

  function recordAffiliateClick(service, placement) {
    const detail = {
      event: "affiliate_click",
      affiliate_partner: PARTNER,
      affiliate_label: service.label,
      affiliate_placement: placement,
      affiliate_module: "home-services",
      page_path: window.location.pathname
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent("texasdefined:affiliate-click", { detail }));
  }

  function buildModule(service) {
    const placement = `home-services-${service.key}-after-article`;
    const aside = document.createElement("aside");
    aside.id = MODULE_ID;
    aside.setAttribute("aria-labelledby", `${MODULE_ID}-heading`);
    aside.className = "mt-12 border-y border-border bg-surface/55 py-8 sm:py-10";
    aside.innerHTML = `
      <p class="eyebrow text-primary">Home service option</p>
      <h2 id="${MODULE_ID}-heading" class="mt-3 font-display text-3xl">Need help with ${service.label.toLowerCase()}?</h2>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Use the guide above to understand the project first. If you are ready to contact professionals, Angi is a paid partner that can route a service request to providers for this type of work.</p>
      <div class="mt-6 max-w-2xl">
        <a class="group block border border-border bg-background p-5 transition-colors hover:border-primary/60" href="${service.url}" target="_blank" rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="angi" data-affiliate-placement="${placement}" data-commercial-partner="angi" data-commercial-placement="${placement}">
          <span class="font-display text-xl group-hover:text-primary">Angi · ${service.label}</span>
          <span class="mt-2 block text-sm leading-6 text-muted-foreground">Submit a service request for your project. Availability and provider coverage vary by location and project type.</span>
          <span class="mt-3 inline-block border-b border-primary pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">${service.cta} ↗</span>
        </a>
      </div>
      <p class="mt-5 max-w-2xl text-xs leading-6 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission if you submit a qualifying service request through Angi, at no additional cost to you. TexasDefined does not select, employ or endorse individual service providers.</p>`;

    const link = aside.querySelector("a");
    link?.addEventListener("click", () => recordAffiliateClick(service, placement));
    return aside;
  }

  function render() {
    document.getElementById(MODULE_ID)?.remove();
    if (!commercialPath.test(window.location.pathname)) return;

    const article = document.querySelector("main article");
    if (!article) return;

    const signal = pageSignal();
    const service = chooseService(signal);
    if (!service) return;

    const content = article.querySelector(".max-w-3xl") || article;
    content.appendChild(buildModule(service));
  }

  let timer;
  function scheduleRender() {
    window.clearTimeout(timer);
    timer = window.setTimeout(render, 120);
  }

  window.addEventListener("popstate", scheduleRender);
  document.addEventListener("DOMContentLoaded", scheduleRender, { once: true });
  new MutationObserver(scheduleRender).observe(document.documentElement, { childList: true, subtree: true });
  scheduleRender();
})();
