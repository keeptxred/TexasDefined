const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const absolute = (path: string) => `https://texasdefined.com${path}`;

const downloadHeaders = (filename: string) => ({
  'Content-Type': 'text/csv; charset=utf-8',
  'Content-Disposition': `attachment; filename=${filename}`,
  'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
  'X-Robots-Tag': 'noindex, follow',
});

const toCsv = (rows: unknown[][]) => rows.map((row) => row.map(quote).join(',')).join('\n');

async function lighthouseCsv() {
  const [{ texasLighthouseMapPoints }, { lighthouseVisitorPlans }] = await Promise.all([
    import('@/data/texas-lighthouse-map-points'),
    import('@/data/lighthouse-visitor-planning'),
  ]);

  const planBySlug = new Map(lighthouseVisitorPlans.map((plan) => [plan.slug, plan]));
  const header = [
    'name',
    'slug',
    'county',
    'latitude',
    'longitude',
    'status',
    'era',
    'public_access',
    'best_for',
    'pair_with',
    'planning_note',
    'canonical_url',
    'county_url',
    'primary_source_name',
    'primary_source_url',
  ];

  const rows = texasLighthouseMapPoints.map((point) => {
    const plan = planBySlug.get(point.slug);
    return [
      point.name,
      point.slug,
      point.county,
      point.lat,
      point.lon,
      point.status,
      point.era,
      plan?.publicAccess ?? '',
      plan?.bestFor ?? '',
      plan?.pairWith ?? '',
      plan?.planningNote ?? '',
      absolute(point.articleHref ?? '/explore/lighthouses'),
      absolute(point.countyHref),
      point.sourceLabel,
      point.sourceUrl,
    ];
  });

  return new Response(toCsv([header, ...rows]), {
    headers: downloadHeaders('texas-lighthouse-database.csv'),
  });
}

async function fishingLakeSpeciesCsv() {
  const [{ fishingPlatform, fishingScope }, { fishingFoundationAnchor }] = await Promise.all([
    import('@/data/fishing'),
    import('@/data/fishing/slugs'),
  ]);

  const [lakes, species, lakeSpecies] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: 'published', limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: 'published', limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);

  const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
  const speciesById = new Map(species.map((fish) => [fish.id, fish]));
  const header = [
    'lake_name',
    'lake_slug',
    'lake_guide_url',
    'region',
    'counties',
    'water_type',
    'water_class',
    'surface_acres',
    'max_depth_feet',
    'river_basin',
    'primary_waterway',
    'species_common_name',
    'species_scientific_name',
    'species_slug',
    'species_guide_url',
    'prominence',
    'quality',
    'seasonal_patterns',
    'notes',
    'lake_verified_at',
    'relation_verified_at',
    'source_names',
    'source_urls',
  ];

  const rows = lakeSpecies.flatMap((relation) => {
    const lake = lakeById.get(relation.lakeId);
    const fish = speciesById.get(relation.speciesId);
    if (!lake || !fish) return [];

    const sources = [...lake.sources, ...fish.sources, ...relation.sources];
    const uniqueSources = [...new Map(sources.map((source) => [source.url, source])).values()];
    const seasonalPatterns = relation.seasonalPatterns
      .map((pattern) => `${pattern.season}: ${pattern.summary}`)
      .join(' | ');

    return [[
      lake.name,
      lake.slug,
      absolute(fishingFoundationAnchor('lake', lake.slug)),
      lake.region,
      lake.counties.join(' | '),
      lake.waterType,
      lake.waterClass,
      lake.surfaceAcres ?? '',
      lake.maxDepthFeet ?? '',
      lake.riverBasin ?? '',
      lake.primaryWaterway ?? '',
      fish.commonName,
      fish.scientificName ?? '',
      fish.slug,
      absolute(fishingFoundationAnchor('species', fish.slug)),
      relation.prominence,
      relation.quality,
      seasonalPatterns,
      relation.notes ?? '',
      lake.verifiedAt ?? '',
      relation.verifiedAt ?? '',
      uniqueSources.map((source) => source.name).join(' | '),
      uniqueSources.map((source) => source.url).join(' | '),
    ]];
  }).sort((left, right) => String(left[0]).localeCompare(String(right[0])) || String(left[11]).localeCompare(String(right[11])));

  return new Response(toCsv([header, ...rows]), {
    headers: downloadHeaders('texas-fishing-lake-species-matrix.csv'),
  });
}

async function footballDistrictCsv() {
  const { getAllFootballDistricts, getFootballDistrictProfile } = await import(
    '@/data/high-school-football/football-districts.server'
  );

  const header = [
    'alignment_cycle',
    'classification',
    'division',
    'district',
    'football_type',
    'school_name',
    'uil_enrollment',
    'submitted_conference',
    'district_url',
    'school_profile_url',
    'alignment_source_url',
    'enrollment_source_url',
  ];

  const rows = getAllFootballDistricts().flatMap((district) => {
    const profile = getFootballDistrictProfile(district.slug);
    if (!profile) return [];
    return profile.programs.map((program) => [
      district.alignmentCycle,
      district.classification,
      district.division ? `Division ${district.division === 1 ? 'I' : 'II'}` : '',
      district.district,
      district.footballType,
      program.schoolName,
      program.uilEnrollment,
      program.submittedConference,
      absolute(district.profilePath),
      absolute(program.profilePath),
      district.sourceUrl,
      district.enrollmentSourceUrl,
    ]);
  });

  return new Response(toCsv([header, ...rows]), {
    headers: downloadHeaders('texas-uil-football-districts-2026-28.csv'),
  });
}

export async function handleReferenceDownload(request: Request): Promise<Response | null> {
  if (request.method !== 'GET') return null;

  switch (new URL(request.url).pathname) {
    case '/texas-lighthouses.csv':
      return lighthouseCsv();
    case '/fishing-lake-species.csv':
      return fishingLakeSpeciesCsv();
    case '/texas-high-school-football-districts.csv':
      return footballDistrictCsv();
    default:
      return null;
  }
}
