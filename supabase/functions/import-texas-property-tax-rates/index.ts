import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import * as XLSX from "npm:xlsx@0.18.5";
import { unzipSync, strFromU8 } from "npm:fflate@0.8.2";
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
type TeaSchoolRate = {
  cdn: string;
  name: string;
  moRate: number;
  debtRate: number;
  totalRate: number;
};
type TeaSchoolAuthority = {
  sourceUrl: string;
  rates: Map<string, TeaSchoolRate>;
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
const TEA_SCHOOL_HISTORY_URL =
  "https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-adopted-tax-rates-1.xlsx";
const TEA_SOF_2025_URL =
  "https://tea.texas.gov/about-tea/state-funding/fy2025-2026-sof-data.xlsx";
const RATE_MATCH_TOLERANCE = 0.00011;
const EXPECTED_SCHOOL_COUNTS: Record<number, number> = { 2024: 1013, 2025: 1013 };

const clean = (value: unknown) => String(value ?? "").replace(/\s+/g, " ").trim();
const slugify = (value: string) =>
  clean(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const header = (value: unknown) => clean(value).toUpperCase();

function numberValue(value: unknown): number | null {
  if (value == null) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const parsed = typeof value === "number" ? value : Number(raw.replace(/[$,%]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

const hasSingleStar = (value: string) => /\*\s*$/.test(clean(value)) && !/\*\*\s*$/.test(clean(value));
const stripTrailingStars = (value: string) => clean(value).replace(/\s*\*+\s*$/, "").trim();
const stripCounty = (value: string) => clean(value).replace(/\s+County$/i, "").trim();

function cleanCounty(value: string) {
  return stripCounty(clean(value).replace(/\s*\*+\s*(?=County$|$)/i, " "));
}

function sumKnown(values: Array<number | null>) {
  const filtered = values.filter((value): value is number => value != null);
  return filtered.length ? filtered.reduce((sum, value) => sum + value, 0) : null;
}

const uniqueNumbers = (values: Array<number | null>) =>
  [...new Set(values.filter((value): value is number => value != null).map((value) => Number(value.toFixed(8))))].sort(
    (a, b) => a - b,
  );
const uniqueStrings = (values: string[]) => [...new Set(values.filter(Boolean))].sort();

function officialBase(id: string) {
  const parts = id.split("-").filter(Boolean);
  return parts.slice(0, Math.min(3, parts.length)).join("-") || id;
}

function schoolCdnFromOfficialId(id: string) {
  const parts = id.split("-").filter(Boolean);
  if (parts.length < 2) return "";
  return parts[0].padStart(3, "0") + parts[1].padStart(3, "0");
}

async function fetchBytes(url: string, userAgent: string) {
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  if (!response.ok) throw new Error(url + ": HTTP " + response.status);
  return new Uint8Array(await response.arrayBuffer());
}

function locateRows(bytes: Uint8Array) {
  const workbook = XLSX.read(bytes, { type: "array", cellDates: false });
  for (const sheetName of workbook.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
      defval: null,
      raw: true,
    }) as unknown[][];
    for (let index = 0; index < Math.min(rows.length, 30); index++) {
      const headers = rows[index].map(header);
      if (
        headers.includes("TAXING UNIT ID") &&
        (headers.includes("TOTAL TAX RATE") || headers.includes("TOTAL COUNTY TAX RATE"))
      ) {
        return { headers, rows: rows.slice(index + 1) };
      }
    }
  }
  throw new Error("Could not locate Detail header row");
}

function cellMap(headers: string[], row: unknown[]) {
  const map = new Map<string, unknown>();
  headers.forEach((name, index) => {
    if (name) map.set(name, row[index]);
  });
  return map;
}

function pick(map: Map<string, unknown>, keys: string[]) {
  for (const key of keys) if (map.has(key)) return map.get(key);
  return null;
}

function parseWorkbook(type: UnitType, sourceUrl: string, bytes: Uint8Array): RawRecord[] {
  const { headers, rows } = locateRows(bytes);
  const records: RawRecord[] = [];

  for (const row of rows) {
    const map = cellMap(headers, row);
    const countyRaw = clean(pick(map, ["COUNTY NAME", "COUNTY"]));
    const countyName = cleanCounty(countyRaw);
    const officialId = clean(pick(map, ["TAXING UNIT ID"]));
    if (!countyName || !officialId) continue;

    const unitRaw =
      type === "county"
        ? countyRaw
        : clean(pick(map, ["TAXING UNIT NAME", "TU NAME", "DISTRICT NAME", "CITY NAME"]));
    const unavailable = hasSingleStar(unitRaw);
    const name = type === "county" ? countyName + " County" : stripTrailingStars(unitRaw);
    if (!name) continue;

    const totalRate = numberValue(
      pick(map, type === "county" ? ["TOTAL COUNTY TAX RATE", "TOTAL TAX RATE"] : ["TOTAL TAX RATE"]),
    );
    const moRate =
      type === "county"
        ? sumKnown([
            numberValue(pick(map, ["GF M&O TAX RATE"])),
            numberValue(pick(map, ["R&B M&O TAX RATE"])),
            numberValue(pick(map, ["FMFC M&O RATE"])),
          ])
        : numberValue(pick(map, ["M&O RATE", "M&O TAX RATE"]));
    const debtRate =
      type === "county"
        ? sumKnown([
            numberValue(pick(map, ["GF I&S TAX RATE"])),
            numberValue(pick(map, ["R&B I&S TAX RATE"])),
            numberValue(pick(map, ["FMFC I&S RATE"])),
          ])
        : numberValue(pick(map, ["I&S RATE", "I&S TAX RATE"]));

    records.push({
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
  return records;
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function sharedStrings(xml: string) {
  const values: string[] = [];
  for (const match of xml.matchAll(/<si>([\s\S]*?)<\/si>/g)) {
    let value = "";
    for (const text of match[1].matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)) value += decodeXml(text[1]);
    values.push(value);
  }
  return values;
}

function xmlRowCells(rowXml: string, strings: string[], wanted?: Set<string>) {
  const values = new Map<string, unknown>();
  for (const match of rowXml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
    const attrs = match[1];
    const body = match[2];
    const column = (attrs.match(/\br="([A-Z]+)\d+"/) ?? [])[1];
    if (!column || (wanted && !wanted.has(column))) continue;

    const type = (attrs.match(/\bt="([^"]+)"/) ?? [])[1] ?? "";
    const raw = (body.match(/<v>([\s\S]*?)<\/v>/) ?? [])[1];
    let value: unknown = raw ?? null;
    if (type === "s" && raw != null) value = strings[Number(raw)] ?? null;
    else if (type === "inlineStr") {
      const inline = (body.match(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/) ?? [])[1];
      value = inline ? decodeXml(inline) : null;
    } else if (raw != null && raw !== "" && Number.isFinite(Number(raw))) {
      value = Number(raw);
    }
    values.set(column, value);
  }
  return values;
}

async function loadTeaHistoryRates(year: number): Promise<TeaSchoolAuthority> {
  const bytes = await fetchBytes(TEA_SCHOOL_HISTORY_URL, "TexasDefined school-tax authority importer/1.0");
  const workbook = XLSX.read(bytes, { type: "array", cellDates: false });
  const schoolYear = String(year) + "-" + String(year + 1);
  const moHeader = schoolYear + " M&O TAX RATE";
  const debtHeader = schoolYear + " I&S TAX RATE";

  for (const sheetName of workbook.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
      defval: null,
      raw: true,
    }) as unknown[][];

    for (let index = 0; index < Math.min(rows.length, 20); index++) {
      const headers = rows[index].map(header);
      const cdnIndex = headers.indexOf("CDN");
      const nameIndex = headers.indexOf("SCHOOL DISTRICT");
      const moIndex = headers.indexOf(moHeader);
      const debtIndex = headers.indexOf(debtHeader);
      if ([cdnIndex, nameIndex, moIndex, debtIndex].some((value) => value < 0)) continue;

      const rates = new Map<string, TeaSchoolRate>();
      for (const row of rows.slice(index + 1)) {
        const cdn = clean(row[cdnIndex]).padStart(6, "0");
        if (!/^\d{6}$/.test(cdn)) continue;
        const moRate = numberValue(row[moIndex]);
        const debtRate = numberValue(row[debtIndex]);
        if (moRate == null || debtRate == null) continue;
        rates.set(cdn, {
          cdn,
          name: clean(row[nameIndex]),
          moRate,
          debtRate,
          totalRate: Number((moRate + debtRate).toFixed(8)),
        });
      }
      return { sourceUrl: TEA_SCHOOL_HISTORY_URL, rates };
    }
  }
  throw new Error("TEA school-rate history workbook did not contain " + schoolYear + " adopted-rate columns");
}

async function loadTeaSof2025Rates(): Promise<TeaSchoolAuthority> {
  const bytes = await fetchBytes(TEA_SOF_2025_URL, "TexasDefined school-tax authority importer/1.0");
  const files = unzipSync(bytes, {
    filter: (file) => file.name === "xl/sharedStrings.xml" || file.name === "xl/worksheets/sheet2.xml",
  });
  const sharedFile = files["xl/sharedStrings.xml"];
  const sheetFile = files["xl/worksheets/sheet2.xml"];
  if (!sharedFile || !sheetFile) throw new Error("TEA 2025-2026 SOF workbook is missing inputs_dpe worksheet data");

  const strings = sharedStrings(strFromU8(sharedFile));
  const sheetXml = strFromU8(sheetFile);
  const rows = sheetXml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g);
  let headerColumns: Map<string, string> | null = null;
  let wanted: Set<string> | null = null;
  const rates = new Map<string, TeaSchoolRate>();

  for (const match of rows) {
    if (!headerColumns) {
      const cells = xmlRowCells(match[1], strings);
      headerColumns = new Map<string, string>();
      for (const [column, value] of cells.entries()) headerColumns.set(header(value), column);
      const required = ["DISTRICT_ID", "DISTRICT_NAME", "I_S_RATE", "PY1_MO_RATE_ADOPT"];
      const missing = required.filter((name) => !headerColumns!.has(name));
      if (missing.length) throw new Error("TEA SOF inputs_dpe missing columns: " + missing.join(", "));
      wanted = new Set(required.map((name) => headerColumns!.get(name)!));
      continue;
    }

    const cells = xmlRowCells(match[1], strings, wanted!);
    const cdn = clean(cells.get(headerColumns.get("DISTRICT_ID")!)).replace(/\.0$/, "").padStart(6, "0");
    if (!/^\d{6}$/.test(cdn)) continue;
    const name = clean(cells.get(headerColumns.get("DISTRICT_NAME")!));
    const moRate = numberValue(cells.get(headerColumns.get("PY1_MO_RATE_ADOPT")!));
    const debtRate = numberValue(cells.get(headerColumns.get("I_S_RATE")!));
    if (moRate == null || debtRate == null) continue;

    rates.set(cdn, {
      cdn,
      name,
      moRate,
      debtRate,
      totalRate: Number((moRate + debtRate).toFixed(8)),
    });
  }

  return { sourceUrl: TEA_SOF_2025_URL, rates };
}

async function loadTeaSchoolAuthority(year: number): Promise<TeaSchoolAuthority | null> {
  if (year >= 2021 && year <= 2024) return loadTeaHistoryRates(year);
  if (year === 2025) return loadTeaSof2025Rates();
  return null;
}

function normalizeYear(raw: RawRecord[], year: number) {
  const groups = new Map<string, RawRecord[]>();
  for (const record of raw) {
    const key = record.type + ":" + record.officialBase;
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
      total_rate: rateUnavailable ? null : totals.length === 1 ? totals[0] : null,
      maintenance_operations_rate: rateUnavailable ? null : moRates.length === 1 ? moRates[0] : null,
      debt_service_rate: rateUnavailable ? null : debtRates.length === 1 ? debtRates[0] : null,
      levy: rateUnavailable ? null : levies.length ? levies.reduce((sum, value) => sum + value, 0) : null,
      source_url: group[0].sourceUrl,
      source_status: rateUnavailable
        ? "not-reported"
        : usable.length < group.length
          ? "partial-reporting"
          : "reported-final",
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
    const key = unit.type + ":" + unit.baseSlug;
    const group = collisions.get(key) ?? [];
    group.push(unit);
    collisions.set(key, group);
  }

  for (const unit of units) {
    const collision = collisions.get(unit.type + ":" + unit.baseSlug) ?? [];
    unit.slug =
      collision.length > 1 ? unit.baseSlug + "-" + slugify(unit.officialBase) : unit.baseSlug;
    unit.id = String(year) + ":" + unit.type + ":" + unit.slug;
    delete unit.baseSlug;
    delete unit.officialBase;
  }
  return units;
}

async function reconcileSchoolRates(units: any[], year: number) {
  const schools = units.filter((unit) => unit.type === "school-district");
  const expectedCount = EXPECTED_SCHOOL_COUNTS[year];
  if (expectedCount && schools.length !== expectedCount) {
    throw new Error(
      "School district integrity gate failed for " +
        year +
        ": expected " +
        expectedCount +
        " normalized rows, got " +
        schools.length,
    );
  }

  const authority = await loadTeaSchoolAuthority(year);
  if (!authority) {
    for (const school of schools) {
      school.source_status = "cross-source-conflict";
      school.rate_unavailable = true;
    }
    return {
      available: false,
      sourceUrl: null,
      schoolCount: schools.length,
      verifiedCount: 0,
      disagreementCount: 0,
      unresolvedCount: schools.length,
      disagreements: [],
    };
  }

  let verifiedCount = 0;
  let disagreementCount = 0;
  let unresolvedCount = 0;
  const disagreements: any[] = [];

  for (const school of schools) {
    const cdns = uniqueStrings(
      (school.official_taxing_unit_ids as string[]).map(schoolCdnFromOfficialId).filter(Boolean),
    );
    const matches = cdns.map((cdn) => authority.rates.get(cdn)).filter((rate): rate is TeaSchoolRate => Boolean(rate));
    const signatures = uniqueStrings(
      matches.map((rate) => [rate.moRate, rate.debtRate, rate.totalRate].map((value) => value.toFixed(8)).join("|")),
    );

    if (!matches.length || signatures.length !== 1) {
      school.source_status = "cross-source-conflict";
      school.rate_unavailable = true;
      unresolvedCount++;
      continue;
    }

    const verified = matches[0];
    const previous = {
      totalRate: numberValue(school.total_rate),
      moRate: numberValue(school.maintenance_operations_rate),
      debtRate: numberValue(school.debt_service_rate),
    };
    const maxDiff = Math.max(
      previous.totalRate == null ? Infinity : Math.abs(previous.totalRate - verified.totalRate),
      previous.moRate == null ? Infinity : Math.abs(previous.moRate - verified.moRate),
      previous.debtRate == null ? Infinity : Math.abs(previous.debtRate - verified.debtRate),
    );

    if (maxDiff > RATE_MATCH_TOLERANCE) {
      disagreementCount++;
      disagreements.push({
        name: school.name,
        slug: school.slug,
        cdn: verified.cdn,
        maxDifference: Number.isFinite(maxDiff) ? Number(maxDiff.toFixed(8)) : null,
        comptroller: previous,
        tea: {
          totalRate: verified.totalRate,
          moRate: verified.moRate,
          debtRate: verified.debtRate,
        },
      });
    }

    school.total_rate = verified.totalRate;
    school.maintenance_operations_rate = verified.moRate;
    school.debt_service_rate = verified.debtRate;
    school.source_url = authority.sourceUrl;
    school.source_status = "reported-final";
    school.variable_rate = false;
    school.rate_variants = [verified.totalRate];
    school.rate_unavailable = false;
    verifiedCount++;
  }

  if (unresolvedCount > 0) {
    throw new Error(
      "TEA school-rate integrity gate failed for " +
        year +
        ": " +
        unresolvedCount +
        " normalized school district rows could not be verified",
    );
  }

  disagreements.sort((a, b) => (b.maxDifference ?? -1) - (a.maxDifference ?? -1));
  return {
    available: true,
    sourceUrl: authority.sourceUrl,
    authorityRowCount: authority.rates.size,
    schoolCount: schools.length,
    verifiedCount,
    disagreementCount,
    unresolvedCount,
    disagreements: disagreements.slice(0, 100),
  };
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const year = Number(url.searchParams.get("year") ?? String(new Date().getUTCFullYear()));
  const dryRun = url.searchParams.get("dry_run") === "1";
  const currentYear = new Date().getUTCFullYear();
  if (!Number.isInteger(year) || year < 2021 || year > currentYear) {
    return Response.json(
      { error: "year must be between 2021 and " + currentYear },
      { status: 400 },
    );
  }

  try {
    const raw: RawRecord[] = [];
    const diagnostics: any[] = [];

    for (const type of Object.keys(FILES) as UnitType[]) {
      const sourceUrl =
        "https://comptroller.texas.gov/taxes/property-tax/docs/" + year + "-" + FILES[type];
      const bytes = await fetchBytes(sourceUrl, "TexasDefined tax-rate importer/5.0");
      const records = parseWorkbook(type, sourceUrl, bytes);
      raw.push(...records);
      diagnostics.push({ type, rawRows: records.length, sourceUrl });
    }

    const normalized = normalizeYear(raw, year);
    const schoolAuthority = await reconcileSchoolRates(normalized, year);

    if (!dryRun) {
      const { error: deleteError } = await supabase
        .from("texas_property_tax_rates")
        .delete()
        .eq("year", year);
      if (deleteError) throw deleteError;

      for (let index = 0; index < normalized.length; index += 400) {
        const { error } = await supabase
          .from("texas_property_tax_rates")
          .upsert(normalized.slice(index, index + 400), { onConflict: "id" });
        if (error) throw error;
      }
    }

    return Response.json(
      {
        ok: true,
        dryRun,
        year,
        rawCount: raw.length,
        normalizedCount: normalized.length,
        schoolAuthority,
        notReportedCount: normalized.filter((row) => row.source_status === "not-reported").length,
        crossSourceConflictCount: normalized.filter((row) => row.source_status === "cross-source-conflict").length,
        partialCount: normalized.filter((row) => row.source_status === "partial-reporting").length,
        variableCount: normalized.filter((row) => row.variable_rate).length,
        multiCountyCount: normalized.filter((row) => row.split_across_cads).length,
        diagnostics,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      { ok: false, dryRun, year, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
});
