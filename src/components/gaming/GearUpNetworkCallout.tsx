import { useEffect, useRef } from "react";

import { trackAffiliateClick, trackAffiliateImpression } from "@/lib/affiliate-click";

const GEARUP_EVERGREEN_CJ_URL = "https://www.anrdoezrs.net/click-101876465-17255582";
export const GEARUP_EVERGREEN_CJ_LINK_ID = "17255582";

export function GearUpNetworkCallout({ placement }: { placement: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let sent = false;
    const send = () => {
      if (sent) return;
      sent = true;
      trackAffiliateImpression({ partner: "gearup", label: "GearUP network routing", placement, module: "gaming-network" });
    };
    if (!("IntersectionObserver" in window)) {
      send();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        send();
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [placement]);

  return (
    <aside
      ref={ref}
      className="mt-10 border border-border bg-muted/20 p-6"
      aria-label="Optional gaming network optimization"
      data-affiliate-partner="gearup"
      data-affiliate-placement={placement}
      data-commercial-partner="gearup"
      data-commercial-placement={placement}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Optional network-routing tool</p>
      <h2 className="mt-2 font-display text-3xl">When an alternate route may be worth testing</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        A routing optimizer can sometimes help when an ISP path to a game service is inefficient. It cannot fix weak Wi-Fi, local congestion, a busy game server or physical distance, and it will not lower every player's ping.
      </p>
      <a
        href={GEARUP_EVERGREEN_CJ_URL}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        data-affiliate-partner="gearup"
        data-affiliate-placement={placement}
        data-commercial-partner="gearup"
        data-commercial-placement={placement}
        onClick={() => trackAffiliateClick({ partner: "gearup", label: "GearUP network routing", placement, module: "gaming-network" })}
        className="mt-5 inline-flex min-h-11 items-center border border-primary bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Review GearUP as an optional routing tool ↗
      </a>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Affiliate disclosure: TexasDefined may earn a commission if you use this link, at no additional cost to you. GearUP is optional; results vary by ISP, route, game and server.
      </p>
    </aside>
  );
}
