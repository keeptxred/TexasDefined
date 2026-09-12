(() => {
  const endpoint = "/api/texas-brand-locator";
  const resultGroups = [
    ["heb", "Nearest H-E-B locations"],
    ["central-market", "Nearest Central Market locations"],
    ["joe-vs", "Nearest Joe V's Smart Shop locations"],
    ["mi-tienda", "Nearest Mi Tienda locations"],
    ["bucees", "Nearest Buc-ee's locations"],
    ["whataburger", "Nearest Whataburger locations"],
    ["shipley", "Nearest Shipley Do-Nuts locations"],
    ["kolache-factory", "Nearest Kolache Factory locations"],
  ];

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

  function fieldLabel(labelText, control) {
    const label = document.createElement("label");
    label.className = "grid gap-2 text-sm font-semibold";
    label.htmlFor = control.id;
    label.append(document.createTextNode(labelText), control);
    return label;
  }

  function mountLocator() {
    const anchor = document.querySelector("[data-texas-brand-locator-anchor]");
    if (!anchor || document.querySelector("[data-texas-brand-locator]")) return;

    const section = document.createElement("section");
    section.dataset.texasBrandLocator = "";
    section.setAttribute("aria-labelledby", "texas-brand-locator-heading");
    section.className = "mb-12 border-y border-border bg-muted/20 py-8 sm:px-8";

    const inner = document.createElement("div");
    inner.className = "px-6 sm:px-0";
    inner.append(text("p", "Texas brand locator", "text-xs font-semibold uppercase tracking-[0.16em] text-primary"));
    const heading = text("h2", "Find H-E-B, Buc-ee's, Whataburger, Shipley, Kolache Factory and H-E-B family stores", "mt-2 font-display text-4xl");
    heading.id = "texas-brand-locator-heading";
    inner.append(heading);
    inner.append(text("p", "Enter a Texas street address and choose what you want to find. TexasDefined uses H-E-B's live store locator for H-E-B, Central Market, Joe V's Smart Shop and Mi Tienda, an editorially verified snapshot of Buc-ee's official Texas location list for Buc-ee's, Whataburger's official Texas location directory for Whataburger, Shipley Do-Nuts' official nearby-location finder for Shipley, and Kolache Factory's official Texas location directory. Distance ranking uses the U.S. Census geocoder where a coordinate anchor is needed.", "mt-4 max-w-3xl text-sm leading-7 text-muted-foreground"));

    const form = document.createElement("form");
    form.dataset.texasBrandLocatorForm = "";
    form.className = "mt-6 grid gap-4 lg:grid-cols-[220px_1fr_auto] lg:items-end";

    const brand = document.createElement("select");
    brand.id = "texas-brand-choice";
    brand.name = "brand";
    brand.className = "min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground";
    for (const [value, label] of [
      ["both", "H-E-B + Buc-ee's"],
      ["heb", "H-E-B"],
      ["central-market", "Central Market"],
      ["joe-vs", "Joe V's Smart Shop"],
      ["mi-tienda", "Mi Tienda"],
      ["bucees", "Buc-ee's"],
      ["whataburger", "Whataburger"],
      ["shipley", "Shipley Do-Nuts"],
      ["kolache-factory", "Kolache Factory"],
    ]) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      brand.append(option);
    }

    const address = document.createElement("input");
    address.id = "texas-brand-address";
    address.name = "address";
    address.type = "text";
    address.required = true;
    address.minLength = 8;
    address.maxLength = 240;
    address.autocomplete = "street-address";
    address.placeholder = "Example: 123 Main St, Katy, TX 77494";
    address.className = "min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground";

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Find nearby locations";
    button.className = "min-h-11 border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60";

    form.append(fieldLabel("Find", brand), fieldLabel("Texas street address", address), button);
    inner.append(form);
    inner.append(text("p", "Your address is used to perform this search and is not stored or displayed publicly. Distances are approximate; use the official brand link or directions link before traveling.", "mt-3 text-xs leading-5 text-muted-foreground"));

    const status = document.createElement("div");
    status.dataset.texasBrandLocatorStatus = "";
    status.className = "mt-6 text-sm text-muted-foreground";
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    inner.append(status);

    const results = document.createElement("div");
    results.dataset.texasBrandLocatorResults = "";
    results.className = "mt-8";
    results.setAttribute("aria-live", "polite");
    inner.append(results);

    section.append(inner);
    anchor.after(section);
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
    if (payload.matchedAddress) root.append(text("p", `Searching from ${payload.matchedAddress}`, "mb-5 text-sm text-muted-foreground"));
    if (Array.isArray(payload.notices) && payload.notices.length) {
      const notices = document.createElement("div");
      notices.className = "mb-6 space-y-2 border-y border-border py-4 text-sm leading-6 text-muted-foreground";
      for (const notice of payload.notices) notices.append(text("p", notice));
      root.append(notices);
    }
    const results = Array.isArray(payload.results) ? payload.results : [];
    for (const [brand, heading] of resultGroups) {
      renderGroup(root, heading, results.filter((item) => item.brand === brand));
    }
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
      render(results, await response.json());
      status.hidden = true;
    } catch {
      status.hidden = false;
      status.textContent = "The locator could not complete this search. Use the official brand links in the Texas Brands guide below and try again later.";
    } finally {
      if (button) button.disabled = false;
    }
  });

  mountLocator();
  new MutationObserver(mountLocator).observe(document.documentElement, { childList: true, subtree: true });
})();