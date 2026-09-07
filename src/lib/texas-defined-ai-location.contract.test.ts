import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const aiSource = readFileSync(new URL("./texas-defined-ai.server.ts", import.meta.url), "utf8");
const locationSource = readFileSync(new URL("./texas-defined-ai-location.server.ts", import.meta.url), "utf8");
const signalsSource = readFileSync(new URL("./texas-defined-ai-signals.server.ts", import.meta.url), "utf8");
const locatorSource = readFileSync(new URL("../data/texas-brand-locator.server.ts", import.meta.url), "utf8");
const foundationMigration = readFileSync(new URL("../../supabase/migrations/20260907021751_texasdefined_ai_intelligence_foundation.sql", import.meta.url), "utf8");
const feedbackMigration = readFileSync(new URL("../../supabase/migrations/20260907031500_texasdefined_ai_signal_feedback_loop.sql", import.meta.url), "utf8");

describe("Ask Texas brand-location intelligence", () => {
  it("routes H-E-B and Buc-ee's location questions through the deterministic locator before the language model", () => {
    expect(locationSource).toContain("classifyTexasBrandLocationQuestion");
    expect(locationSource).toContain('TexasBrandLocatorBrand[]');
    expect(locationSource).toContain("searchCompleteTexasKnowledgeGraph");
    expect(locatorSource).toContain("export async function findTexasBrandLocationsNearPointServer");
    expect(aiSource).toContain("answerTexasBrandLocationQuestion(question)");
    expect(aiSource.indexOf("answerTexasBrandLocationQuestion(question)")).toBeLessThan(aiSource.indexOf("const ai = workersAi(env)"));
    expect(aiSource).toContain('model: "deterministic-brand-locator"');
  });

  it("supports Texas city/county anchors and exact-address lookup without fabricating locations", () => {
    expect(locationSource).toContain('new Set(["city", "county", "metro-area"])');
    expect(locationSource).toContain("findTexasBrandLocationsServer({ address: intent.address");
    expect(locationSource).toContain("findTexasBrandLocationsNearPointServer({");
    expect(locationSource).toContain("I could not verify a nearby");
    expect(locationSource).toContain("links directly to official H-E-B and Buc-ee's location sources");
  });

  it("does not mislabel the verified Buc-ee's registry as request-time live official research", () => {
    expect(locationSource).toContain("officialSources: []");
    expect(locationSource).toContain('Do not place either in the shared "live official');
    expect(locationSource).toContain("latest hours, services, closures or location changes");
    expect(locationSource).not.toContain("function officialSources(");
  });

  it("activates the existing privacy-minimized Ask Texas signal tables instead of creating a parallel analytics store", () => {
    expect(foundationMigration).toContain("create table if not exists public.td_ai_question_signals");
    expect(feedbackMigration).toContain("after insert on public.td_ai_question_signals");
    expect(signalsSource).toContain('.from("td_ai_question_signals").insert(row)');
    expect(aiSource).toContain("recordAskTexasQuestionSignal({");
    expect(signalsSource).not.toContain("raw_question");
    expect(signalsSource).not.toContain("cf-connecting-ip");
    expect(signalsSource).not.toContain("user-agent");
  });

  it("never stores a typed street address in structured AI telemetry", () => {
    expect(locationSource).toContain('buildAnswer(response, intent.brands, response.matchedAddress || "that Texas address", null)');
    expect(aiSource).toContain('safeClusterPlace(locationAnswer.texasPlace)');
    expect(signalsSource).toContain("question_fingerprint");
    expect(signalsSource).toContain("cluster_key");
    expect(signalsSource).toContain("texas_place");
    expect(signalsSource).not.toMatch(/street_address|matched_address|postal_address/i);
    expect(aiSource).not.toContain("matchedAddress: locationAnswer");
  });

  it("feeds coarse brand/location demand into the existing BUILD/IMPROVE/TOOL feedback loop", () => {
    expect(aiSource).toContain('clusterKey: `brand-locator:${locationAnswer.brands.join("+")}:${safeClusterPlace(locationAnswer.texasPlace)}`');
    expect(aiSource).toContain('topics: ["texas-brands"]');
    expect(aiSource).toContain('metadata: {\n          tool: "brand-locator"');
    expect(feedbackMigration).toContain("when new.intent in ('nearby','plan') and new.coverage_status = 'none' then 'tool'");
    expect(feedbackMigration).toContain("new.texas_place");
  });

  it("keeps the public locator zero-added-cost and server-grounded", () => {
    expect(locatorSource).toContain("commerce-api/v1/store/locator/address");
    expect(locatorSource).toContain("geocoding.geo.census.gov/geocoder/locations/addressbatch");
    expect(locatorSource).toContain('from("texasdefined_brand_locations")');
    expect(locatorSource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
  });
});
