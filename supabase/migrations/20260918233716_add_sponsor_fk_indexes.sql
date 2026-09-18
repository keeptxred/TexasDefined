create index if not exists texasdefined_sports_sponsor_placements_sponsor_id_idx
  on public.texasdefined_sports_sponsor_placements (sponsor_id);

create index if not exists texasdefined_fishing_sponsor_placements_sponsor_id_idx
  on public.texasdefined_fishing_sponsor_placements (sponsor_id);

create index if not exists texasdefined_fishing_sponsors_source_inquiry_id_idx
  on public.texasdefined_fishing_sponsors (source_inquiry_id);
