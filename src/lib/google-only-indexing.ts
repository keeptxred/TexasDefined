/** Keep Bing eligible: only the Googlebot meta tag is changed. */
export function applyGoogleOnlyNoindex(meta: Array<Record<string, string>>, eligible: boolean): Array<Record<string, string>> {
  return eligible ? meta : [...meta.filter(x => x.name?.toLowerCase() !== 'googlebot'), { name: 'googlebot', content: 'noindex, follow' }];
}
