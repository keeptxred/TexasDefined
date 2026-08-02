/** Analytics service interface. Events always carry a brand property. */

export interface AnalyticsEvent {
  name: string;
  brandId: string;
  properties?: Record<string, string | number | boolean>;
}

export interface AnalyticsService {
  track(event: AnalyticsEvent): void;
  pageView(path: string, brandId: string): void;
}

export const consoleAnalytics: AnalyticsService = {
  track(event) {
    if (import.meta.env.DEV) console.info("[analytics]", event.name, event);
  },
  pageView(path, brandId) {
    if (import.meta.env.DEV) console.info("[analytics] page_view", { path, brandId });
  },
};

export const analytics: AnalyticsService = consoleAnalytics;
