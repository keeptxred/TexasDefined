# Texas Defined Letter — repeat-traffic foundation

Item #8 starts by turning the existing Texas Defined Letter concept into an owned, measurable subscriber channel.

## Launch contract

- The newsletter signup is visible sitewide in the footer whenever the Texas Defined newsletter feature is enabled.
- Signups post through a TexasDefined server action; the browser never receives Supabase service credentials.
- Subscribers are stored in the existing shared `newsletter_signups` table with `brand_id = 'texasdefined'`.
- Keep TX Red remains backward-compatible through the table default `brand_id = 'keeptxred'`.
- Email deduplication is per brand, so the same reader can independently subscribe to both publications.
- The signup records the source page for later conversion analysis.
- Duplicate signup attempts are idempotent and show success instead of an error.
- Public database roles receive INSERT-only access, protected by RLS validation.
- Signup copy states the weekly cadence, unsubscribe availability, and links to the privacy policy.
- Existing TexasDefined analytics records the successful `newsletter_signup` event.

## Next delivery layer

This foundation deliberately separates subscriber acquisition from campaign sending. The next #8 slice can build the governed weekly Texas Defined Letter sender, unsubscribe handling, and repeat-traffic reporting on top of this owned subscriber list without replacing the signup path.
