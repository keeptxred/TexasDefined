(() => {
  const CHOICE_ID = "td-stay-affiliate-options";
  const OWNER_ID = "td-vrbo-owner-referral";
  const EXPEDIA_SURFACE_ID = "expedia-travel-surface";
  const STAY_SLOT_SELECTOR = "[data-stay-nearby-slot]";
  const CJ_PUBLISHER_ID = "101876465";
  const CJ_DLG_BASE = `https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/`;
  const HOTELS_DESTINATION = "https://www.hotels.com/";
  const VRBO_DESTINATION = "https://www.vrbo.com/";
  const VRBO_OWNER_DESTINATION = "https://www.vrbo.com/en-us/list/lead";
  const HOTEL_FIRST_PATH = /^\/(?:event\/|events(?:\/|$)|sports-venue\/|sports-venues(?:\/|$))/;
  const BOTH_PATH = /^\/(?:destination\/|explore(?:\/|$)|city\/|county\/|best-places-to-go-camping-in-texas(?:\/|$)|texas-college-towns(?:\/|$)|texas-tailgating-guide(?:\/|$)|texas-unique-lodging(?:\/|$)|texas-music-venues(?:\/|$)|texas-roadside-oddities(?:\/|$))/;
  const OWNER_PATH = /^\/real-estate\/?$/;
  const TRAVEL_SECTION = /\b(?:travel|lodging|road trips?|weekend getaways?|events?)\b/i;
  const OWNER_SECTION = /\b(?:real estate|vacation rentals?|short[- ]term rentals?|property investment)\b/i;
  const PLACEMENT_HEADING = /\b(?:where to stay|stay nearby|plan(?:ning)? (?:a |your )?(?:visit|trip)|what to know before you go|know before you go|getting there|visitor guide|trip planning)\b/i;
  let scheduled = false;
  let observer;

  function walkArticleSections(value, pattern) {
    if (!value || typeof value !== "object") return false;
    const section = value.articleSection;
    const sections = Array.isArray(section) ? section : [section];
    if (sections.some((item) => typeof item === "string" && pattern.test(item))) return true;
    return Object.values(value).some((nested) => walkArticleSections(nested, pattern));
  }

  function pageHasSection(pattern) {
    return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).some((script) => {
      try {
        return walkArticleSections(JSON.parse(script.textContent || ""), pattern);
      } catch {
        return false;
      }
    });
  }

  function buildCjDeepLink(destination) {
    const parsed = new URL(destination);
    if (!["www.hotels.com", "www.vrbo.com"].includes(parsed.hostname)) {
      throw new Error(`Unsupported stay affiliate destination: ${parsed.hostname}`);
    }
    return `${CJ_DLG_BASE}${encodeURI(parsed.toString())}`;
  }

  function partnerName(destination) {
    const hostname = new URL(destination).hostname;
    if (hostname === "www.hotels.com") return "hotels.com";
    if (hostname === "www.vrbo.com") return "vrbo";
    return hostname;
  }

  function trackAffiliateClick({ destination, label, placement }) {
    const detail = {
      event: "affiliate_click",
      affiliate_partner: partnerName(destination),
      affiliate_label: label,
      affiliate_placement: placement,
      page_path: window.location.pathname,
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent("texasdefined:affiliate-click", { detail }));
  }

  function createTrackedLink({ destination, label, variant = "secondary", ariaLabel, placement = "stay-nearby" }) {
    const link = document.createElement("a");
    link.href = buildCjDeepLink(destination);
    link.target = "_blank";
    link.rel = "sponsored nofollow noopener noreferrer";
    link.className = `td-stay-affiliate-button td-stay-affiliate-button--${variant}`;
    link.textContent = label;
    link.dataset.affiliatePartner = partnerName(destination);
    link.dataset.affiliatePlacement = placement;
    link.dataset.commercialPartner = partnerName(destination);
    link.dataset.commercialPlacement = placement;
    if (ariaLabel) link.setAttribute("aria-label", ariaLabel);
    link.addEventListener("click", () => trackAffiliateClick({ destination, label, placement }));
    return link;
  }

  function addStyles(target) {
    if (document.getElementById("td-stay-affiliate-styles")) return;
    const style = document.createElement("style");
    style.id = "td-stay-affiliate-styles";
    style.textContent = `
      .td-stay-affiliate-options,.td-vrbo-owner-referral{box-sizing:border-box;margin:0 auto;max-width:80rem;padding:0 1.25rem 1.75rem}
      .td-stay-affiliate-panel,.td-vrbo-owner-panel{border:1px solid hsl(var(--border));background:hsl(var(--background));padding:1.25rem}
      .td-stay-affiliate-eyebrow{margin:0 0 .35rem;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:hsl(var(--primary))}
      .td-stay-affiliate-title{margin:0;font-family:inherit;font-size:clamp(1.35rem,2vw,1.75rem);font-weight:700;line-height:1.15;color:hsl(var(--foreground))}
      .td-stay-affiliate-copy{margin:.65rem 0 0;max-width:56rem;font-size:.95rem;line-height:1.6;color:hsl(var(--muted-foreground))}
      .td-stay-affiliate-actions{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1rem}
      .td-stay-affiliate-button,.td-stay-affiliate-jump{display:inline-flex;min-height:2.75rem;align-items:center;justify-content:center;padding:.7rem 1rem;border:1px solid hsl(var(--border));font-size:.9rem;font-weight:700;text-decoration:none;transition:opacity .15s ease,background .15s ease}
      .td-stay-affiliate-button:hover,.td-stay-affiliate-jump:hover{opacity:.88}
      .td-stay-affiliate-button:focus-visible,.td-stay-affiliate-jump:focus-visible{outline:2px solid hsl(var(--foreground));outline-offset:3px}
      .td-stay-affiliate-button--primary,.td-stay-affiliate-jump{border-color:hsl(var(--primary));background:hsl(var(--primary));color:hsl(var(--primary-foreground))}
      .td-stay-affiliate-button--secondary{background:hsl(var(--background));color:hsl(var(--foreground))}
      .td-stay-affiliate-jump{flex:0 0 auto;cursor:pointer}
      .td-stay-affiliate-disclosure{margin:.85rem 0 0;font-size:.75rem;line-height:1.45;color:hsl(var(--muted-foreground))}
      .td-vrbo-owner-referral{padding-top:1.75rem;padding-bottom:2.5rem}
      @media (max-width:767px){.td-stay-nearby .td-stay-heading-row{align-items:stretch;flex-direction:column}.td-stay-affiliate-jump{width:100%}}
      @media (max-width:640px){.td-stay-affiliate-actions{display:grid;grid-template-columns:1fr}.td-stay-affiliate-button{width:100%}}
      @media (prefers-reduced-motion:reduce){.td-stay-affiliate-button,.td-stay-affiliate-jump{transition:none}}
    `;
    (target || document.head || document.documentElement).appendChild(style);
  }

  function bookingIntent(pathname = window.location.pathname) {
    if (HOTEL_FIRST_PATH.test(pathname)) return "hotel-first";
    if (BOTH_PATH.test(pathname) || pageHasSection(TRAVEL_SECTION)) return "both";
    return "hotel-first";
  }

  function createBookingChoice(intent) {
    const wrapper = document.createElement("aside");
    wrapper.id = CHOICE_ID;
    wrapper.className = "td-stay-affiliate-options";
    wrapper.setAttribute("aria-label", "Hotel and vacation rental booking options");

    const panel = document.createElement("div");
    panel.className = "td-stay-affiliate-panel";

    const eyebrow = document.createElement("p");
    eyebrow.className = "td-stay-affiliate-eyebrow";
    eyebrow.textContent = "Where to stay";

    const heading = document.createElement("h2");
    heading.className = "td-stay-affiliate-title";
    heading.textContent = intent === "hotel-first" ? "Find places to stay near this event or venue" : "Find places to stay nearby";

    const copy = document.createElement("p");
    copy.className = "td-stay-affiliate-copy";
    copy.textContent = intent === "hotel-first"
      ? "Compare hotel availability close to the event or venue. Broader leisure and destination guides also include vacation-rental options when they fit the trip."
      : "Compare a conventional hotel stay or a vacation rental when extra space, a kitchen, or a group-friendly setup fits the trip better.";

    const actions = document.createElement("div");
    actions.className = "td-stay-affiliate-actions";
    actions.appendChild(createTrackedLink({
      destination: HOTELS_DESTINATION,
      label: "Find hotels on Hotels.com",
      variant: "primary",
      ariaLabel: "Find hotels on Hotels.com in a new tab",
      placement: "stay-nearby-choice",
    }));
    if (intent === "both") {
      actions.appendChild(createTrackedLink({
        destination: VRBO_DESTINATION,
        label: "Find vacation rentals on Vrbo",
        variant: "secondary",
        ariaLabel: "Find vacation rentals on Vrbo in a new tab",
        placement: "stay-nearby-choice",
      }));
    }

    const disclosure = document.createElement("p");
    disclosure.className = "td-stay-affiliate-disclosure";
    disclosure.textContent = "Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com or Vrbo activity, at no additional cost to you. Availability, rates and booking terms are provided by the booking service.";

    panel.append(eyebrow, heading, copy, actions, disclosure);
    wrapper.appendChild(panel);
    return wrapper;
  }

  function ownerEligible(pathname = window.location.pathname) {
    return OWNER_PATH.test(pathname) || pageHasSection(OWNER_SECTION);
  }

  function createOwnerReferral() {
    const wrapper = document.createElement("aside");
    wrapper.id = OWNER_ID;
    wrapper.className = "td-vrbo-owner-referral";
    wrapper.setAttribute("aria-label", "Vrbo property owner referral");

    const panel = document.createElement("div");
    panel.className = "td-vrbo-owner-panel";

    const eyebrow = document.createElement("p");
    eyebrow.className = "td-stay-affiliate-eyebrow";
    eyebrow.textContent = "For property owners";

    const heading = document.createElement("h2");
    heading.className = "td-stay-affiliate-title";
    heading.textContent = "Considering a vacation-rental listing?";

    const copy = document.createElement("p");
    copy.className = "td-stay-affiliate-copy";
    copy.textContent = "Vrbo lets eligible property owners start a new listing online. Review local rules, taxes, insurance and operating costs before deciding whether short-term renting fits your property.";

    const actions = document.createElement("div");
    actions.className = "td-stay-affiliate-actions";
    actions.appendChild(createTrackedLink({
      destination: VRBO_OWNER_DESTINATION,
      label: "List a property on Vrbo",
      variant: "secondary",
      ariaLabel: "Start a new Vrbo property listing in a new tab",
      placement: "owner-referral",
    }));

    const disclosure = document.createElement("p");
    disclosure.className = "td-stay-affiliate-disclosure";
    disclosure.textContent = "Affiliate disclosure: TexasDefined may earn a referral commission when an eligible new Vrbo property listing goes live. Vrbo controls listing approval and program terms.";

    panel.append(eyebrow, heading, copy, actions, disclosure);
    wrapper.appendChild(panel);
    return wrapper;
  }

  function contextualPlacementAnchor(surface) {
    if (document.querySelector(STAY_SLOT_SELECTOR)) return null;
    const main = document.getElementById("main") || document.querySelector("main");
    if (!main || !main.contains(surface)) return null;

    const headings = Array.from(main.querySelectorAll("h2, h3"))
      .filter((heading) => !surface.contains(heading));
    const preferred = headings.find((heading) => PLACEMENT_HEADING.test(heading.textContent || ""));
    if (preferred) return preferred.closest("section") || preferred;

    const article = main.querySelector("article");
    const firstArticleHeading = article
      ? Array.from(article.querySelectorAll("h2, h3")).find((heading) => !surface.contains(heading))
      : null;
    return firstArticleHeading || null;
  }

  function promoteStaySurface(surface) {
    if (!surface || document.querySelector(STAY_SLOT_SELECTOR)) return;
    const anchor = contextualPlacementAnchor(surface);
    if (!anchor || !anchor.parentNode || surface === anchor) return;
    if (anchor.previousElementSibling === surface) {
      surface.dataset.prominentPlacement = "contextual";
      return;
    }
    anchor.parentNode.insertBefore(surface, anchor);
    surface.dataset.prominentPlacement = "contextual";
  }

  function activateExistingStaySearch(surface) {
    const searchButton = Array.from(surface.querySelectorAll("button")).find((button) => {
      const text = button.textContent || "";
      return /Search all nearby stays|Search Expedia stays/i.test(text);
    });
    if (searchButton) {
      searchButton.click();
      return;
    }
    const firstAffiliate = surface.querySelector(`#${CHOICE_ID} .td-stay-affiliate-button`);
    if (firstAffiliate) firstAffiliate.focus();
  }

  function ensureProminentStayCta(surface) {
    if (!surface || surface.dataset.surfaceType !== "curated") return;
    const headingRow = surface.querySelector(".td-stay-heading-row");
    if (!headingRow || headingRow.querySelector(".td-stay-affiliate-jump")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "td-stay-affiliate-jump";
    button.textContent = "Find places to stay";
    button.setAttribute("aria-label", "Find places to stay near this destination");
    button.addEventListener("click", () => activateExistingStaySearch(surface));
    headingRow.appendChild(button);
  }

  function syncBookingChoice() {
    const expediaSurface = document.getElementById(EXPEDIA_SURFACE_ID);
    const existing = document.getElementById(CHOICE_ID);
    if (!expediaSurface) {
      existing?.remove();
      return;
    }
    const intent = bookingIntent();
    if (!(existing?.dataset.intent === intent && existing.parentElement === expediaSurface)) {
      existing?.remove();
      const choice = createBookingChoice(intent);
      choice.dataset.intent = intent;
      expediaSurface.prepend(choice);
    }
    promoteStaySurface(expediaSurface);
    ensureProminentStayCta(expediaSurface);
  }

  function syncOwnerReferral() {
    const existing = document.getElementById(OWNER_ID);
    if (!ownerEligible()) {
      existing?.remove();
      return;
    }
    if (existing) return;
    const main = document.getElementById("main");
    if (!main) return;
    main.appendChild(createOwnerReferral());
  }

  function sync() {
    scheduled = false;
    addStyles();
    syncBookingChoice();
    syncOwnerReferral();
  }

  function scheduleSync() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(sync);
  }

  function install() {
    scheduleSync();
    const main = document.getElementById("main") || document.body;
    observer = new MutationObserver(scheduleSync);
    observer.observe(main, { childList: true, subtree: true });
    window.addEventListener("popstate", scheduleSync);
  }

  window.TexasDefinedStayAffiliateOptions = {
    buildCjDeepLink,
    bookingIntent,
    ownerEligible,
    promoteStaySurface,
    sync: scheduleSync,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
