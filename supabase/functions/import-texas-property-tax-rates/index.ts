import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import * as XLSX from "npm:xlsx@0.18.5";
import { createClient } from "npm:@supabase/supabase-js@2.112.0";

type UnitType = "county" | "city" | "school-district" | "special-district";
type RawRecord = {
  type: UnitType;
  name: string;
  baseSlug: string;
  countySlug: string;
  officialId: string;
  officialBase: string;
  unavailable: boolean;
  totalRate: number | null;
  moRate: number | null;
  debtRate: number | null;
  levy: number | null;
  sourceUrl: string;
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const FILES: Record<UnitType, string> = {
  "school-district": "school-district-rates-levies.xlsx",
  city: "city-rates-levies.xlsx",
  county: "county-rates-levies.xlsx",
  "special-district": "special-district-rates-levies.xlsx",
};

// TEA's final 2025 MCR schedule states no district may have an MCR below $0.5689.
// A lower reported M&O value is retained for research but blocked from calculator use
// until a local/state-source conflict is resolved.
const TEA_2025_MINIMUM_MCR = 0.5689;

const clean = (value: unknown) => String(value ?? "").replace(/\s+/g, " ").trim();
const slugify = (value: string) => clean(value).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const header = (value: unknown) => clean(value).toUpperCase();

function numberValue(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(String(value ?? "").replace(/[$,%]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

const hasSingleStar = (value: string) => /\*\s*$/.test(clean(value)) && !/\*\*\s*$/.test(clean(value));
const stripTrailingStars = (value: string) => clean(value).replace(/\s*\*+\s*$/, "").trim();
const stripCounty = (value: string) => clean(value).replace(/\s+County$/i, "").trim();

function cleanCounty(value: string) {
  return stripCounty(clean(value).replace(/\s*\*+\s*(?=County$|$)/i, " "));
}

function sumKnown(values: Array<number | null>) {
  const found = values.filter((value): value is number => value != null);
  return found.length ? found.reduce((sum, value) => sum + value, 0) : null;
}

const uniqueNumbers = (values: Array<number | null>) =>
  [...new Set(values.filter((value): value is number => value != null).map((value) => Number(value.toFixed(8))))].sort((a, b) => a - b);
const uniqueStrings = (values: string[]) => [...new Set(values.filter(Boolean))].sort();

function officialBase(id: string) {
  const pieces = id.split("-").filter(Boolean);
  return pieces.slice(0, Math.min(3, pieces.length)).join("-") || id;
}

function locateRows(bytes: Uint8Array) {
  const workbook = XLSX.read(bytes, { type: "array", cellDates: false });
  for (const sheetName of workbook.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: null, raw: true }) as unknown[][];
    for (let index = 0; index < Math.min(rows.length, 30); index++) {
      const headers = rows[index].map(header);
      if (headers.includes("TAXING UNIT ID") && (headers.includes("TOTAL TAX RATE") || headers.includes("TOTAL COUNTY TAX RATE"))) {
        return { headers, rows: rows.slice(index + 1) };
      }
    }
  }
  throw new Error("Could not locate Detail header row");
}

function cellMap(headers: string[], row: unknown[]) {
  const map = new Map<string, unknown>();
  headers.forEach((column, index) => { if (column) map.set(column, row[index]); });
  return map;
}

function pick(map: Map<string, unknown>, keys: string[]) {
  for (const key of keys) if (map.has(key)) return map.get(key);
  return null;
}

function parseWorkbook(type: UnitType, sourceUrl: string, bytes: Uint8Array): RawRecord[] {
  const { headers, rows } = locateRows(bytes);
  const output: RawRecord[] = [];

  for (const row of rows) {
    const map = cellMap(headers, row);
    const countyRaw = clean(pick(map, ["COUNTY NAME", "COUNTY"]));
    const countyName = cleanCounty(countyRaw);
    const officialId = clean(pick(map, ["TAXING UNIT ID"]));
    if (!countyName || !officialId) continue;

    const unitRaw = type === "county"
      ? countyRaw
      : clean(pick(map, ["TAXING UNIT NAME", "TU NAME", "DISTRICT NAME", "CITY NAME"]));
    const unavailable = hasSingleStar(unitRaw);
    const name = type === "county" ? `${countyName} County` : stripTrailingStars(unitRaw);
    if (!name) continue;

    const totalRate = numberValue(pick(map, type === "county" ? ["TOTAL COUNTY TAX RATE", "TOTAL TAX RATE"] : ["TOTAL TAX RATE"]));
    const moRate = type === "county"
      ? sumKnown([
          numberValue(pick(map, ["GF M&O TAX RATE"])),
          numberValue(pick(map, ["R&B M&O TAX RATE"])),
          numberValue(pick(map, ["FMFC M&O RATE"])),
        ])
      : numberValue(pick(map, ["M&O RATE", "M&O TAX RATE"]));
    const debtRate = type === "county"
      ? sumKnown([
          numberValue(pick(map, ["GF I&S TAX RATE"])),
          numberValue(pick(map, ["R&B I&S TAX RATE"])),
          numberValue(pick(map, ["FMFC I&S RATE"])),
        ])
      : numberValue(pick(map, ["I&S RATE", "I&S TAX RATE"]));

    output.push({
      type,
      name,
      baseSlug: slugify(name),
      countySlug: slugify(countyName),
      officialId,
      officialBase: officialBase(officialId),
      unavailable,
      totalRate,
      moRate,
      debtRate,
      levy: numberValue(pick(map, ["CALCULATED LEVY", "LEVY"])),
      sourceUrl,
    });
  }
  return output;
}

function normalizeYear(raw: RawRecord[], year: number) {
  const groups = new Map<string, RawRecord[]>();
  for (const record of raw) {
    const key = `${record.type}:${record.officialBase}`;
    const group = groups.get(key) ?? [];
    group.push(record);
    groups.set(key, group);
  }

  const units: any[] = [];
  for (const group of groups.values()) {
    const usable = group.filter((record) => !record.unavailable);
    const rateUnavailable = usable.length === 0;
    const totals = uniqueNumbers(usable.map((record) => record.totalRate));
    const moRates = uniqueNumbers(usable.map((record) => record.moRate));
    const debtRates = uniqueNumbers(usable.map((record) => record.debtRate));
    const names = uniqueStrings(group.map((record) => record.name));
    const name = names.sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
    const levies = usable.map((record) => record.levy).filter((value): value is number => value != null);

    units.push({
      year,
      type: group[0].type,
      name,
      baseSlug: slugify(name),
      officialBase: group[0].officialBase,
      county_slugs: uniqueStrings(group.map((record) => record.countySlug)),
      total_rate: rateUnavailable ? null : (totals.length === 1 ? totals[0] : null),
      maintenance_operations_rate: rateUnavailable ? null : (moRates.length === 1 ? moRates[0] : null),
      debt_service_rate: rateUnavailable ? null : (debtRates.length === 1 ? debtRates[0] : null),
      levy: rateUnavailable ? null : (levies.length ? levies.reduce((sum, value) => sum + value, 0) : null),
      source_url: group[0].sourceUrl,
      source_status: rateUnavailable ? "not-reported" : (usable.length < group.length ? "partial-reporting" : "reported-final"),
      variable_rate: !rateUnavailable && totals.length > 1,
      rate_variants: rateUnavailable ? [] : totals,
      official_taxing_unit_ids: uniqueStrings(group.map((record) => record.officialId)),
      split_across_cads: uniqueStrings(group.map((record) => record.countySlug)).length > 1,
      rate_unavailable: rateUnavailable,
      imported_at: new Date().toISOString(),
    });
  }

  const collisions = new Map<string, any[]>();
  for (const unit of units) {
    const key = `${unit.type}:${unit.baseSlug}`;
    const group = collisions.get(key) ?? [];
    group.push(unit);
    collisions.set(key, group);
  }
  for (const unit of units) {
    const collisionGroup = collisions.get(`${unit.type}:${unit.baseSlug}`) ?? [];
    unit.slug = collisionGroup.length > 1 ? `${unit.baseSlug}-${slugify(unit.officialBase)}` : unit.baseSlug;
    unit.id = `${year}:${unit.type}:${unit.slug}`;
    delete unit.baseSlug;
    delete unit.officialBase;

    if (
      year === 2025 &&
      unit.type === "school-district" &&
      !unit.rate_unavailable &&
      unit.maintenance_operations_rate != null &&
      unit.maintenance_operations_rate < TEA_2025_MINIMUM_MCR
    ) {
      unit.source_status = "cross-source-conflict";
      unit.rate_unavailable = true;
    }
  }
  return units;
}

Deno.serve(async (request: Request) => {
  const url = new URL(request.url);
  const year = Number(url.searchParams.get("year") ?? "2025");
  if (!Number.isInteger(year) || year < 2021 || year > 2025) {
    return Response.json({ error: "year must be 2021-2025" }, { status: 400 });
  }

  try {
    const raw: RawRecord[] = [];
    const diagnostics: Array<{ type: UnitType; rawRows: number }> = [];
    for (const type of Object.keys(FILES) as UnitType[]) {
      const sourceUrl = `https://comptroller.texas.gov/taxes/property-tax/docs/${year}-${FILES[type]}`;
      const response = await fetch(sourceUrl, { headers: { "user-agent": "TexasDefined tax-rate importer/4.0" } });
      if (!response.ok) throw new Error(`${type}: HTTP ${response.status}`);
      const records = parseWorkbook(type, sourceUrl, new Uint8Array(await response.arrayBuffer()));
      raw.push(...records);
      diagnostics.push({ type, rawRows: records.length });
    }

    const normalized = normalizeYear(raw, year);
    const { error: deleteError } = await supabase.from("texas_property_tax_rates").delete().eq("year", year);
    if (deleteError) throw deleteError;
    for (let index = 0; index < normalized.length; index += 400) {
      const { error } = await supabase.from("texas_property_tax_rates").upsert(normalized.slice(index, index + 400), { onConflict: "id" });
      if (error) throw error;
    }

    return Response.json({
      ok: true,
      year,
      rawCount: raw.length,
      normalizedCount: normalized.length,
      notReportedCount: normalized.filter((record) => record.source_status === "not-reported").length,
      crossSourceConflictCount: normalized.filter((record) => record.source_status === "cross-source-conflict").length,
      partialCount: normalized.filter((record) => record.source_status === "partial-reporting").length,
      variableCount: normalized.filter((record) => record.variable_rate).length,
      multiCountyCount: normalized.filter((record) => record.split_across_cads).length,
      diagnostics,
    }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return Response.json({ ok: false, year, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
});
