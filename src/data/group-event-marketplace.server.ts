/**
 * Server-only Build 1 read layer. Existing /corporate-events remains the
 * production directory until the marketplace search UI is separately approved.
 * All reads use existing Supabase service-role setup. No anonymous table grants,
 * customer PII, account creation, quote sends, bookings or payment operations.
 */
import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { corporateEventProviders } from './corporate-events.ts';
import {
  findMarketplaceExperiences, packageFitsGroup,
  marketplaceActivities, marketplaceAmenities, marketplaceOccasions,
  type MarketplaceExperience, type MarketplaceMatch, type MarketplacePackage,
  type MarketplaceSearch, type MarketplaceVerification,
  type MarketplaceParticipation, type OccasionKey, type ActivityKey, type AmenityKey,
} from './group-event-marketplace-foundation.ts';

const admin = supabaseAdmin as any;
const legacyProviders = new Map(corporateEventProviders.map(p => [p.slug, p]));
type TagCategory = 'occasion'|'activity'|'amenity';
const legalTags: Record<TagCategory, readonly string[]> = {
  occasion: marketplaceOccasions,
  activity: marketplaceActivities,
  amenity: marketplaceAmenities,
};
type VerifiedTag = {
  experience_id: string;
  category: TagCategory;
  verified_at: string | null;
  source_url: string | null;
  tag_id: string;
};

function vettedTagKey(tagKey: string, category: TagCategory): string | null {
  const prefix = 'ge_' + category + '_';
  if (!tagKey.startsWith(prefix)) return null;
  const slug = tagKey.slice(prefix.length).replaceAll('_','-');
  return legalTags[category].includes(slug) ? slug : null;
}

/**
 * This bounded access layer is intentionally server-only and fail-closed.
 * Queries are not accessible directly from anon/authenticated Supabase roles.
 */
