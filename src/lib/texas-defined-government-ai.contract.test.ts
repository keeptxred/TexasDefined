import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const gateway = readFileSync(resolve(process.cwd(), "src/lib/texas-defined-government-ai.server.ts"), "utf8");
const connector = readFileSync(resolve(process.cwd(), "src/lib/keeptxred-government.server.ts"), "utf8");
const serverEntry = readFileSync(resolve(process.cwd(), "src/server-entry.ts"), "utf8");
const primaryAi = readFileSync(resolve(process.cwd(), "src/lib/texas-defined-ai.server.ts"), "utf8");

describe("Texas Defined AI Keep TX Red government grounding", () => {
  it("uses the bounded public Keep TX Red contract without privileged database access", () => {
    expect(connector).toContain('https://keeptxred.com');
    expect(connector).toContain('/api/public/texasdefined-government-search');
    expect(connector).toContain('const FETCH_TIMEOUT_MS = 3_000;');
    expect(connector).toContain('const MAX_SOURCES = 8;');
    expect(connector).toContain('host === "keeptxred.com"');
    expect(connector).not.toContain('SUPABASE_SERVICE_ROLE_KEY');
    expect(connector).not.toContain('supabaseAdmin');
  });

  it("owns only government questions and preserves the primary AI for ordinary Texas questions", () => {
    expect(gateway).toContain('function isGovernmentQuestion(question: string)');
    expect(gateway).toContain('if (!question || question.length > MAX_QUESTION_LENGTH || !isGovernmentQuestion(question)) return null;');
    const governmentPosition = serverEntry.indexOf('texasDefinedGovernmentAiResponse(request, env)');
    const primaryPosition = serverEntry.indexOf('texasDefinedAiResponse(request, env)');
    expect(governmentPosition).toBeGreaterThan(-1);
    expect(primaryPosition).toBeGreaterThan(governmentPosition);
    expect(primaryAi).toContain('researchOfficialQuestion(question)');
  });

  it("combines KTR records with governed official-source verification", () => {
    expect(gateway).toContain('searchKeepTxRedGovernment(question)');
    expect(gateway).toContain('researchOfficialQuestion(question)');
    expect(gateway).toContain('buildKeepTxRedGovernmentContext(governmentSources)');
    expect(gateway).toContain('buildOfficialResearchContext(officialSources)');
    expect(gateway).toContain('governmentSources: result.governmentSources');
    expect(gateway).toContain('officialSources: result.officialSources');
  });

  it("keeps Texas Defined neutral and protects election semantics", () => {
    expect(gateway).toContain('Keep TX Red context uses citations [K1], [K2]');
    expect(gateway).toContain('Poll items are measurements from a poll, not election results.');
    expect(gateway).toContain("Never adopt Keep TX Red's political commentary, editorial opinion, candidate preference or ideological framing as Texas Defined's voice.");
    expect(gateway).toContain('Distinguish current officeholders from candidates and historical figures.');
    expect(gateway).toContain('Distinguish introduced/pending bills from enacted law.');
  });

  it("adds no paid inference/search dependency or browser-side AI bundle", () => {
    expect(gateway).not.toContain('openai.com');
    expect(connector).not.toContain('openai.com');
    expect(gateway).not.toContain('dangerouslySetInnerHTML');
    expect(gateway).not.toContain('SerpAPI');
    expect(gateway).not.toContain('Brave Search');
  });
});
