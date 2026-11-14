import { useEffect, useRef, useState } from "react";
import { trackAffiliateClick } from "@/lib/affiliate-click";
import type { ViatorLiveMarketResponse, ViatorLiveProduct } from "@/lib/viator-market-feed";

/** Live Viator previews; used only with source-verified market destination IDs. */
export function ViatorLiveProducts({
  marketSlug,
  placement,
  mode = "auto",
  compact = false,
  feedKind = "products",
}: {
  marketSlug: string;
  placement: string;
  mode?: "auto" | "manual";
  compact?: boolean;
  feedKind?: "products" | "christmas";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "unavailable">("idle");
  const [products, setProducts] = useState<ViatorLiveProduct[]>([]);
  const [refreshedAt, setRefreshedAt] = useState<string>("");

  // Load only as the visitor reaches the destination booking panel, not for
  // every TexasDefined page impression or while crawlers render HTML.
  useEffect(() => {
    if (mode !== "auto" || requested) return;
    if (typeof IntersectionObserver === "undefined") {
      setRequested(true);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setRequested(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(root);
    return () => observer.disconnect();
  }, [mode, requested]);

  useEffect(() => {
    if (!requested) return;
    const controller = new AbortController();
    setStatus("loading");
    fetch(`/api/viator/market/${encodeURIComponent(marketSlug)}/${feedKind}`, {
      signal: controller.signal,
      credentials: "same-origin",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Viator live inventory unavailable");
        return response.json() as Promise<ViatorLiveMarketResponse>;
      })
      .then((feed) => {
        if (controller.signal.aborted) return;
        if (feed.source !== "viator" || feed.market !== marketSlug || !Array.isArray(feed.products)) {
          throw new Error("Invalid Viator live inventory");
        }
        setProducts(feed.products.slice(0, 4));
        setRefreshedAt(feed.refreshedAt);
        setStatus("loaded");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("unavailable");
      });
    return () => controller.abort();
  }, [requested, marketSlug, feedKind]);

  return (
    <div ref={rootRef} className="mt-5" data-viator-live-market={marketSlug}>
      {mode === "manual" && !requested ? (
        <button
          type="button"
          onClick={() => setRequested(true)}
          className="border border-primary px-3 py-2 text-sm font-semibold text-primary"
        >
          Show current tour previews
        </button>
      ) : null}
      {requested && status === "loading" ? (
        <p role="status" className="text-sm text-muted-foreground">Checking current Viator tour listings…</p>
      ) : null}
      {status === "loaded" && products.length > 0 ? (
        <div aria-label="Current Viator tours">
          <p className="mb-3 text-xs leading-5 text-muted-foreground">
            Viator marketplace listings, not TexasDefined editorial rankings or verified event occurrences.
            {refreshedAt ? <> Updated from Viator <time dateTime={refreshedAt}>{new Date(refreshedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>.</> : null}
            {" "}See Viator for final pricing, suitability and date-specific availability.
          </p>
          <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-4"}>
            {products.map((product) => {
              const label = `View ${product.title} on Viator`;
              return (
                <a
                  key={product.productCode}
                  href={product.url}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  data-affiliate-partner="viator"
                  data-affiliate-placement={placement}
                  data-commercial-partner="viator"
                  data-commercial-placement={placement}
                  onClick={() => trackAffiliateClick({ partner: "viator", label, placement, module: "experiences", eventId: product.productCode })}
                  className={compact ? "flex gap-3 border border-border bg-surface p-3 hover:border-primary" : "block border border-border bg-background p-3 hover:border-primary"}
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className={compact ? "shrink-0 object-cover" : "mb-3 w-full object-cover"}
                      style={compact ? { width: 96, height: 80 } : { aspectRatio: "4 / 3" }}
                    />
                  ) : null}
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-5">{product.title}</span>
                    <span className="mt-2 block text-xs font-semibold text-primary">See details on Viator ↗</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
      {status === "unavailable" || (status === "loaded" && products.length === 0) ? (
        <p role="status" className="text-xs leading-5 text-muted-foreground">
          Live tour previews are not available here right now. Use the separately provided Viator marketplace link to check current options.
        </p>
      ) : null}
    </div>
  );
}
