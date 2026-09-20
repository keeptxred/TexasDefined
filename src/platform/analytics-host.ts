export const TEXASDEFINED_ANALYTICS_HOSTS = [
  'texasdefined.com',
  'www.texasdefined.com',
] as const;

export function isTexasDefinedAnalyticsHost(hostname: string) {
  const normalized = hostname.trim().toLowerCase();
  return TEXASDEFINED_ANALYTICS_HOSTS.some((host) => host === normalized);
}