export async function readMarketplaceExperiences(): Promise<MarketplaceExperience[]> {
  const { data: rows, error } = await admin
    .from('texasdefined_group_event_experiences')
    .select('*').eq('is_published', true).eq('verification_status', 'verified')
    .order('created_at', { ascending: true }).limit(500);
  if (error) throw new Error('Marketplace data verification is temporarily unavailable.');
  if (!rows?.length) return [];

  const ids = rows.map((row: any) => row.id);
  const { data: joinedTags, error: tagError } = await admin
    .from('texasdefined_group_event_experience_tags')
    .select('experience_id,category,verified_at,source_url,tag_id')
    .in('experience_id', ids).not('verified_at', 'is', null);
  if (tagError) throw new Error('Marketplace tag verification is temporarily unavailable.');

  const tags = (joinedTags ?? []) as VerifiedTag[];
  const tagIds = [...new Set(tags.map(t => t.tag_id))];
  const tagIndex = new Map<string, { key: string; tag_group: string }>();
  if (tagIds.length) {
    const { data: vocabulary, error: vocabularyError } = await admin
      .from('explore_tags').select('id,key,tag_group,is_active')
      .in('id',tagIds).eq('is_active', true);
    if (vocabularyError) throw new Error('Marketplace category verification is temporarily unavailable.');
    for (const tag of vocabulary ?? []) tagIndex.set(tag.id, tag);
  }
  const tagsByExperience = new Map<string, { occasions: OccasionKey[]; activities: ActivityKey[]; amenities: AmenityKey[] }>();
  for (const item of tags) {
    if (!['occasion','activity','amenity'].includes(item.category)) continue;
    if (!item.source_url?.startsWith('https://') || !item.verified_at) continue;
    const vocab = tagIndex.get(item.tag_id);
    if (!vocab || vocab.tag_group !== 'group_event_' + item.category) continue;
    const key = vettedTagKey(vocab.key, item.category);
    if (!key) continue;
    const entry = tagsByExperience.get(item.experience_id) ?? { occasions: [], activities: [], amenities: [] };
    if (item.category === 'occasion') entry.occasions.push(key as OccasionKey);
    else if (item.category === 'activity') entry.activities.push(key as ActivityKey);
    else entry.amenities.push(key as AmenityKey);
    tagsByExperience.set(item.experience_id, entry);
  }

  const providerEntityIds = [...new Set(rows.map((r: any) => r.provider_entity_id).filter(Boolean))];
  const providerNames = new Map<string,string>();
  if (providerEntityIds.length) {
    const { data: providers, error: providerError } = await admin
      .from('explore_entities').select('id,name').in('id',providerEntityIds);
    if (providerError) throw new Error('Marketplace provider verification is temporarily unavailable.');
    for (const p of providers ?? []) providerNames.set(p.id,p.name);
  }

  const experiences: MarketplaceExperience[] = [];
  for (const row of rows) {
    const legacy = row.legacy_provider_slug ? legacyProviders.get(row.legacy_provider_slug) : null;
    const providerName = (row.provider_entity_id && providerNames.get(row.provider_entity_id)) || legacy?.name;
    if (!providerName) continue; // Never fabricate an operator identity.
    const classified = tagsByExperience.get(row.id) ?? { occasions: [], activities: [], amenities: [] };
    experiences.push({
      id: row.id,
      provider: {
        entityId: row.provider_entity_id ?? null,
        legacySlug: row.legacy_provider_slug ?? null,
        name: providerName,
        source: { officialUrl: row.source_url, lastCheckedAt: row.last_checked_at,
          lastVerifiedAt: row.verified_at, status: row.verification_status as MarketplaceVerification },
      },
      locationId: row.provider_location_id ?? null,
      servedCities: Array.isArray(row.service_cities) ? row.service_cities : [],
      name: row.name,
      minParticipants: row.min_participants,
      maxParticipants: row.max_participants,
      simultaneousCapacity: row.simultaneous_capacity,
      rotationsConfirmed: row.rotations_confirmed === true,
      durationMinutes: row.typical_duration_minutes,
      setting: row.setting,
      occasions: classified.occasions,
      activities: classified.activities,
      verifiedAmenities: classified.amenities,
      participation: row.participation_status as MarketplaceParticipation,
      participationApprovedAt: row.participation_approved_at,
      sponsorshipApprovedAt: row.sponsorship_approved_at,
      source: { officialUrl: row.source_url, lastCheckedAt: row.last_checked_at,
        lastVerifiedAt: row.verified_at, status: row.verification_status as MarketplaceVerification },
      primaryMediaId: row.primary_media_id,
      mediaRights: row.primary_media_rights,
      published: row.is_published,
    });
  }
  return experiences;
}

export async function searchMarketplaceExperiences(filters: MarketplaceSearch): Promise<MarketplaceMatch[]> {
  return findMarketplaceExperiences(await readMarketplaceExperiences(), filters);
}

export async function readMarketplacePackages(experienceId: string, groupSize?: number): Promise<MarketplacePackage[]> {
  if (!/^[0-9a-f]{8}-[0-9a-f-]{27,36}$/i.test(experienceId)) return [];
  const { data, error } = await admin.from('texasdefined_group_event_packages')
    .select('*').eq('experience_id',experienceId)
    .eq('is_published', true).eq('verification_status','verified')
    .order('created_at', { ascending: true }).limit(100);
  if (error) throw new Error('Marketplace package verification is temporarily unavailable.');
  const packages: MarketplacePackage[] = (data ?? []).map((row: any) => ({
    id: row.id, experienceId: row.experience_id, name: row.name,
    minParticipants: row.min_participants, maxParticipants: row.max_participants,
    durationMinutes: row.duration_minutes,
    pricePerPersonCents: row.price_per_person_cents, minimumSpendCents: row.minimum_spend_cents,
    validFrom: row.starts_on, validUntil: row.ends_on,
    source: { officialUrl: row.source_url, lastCheckedAt: row.last_checked_at,
      lastVerifiedAt: row.verified_at, status: row.verification_status as MarketplaceVerification },
  }));
  return groupSize === undefined ? packages : packages.filter(p => packageFitsGroup(p,groupSize));
}
