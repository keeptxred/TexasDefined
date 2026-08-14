create unique index if not exists texasdefined_sports_sponsors_source_inquiry_unique_idx
  on public.texasdefined_sports_sponsors(source_inquiry_id)
  where source_inquiry_id is not null;

comment on index public.texasdefined_sports_sponsors_source_inquiry_unique_idx is 'Prevents a sports-travel inquiry from being promoted into duplicate sponsor records.';
