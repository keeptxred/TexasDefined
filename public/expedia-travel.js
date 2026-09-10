(() => {
  const SURFACE_ID = "expedia-travel-surface";
  const SLOT_SELECTOR = "[data-stay-nearby-slot]";
  const STAY_DATA_URL = "/stay-nearby-hotels.json";
  const TRAVEL_PATH = /^\/(?:explore(?:\/|$)|destination\/|city\/|county\/|sports-venue\/|sports-venues\/(?!compare(?:\.csv)?(?:\/|$))|sports-venues$|event\/|events(?:\/|$)|best-places-to-go-camping-in-texas(?:\/|$)|texas-college-towns(?:\/|$)|texas-tailgating-guide(?:\/|$)|texas-unique-lodging(?:\/|$)|texas-music-venues(?:\/|$)|texas-roadside-oddities(?:\/|$))/;
  const TRAVEL_ARTICLE_SECTION = /\b(?:travel|lodging|road trips?|weekend getaways?|events?)\b/i;
  const CONTEXT_PATHS = [
    { kind: "venue", pattern: /^\/sports-venue\/([^/?#]+)\/?$/ },
    { kind: "event", pattern: /^\/event\/([^/?#]+)\/?$/ },
    { kind: "destination", pattern: /^\/destination\/([^/?#]+)\/?$/ },
    { kind: "city", pattern: /^\/city\/([^/?#]+)\/?$/ },
  ];
  const VENDOR_SCRIPT = "https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js";
  const DISCLOSURE = "Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.";
  let observer;
  let stayDataPromise;
  let syncVersion = 0;

  function hasTravelArticleSection(value) {
    if (!value || typeof value !== "object") return false;
    const section = value.articleSection;
    const sections = Array.isArray(section) ? section : [section];
    if (sections.some((item) => typeof item === "string" && TRAVEL_ARTICLE_SECTION.test(item))) return true;
    return Object.values(value).some(hasTravelArticleSection);
  }

  function hasTravelBookingMetadata() {
    return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).some((script) => {
      try {
        return hasTravelArticleSection(JSON.parse(script.textContent || ""));
      } catch {
        return false;
      }
    });
  }

  function isTravelBookingSurface() {
    return TRAVEL_PATH.test(window.location.pathname) || hasTravelBookingMetadata();
  }

  function contextFromPath(pathname = window.location.pathname) {
    for (const candidate of CONTEXT_PATHS) {
      const match = pathname.match(candidate.pattern);
      if (match) return { kind: candidate.kind, key: decodeURIComponent(match[1]) };
    }
    return null;
  }

  function loadStayData() {
    if (!stayDataPromise) {
      stayDataPromise = fetch(STAY_DATA_URL, { credentials: "same-origin" })
        .then((response) => {
          if (!response.ok) throw new Error(`Stay Nearby data request failed: ${response.status}`);
          return response.json();
        })
        .catch(() => null);
    }
    return stayDataPromise;
  }

  function distanceMiles(left, right) {
    const radiusMiles = 3958.8;
    const radians = (degrees) => degrees * Math.PI / 180;
    const dLat = radians(right.latitude - left.latitude);
    const dLon = radians(right.longitude - left.longitude);
    const lat1 = radians(left.latitude);
    const lat2 = radians(right.latitude);
    const haversine = Math.sin(dLat / 2) ** 2
      + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return radiusMiles * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  }

  function verifiedCoordinates(value) {
    return value
      && value.verified === true
      && Number.isFinite(value.latitude)
      && Number.isFinite(value.longitude);
  }

  function scoreProperty(property, context) {
    const relationship = (property.contexts || []).find((item) => item.kind === context.kind && item.key === context.key);
    if (relationship) return { property, relationship, score: relationship.rank ?? 100 };

    const allowBroadFallback = context.kind === "city" || context.allowBroadFallback === true;
    if (!allowBroadFallback) return null;

    if (context.neighborhood && (property.neighborhoods || []).includes(context.neighborhood)) {
      return { property, relationship: null, score: 300 };
    }

    if (context.city && property.city === context.city) {
      if (verifiedCoordinates(context.coordinates) && verifiedCoordinates(property.coordinates)) {
        return { property, relationship: null, score: 400 + distanceMiles(context.coordinates, property.coordinates) };
      }
      return { property, relationship: null, score: 900 };
    }

    return null;
  }

  function selectStayNearby(data, context, limit = 3) {
    if (!data || !Array.isArray(data.properties) || !context?.kind || !context?.key) return [];
    const cap = Math.min(Math.max(Number(limit) || 3, 1), data.policy?.maxCards || 3);
    return data.properties
      .filter((property) => property.status === "active")
      .map((property) => scoreProperty(property, context))
      .filter(Boolean)
      .sort((left, right) => left.score - right.score || left.property.name.localeCompare(right.property.name))
      .slice(0, cap);
  }

  function verifiedAffiliateTarget(property) {
    return (property.bookingTargets || []).find((target) =>
      target.verified === true
      && typeof target.affiliateUrl === "string"
      && /^https:\/\//.test(target.affiliateUrl));
  }

  function permittedImage(property, affiliateTarget) {
    const image = property.image;
    if (!image?.url || !affiliateTarget) return null;
    if (image.rightsSource !== "expedia-creator-toolbox") return null;
    if (image.bookingProvider !== affiliateTarget.provider) return null;
    if (!image.url.startsWith("/")) return null;
    return image;
  }

  function ensureVendorScript() {
    if (document.querySelector(".eg-widgets-script")) return;
    const script = document.createElement("script");
    script.className = "eg-widgets-script";
    script.src = VENDOR_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }

  function createWidgetHost() {
    const host = document.createElement("div");
    host.className = "td-stay-widget-host";
    host.hidden = true;
    host.tabIndex = -1;

    const note = document.createElement("p");
    note.className = "mb-3 text-sm text-muted-foreground";
    note.textContent = "Use Expedia to compare live availability and current rates. TexasDefined does not cache or display nightly prices.";
    host.appendChild(note);

    const widget = document.createElement("div");
    widget.className = "eg-widget";
    widget.setAttribute("data-widget", "search");
    widget.setAttribute("data-program", "us-expedia");
    widget.setAttribute("data-lobs", "stays");
    widget.setAttribute("data-network", "pz");
    widget.setAttribute("data-camref", "1110lMy6E");
    widget.setAttribute("data-pubref", "texasdefined-stays");
    host.appendChild(widget);
    return host;
  }

  function activateWidget(section) {
    const host = section.querySelector(".td-stay-widget-host");
    if (!host) return;
    host.hidden = false;
    ensureVendorScript();
    const behavior = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    host.scrollIntoView({ behavior, block: "nearest" });
    host.focus({ preventScroll: true });
  }

  function createAction(property, section) {
    const affiliateTarget = verifiedAffiliateTarget(property);
    if (affiliateTarget) {
      const link = document.createElement("a");
      link.className = "inline-flex min-h-11 items-center justify-center bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90";
      link.href = affiliateTarget.affiliateUrl;
      link.target = "_blank";
      link.rel = "sponsored noopener noreferrer";
      link.textContent = affiliateTarget.ctaLabel || "View stay";
      return link;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-semibold hover:bg-muted";
    button.textContent = "Search Expedia stays";
    button.addEventListener("click", () => activateWidget(section));
    return button;
  }

  function createHotelCard(entry, section, index, total) {
    const { property, relationship } = entry;
    const affiliateTarget = verifiedAffiliateTarget(property);
    const image = permittedImage(property, affiliateTarget);
    const article = document.createElement("article");
    article.className = "td-stay-card border border-border bg-background";
    article.setAttribute("aria-label", `${property.name}, hotel ${index + 1} of ${total}`);

    if (image) {
      const img = document.createElement("img");
      img.className = "td-stay-image";
      img.src = image.url;
      img.alt = image.alt || property.name;
      img.loading = "lazy";
      img.decoding = "async";
      article.appendChild(img);
    } else {
      const fallback = document.createElement("div");
      fallback.className = "td-stay-media bg-muted";
      const marker = document.createElement("span");
      marker.className = "eyebrow text-primary";
      marker.textContent = "Stay nearby";
      const area = document.createElement("strong");
      area.className = "mt-2 block font-display text-xl leading-tight";
      area.textContent = relationship?.geographicContext || property.area || property.city;
      fallback.append(marker, area);
      article.appendChild(fallback);
    }

    const body = document.createElement("div");
    body.className = "p-5";

    const context = document.createElement("p");
    context.className = "eyebrow text-primary";
    context.textContent = relationship?.geographicContext || property.area || property.city;

    const heading = document.createElement("h3");
    heading.className = "mt-2 font-display text-2xl leading-tight";
    heading.textContent = property.name;

    body.append(context, heading);

    if (relationship?.proximity) {
      const proximity = document.createElement("p");
      proximity.className = "mt-3 text-sm leading-6 text-foreground";
      proximity.textContent = relationship.proximity;
      body.appendChild(proximity);
    }

    if (relationship?.differentiator) {
      const differentiator = document.createElement("p");
      differentiator.className = "mt-2 text-sm leading-6 text-muted-foreground";
      differentiator.textContent = relationship.differentiator;
      body.appendChild(differentiator);
    }

    const action = document.createElement("div");
    action.className = "mt-5";
    action.appendChild(createAction(property, section));
    body.appendChild(action);
    article.appendChild(body);
    return article;
  }

  function installCarouselControls(section) {
    const track = section.querySelector(".td-stay-track");
    const previous = section.querySelector('[data-stay-direction="previous"]');
    const next = section.querySelector('[data-stay-direction="next"]');
    if (!track || !previous || !next) return;

    const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const step = () => {
      const card = track.querySelector(".td-stay-card");
      if (!card) return Math.max(track.clientWidth * 0.85, 280);
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      return card.getBoundingClientRect().width + gap;
    };
    const move = (direction) => track.scrollBy({
      left: step() * direction,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
    const update = () => {
      const remaining = track.scrollWidth - track.clientWidth - track.scrollLeft;
      previous.disabled = track.scrollLeft < 4;
      next.disabled = remaining < 4;
    };

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      } else if (event.key === "Home") {
        event.preventDefault();
        track.scrollTo({ left: 0, behavior: reducedMotion() ? "auto" : "smooth" });
      } else if (event.key === "End") {
        event.preventDefault();
        track.scrollTo({ left: track.scrollWidth, behavior: reducedMotion() ? "auto" : "smooth" });
      }
    });
    window.requestAnimationFrame(update);
  }

  function addScopedStyles(section) {
    const style = document.createElement("style");
    style.textContent = `
      .td-stay-nearby .td-stay-heading-row{display:flex;align-items:end;justify-content:space-between;gap:1rem}
      .td-stay-nearby .td-stay-controls{display:flex;gap:.5rem;flex:0 0 auto}
      .td-stay-nearby .td-stay-control{width:2.75rem;height:2.75rem;border:1px solid currentColor;border-radius:9999px;font-size:1.2rem;line-height:1}
      .td-stay-nearby .td-stay-control:disabled{opacity:.3;cursor:not-allowed}
      .td-stay-nearby .td-stay-track{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-inline:contain;padding:.25rem .1rem .75rem;scrollbar-width:thin}
      .td-stay-nearby .td-stay-track:focus-visible{outline:2px solid currentColor;outline-offset:4px}
      .td-stay-nearby .td-stay-card{flex:0 0 calc((100% - 2rem)/3);min-width:0;scroll-snap-align:start}
      .td-stay-nearby .td-stay-media,.td-stay-nearby .td-stay-image{width:100%;height:9.5rem}
      .td-stay-nearby .td-stay-media{display:flex;flex-direction:column;justify-content:flex-end;padding:1.25rem}
      .td-stay-nearby .td-stay-image{display:block;object-fit:cover}
      .td-stay-nearby .td-stay-widget-host{margin-top:1.5rem;border-top:1px solid currentColor;padding-top:1.5rem}
      @media (max-width:767px){
        .td-stay-nearby .td-stay-heading-row{align-items:start}
        .td-stay-nearby .td-stay-card{flex-basis:84%;min-width:min(17rem,84vw)}
      }
      @media (prefers-reduced-motion:reduce){.td-stay-nearby .td-stay-track{scroll-behavior:auto}}
    `;
    section.appendChild(style);
  }

  function buildStaySurface(context, selection) {
    const section = document.createElement("section");
    section.id = SURFACE_ID;
    section.className = "td-stay-nearby border-y border-border py-10";
    section.dataset.surfaceType = "curated";
    section.dataset.stayContext = `${context.kind}:${context.key}`;
    section.setAttribute("aria-labelledby", "stay-nearby-heading");

    const container = document.createElement("div");
    container.className = "mx-auto max-w-7xl px-5";

    const headingRow = document.createElement("div");
    headingRow.className = "td-stay-heading-row";
    const headingGroup = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow text-primary";
    eyebrow.textContent = "Stay nearby";
    const heading = document.createElement("h2");
    heading.id = "stay-nearby-heading";
    heading.className = "mt-2 font-display text-3xl";
    heading.textContent = "Useful stays near your event";
    const intro = document.createElement("p");
    intro.className = "mt-3 max-w-3xl text-sm leading-6 text-muted-foreground";
    intro.textContent = "A short, context-first set of places to stay. We favor useful location over a long metro-wide affiliate list.";
    headingGroup.append(eyebrow, heading, intro);

    const controls = document.createElement("div");
    controls.className = "td-stay-controls";
    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "td-stay-control";
    previous.dataset.stayDirection = "previous";
    previous.setAttribute("aria-label", "Previous hotel");
    previous.textContent = "←";
    const next = document.createElement("button");
    next.type = "button";
    next.className = "td-stay-control";
    next.dataset.stayDirection = "next";
    next.setAttribute("aria-label", "Next hotel");
    next.textContent = "→";
    controls.append(previous, next);
    headingRow.append(headingGroup, controls);

    const track = document.createElement("div");
    track.className = "td-stay-track mt-7";
    track.tabIndex = 0;
    track.setAttribute("role", "region");
    track.setAttribute("aria-roledescription", "carousel");
    track.setAttribute("aria-label", "Nearby hotel choices");
    selection.forEach((entry, index) => track.appendChild(createHotelCard(entry, section, index, selection.length)));

    const footer = document.createElement("div");
    footer.className = "mt-5 flex flex-wrap items-center gap-x-5 gap-y-3";
    const search = document.createElement("button");
    search.type = "button";
    search.className = "inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90";
    search.textContent = "Search all nearby stays →";
    search.addEventListener("click", () => activateWidget(section));
    const disclosure = document.createElement("p");
    disclosure.className = "text-xs text-muted-foreground";
    disclosure.textContent = DISCLOSURE;
    footer.append(search, disclosure);

    container.append(headingRow, track, footer, createWidgetHost());
    section.appendChild(container);
    addScopedStyles(section);
    installCarouselControls(section);
    return section;
  }

  function buildGenericSurface() {
    const section = document.createElement("section");
    section.id = SURFACE_ID;
    section.className = "border-y border-border py-8";
    section.dataset.surfaceType = "generic";
    const container = document.createElement("div");
    container.className = "mx-auto max-w-7xl px-5";

    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow text-primary";
    eyebrow.textContent = "Hotels & places to stay";
    const heading = document.createElement("h2");
    heading.className = "mt-2 font-display text-3xl";
    heading.textContent = "Find a place to stay nearby";
    const search = document.createElement("button");
    search.type = "button";
    search.className = "mt-5 inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90";
    search.textContent = "Search Expedia stays →";
    search.addEventListener("click", () => activateWidget(section), { once: true });
    const disclosure = document.createElement("p");
    disclosure.className = "mt-3 text-xs text-muted-foreground";
    disclosure.textContent = DISCLOSURE;

    container.append(eyebrow, heading, search, createWidgetHost(), disclosure);
    section.appendChild(container);
    return section;
  }

  function placementTarget(main) {
    const slot = main.querySelector(SLOT_SELECTOR) || document.querySelector(SLOT_SELECTOR);
    return slot || main;
  }

  function placeSurface(surface, main) {
    const target = placementTarget(main);
    if (target.matches?.(SLOT_SELECTOR)) target.replaceChildren(surface);
    else target.appendChild(surface);
  }

  async function syncSurface() {
    const version = ++syncVersion;
    const current = document.getElementById(SURFACE_ID);

    if (!isTravelBookingSurface()) {
      current?.remove();
      return;
    }

    const main = document.getElementById("main");
    if (!main) return;

    const context = contextFromPath();
    const expectedContext = context ? `${context.kind}:${context.key}` : "";
    if (current?.dataset.surfaceType === "curated" && current.dataset.stayContext === expectedContext) return;
    if (!context && current?.dataset.surfaceType === "generic") return;

    current?.remove();

    if (context) {
      const data = await loadStayData();
      if (version !== syncVersion || !document.getElementById("main")) return;
      const selection = selectStayNearby(data, context);
      if (selection.length) {
        placeSurface(buildStaySurface(context, selection), main);
        return;
      }
    }

    if (version !== syncVersion) return;
    placeSurface(buildGenericSurface(), main);
  }

  function scheduleSync() {
    window.requestAnimationFrame(() => void syncSurface());
  }

  async function mountStayNearby(context, target) {
    const data = await loadStayData();
    const selection = selectStayNearby(data, context);
    if (!selection.length) return false;
    const node = typeof target === "string" ? document.querySelector(target) : target;
    if (!node) return false;
    node.replaceChildren(buildStaySurface(context, selection));
    return true;
  }

  function start() {
    void syncSurface();
    const main = document.getElementById("main");
    if (main) {
      observer = new MutationObserver(scheduleSync);
      observer.observe(main, { childList: true, subtree: true });
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

  window.TexasDefinedStayNearby = Object.freeze({
    select: async (context, limit = 3) => selectStayNearby(await loadStayData(), context, limit),
    mount: mountStayNearby,
    refresh: scheduleSync,
  });

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
})();
