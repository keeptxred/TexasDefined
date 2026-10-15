import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.112.0";

const db = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
const SOURCE_NAME = "Texas Comptroller of Public Accounts — Property Tax Assistance Division";
const SOURCE_PAGE = "https://comptroller.texas.gov/taxes/property-tax/rates/";
const PAGE_SIZE = 1000;
const headers = {
  "access-control-allow-origin": "*",
  "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
  "content-type": "application/json",
};

Deno.serve(async () => {
  try {
    const { data: latestRows, error: latestError } = await db
      .from("texas_property_tax_rates")
      .select("year")
      .eq("type", "school-district")
      .order("year", { ascending: false })
      .limit(1);
    if (latestError) throw latestError;
    const year = Number(latestRows?.[0]?.year);
    if (!Number.isInteger(year)) throw new Error("No school-district tax-rate year is available.");
    const priorYear = Math.max(2021, year - 1);

    const loadYear = async (targetYear: number) => {
      const rows: any[] = [];
      for (let from = 0; ; from += PAGE_SIZE) {
        const { data, error } = await db
          .from("texas_property_tax_rates")
          .select("name,slug,county_slugs,total_rate,maintenance_operations_rate,debt_service_rate,source_url,source_status,variable_rate,rate_variants,imported_at,official_taxing_unit_ids")
          .eq("year", targetYear)
          .eq("type", "school-district")
          .order("name", { ascending: true })
          .order("slug", { ascending: true })
          .range(from, from + PAGE_SIZE - 1);
        if (error) throw error;
        const page = data ?? [];
        rows.push(...page);
        if (page.length < PAGE_SIZE) break;
      }
      return rows;
    };

    const [current, prior] = await Promise.all([loadYear(year), loadYear(priorYear)]);
    const priorBySlug = new Map(prior.map((row: any) => [row.slug, row]));
    const sourceWorkbook = `https://comptroller.texas.gov/taxes/property-tax/docs/${year}-school-district-rates-levies.xlsx`;
    const priorWorkbook = `https://comptroller.texas.gov/taxes/property-tax/docs/${priorYear}-school-district-rates-levies.xlsx`;
    const numeric = (value: unknown) => value == null ? null : Number.isFinite(Number(value)) ? Number(value) : null;
    const rows = current.map((row: any) => ({
      officialCdn: /^([0-9]{3})-([0-9]{3})-02(?:-|$)/.exec(String(row.official_taxing_unit_ids?.[0] ?? ""))?.slice(1, 3).join("") ?? null,
      name: row.name,
      slug: row.slug,
      countySlugs: row.county_slugs ?? [],
      rate: numeric(row.total_rate),
      priorRate: numeric(priorBySlug.get(row.slug)?.total_rate),
      maintenanceOperationsRate: numeric(row.maintenance_operations_rate),
      debtServiceRate: numeric(row.debt_service_rate),
      variableRate: Boolean(row.variable_rate),
      rateVariants: (row.rate_variants ?? []).map(Number).filter(Number.isFinite),
      sourceStatus: row.source_status,
      sourceUrl: row.source_url,
    }));
    const generatedAt = current.reduce(
      (latest: string | null, row: any) => !latest || row.imported_at > latest ? row.imported_at : latest,
      null,
    );

    return Response.json({
      year,
      priorYear,
      generatedAt,
      sourceName: SOURCE_NAME,
      sourcePage: SOURCE_PAGE,
      sourceWorkbook,
      priorWorkbook,
      officialCorrectionCount: rows.filter((row: any) => row.sourceUrl !== sourceWorkbook).length,
      rows,
    }, { headers });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 503, headers: { ...headers, "cache-control": "no-store" } },
    );
  }
});
