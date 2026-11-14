import registry from '@/data/cj-account-verified-links.json';
import { hotelsComPageSid } from './cj-hotels-evergreen';

export const cjPageSid = hotelsComPageSid;
export type CjAccountProgram = keyof typeof registry.links;

/** Only CJ Get Code URLs captured with TexasDefined.com PID selected belong here. */
export function buildCjAccountClick(program: CjAccountProgram, pathname: string, destination?: string): string {
  const entry = registry.links[program];
  if (!entry) throw new Error('Unapproved CJ program');
  const url = new URL(entry.base);
  if (url.protocol !== 'https:' || url.pathname !== '/click-' + registry.publisherId + '-' + entry.linkId || url.search || url.hash || url.username || url.password) throw new Error('Invalid verified CJ base');
  url.searchParams.set('sid', cjPageSid(pathname));
  const target = destination ?? entry.destination;
  if (destination !== undefined && !(entry.allowedDestinations as readonly string[]).includes(target)) throw new Error('Unverified CJ destination');
  if (entry.includeDestination || target !== entry.destination) {
    if (!entry.deepLink) throw new Error('CJ creative does not support custom destinations');
    url.searchParams.set('url', target);
  }
  return url.toString();
}
