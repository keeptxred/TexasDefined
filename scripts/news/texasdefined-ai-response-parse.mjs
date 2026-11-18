/**
 * Cloudflare Workers AI JSON mode can return result.response as either
 * a parsed JSON object or a complete JSON string. Independent source,
 * authority, originality and publication gates validate all draft fields.
 */
export function parseTexasDefinedModelJson(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }
  if (typeof value !== 'string') {
    throw new Error('Workers AI returned neither a JSON object nor a JSON string');
  }
  const text = value.trim();
  const fence = String.fromCharCode(96).repeat(3);
  const pattern = new RegExp('^' + fence + '(?:json)?\\s*([\\s\\S]*?)' + fence + '$', 'i');
  const fenced = text.match(pattern)?.[1] || text;
  const first = fenced.indexOf('{');
  const last = fenced.lastIndexOf('}');
  if (first < 0 || last <= first) throw new Error('Workers AI did not return a JSON object');
  const parsed = JSON.parse(fenced.slice(first, last + 1));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Workers AI returned a JSON value that is not a draft object');
  }
  return parsed;
}
