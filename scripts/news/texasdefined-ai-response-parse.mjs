/**
 * Cloudflare Workers AI JSON mode legitimately returns result.response as a
 * parsed object on some models, or a textual JSON payload on others. Accept
 * either shape without treating malformed AI output as an approved draft.
 */
export function parseTexasDefinedModelJson(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    // A real structured JSON result. The independent 750-word, authority,
    // source attribution and destination gates validate every field later.
    return value;
  }
  if (typeof value !== 'string') throw new Error('Workers AI returned neither a JSON object nor a JSON string');
  const text = value.trim();
  const fenced = text.match(/^{3}(?:json)?\s*([\s\S]*?){3}$/i)?.[1] || text;
  const first = fenced.indexOf('{');
  const last = fenced.lastIndexOf('}');
  if (first < 0 || last <= first) throw new Error('Workers AI did not return a JSON object');
  const parsed = JSON.parse(fenced.slice(first,last+1));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Workers AI returned a JSON value that is not a draft object');
  }
  return parsed;
}
