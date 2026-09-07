(() => {
  const endpoint = "/api/texas-brand-locator";

  function text(tag, value, className) {
    const node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    return node;
  }

  function link(label, href) {
    const node = document.createElement("a");
    node.textContent = `${label} →`;
    node.href = href;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
    node.className = "text-primary underline-offset-4 hover:underline";
    return node;
  }

  function renderGroup(root, heading, results) {
    if (!results.length) return;
    const section = document.createElement("section");
    section.className = "mt-8 first:mt-0";
    section.append(text("h3", heading, "font-display text-3xl"));
    const grid = document.createElement("div");
    grid.className = "mt-4 grid gap-4 sm:grid-cols-2";
    for (const location of results) {
      const article = document.createElement("article");
      article.className = "border border-border bg-background p-5";
      const top = document.createElement("div");
      top.className = "flex flex-wrap items-start justify-between gap-3";
      const names = document.createElement("div");
      names.append(text("p", location.brandLabel, "text-xs font-semibold uppercase tracking-[0.14em] text-primary"));
      names.append(text("h4", location.name, "mt-1 font-display text-2xl leading-tight"));
      top.append(names);
      if (typeof location.distanceMiles === "number") top.append(text("span", `${location.distanceMiles.toFixed(1)} mi`, "text-sm font-semibold tabular-nums"));
      article.append(top);
      article.append(text("p", location.address, "mt-3 text-sm leading-6 text-muted-foreground"));
      const links = document.createElement("div");
      links.className = "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold";
      links.append(link("Directions", location.directionsUrl));
      links.append(link(`Verify with ${location.brandLabel}`, location.sourceUrl));
      article.append(links);
      grid.append(article);
    }
    section.append(grid);
    root.append(section);
  }

  function render(root, payload) {
    root.replaceChildren();
    if (payload.matchedAddress) {
      const matched = text("p", `Searching from ${payload.matchedAddress}`, "mb-5 text-sm text-muted-foreground");
      root.append(matched);
    }
    if (Array.isArray(payload.notices) && payload.notices.length) {
      const notices = document.createElement("div");
      notices.className = "mb-6 space-y-2 border-y border-border py-4 text-sm leading-6 text-muted-foreground";
      for (const notice of payload.notices) notices.append(text("p", notice));
      root.append(notices);
    }
    const results = Array.isArray(payload.results) ? payload.results : [];
    renderGroup(root, "Nearest H-E-B locations", results.filter((item) => item.brand === "heb"));
    renderGroup(root, "Nearest Buc-ee's locations", results.filter((item) => item.brand === "bucees"));
    if (Array.isArray(payload.fallbackLinks) && payload.fallbackLinks.length) {
      const fallbacks = document.createElement("div");
      fallbacks.className = "mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold";
      for (const item of payload.fallbackLinks) fallbacks.append(link(item.label, item.url));
      root.append(fallbacks);
    }
  }

  document.addEventListener("submit", async (event) => {
    const form = event.target instanceof HTMLFormElement ? event.target.closest("[data-texas-brand-locator-form]") : null;
    if (!form) return;
    event.preventDefault();
    const shell = form.closest("[data-texas-brand-locator]");
    const status = shell?.querySelector("[data-texas-brand-locator-status]");
    const results = shell?.querySelector("[data-texas-brand-locator-results]");
    const button = form.querySelector('button[type="submit"]');
    if (!status || !results) return;

    const data = new FormData(form);
    const address = String(data.get("address") || "").trim();
    const brand = String(data.get("brand") || "both");
    const brands = brand === "both" ? ["heb", "bucees"] : [brand];

    status.hidden = false;
    status.textContent = "Finding nearby locations…";
    results.replaceChildren();
    if (button) button.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ address, brands }),
      });
      const payload = await response.json();
      render(results, payload);
      status.hidden = true;
    } catch {
      status.hidden = false;
      status.textContent = "The locator could not complete this search. Use the official H-E-B or Buc-ee's links in the Texas brand guides below and try again later.";
    } finally {
      if (button) button.disabled = false;
    }
  });
})();
