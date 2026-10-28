-- Source-controlled idempotent editorial data seed for private marketplace tables.
-- Run ONCE after merging reviewed Build 2 source and confirming Build 1 migration applied.
-- No structural migrations, no Explore location UUID guesses, no partner status, imagery or prices.
-- Safe to replay: exact slugs and tag relationships use ON CONFLICT DO NOTHING.
-- Review date is source 2026-10-28; database checked_at/verified_at record actual insertion.
BEGIN;
WITH batch AS (
  SELECT * FROM jsonb_to_recordset($houston_b2$[
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "legacy_provider_slug": "cypress-event-hall-group-rentals",
    "name": "Cypress Event Hall",
    "description": "Indoor event hall rental for corporate meetings, graduation celebrations and private family gatherings.",
    "service_cities": [
      "Cypress"
    ],
    "max_participants": 100,
    "simultaneous_capacity": 100,
    "setting": "indoor",
    "food_status": "available",
    "typical_duration_minutes": null,
    "source_url": "https://www.cypresseventhall.com/Prices.html"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "legacy_provider_slug": "lindsay-lakes-cypress-events",
    "name": "Lindsay Lakes",
    "description": "Lakeside property offering meeting, retreat, celebration and company-picnic space with on-site catering.",
    "service_cities": [
      "Cypress"
    ],
    "max_participants": null,
    "simultaneous_capacity": null,
    "setting": "mixed",
    "food_status": "available",
    "typical_duration_minutes": null,
    "source_url": "https://www.lindsaylakes.com/weddings-events-venue-cypress-texas"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "legacy_provider_slug": "towne-lake-lakehouse-events",
    "name": "The Lakehouse at Towne Lake",
    "description": "Waterfront rental venue with ballroom, patio, meeting room, lawn and catering kitchen.",
    "service_cities": [
      "Cypress"
    ],
    "max_participants": 200,
    "simultaneous_capacity": 200,
    "setting": "mixed",
    "food_status": "unknown",
    "typical_duration_minutes": null,
    "source_url": "https://townelaketexas.com/lakehouse-rental"
  },
  {
    "slug": "houston-b2-escapology-cypress-group-events",
    "legacy_provider_slug": "escapology-cypress-group-events",
    "name": "Escapology Cypress",
    "description": "Private themed escape-room games with corporate, birthday and group bookings.",
    "service_cities": [
      "Cypress"
    ],
    "max_participants": null,
    "simultaneous_capacity": null,
    "setting": "indoor",
    "food_status": "unknown",
    "typical_duration_minutes": 60,
    "source_url": "https://www.escapology.com/en/cypress-tx/groups-parties"
  },
  {
    "slug": "houston-b2-escapology-sugar-land-group-events",
    "legacy_provider_slug": "escapology-sugar-land-group-events",
    "name": "Escapology Sugar Land",
    "description": "Private escape-room games and group events in Sugar Land Town Square.",
    "service_cities": [
      "Sugar Land"
    ],
    "max_participants": null,
    "simultaneous_capacity": null,
    "setting": "indoor",
    "food_status": "unknown",
    "typical_duration_minutes": 60,
    "source_url": "https://www.escapology.com/en/sugar-land-tx"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "legacy_provider_slug": "county-line-pearland-corporate-events",
    "name": "County Line Event Center",
    "description": "Rustic meeting and gathering space offering catered company meals, team events and celebrations.",
    "service_cities": [
      "Pearland"
    ],
    "max_participants": null,
    "simultaneous_capacity": null,
    "setting": "indoor",
    "food_status": "available",
    "typical_duration_minutes": null,
    "source_url": "https://www.countylineeventcenter.com/corporate-party-venue"
  },
  {
    "slug": "houston-b2-young-chefs-woodlands-group-events",
    "legacy_provider_slug": "young-chefs-woodlands-group-events",
    "name": "Young Chefs Academy — The Woodlands",
    "description": "Customized hands-on cooking sessions for corporate teams, family groups and community organizations.",
    "service_cities": [
      "The Woodlands"
    ],
    "max_participants": null,
    "simultaneous_capacity": null,
    "setting": "indoor",
    "food_status": "unknown",
    "typical_duration_minutes": null,
    "source_url": "https://youngchefsacademy.com/locations/thewoodlandstx/group-events/"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "legacy_provider_slug": "urbanchef-houston-team-building",
    "name": "urbanCHEF",
    "description": "Chef-led team cooking challenges with prepared food, nonalcoholic drinks and optional meeting time.",
    "service_cities": [
      "Houston"
    ],
    "max_participants": 48,
    "simultaneous_capacity": 48,
    "setting": "indoor",
    "food_status": "available",
    "typical_duration_minutes": null,
    "source_url": "https://www.urbanchefhouston.com/corporate-events"
  },
  {
    "slug": "houston-b2-norris-citycentre-houston-events",
    "legacy_provider_slug": "norris-citycentre-houston-events",
    "name": "Norris Conference Centers — Houston CityCentre",
    "description": "Dedicated conference rooms and event facilities for staff development, meetings and award banquets.",
    "service_cities": [
      "Houston"
    ],
    "max_participants": 600,
    "simultaneous_capacity": 600,
    "setting": "indoor",
    "food_status": "unknown",
    "typical_duration_minutes": null,
    "source_url": "https://norriscenters.com/norris-conference-centers-houston-citycentre/"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "legacy_provider_slug": "houston-party-boats-league-city",
    "name": "Houston Party Boats",
    "description": "Captained private party cruises for corporate socials and family celebrations from League City.",
    "service_cities": [
      "League City"
    ],
    "max_participants": 75,
    "simultaneous_capacity": 75,
    "setting": "mixed",
    "food_status": "available",
    "typical_duration_minutes": null,
    "source_url": "https://houstonpartyboats.com/"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "legacy_provider_slug": "galveston-sea-ventures-corporate-charter",
    "name": "Galveston Sea Ventures",
    "description": "Private bay and Gulf fishing charter outings, with separately coordinated multi-boat corporate events.",
    "service_cities": [
      "Galveston"
    ],
    "max_participants": 6,
    "simultaneous_capacity": 6,
    "setting": "outdoor",
    "food_status": "unknown",
    "typical_duration_minutes": null,
    "source_url": "https://galvestonseaventures.com/corporate-fishing-trips/"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "legacy_provider_slug": "bb-sportfishing-galveston-group-charters",
    "name": "B & B Sportfishing",
    "description": "Private fishing and sightseeing charters with customized corporate trips and multiple-vessel planning.",
    "service_cities": [
      "Galveston"
    ],
    "max_participants": 6,
    "simultaneous_capacity": 6,
    "setting": "outdoor",
    "food_status": "unknown",
    "typical_duration_minutes": null,
    "source_url": "https://bbsportfishing.com/specialty-charters/"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "legacy_provider_slug": "houston-party-boats-league-city",
    "name": "Houston Party Boat — private vessel",
    "description": "Captained private party cruises for corporate socials and family celebrations from League City.",
    "service_cities": [
      "League City"
    ],
    "max_participants": 49,
    "simultaneous_capacity": 49,
    "setting": "mixed",
    "food_status": "available",
    "typical_duration_minutes": null,
    "source_url": "https://houstonpartyboats.com/"
  }
]$houston_b2$::jsonb) AS v(
    slug text, legacy_provider_slug text, name text, description text, service_cities text[],
    max_participants integer, simultaneous_capacity integer, setting text,
    food_status text, typical_duration_minutes integer, source_url text
  )
)
INSERT INTO public.texasdefined_group_event_experiences (
  slug, legacy_provider_slug, name, description, service_cities, 
  max_participants, simultaneous_capacity, setting, food_status, typical_duration_minutes,
  group_booking_status, participation_status, source_url, last_checked_at, verified_at,
  verification_status, primary_media_id, primary_media_rights, is_published
)
SELECT slug, legacy_provider_slug, name, description, service_cities, 
  max_participants, simultaneous_capacity, setting, food_status, typical_duration_minutes,
  'eligible', 'independent', source_url, now(), now(), 
  'verified', NULL, 'unconfirmed', true
