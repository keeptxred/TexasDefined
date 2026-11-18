/**
 * An observed Cloudflare REST token scope error is not a model-quality error.
 * Only the exact Cloudflare authentication code 10000 with HTTP 401/403 may
 * switch to the repository's already configured OpenAI provider.
 *
 * Source eligibility, original drafting, generated image provenance, 95+
 * authority structural checks and protected owner publication gates remain
 * entirely independent of the selected provider.
 */
export function isCloudflareAiCredentialFailure(status, payload) {
  return [401,403].includes(status)
    && payload?.success === false
    && Array.isArray(payload?.errors)
    && payload.errors.some((error)=>Number(error?.code)===10000
       && /^authentication error$/i.test(String(error?.message||'').trim()));
}

export const EDITORIAL_OPENAI_TEXT_MODEL='gpt-4o-mini';
export const EDITORIAL_OPENAI_IMAGE_MODEL='gpt-image-2';

export function editorialImageCredit(provider) {
  if(provider==='openai') return 'AI-generated editorial illustration · Not a documentary photograph · OpenAI';
  if(provider==='cloudflare-workers-ai') return 'AI-generated editorial illustration · Not a documentary photograph · Cloudflare Workers AI';
  throw new Error('Unverified image-generation provider; publication refused.');
}

export function editorialGenerationModels(textModel,imageModel) {
  for(const model of [textModel,imageModel]){
    if(typeof model!=='string' || !/^(@cf\/[a-z0-9.-]+\/[a-z0-9.-]+|gpt-(?:4o-mini|image-2))$/i.test(model)) {
      throw new Error('Unverified actual model provenance; publication refused.');
    }
  }
  return textModel+' + '+imageModel;
}
