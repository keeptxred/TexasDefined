(() => {
  const VISUAL_ATTRIBUTE = "data-stay-context-visual";
  const AI_PROPERTY_ATTRIBUTE = "data-stay-ai-property";
  const AI_PROPERTY_DATA_URL = "/stay-nearby-ai-property-images.json";
  const AI_PROPERTY_LABEL = "AI-generated depiction of this property — not an official hotel photograph";
  const VISUALS = Object.freeze({
    "/sports-venue/amon-g-carter-stadium": Object.freeze({
      venue: "Amon G. Carter Stadium",
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Texas_Christian_University_June_2017_85_%28Amon_G._Carter_Stadium%29.jpg/1280px-Texas_Christian_University_June_2017_85_%28Amon_G._Carter_Stadium%29.jpg",
      alt: "Exterior of Amon G. Carter Stadium on the Texas Christian University campus in Fort Worth",
      credit: "Michael Barera",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Texas_Christian_University_June_2017_85_(Amon_G._Carter_Stadium).jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      verifiedAt: "2026-09-11",
    }),
    "/sports-venue/gerald-j-ford-stadium": Object.freeze({
      venue: "Gerald J. Ford Stadium",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/View_of_Gerald_J_Ford_Stadium_after_renovations%2C_20224.jpg/1280px-View_of_Gerald_J_Ford_Stadium_after_renovations%2C_20224.jpg",
      alt: "View across Gerald J. Ford Stadium at Southern Methodist University in Dallas after its 2024 renovations",
      credit: "HavanaHeat",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:View_of_Gerald_J_Ford_Stadium_after_renovations,_20224.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      verifiedAt: "2026-09-11",
    }),
    "/sports-venue/globe-life-field": Object.freeze({
      venue: "Globe Life Field",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Globe_Life_Field_exterior_2025.jpg/1271px-Globe_Life_Field_exterior_2025.jpg",
      alt: "Exterior of Globe Life Field in Arlington in April 2025",
      credit: "BullDawg2021",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Globe_Life_Field_exterior_2025.jpg",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      verifiedAt: "2026-09-11",
    }),
  });
  let aiPropertyDataPromise;

  function normalizedPath() {
    const value = window.location.pathname.replace(/\/+$/, "");
    return value || "/";
  }

  function externalLink(href, text) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = text;
    link.style.textDecoration = "underline";
    link.style.textUnderlineOffset = "3px";
    return link;
  }

  function buildVisual(visual) {
    const figure = document.createElement("figure");
    figure.setAttribute(VISUAL_ATTRIBUTE, "true");
    figure.className = "mt-7 overflow-hidden border border-border bg-muted";

    const image = document.createElement("img");
    image.src = visual.src;
    image.alt = visual.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.style.display = "block";
    image.style.width = "100%";
    image.style.height = "auto";
    image.style.maxHeight = "28rem";
    image.style.objectFit = "contain";
    image.style.background = "var(--muted)";

    const caption = document.createElement("figcaption");
    caption.className = "px-4 py-3 text-xs leading-5 text-muted-foreground";
    caption.append(
      document.createTextNode(`Venue context — ${visual.venue}. Photo: `),
      externalLink(visual.sourceUrl, visual.credit),
      document.createTextNode(" · "),
      externalLink(visual.licenseUrl, visual.license),
      document.createTextNode(" · Wikimedia Commons. Displayed without editorial crop; browser scaling only."),
    );

    figure.append(image, caption);
    return figure;
  }

  function loadAiPropertyData() {
    if (!aiPropertyDataPromise) {
      aiPropertyDataPromise = fetch(AI_PROPERTY_DATA_URL, { credentials: "same-origin" })
        .then((response) => {
          if (!response.ok) throw new Error(`Stay Nearby exact-property AI image request failed: ${response.status}`);
          return response.json();
        })
        .catch(() => null);
    }
    return aiPropertyDataPromise;
  }

  function validAiProperty(item) {
    return item
      && item.kind === "ai-property-depiction"
      && item.depictsProperty === true
      && item.generatedFromPropertyIdentity === true
      && item.label === AI_PROPERTY_LABEL
      && typeof item.propertyAddress === "string"
      && /\d/.test(item.propertyAddress)
      && typeof item.groundingSourceUrl === "string"
      && item.groundingSourceUrl.startsWith("https://")
      && typeof item.url === "string"
      && item.url.startsWith("/images/stay-nearby/properties/")
      && /\.(?:png|jpe?g|webp)$/i.test(item.url)
      && !/\.svg(?:$|\?)/i.test(item.url)
      && typeof item.alt === "string"
      && item.alt.startsWith("AI-generated photorealistic depiction of ");
  }

  function buildAiPropertyMedia(item) {
    const figure = document.createElement("figure");
    figure.setAttribute(AI_PROPERTY_ATTRIBUTE, item.propertyId);
    figure.style.margin = "0";
    figure.style.background = "var(--muted)";

    const image = document.createElement("img");
    image.className = "td-stay-image";
    image.src = item.url;
    image.alt = item.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const caption = document.createElement("figcaption");
    caption.textContent = item.label;
    caption.style.padding = ".45rem .75rem";
    caption.style.borderTop = "1px solid var(--border)";
    caption.style.fontSize = ".6875rem";
    caption.style.lineHeight = "1rem";
    caption.style.color = "var(--muted-foreground)";
    caption.style.background = "var(--muted)";

    figure.append(image, caption);
    return figure;
  }

  function syncVisual() {
    const surface = document.getElementById("expedia-travel-surface");
    if (!surface || surface.dataset.surfaceType !== "curated") return;

    const existing = surface.querySelector(`[${VISUAL_ATTRIBUTE}]`);
    if (document.querySelector("[data-stay-nearby-slot]")) {
      existing?.remove();
      return;
    }

    const visual = VISUALS[normalizedPath()];
    if (!visual) {
      existing?.remove();
      return;
    }

    if (existing) return;

    const track = surface.querySelector(".td-stay-track");
    if (!track) return;
    track.before(buildVisual(visual));
  }

  async function syncAiPropertyCards() {
    const surface = document.getElementById("expedia-travel-surface");
    if (!surface || surface.dataset.surfaceType !== "curated") return;

    const data = await loadAiPropertyData();
    if (!data || data.version !== 2 || !Array.isArray(data.items) || data.disclosure !== AI_PROPERTY_LABEL) return;
    const byName = new Map(data.items.filter(validAiProperty).map((item) => [item.name, item]));

    for (const card of surface.querySelectorAll(".td-stay-card")) {
      if (card.querySelector(`[${AI_PROPERTY_ATTRIBUTE}]`)) continue;
      const heading = card.querySelector("h3");
      const propertyName = heading?.textContent?.trim();
      const item = byName.get(propertyName);
      if (!item) continue;

      const propertyImage = card.querySelector(":scope > .td-stay-image");
      if (propertyImage) continue;

      const textFallback = card.querySelector(":scope > .td-stay-media");
      if (!textFallback) continue;
      textFallback.replaceWith(buildAiPropertyMedia(item));
    }
  }

  function scheduleSync() {
    window.requestAnimationFrame(() => {
      syncVisual();
      void syncAiPropertyCards();
    });
  }

  function start() {
    scheduleSync();
    const main = document.getElementById("main");
    if (main) {
      new MutationObserver(scheduleSync).observe(main, { childList: true, subtree: true });
    }
    window.addEventListener("popstate", scheduleSync);
  }

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
})();