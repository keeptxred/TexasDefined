import fs from "node:fs";
import path from "node:path";

const LOVABLE_IMAGE_GATEWAY = "https://ai.gateway.lovable.dev/v1/images/generations";
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const MAX_PROMPT_LENGTH = 2048;

function parseEnvFile() {
  try {
    const envPath = path.join(process.cwd(), ".env");
    const text = fs.readFileSync(envPath, "utf8");
    const parsed = {};
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const index = line.indexOf("=");
      const key = line.slice(0, index).trim();
      let value = line.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      parsed[key] = value;
    }
    return parsed;
  } catch {
    return {};
  }
}

const fileEnv = parseEnvFile();
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || fileEnv.CLOUDFLARE_ACCOUNT_ID || "";
const apiToken = process.env.CLOUDFLARE_API_TOKEN || fileEnv.CLOUDFLARE_API_TOKEN || "";

if (accountId && apiToken && !process.env.LOVABLE_API_KEY) {
  // Existing hero scripts use this variable only as an "AI available" gate.
  // The request itself is intercepted below and sent to Cloudflare, never Lovable.
  process.env.LOVABLE_API_KEY = "cloudflare-workers-ai";
}

const nativeFetch = globalThis.fetch.bind(globalThis);

function requestUrl(input) {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input?.url || "";
}

function extractPrompt(body) {
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const userMessage = messages.find((message) => message?.role === "user") || messages[0];
  const content = userMessage?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : part?.text || ""))
      .filter(Boolean)
      .join(" ");
  }
  return String(body?.prompt || "");
}

function jsonError(status, message) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

globalThis.fetch = async function cloudflareImageFetch(input, init = {}) {
  if (requestUrl(input) !== LOVABLE_IMAGE_GATEWAY) {
    return nativeFetch(input, init);
  }

  if (!accountId || !apiToken) {
    return jsonError(503, "Cloudflare Workers AI credentials are not configured");
  }

  let body;
  try {
    body = typeof init.body === "string" ? JSON.parse(init.body) : init.body || {};
  } catch {
    return jsonError(400, "Image request body was not valid JSON");
  }

  const prompt = extractPrompt(body).trim().slice(0, MAX_PROMPT_LENGTH);
  if (!prompt) return jsonError(400, "Image request contained no prompt");

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await nativeFetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      steps: 4,
      seed: Math.floor(Math.random() * 2_147_483_647),
    }),
  });

  const responseText = await response.text();
  let payload;
  try {
    payload = responseText ? JSON.parse(responseText) : {};
  } catch {
    return jsonError(response.status || 502, `Cloudflare Workers AI returned a non-JSON response: ${responseText.slice(0, 180)}`);
  }

  if (!response.ok || payload?.success === false) {
    const detail = payload?.errors?.[0]?.message || payload?.error?.message || responseText || `HTTP ${response.status}`;
    return jsonError(response.status || 502, `Cloudflare Workers AI: ${String(detail).slice(0, 220)}`);
  }

  const image = payload?.result?.image || payload?.image;
  if (!image) return jsonError(502, "Cloudflare Workers AI returned no image data");

  // Preserve the response contract expected by the existing hero scripts.
  return Response.json({ data: [{ b64_json: image }] });
};
