(() => {
  const VISUAL_ATTRIBUTE = "data-stay-context-visual";
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

  function syncVisual() {
    const surface = document.getElementById("expedia-travel-surface");
    if (!surface || surface.dataset.surfaceType !== "curated") return;

    const visual = VISUALS[normalizedPath()];
    const existing = surface.querySelector(`[${VISUAL_ATTRIBUTE}]`);

    if (!visual) {
      existing?.remove();
      return;
    }

    if (existing) return;

    const track = surface.querySelector(".td-stay-track");
    if (!track) return;
    track.before(buildVisual(visual));
  }

  function scheduleSync() {
    window.requestAnimationFrame(syncVisual);
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