FROM batch
ON CONFLICT (slug) DO NOTHING;
WITH tags AS (
  SELECT * FROM jsonb_to_recordset($houston_b2_tags$[
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "occasion",
    "tag_key": "ge_occasion_graduations"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "occasion",
    "tag_key": "ge_occasion_birthdays"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "amenity",
    "tag_key": "ge_amenity_audiovisual_equipment"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "amenity",
    "tag_key": "ge_amenity_catering_available"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "amenity",
    "tag_key": "ge_amenity_private_meeting_space"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-cypress-event-hall-group-rentals",
    "category": "setting",
    "tag_key": "ge_setting_private_room"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "occasion",
    "tag_key": "ge_occasion_private_gatherings"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "amenity",
    "tag_key": "ge_amenity_catering_available"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "amenity",
    "tag_key": "ge_amenity_food_available"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-lindsay-lakes-cypress-events",
    "category": "setting",
    "tag_key": "ge_setting_outdoor"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "occasion",
    "tag_key": "ge_occasion_weddings"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "amenity",
    "tag_key": "ge_amenity_private_meeting_space"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "amenity",
    "tag_key": "ge_amenity_audiovisual_equipment"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "setting",
    "tag_key": "ge_setting_outdoor"
  },
  {
    "slug": "houston-b2-towne-lake-lakehouse-events",
    "category": "setting",
    "tag_key": "ge_setting_waterfront"
  },
  {
    "slug": "houston-b2-escapology-cypress-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-escapology-cypress-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_team_building"
  },
  {
    "slug": "houston-b2-escapology-cypress-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_birthdays"
  },
  {
    "slug": "houston-b2-escapology-cypress-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-escapology-cypress-group-events",
    "category": "activity",
    "tag_key": "ge_activity_escape_room"
  },
  {
    "slug": "houston-b2-escapology-cypress-group-events",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-escapology-sugar-land-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-escapology-sugar-land-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_team_building"
  },
  {
    "slug": "houston-b2-escapology-sugar-land-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_birthdays"
  },
  {
    "slug": "houston-b2-escapology-sugar-land-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-escapology-sugar-land-group-events",
    "category": "activity",
    "tag_key": "ge_activity_escape_room"
  },
  {
    "slug": "houston-b2-escapology-sugar-land-group-events",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "category": "occasion",
    "tag_key": "ge_occasion_private_gatherings"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "category": "amenity",
    "tag_key": "ge_amenity_catering_available"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "category": "amenity",
    "tag_key": "ge_amenity_food_available"
  },
  {
    "slug": "houston-b2-county-line-pearland-corporate-events",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-young-chefs-woodlands-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-young-chefs-woodlands-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_team_building"
  },
  {
    "slug": "houston-b2-young-chefs-woodlands-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-young-chefs-woodlands-group-events",
    "category": "occasion",
    "tag_key": "ge_occasion_birthdays"
  },
  {
    "slug": "houston-b2-young-chefs-woodlands-group-events",
    "category": "activity",
    "tag_key": "ge_activity_cooking_class"
  },
  {
    "slug": "houston-b2-young-chefs-woodlands-group-events",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "occasion",
    "tag_key": "ge_occasion_team_building"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "activity",
    "tag_key": "ge_activity_cooking_class"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "activity",
    "tag_key": "ge_activity_team_competition"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "amenity",
    "tag_key": "ge_amenity_food_available"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "amenity",
    "tag_key": "ge_amenity_private_meeting_space"
  },
  {
    "slug": "houston-b2-urbanchef-houston-team-building",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-norris-citycentre-houston-events",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-norris-citycentre-houston-events",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-norris-citycentre-houston-events",
    "category": "occasion",
    "tag_key": "ge_occasion_employee_appreciation"
  },
  {
    "slug": "houston-b2-norris-citycentre-houston-events",
    "category": "amenity",
    "tag_key": "ge_amenity_private_meeting_space"
  },
  {
    "slug": "houston-b2-norris-citycentre-houston-events",
    "category": "setting",
    "tag_key": "ge_setting_indoor"
  },
  {
    "slug": "houston-b2-norris-citycentre-houston-events",
    "category": "setting",
    "tag_key": "ge_setting_private_room"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "occasion",
    "tag_key": "ge_occasion_birthdays"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "occasion",
    "tag_key": "ge_occasion_anniversaries"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "activity",
    "tag_key": "ge_activity_group_cruise"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "amenity",
    "tag_key": "ge_amenity_outside_catering_permitted"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "setting",
    "tag_key": "ge_setting_outdoor"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "setting",
    "tag_key": "ge_setting_covered_outdoor"
  },
  {
    "slug": "houston-b2-houston-party-boats-league-city",
    "category": "setting",
    "tag_key": "ge_setting_waterfront"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "occasion",
    "tag_key": "ge_occasion_team_building"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "occasion",
    "tag_key": "ge_occasion_client_entertainment"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "activity",
    "tag_key": "ge_activity_fishing_charter"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "activity",
    "tag_key": "ge_activity_guided_tour"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "setting",
    "tag_key": "ge_setting_outdoor"
  },
  {
    "slug": "houston-b2-galveston-sea-ventures-corporate-charter",
    "category": "setting",
    "tag_key": "ge_setting_waterfront"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "category": "occasion",
    "tag_key": "ge_occasion_client_entertainment"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "category": "activity",
    "tag_key": "ge_activity_fishing_charter"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "category": "activity",
    "tag_key": "ge_activity_group_cruise"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "category": "setting",
    "tag_key": "ge_setting_outdoor"
  },
  {
    "slug": "houston-b2-bb-sportfishing-galveston-group-charters",
    "category": "setting",
    "tag_key": "ge_setting_waterfront"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "occasion",
    "tag_key": "ge_occasion_corporate_events"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "occasion",
    "tag_key": "ge_occasion_company_parties"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "occasion",
    "tag_key": "ge_occasion_family_reunions"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "occasion",
    "tag_key": "ge_occasion_birthdays"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "occasion",
    "tag_key": "ge_occasion_anniversaries"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "activity",
    "tag_key": "ge_activity_group_cruise"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "amenity",
    "tag_key": "ge_amenity_outside_catering_permitted"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "setting",
    "tag_key": "ge_setting_outdoor"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "setting",
    "tag_key": "ge_setting_covered_outdoor"
  },
  {
    "slug": "houston-b2-houston-party-boat-49-passengers",
    "category": "setting",
    "tag_key": "ge_setting_waterfront"
  }
]$houston_b2_tags$::jsonb) AS v(
    slug text, category text, tag_key text
  )
)
INSERT INTO public.texasdefined_group_event_experience_tags (
  experience_id, tag_id, category, verified_at, source_url
)
SELECT ex.id, t.id, v.category, ex.verified_at, ex.source_url
FROM tags v
JOIN public.texasdefined_group_event_experiences ex ON ex.slug = v.slug
JOIN public.explore_tags t ON t.key = v.tag_key AND t.tag_group = 'group_event_' || v.category
ON CONFLICT (experience_id, tag_id) DO NOTHING;
COMMIT;
