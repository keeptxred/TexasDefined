(() => {
  const CHOICE_ID = "td-stay-affiliate-options";
  const OWNER_ID = "td-vrbo-owner-referral";
  const EXPEDIA_SURFACE_ID = "expedia-travel-surface";
  const STAY_SLOT_SELECTOR = "[data-stay-nearby-slot]";
  const CJ_PUBLISHER_ID = "101876465";
  const CJ_DLG_BASE = `https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/`;
  const HOTELS_DESTINATION = "https://www.hotels.com/";
  const ORBITZ_DESTINATION = "https://www.orbitz.com/";
  const TRAVELOCITY_DESTINATION = "https://www.travelocity.com/";
  const VRBO_DESTINATION = "https://www.vrbo.com/";
  const RVSHARE_DESTINATION = "https://rvshare.com/";
  const VRBO_OWNER_DESTINATION = "https://www.vrbo.com/en-us/list/lead";
  const VERIFIED_PROPERTY_DESTINATIONS = new Map([
    ["Courtyard Fort Worth University Drive", "https://www.hotels.com/ho122433/courtyard-by-marriott-fort-worth-university-drive-fort-worth-united-states-of-america/"],
    ["Hilton Garden Inn Fort Worth Medical Center", "https://www.hotels.com/ho403739/hilton-garden-inn-fort-worth-medical-center-fort-worth-united-states-of-america/"],
    ["Homewood Suites by Hilton Fort Worth Medical Center", "https://www.hotels.com/ho434078/homewood-suites-by-hilton-fort-worth-medical-center-tx-fort-worth-united-states-of-america/"],
    ["Graduate by Hilton Dallas", "https://www.hotels.com/ho214111/the-lumen-dallas-united-states-of-america/"],
    ["The Highland Dallas, Curio Collection by Hilton", "https://www.hotels.com/ho239327/the-highland-dallas-curio-collection-by-hilton-dallas-united-states-of-america/"],
    ["Hotel Mockingbird, Dallas, a Tribute Portfolio Hotel", "https://www.hotels.com/ho129054/the-beeman-hotel-dallas-united-states-of-america/"],
    ["Live! by Loews – Arlington, TX", "https://www.hotels.com/ho1066640416/live-by-loews-arlington-tx-arlington-united-states-of-america/"],
    ["Loews Arlington Hotel", "https://www.hotels.com/ho2949850752/loews-arlington-arlington-united-states-of-america/"],
    ["Drury Plaza Hotel Dallas Arlington", "https://www.hotels.com/ho3155976672/drury-plaza-hotel-dallas-arlington-arlington-united-states-of-america/"],
    ["W Dallas", "https://www.hotels.com/ho241720/w-dallas-victory-dallas-united-states-of-america/"],
    ["Homewood Suites by Hilton Dallas Downtown, TX", "https://www.hotels.com/ho433692/homewood-suites-by-hilton-dallas-downtown-tx-dallas-united-states-of-america/"],
    ["Hilton Anatole", "https://www.hotels.com/ho115100/hilton-anatole-dallas-united-states-of-america/"],
    ["Tru by Hilton Northlake Fort Worth", "https://www.hotels.com/ho1830497920/tru-by-hilton-northlake-fort-worth-tx-roanoke-united-states-of-america/"],
    ["Home2 Suites by Hilton Fort Worth Northlake", "https://www.hotels.com/ho599143232/home2-suites-by-hilton-fort-worth-northlake-roanoke-united-states-of-america/"],
    ["Holiday Inn Express & Suites Fort Worth North - Northlake", "https://www.hotels.com/ho929311744/holiday-inn-express-suites-fort-worth-north-northlake-an-ihg-hotel-roanoke-united-states-of-america/"],
    ["Albert Hotel", "https://www.hotels.com/ho3489929696/albert-hotel/"],
    ["Fredericksburg Inn & Suites", "https://www.hotels.com/ho109548/fredericksburg-inn-suites-fredericksburg-united-states-of-america/"],
    ["Hoffman Haus", "https://www.hotels.com/ho243589/hoffman-haus-fredericksburg-united-states-of-america/"],
    ["Grand Galvez", "https://www.hotels.com/ho145347/hotel-galvez-spa-galveston-united-states-of-america/"],
    ["The Tremont House", "https://www.hotels.com/ho145366/the-tremont-house-galveston-united-states-of-america/"],
    ["Harbor House Hotel & Marina at Pier 21", "https://www.hotels.com/ho132202/harbor-house-at-pier-21-galveston-united-states-of-america/"],
    ["Courtyard by Marriott Waco", "https://www.hotels.com/ho116039/courtyard-by-marriott-waco-waco-united-states-of-america/"],
    ["Hilton Waco", "https://www.hotels.com/ho112972/hilton-waco-waco-united-states-of-america/"],
    ["Hotel 1928", "https://www.hotels.com/ho3586848288/hotel-1928/"],
    ["Best Western Johnson City Inn", "https://www.hotels.com/ho494047/best-western-johnson-city-inn-johnson-city-united-states-of-america/"],
    ["Carter Creek Winery Resort & Spa", "https://www.hotels.com/ho1266792032/carter-creek-winery-resort-spa-johnson-city-united-states-of-america/"],
    ["Walden Retreats", "https://www.hotels.com/ho2462492672/walden-retreats-johnson-city-united-states-of-america/"],
    ["Best Western Plus Sweetwater Inn & Suites", "https://www.hotels.com/ho506095/best-western-plus-sweetwater-inn-suites-sweetwater-united-states-of-america/"],
    ["La Quinta Inn & Suites by Wyndham Sweetwater East", "https://www.hotels.com/ho636049152/la-quinta-inn-suites-by-wyndham-sweetwater-east-sweetwater-united-states-of-america/"],
    ["Microtel Inn & Suites by Wyndham Sweetwater", "https://www.hotels.com/ho532248/microtel-inn-and-suites-by-wyndham-sweetwater-sweetwater-united-states-of-america/"],
  ]);
  const FEATURED_GOLF_STAYS = new Map([
    ["/sports-venue/pga-frisco-fields-ranch", Object.freeze({
      name: "Omni PGA Frisco Resort & Spa",
      destination: "https://www.hotels.com/ho2796737888/omni-pga-frisco-resort-frisco-united-states-of-america/",
      sourceUrl: "https://www.omnihotels.com/hotels/pga-frisco",
      verifiedAt: "2026-09-23",
      context: "Omni PGA Frisco Resort & Spa is part of the PGA Frisco destination, with Fields Ranch golf and PGA District amenities on site.",
    })],
    ["/sports-venue/tpc-san-antonio", Object.freeze({
      name: "JW Marriott San Antonio Hill Country Resort & Spa",
      destination: "https://www.hotels.com/ho325236/jw-marriott-san-antonio-hill-country-resort-spa-san-antonio-united-states-of-america/",
      sourceUrl: "https://www.marriott.com/en-us/hotels/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa/overview/",
      verifiedAt: "2026-09-23",
      context: "Marriott identifies TPC San Antonio as an on-site resort golf experience and says eligible resort guests can access its two championship courses.",
    })],
    ["/sports-venue/memorial-park-golf-course", Object.freeze({
      name: "Holiday Inn Express & Suites Houston - Memorial Park Area",
      destination: "https://www.hotels.com/ho211068/holiday-inn-express-suites-houston-memorial-park-area-an-ihg-hotel-houston-united-states-of-america/",
      sourceUrl: "https://www.ihg.com/holidayinnexpress/hotels/us/en/houston/houqr/hoteldetail",
      verifiedAt: "2026-09-23",
      context: "IHG lists Memorial Park golf and tennis about two miles from this hotel, making it a practical lodging option for a Memorial Park Golf Course visit.",
    })],
  ]);
  const HOTEL_FIRST_PATH = /^\/(?:event\/|events(?:\/|$)|sports-venue\/|sports-venues(?:\/|$))/;
  const BOTH_PATH = /^\/(?:destination\/|explore(?:\/|$)|city\/|county\/|best-places-to-go-camping-in-texas(?:\/|$)|texas-college-towns(?:\/|$)|texas-tailgating-guide(?:\/|$)|texas-unique-lodging(?:\/|$)|texas-music-venues(?:\/|$)|texas-roadside-oddities(?:\/|$))/;
  const RVSHARE_PATH = /^\/(?:best-places-to-go-camping-in-texas(?:\/|$)|explore\/(?:rv-parks|state-parks|road-trips|outdoors)(?:\/|$))/;
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
    if (!["www.hotels.com", "www.orbitz.com", "www.travelocity.com", "www.vrbo.com", "rvshare.com"].includes(parsed.hostname)) {
      throw new Error(`Unsupported stay affiliate destination: ${parsed.hostname}`);
    }
    return `${CJ_DLG_BASE}${encodeURI(parsed.toString())}`;
  }

  function exactPropertyDestination(name) {
    return VERIFIED_PROPERTY_DESTINATIONS.get(String(name || "").trim()) || null;
  }

  function featuredGolfStay(pathname = window.location.pathname) {
    const normalized = String(pathname || "/").replace(/\/+$/, "") || "/";
    return FEATURED_GOLF_STAYS.get(normalized) || null;
  }

  function partnerName(destination) {
    const hostname = new URL(destination).hostname;
    if (hostname === "www.hotels.com") return "hotels.com";
    if (hostname === "www.orbitz.com") return "orbitz";
    if (hostname === "www.travelocity.com") return "travelocity";
    if (hostname === "www.vrbo.com") return "vrbo";
    if (hostname === "rvshare.com") return "rvshare";
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
      .td-stay-affiliate-disclosure,.td-stay-affiliate-source{margin:.85rem 0 0;font-size:.75rem;line-height:1.45;color:hsl(var(--muted-foreground))}
      .td-stay-affiliate-source a{color:hsl(var(--foreground));text-underline-offset:2px}
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

  function comparisonHotelDestination(intent) {
    return intent === "both" ? TRAVELOCITY_DESTINATION : ORBITZ_DESTINATION;
  }

  function rvshareEligible(pathname = window.location.pathname) {
    return RVSHARE_PATH.test(pathname);
  }

  function createBookingChoice(intent, exactPropertyFirst = false) {
    const featuredStay = exactPropertyFirst ? null : featuredGolfStay();
    const showRvshare = rvshareEligible();
    const wrapper = document.createElement("aside");
    wrapper.id = CHOICE_ID;
    wrapper.className = "td-stay-affiliate-options";
    wrapper.setAttribute("aria-label", showRvshare ? "Hotel and RV rental booking options" : "Hotel and vacation rental booking options");

    const panel = document.createElement("div");
    panel.className = "td-stay-affiliate-panel";

    const eyebrow = document.createElement("p");
    eyebrow.className = "td-stay-affiliate-eyebrow";
    eyebrow.textContent = "Where to stay";

    const heading = document.createElement("h2");
    heading.className = "td-stay-affiliate-title";
    heading.textContent = featuredStay ? "A venue-linked stay to consider" : (exactPropertyFirst ? "More places to stay nearby" : (intent === "hotel-first" ? "Find places to stay near this event or venue" : "Find places to stay nearby"));

    const copy = document.createElement("p");
    copy.className = "td-stay-affiliate-copy";
    copy.textContent = featuredStay
      ? `${featuredStay.context} Compare that exact property or use the broader hotel choices below.`
      : (exactPropertyFirst
        ? (intent === "hotel-first"
          ? "Start with the recommended stays above. If none fit, compare additional hotel availability nearby on Hotels.com or Orbitz."
          : "Start with the recommended stays above. If none fit, compare more hotels on Hotels.com or Travelocity, or browse vacation rentals for a different lodging setup.")
        : (intent === "hotel-first"
          ? "Compare hotel availability close to the event or venue on Hotels.com or Orbitz. Broader leisure and destination guides also include vacation-rental options when they fit the trip."
          : "Compare hotel options on Hotels.com or Travelocity, or choose a vacation rental when extra space, a kitchen, or a group-friendly setup fits the trip better."));
    if (showRvshare) copy.textContent += " For camping and road-trip planning, RVshare is the primary rental option when taking your lodging with you fits the trip.";

    const actions = document.createElement("div");
    actions.className = "td-stay-affiliate-actions";
    const choicePlacement = exactPropertyFirst ? "stay-nearby-choice-after-exact" : "stay-nearby-choice";
    if (featuredStay) {
      actions.appendChild(createTrackedLink({
        destination: featuredStay.destination,
        label: `View ${featuredStay.name} on Hotels.com`,
        variant: "primary",
        ariaLabel: `View ${featuredStay.name} on Hotels.com in a new tab`,
        placement: "stay-nearby-featured-golf",
      }));
    }
    actions.appendChild(createTrackedLink({
      destination: HOTELS_DESTINATION,
      label: exactPropertyFirst ? "Compare more hotels on Hotels.com" : "Find hotels on Hotels.com",
      variant: featuredStay || showRvshare ? "secondary" : "primary",
      ariaLabel: exactPropertyFirst ? "Compare more hotels on Hotels.com in a new tab" : "Find hotels on Hotels.com in a new tab",
      placement: choicePlacement,
    }));
    const comparisonDestination = comparisonHotelDestination(intent);
    actions.appendChild(createTrackedLink({
      destination: comparisonDestination,
      label: comparisonDestination === TRAVELOCITY_DESTINATION
        ? (exactPropertyFirst ? "Compare more hotels on Travelocity" : "Compare hotels on Travelocity")
        : (exactPropertyFirst ? "Compare more hotels on Orbitz" : "Compare hotels on Orbitz"),
      variant: "secondary",
      ariaLabel: comparisonDestination === TRAVELOCITY_DESTINATION
        ? (exactPropertyFirst ? "Compare more hotels on Travelocity in a new tab" : "Compare hotels on Travelocity in a new tab")
        : (exactPropertyFirst ? "Compare more hotels on Orbitz in a new tab" : "Compare hotels on Orbitz in a new tab"),
      placement: choicePlacement,
    }));
    if (intent === "both" && !showRvshare) {
      actions.appendChild(createTrackedLink({
        destination: VRBO_DESTINATION,
        label: exactPropertyFirst ? "Browse vacation rentals on Vrbo" : "Find vacation rentals on Vrbo",
        variant: "secondary",
        ariaLabel: exactPropertyFirst ? "Browse vacation rentals on Vrbo in a new tab" : "Find vacation rentals on Vrbo in a new tab",
        placement: choicePlacement,
      }));
    }

    if (showRvshare) {
      actions.appendChild(createTrackedLink({
        destination: RVSHARE_DESTINATION,
        label: "Rent an RV on RVshare",
        variant: "primary",
        ariaLabel: "Compare RV rentals on RVshare in a new tab",
        placement: `${choicePlacement}-rvshare`,
      }));
    }

    const disclosure = document.createElement("p");
    disclosure.className = "td-stay-affiliate-disclosure";
    disclosure.textContent = intent === "both"
      ? (showRvshare
        ? "Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com, Travelocity or RVshare activity, at no additional cost to you. Availability, rates and booking terms are provided by the booking service."
        : "Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com, Travelocity or Vrbo activity, at no additional cost to you. Availability, rates and booking terms are provided by the booking service.")
      : "Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com or Orbitz activity, at no additional cost to you. Availability, rates and booking terms are provided by the booking service.";

    panel.append(eyebrow, heading, copy, actions, disclosure);
    if (featuredStay) {
      const sourceNote = document.createElement("p");
      sourceNote.className = "td-stay-affiliate-source";
      sourceNote.append("Venue relationship verified against ");
      const sourceLink = document.createElement("a");
      sourceLink.href = featuredStay.sourceUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "the hotel’s official site ↗";
      sourceNote.append(sourceLink, ` · reviewed ${featuredStay.verifiedAt}`);
      panel.appendChild(sourceNote);
    }
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

  const EXACT_PROPERTY_AFFILIATE_SELECTOR = 'a[data-commercial-partner="hotels.com"][data-commercial-placement="stay-nearby-card"], a[data-commercial-partner="hotels.com"][data-commercial-placement="stay-nearby-card-exact"]';

  function firstExactPropertyAffiliate(surface) {
    return surface?.querySelector(EXACT_PROPERTY_AFFILIATE_SELECTOR) || null;
  }

  function hasExactPropertyAffiliate(surface) {
    return Boolean(firstExactPropertyAffiliate(surface));
  }

  function activateExistingStaySearch(surface) {
    const exactPropertyAffiliate = firstExactPropertyAffiliate(surface);
    if (exactPropertyAffiliate) {
      const behavior = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      exactPropertyAffiliate.scrollIntoView({ behavior, block: "nearest" });
      exactPropertyAffiliate.focus({ preventScroll: true });
      return;
    }

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
    const exactPropertyFirst = hasExactPropertyAffiliate(surface);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "td-stay-affiliate-jump";
    button.textContent = exactPropertyFirst ? "View recommended stays" : "Find places to stay";
    button.setAttribute("aria-label", exactPropertyFirst ? "View recommended stays near this destination" : "Find places to stay near this destination");
    button.addEventListener("click", () => activateExistingStaySearch(surface));
    headingRow.appendChild(button);
  }

  function placeBookingChoice(surface, choice, exactPropertyFirst) {
    choice.dataset.priority = exactPropertyFirst ? "exact-property-first" : "broad-search-first";
    if (exactPropertyFirst) {
      const scopedStyle = Array.from(surface.children).find((child) => child.tagName === "STYLE");
      if (scopedStyle) {
        if (choice.parentElement === surface && choice.nextElementSibling === scopedStyle) return;
        surface.insertBefore(choice, scopedStyle);
      } else {
        if (choice.parentElement === surface && choice === surface.lastElementChild) return;
        surface.appendChild(choice);
      }
      return;
    }
    if (choice.parentElement === surface && choice === surface.firstElementChild) return;
    surface.prepend(choice);
  }

  function upgradeExactPropertyCards(surface) {
    if (!surface || surface.dataset.surfaceType !== "curated") return;
    for (const card of surface.querySelectorAll(".td-stay-card")) {
      const heading = card.querySelector("h3");
      const destination = exactPropertyDestination(heading?.textContent);
      if (!destination) continue;
      const fallback = Array.from(card.querySelectorAll("button")).find((button) => /Search Expedia stays/i.test(button.textContent || ""));
      if (!fallback?.parentElement) continue;
      const propertyName = String(heading.textContent || "").trim();
      const link = createTrackedLink({
        destination,
        label: "View on Hotels.com",
        variant: "primary",
        ariaLabel: `View ${propertyName} on Hotels.com in a new tab`,
        placement: "stay-nearby-card-exact",
      });
      link.dataset.exactProperty = propertyName;
      fallback.parentElement.replaceChildren(link);
    }
  }

  function syncBookingChoice() {
    const expediaSurface = document.getElementById(EXPEDIA_SURFACE_ID);
    const existing = document.getElementById(CHOICE_ID);
    if (!expediaSurface) {
      existing?.remove();
      return;
    }

    upgradeExactPropertyCards(expediaSurface);
    const exactPropertyFirst = hasExactPropertyAffiliate(expediaSurface);
    const intent = bookingIntent();
    const choiceMode = exactPropertyFirst ? "after-exact" : "broad";
    let choice = existing;
    if (!(choice?.dataset.intent === intent && choice?.dataset.mode === choiceMode && choice.parentElement === expediaSurface)) {
      choice?.remove();
      choice = createBookingChoice(intent, exactPropertyFirst);
      choice.dataset.intent = intent;
      choice.dataset.mode = choiceMode;
    }
    placeBookingChoice(expediaSurface, choice, exactPropertyFirst);

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
    comparisonHotelDestination,
    exactPropertyDestination,
    featuredGolfStay,
    ownerEligible,
    rvshareEligible,
    promoteStaySurface,
    sync: scheduleSync,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
