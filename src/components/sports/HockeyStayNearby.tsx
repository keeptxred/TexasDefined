import { useEffect } from 'react';

type StayNearbyWindow = Window & {
  TexasDefinedStayNearby?: {
    mount?: (context: {
      kind: string;
      key: string;
      city?: string;
      allowBroadFallback?: boolean;
    }, target: string | Element) => Promise<boolean>;
    refresh?: () => void;
  };
};

export function HockeyStayNearby({ city, citySlug }: { city: string; citySlug: string }) {
  useEffect(() => {
    const api = (window as StayNearbyWindow).TexasDefinedStayNearby;
    if (!api) return;
    const request = api.mount?.(
      { kind: 'city', key: citySlug, city, allowBroadFallback: true },
      '[data-hockey-stay-nearby-slot]',
    );
    if (!request) {
      api.refresh?.();
      return;
    }
    void request.then((mounted) => {
      if (!mounted) api.refresh?.();
    });
  }, [city, citySlug]);

  return (
    <section className="border-t border-border py-10">
      <div data-hockey-stay-nearby-slot>
        <p className="eyebrow text-primary">Places to stay</p>
        <h2 className="mt-2 font-display text-3xl">Stay near the hockey trip</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Hotel choices are matched to the team’s city when verified inventory is available. Live rates and availability come from the booking provider.
        </p>
      </div>
    </section>
  );
}
