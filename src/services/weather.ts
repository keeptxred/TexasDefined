import type { GeoPoint } from "@/data/types";

/** Provider-agnostic weather interface. Fixture implementation for Phase 1. */

export interface WeatherSnapshot {
  summary: string;
  highF: number;
  lowF: number;
  source: string;
}

export interface WeatherService {
  current(point: GeoPoint): Promise<WeatherSnapshot | null>;
}

export const fixtureWeather: WeatherService = {
  async current() {
    return null;
  },
};

export const weather: WeatherService = fixtureWeather;
