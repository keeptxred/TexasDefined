import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { FootballGameNightGuide } from '@/components/sports/FootballGameNightGuide';
import { District21TeamSeason, hasDistrict21TeamScorecard } from '@/components/sports/District21TeamSeason';
import { SponsoredSportsPlacement } from '@/components/sports/SponsoredSportsPlacement';
import {
  UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE,
  uilEnrollmentFallsWithinBand,
  uilFootballConferenceBand,
  uilFootballEnrollmentBand,
  uilFootballEnrollmentBandForEnrollment,
} from '@/data/high-school-football/enrollment-bands';

// Original, school-specific source-derived visual finals; no unlicensed school photos, logos or seals.
const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([
  'bruceville-eddy',
  'bruni',
  'brackettville-brackett',
  'brady',
  'breckenridge',
  'bremond',
  'brenham',
  'bridge-city',
  'bridgeland',
  'bridgeport',
  'brock',
  'bronte',
  'brookesmith',
  'brownfield',
  'brownsboro',
  'brownsville-hanna',
  'brownsville-lopez',
  'brownsville-pace',
  'brownsville-porter',
  'brownsville-rivera',
  'brownsville-veterans-memorial',
  'brownwood',
  'bryan',
  'bryan-rudder',
  'bryson',
  'big-sandy-harmony',
  'big-spring',
  'bishop',
  'blackwell',
  'blanco',
  'blanket',
  'blooming-grove',
  'bloomington',
  'blue-ridge',
  'bluff-dale',
  'blum',
  'boerne',
  'boerne-champion',
  'bogata-rivercrest',
  'boling',
  'bonham',
  'booker',
  'borden-county',
  'borger',
  'bosqueville',
  'bovina',
  'bowie',
  'bowie-gold-burg',
  'boyd',
  'boys-ranch',
]);

const UIL_ELIGIBILITY_URL = 'https://www.uiltexas.org/policy/eligibility';
const UIL_DETAILED_ELIGIBILITY_URL = 'https://www.uiltexas.org/policy/constitution/general/eligibility';
const UIL_EXACT_ENROLLMENT_URL = 'https://www.uiltexas.org/files/alignments/Alpha_26-28.pdf';

// Turn authored HTTPS references in football FAQ answers into keyboard-accessible
// source links. Retain the original question/answer text for FAQ JSON-LD parity;
// never interpret arbitrary markup or permit javascript:/http: destinations.
function renderFootballFaqAnswer(answer: string) {
  return answer.split(/(https:\/\/[^\s)]+)/g).map((part, index) => {
    if (!part.startsWith('https://')) return part;
    const href = part.replace(/[.,;!]+$/, '');
    const punctuation = part.slice(href.length);
    return (
      <span key={index}>
        <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-primary underline underline-offset-4">{href}</a>
        {punctuation}
      </span>
    );
  });
}

export const Route = createLazyFileRoute('/texas-high-school-football-teams/$slug')({ component: Page });

function Page() {
  const {
    displayName,
    slug,
    program,
    identity,
    enrollmentLink,
    districtPeers,
    districtPath,
    venueLinks,
    sponsorPlacement,
    privateAlignment,
    privateAdmissions,
    governingBodyHint,
    associationClassification,
    associationSourceUrl,
    editorial,
    profileSummary,
    quickFacts,
    faq,
  } = Route.useLoaderData();
  const schoolName = displayName;
  const district21Team = program?.classification === '6A' && program.district === 21 && !editorial?.season && !editorial?.notice && hasDistrict21TeamScorecard(schoolName);
  // Authored football-page titles contain the verified school-specific mascot.
  // Fall back to the reference directory for schools without an editorial title;
  // the optional TEA identity join may be unavailable in deployed SSR.
  const authoredFootballH1 = editorial?.seo?.title?.match(/^(.+?Football)/i)?.[1];
  const footballName = authoredFootballH1 || (identity?.mascot ? `${displayName} ${identity.mascot} Football` : `${displayName} Football`);
  // Summarize the verified editorial ledger before the deeper school reference sections.
  const latestResult = editorial?.season?.games.filter((game) => game.result).at(-1);
  // Published editorial snapshot date is stable across SSR and hydration; never label an unresolved past game as next.
  const nextListedFixture = editorial?.season?.games.find((game) => !game.result && game.date >= editorial.season.verifiedAt);
  // UIL team names are stable while optional TEA directory joins can fail in production.
  // Abbott's Hill County association is independently documented by the school
  // and the Batch 001 registry, so retain its reciprocal link on degraded lookups.
  // Campus-county mapping for individually sourced Batch 002 profiles;
  // city names and district service areas are not dependable campus-county proxies.
  const researchedCampusCounty: Record<string, string> = {
    'bruceville-eddy': 'mclennan', // TEA 161919 confirms Eddy ISD physical campus in McLennan County, not nearby Bell County.
    'bruni': 'webb', // Webb CISD first-party Bruni campus 619 Avenue F, southern Webb County; six-man spectator gates not verified.
    'bryson': 'jack', // NCES school district 4811820: 300 N McCloud St physical campus in Jack County; 305/309 third-party field listings are not a proven gate.
    'bryan': 'brazos', // Bryan ISD first-party campus 3450 Campus Drive in Brazos County; Merrill Green Stadium 3310 Oak Ridge Dr is distinct.
    'bryan-rudder': 'brazos', // Rudder High Bryan ISD at 3251 Austin's Colony Pkwy in Brazos County; shared Merrill Green Stadium is 3310 Oak Ridge.
    'brownwood': 'brown', // Brownwood HS 2100 Slayden campus in Brown County; Gordon Wood Stadium separate at 3206 Milam Dr.
    'brownsville-veterans-memorial': 'cameron', // First-party Brownsville BISD Veterans ECHS campus 1000 Charger Lane conflicts with athletic site US Hwy281 footer; neither is stadium gate.
    'brownsville-rivera': 'cameron', // BISD Rivera school history identifies campus 6955 FM 802 in Brownsville Cameron County; football site footer says FM801 in conflict.
    'brownsville-porter': 'cameron', // BISD 3500 International Blvd Brownsville Porter academic campus; uses multiple stadiums, not campus gate.
    'brownsville-pace': 'cameron', // Official Pace ECHS 314 W Los Ebanos in Cameron County; football at Sams or Veterans Memorial by event.
    'brownsville-lopez': 'cameron', // Brownsville ISD Lopez campus 3205 S Dakota Ave, Cameron County, not Sams Stadium spectator gates.
    'brownsville-hanna': 'cameron', // BISD first-party Hanna ECHS 2615 E Price Road in Cameron County, not a stadium spectator entrance.
    'brownsboro': 'henderson', // BISD official Brownsboro HS 13942 State Hwy 31 E, Henderson County; district office 14134 is distinct.
    'brownfield': 'terry', // Brownfield High first-party 702 Cub Drive campus Terry County; MaxPreps has conflicting 701 number and stadium gate unverified.
    'brookesmith': 'brown', // Brookesmith ISD official 13400 FM 586 S campus in Brown County; stadium field/gate unverified.
    'bronte': 'coke', // Bronte ISD official 210 S Jefferson Street high school campus in Coke County, separate from unconfirmed Stephenson Stadium gate.
    'brock': 'parker', // Brock ISD 400 Eagle Spirit Lane football campus in Parker County; visitor stadium entrance remains unverified.
    'bridgeport': 'wise', // Bridgeport High official One Maroon Dr campus in Wise County; Bull Memorial Stadium 702 17th St is separate.
    'bridgeland': 'harris', // Official CFISD campus 10707 Mason Road in Cypress, Harris County; Oct 23 game venue on Barker Cypress is separate.
    'bridge-city': 'orange', // Bridge City ISD first-party BCHS 2690 Texas Ave campus, Orange County; stadium gate unverified.
    bremond: 'robertson', // Bremond ISD 601 W Collins campus in Robertson County, not a football stadium gate.
    brenham: 'washington', // Brenham ISD varsity campus 525 A.H. Ehrig in Washington County.
    'brackettville-brackett': 'kinney', // NCES Brackett High physical campus 481107000572, not an assumed stadium gate.
    brady: 'mcculloch', // Brady High School 2301 Hwy 190 in Brady, McCulloch County; venue entry unconfirmed.
    breckenridge: 'stephens', // Breckenridge High School 500 W Lindsey, distinct from Buckaroo Stadium.
    boerne: 'kendall', // First-party Boerne High School located in Boerne, Kendall County.
    'boerne-champion': 'kendall', // Samuel V. Champion High School's official 201 Charger Blvd campus is in Kendall County.
    'bogata-rivercrest': 'red-river', // TEA campus 194903001 / NCES identify Rivercrest High in Red River County.
    bonham: 'fannin', // Bonham High School official Warpath Drive campus, Fannin County.
    boling: 'wharton', // NCES school 481078000541 identifies Boling High's Wharton County campus.
    booker: 'lipscomb', // NCES 481083000550 confirms Booker Junior High/High School 6–12 campus in Lipscomb County.
    'borden-county': 'borden', // Borden County ISD high school campus in Gail, not district land across Howard County.
    'borger': 'hutchinson', // Borger ISD Hutchinson County school campus, not stadium gate
    'bosqueville': 'mclennan', // Bosqueville ISD McLennan County school campus, not stadium gate
    'bovina': 'parmer', // Bovina ISD Parmer County school campus, not stadium gate
    'bowie': 'montague', // Bowie ISD Montague County school campus, not stadium gate
    'bowie-gold-burg': 'montague', // Gold-Burg ISD Montague County school campus, not stadium gate
    'boyd': 'wise', // Boyd ISD Wise County school campus, not stadium gate
    'boys-ranch': 'oldham', // Boys Ranch ISD Oldham County school campus, not stadium gate
    blum: 'hill', // Blum ISD campus in Hill County.
    'bluff-dale': 'erath', // Bluff Dale ISD in Erath County.
    'baytown-goose-creek-memorial': 'harris',
    'baytown-lee': 'harris',
    'baytown-sterling': 'harris',
    'beaumont-united': 'jefferson',
    'beaumont-west-brook': 'jefferson',
    'beckville': 'panola',
    'beeville-jones': 'bee',
    'bells': 'grayson',
    'bellville': 'austin',
    'belton': 'bell',
    'ben-bolt-palito-blanco': 'jim-wells',
    'benavides': 'duval',
    'big-lake-reagan-co': 'reagan',
    'big-sandy': 'upshur',
    'big-spring': 'howard', // Individual school dossier/NCES campus county; not stadium gate
    'bishop': 'nueces', // Individual school dossier/NCES campus county; not stadium gate
    'blackwell': 'nolan', // Individual school dossier/NCES campus county; not stadium gate
    'blanco': 'blanco', // Individual school dossier/NCES campus county; not stadium gate
    'blanket': 'brown', // Individual school dossier/NCES campus county; not stadium gate
    'blooming-grove': 'navarro', // Individual school dossier/NCES campus county; not stadium gate
    'bloomington': 'victoria', // Individual school dossier/NCES campus county; not stadium gate
    'blue-ridge': 'collin', // Individual school dossier/NCES campus county; not stadium gate
    'big-sandy-harmony': 'upshur', // NCES Harmony High is in Upshur County, distinct from Big Sandy Wildcats.
    'barksdale-nueces-canyon': 'edwards',
    'bartlett': 'bell',
    'bastrop': 'bastrop',
    'bastrop-cedar-creek': 'bastrop',
    'bay-city': 'matagorda',
    benjamin: 'knox', // Benjamin ISD campus in Knox County
    'ballinger': 'runnels',
    'balmorhea': 'reeves',
    'bandera': 'bandera',
    'bangs': 'brown',
    'banquete': 'nueces',
    'alief-taylor': 'harris',
    'all-saints-fort-worth': 'tarrant',
    allen: 'collin',
    alpine: 'brewster',
    'altair-rice': 'colorado',
    alto: 'cherokee',
    alvarado: 'johnson',
    alvin: 'brazoria',
    'alvin-iowa-colony': 'brazoria',
    'alvin-shadow-creek': 'brazoria',
    alvord: 'wise',
    amarillo: 'randall',
    // Batch 003: NCES/TEA-confirmed individual campus counties.
    'amarillo-caprock': 'randall',
    'amarillo-highland-park': 'potter',
    'amarillo-palo-duro': 'potter',
    'amarillo-river-road': 'potter',
    'amarillo-tascosa': 'potter',
    amherst: 'lamb',
    anahuac: 'chambers',
    'anderson-shiro': 'grimes',
    andrews: 'andrews',
    angleton: 'brazoria',
    anna: 'collin',
    anson: 'jones',
    anthony: 'el-paso',
    anton: 'hockley',
    'apple-springs': 'trinity',
    aquilla: 'hill',
    'aransas-pass': 'san-patricio',
    'archer-city': 'archer',
    argyle: 'denton',
    arlington: 'tarrant',
    'arlington-bowie': 'tarrant',
    'arlington-houston': 'tarrant',
    'arlington-lamar': 'tarrant',
    'arlington-martin': 'tarrant',
    'arlington-seguin': 'tarrant',
    // Batch 004 independent campus-county associations; venue location may differ.
    arp: 'smith',
    aspermont: 'stonewall',
    athens: 'henderson',
    atlanta: 'cass',
    aubrey: 'denton',
    'austin-vandegrift': 'travis',
    avalon: 'ellis',
    axtell: 'mclennan',
    baird: 'callahan',
    'austin': 'travis',
    'austin-achieve': 'travis',
    'austin-akins': 'travis',
    'austin-anderson': 'travis',
    'austin-bowie': 'travis',
    'austin-crockett': 'travis',
    'austin-eastside': 'travis',
    'austin-johnson': 'travis',
    'austin-lake-travis': 'travis',
    'austin-lasa': 'travis',
    'austin-mccallum': 'travis',
    'austin-navarro': 'travis',
    'austin-northeast': 'travis',
    'austin-travis': 'travis',
    'austin-westlake': 'travis',
    azle: 'tarrant',
  };
  // Link only campuses with documented city location and an existing
  // canonical city guide; a school-district service area is not enough.
  const batch002CityGuide: Record<string, { slug: string; name: string }> = {
    'alief-elsik': { slug: 'houston', name: 'Houston' },
    'alief-hastings': { slug: 'houston', name: 'Houston' },
    'alief-taylor': { slug: 'houston', name: 'Houston' },
    'all-saints-fort-worth': { slug: 'fort-worth', name: 'Fort Worth' },
    // Batch 003 Arlington ISD schools: official school directory confirms Arlington campuses.
    arlington: { slug: 'arlington', name: 'Arlington' },
    'arlington-bowie': { slug: 'arlington', name: 'Arlington' },
    'arlington-houston': { slug: 'arlington', name: 'Arlington' },
    'arlington-lamar': { slug: 'arlington', name: 'Arlington' },
    'arlington-martin': { slug: 'arlington', name: 'Arlington' },
    'arlington-seguin': { slug: 'arlington', name: 'Arlington' },
    // Austin city campuses; school-district and postal designations alone do not include suburban campuses.
    'austin': { slug: 'austin', name: 'Austin' },
    'austin-achieve': { slug: 'austin', name: 'Austin' },
    'austin-vandegrift': { slug: 'austin', name: 'Austin' },
    'austin-akins': { slug: 'austin', name: 'Austin' },
    'austin-anderson': { slug: 'austin', name: 'Austin' },
    'austin-bowie': { slug: 'austin', name: 'Austin' },
    'austin-crockett': { slug: 'austin', name: 'Austin' },
    'austin-eastside': { slug: 'austin', name: 'Austin' },
    'austin-johnson': { slug: 'austin', name: 'Austin' },
    'austin-lasa': { slug: 'austin', name: 'Austin' },
    'austin-mccallum': { slug: 'austin', name: 'Austin' },
    'austin-navarro': { slug: 'austin', name: 'Austin' },
    'austin-northeast': { slug: 'austin', name: 'Austin' },
    'austin-travis': { slug: 'austin', name: 'Austin' },
  };
  const cityGuide = editorial?.slug ? batch002CityGuide[editorial.slug] : undefined;
  const researchedCountyLink = editorial?.slug ? researchedCampusCounty[editorial.slug] : undefined;
  const countyPath = researchedCountyLink ? `/county/${researchedCountyLink}`
    : schoolName === 'Alief Hastings'
    ? '/county/harris'
    : schoolName === 'Alief Elsik'
    ? '/county/harris'
    : schoolName === 'Alice'
    ? '/county/jim-wells'
    : schoolName === 'Aledo'
    ? '/county/parker'
    : schoolName === 'Albany'
    ? '/county/shackelford'
    : schoolName === 'Alba-Golden'
    ? '/county/wood'
    : schoolName === 'Agua Dulce'
    ? '/county/nueces'
    : schoolName === 'Ackerly Sands'
    ? '/county/dawson'
    : schoolName === 'Abilene Wylie'
    ? '/county/taylor'
    : schoolName === 'Abilene Texas Leadership'
    ? '/county/taylor'
    : schoolName === 'Abilene Cooper'
    ? '/county/taylor'
    : schoolName === 'Abilene'
    ? '/county/taylor'
    : schoolName === 'Abernathy'
    ? '/county/hale'
    : schoolName === 'Abbott'
    ? '/county/hill'
    : schoolName === 'Katy'
      ? '/county/fort-bend'
      : schoolName === 'Fort Davis'
        ? '/county/jeff-davis'
        : schoolName === 'Southlake Carroll'
          ? '/county/tarrant'
          : program?.countyName ? `/county/${countySlug(program.countyName)}` : null;
  const associationLabel = program
    ? 'UIL'
    : privateAlignment?.association ?? governingBodyHint ?? null;
  const enrollmentBand = program
    ? uilFootballEnrollmentBand(program.classification, program.division)
    : null;
  const conferenceBand = program
    ? uilFootballConferenceBand(program.classification)
    : null;
  const enrollmentFitsFinalBand = program
    ? uilEnrollmentFallsWithinBand(program.uilEnrollment, enrollmentBand)
    : null;
  const enrollmentBasedBand = program
    ? uilFootballEnrollmentBandForEnrollment(program.uilEnrollment)
    : null;

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-teams">High school football teams</a><span className="mx-2">/</span>
        <span aria-current="page">{displayName}</span>
      </nav>

      <header className="border-b border-border py-7 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">2026 Texas high school football</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{footballName}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground" style={slug === 'aubrey' ? { fontSize: '1rem', lineHeight: 1.6 } : undefined}>
              {slug === 'aubrey'
                ? 'Verified 2026 scores, remaining games, home tickets and Chaparral Stadium information.'
                : editorial?.intro ?? profileSummary}
            </p>
          </div>
          {slug === 'aubrey' ? (
            <figure style={{ minWidth: 0 }}>
              <div className="relative overflow-hidden border border-border" style={{ height: 'clamp(210px, 34vw, 330px)', backgroundColor: '#10243d' }}>
                <img
                  src="https://images.unsplash.com/photo-1508209495879-445d5febf597?auto=format&fit=crop&w=1400&q=78"
                  alt="High school American football under stadium lights at dusk, pictured at a game in Aurora, Colorado, not an Aubrey game"
                  width={1400}
                  height={940}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 53%' }}
                  />
              </div>
              <figcaption className="mt-2 text-xs text-muted-foreground" style={{ lineHeight: 1.5 }}>
                Representative high-school football photo, not an Aubrey team or stadium image.{' '}
                <a href="https://unsplash.com/photos/man-holding-football-field-post-on-side-of-field-Fbq47uCtXHI" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Tim Mossholder / Unsplash</a>.{' '}
                <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Unsplash License</a>.
              </figcaption>
            </figure>
          ) : (
            <FootballIdentityPanel
              footballName={footballName}
              alignment={program ? `${alignmentLabel(program)} · District ${program.district}` : privateAlignment ? privateAlignmentLabel(privateAlignment) : governingBodyHint || 'Texas football program'}
              footballType={program?.footballType || privateAlignment?.footballType}
              mascot={identity?.mascot}
              accentHex={editorial?.theme?.accentHex}
            />
          )}
        </div>
      </header>

      {editorial?.notice && <aside aria-label="Current school football season status" className="border-b border-border py-7">
        <div className="border-l-4 border-foreground bg-surface p-5 sm:p-7">
          <p className="eyebrow text-surface-foreground">Important 2026 program update</p>
          <h2 className="mt-2 font-display text-3xl">{editorial.notice.title}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-foreground">{editorial.notice.body}</p>
          <a href={editorial.notice.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-surface-foreground underline underline-offset-4">{editorial.notice.sourceLabel} ↗</a>
          <p className="mt-2 text-xs text-muted-foreground">Reporting checked <time dateTime={editorial.notice.verifiedAt}>{formatFootballDate(editorial.notice.verifiedAt)}</time>; consult the district for later changes.</p>
        </div>
      </aside>}

      {editorial?.season && (
        <section aria-label={`${footballName} season at a glance`} className="grid gap-4 border-b border-border py-5 sm:grid-cols-3 sm:py-10">
          <div className="border-l-4 border-primary bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2026 record from reported finals</p>
            <p className="mt-2 text-lg font-semibold leading-tight">{editorial.season.record}</p>
          </div>
          {latestResult && <div className="border-l-4 border-border bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Most recent reported result</p>
            <p className="mt-2 font-semibold">{latestResult.result} · {latestResult.opponent}</p>
            <p className="mt-1 text-xs text-muted-foreground"><time dateTime={latestResult.date}>{formatFootballDate(latestResult.date)}</time></p>
            {latestResult.matchupPath && <Link to={latestResult.matchupPath} className="mt-2 inline-block text-sm font-semibold text-primary underline underline-offset-4">Game details →</Link>}
          </div>}
          {nextListedFixture && <div className="border-l-4 border-border bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next listed 2026 fixture</p>
            <p className="mt-2 font-semibold">{nextListedFixture.opponent}</p>
            <p className="mt-1 text-xs text-muted-foreground"><time dateTime={nextListedFixture.date}>{formatFootballDate(nextListedFixture.date)}</time> · {nextListedFixture.site}; verify kickoff</p>
            <a href="#football-current-season" className="mt-2 inline-block text-sm font-semibold text-primary underline underline-offset-4">Full schedule ↓</a>
          </div>}
          <p className="text-xs leading-6 text-muted-foreground">Checked <time dateTime={editorial.season.verifiedAt}>{formatFootballDate(editorial.season.verifiedAt)}</time>. Source-linked results are verified snapshots, not live game scores or certified district standings.</p>
        </section>
      )}

      {!editorial?.notice && (editorial?.schedule || editorial?.season || editorial?.venue || venueLinks.length > 0 || program?.schoolWebsite) && (
        <FootballGameNightGuide
          slug={slug}
          footballName={footballName}
          schedule={editorial?.schedule}
          season={editorial?.season}
          venue={editorial?.venue}
          venueLink={venueLinks[0]}
          schoolWebsite={program?.schoolWebsite}
          hasSeasonSection={!!program}
          summaryAlreadyShown={!!editorial?.season}
        />
      )}

      {/* Put verified visitor actions and the actual season ahead of history and enrollment. */}
        <dl aria-label={`${displayName} verified football facts`} className="grid grid-cols-2 gap-x-5 border-b border-border py-3 text-sm sm:grid-cols-3 lg:grid-cols-6">
          {associationLabel && <Fact label="Governing body" value={associationLabel} />}
          {program && <Fact label="Current alignment" value={alignmentLabel(program)} />}
          {!program && privateAlignment && <Fact label="Current alignment" value={privateAlignmentLabel(privateAlignment)} />}
          {program && <Fact label="Football district" value={String(program.district)} />}
          {program?.uilEnrollment && <Fact label="UIL enrollment" value={program.uilEnrollment.toLocaleString('en-US')} />}
          {!program && privateAlignment?.districtLabel && <Fact label="Football district" value={privateAlignment.districtLabel} />}
          <Fact label="Format" value={program?.footballType || privateAlignment?.footballType} />
          {editorial?.coach && <Fact label="Head coach" value={editorial.coach.name} />}
        </dl>

      {sponsorPlacement ? (
        <div className="border-b border-border py-6">
          <SponsoredSportsPlacement key={sponsorPlacement.id} placement={sponsorPlacement} />
        </div>
      ) : null}

      {district21Team && <District21TeamSeason schoolName={schoolName} />}

      {program && !district21Team && (editorial?.season || !editorial?.notice) && <section id="football-current-season" className="scroll-mt-24 grid gap-8 border-b border-border py-8 sm:py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Current season</p>
          <h2 className="mt-2 font-display text-3xl">{editorial?.season ? '2026 results & schedule' : 'Live scores & schedule links'}</h2>
          {editorial?.season && <p className="mt-4 text-sm leading-7 text-muted-foreground">Season data checked <time dateTime={editorial.season.verifiedAt}>{formatFootballDate(editorial.season.verifiedAt)}</time>. Recheck the school source before travel because kickoff times and venues can change.</p>}
        </div>
        <div className="min-w-0">
          {editorial?.season ? <>
            <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
              <Snapshot label="Record when checked" value={editorial.season.record} />
              <Snapshot label="Season data verified" value={formatFootballDate(editorial.season.verifiedAt)} />
            </dl>
            {FOOTBALL_SOURCE_GRAPHIC_SCHOOLS.has(slug) && <ReportedFormIllustration
              schoolName={footballName}
              games={editorial.season.games}
              sourceUrl={editorial.season.sourceUrl}
              accent={editorial.theme?.accentHex || "#64748b"}
            />}
            <div role="region" aria-label="Scrollable 2026 football results and schedule table" tabIndex={0} className="mt-5 w-full max-w-full overflow-x-auto border-y border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <table className="w-full min-w-[38rem] text-left text-sm">
                <thead className="border-b border-border text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  <tr><th className="px-3 py-3">Date</th><th className="px-3 py-3">Opponent</th><th className="px-3 py-3">Site</th><th className="px-3 py-3">Result / status</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {editorial.season.games.map((game) => <tr key={`${game.date}:${game.opponent}`}>
                    <td className="px-3 py-3 font-semibold"><time dateTime={game.date}>{formatFootballDate(game.date)}</time></td>
                    <td className="px-3 py-3">{game.opponent}{game.district ? ' *' : ''}</td>
                    <td className="px-3 py-3 text-muted-foreground">{game.site}</td>
                    <td className="px-3 py-3">{game.matchupPath
                      ? <Link to={game.matchupPath} className="font-semibold text-primary underline underline-offset-4">{game.result} · matchup →</Link>
                      : game.result || (game.kickoff ? `Scheduled · ${game.kickoff}` : 'Scheduled')}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">* District game. This table is a dated editorial snapshot, not a live scoreboard.</p>
            <a href={editorial.season.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">{editorial.season.sourceLabel} ↗</a>
            {editorial.season.latestResultSourceUrl && <a href={editorial.season.latestResultSourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Verify latest recorded final ↗</a>}
          </> : <p className="max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined does not publish an unverified team-specific schedule. Use UIL’s Texas Scoreboard and the school’s official athletics source for current dates and results; the UIL feed is submission-based, and it is not an official district-standings table.</p>}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a href="https://www.uiltexas.org/maxpreps/" target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL Texas Scoreboard gateway ↗</a>
            {editorial?.schedule && <a href={editorial.schedule.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{editorial.schedule.label} ↗</a>}
            {program.schoolWebsite && <a href={program.schoolWebsite} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official school athletics / website ↗</a>}
            <a href="/article/texas-high-school-football-scores-schedules" className="text-primary underline underline-offset-4">How to verify scores, schedules & standings →</a>
            <a href="/article/texas-high-school-football-2026-season-calendar" className="text-primary underline underline-offset-4">2026 UIL season calendar →</a>
          </div>
        </div>
      </section>}

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Quick answers</p>
          <h2 className="mt-2 font-display text-3xl">{displayName} football at a glance</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">These answers come from the same UIL, TEA, school, association and verified venue data used throughout this profile.</p>
        </div>
        <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {quickFacts.map((fact) => <Snapshot key={`${fact.label}:${fact.value}`} label={fact.label} value={fact.value} />)}
        </dl>
      </section>

      {editorial && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Program overview</p>
          <h2 className="mt-2 font-display text-3xl">{footballName} in 2026</h2>
        </div>
        <div>
          <div className="space-y-4">
            {editorial.overview.map((paragraph) => <p key={paragraph} className="max-w-4xl text-sm leading-7 text-muted-foreground">{paragraph}</p>)}
          </div>
          {schoolName === 'Abilene Wylie' && <div className="mt-6 border-l-4 border-border bg-surface p-5 text-sm leading-7">
            <p className="font-display text-xl text-foreground">Which Wylie Bulldogs?</p>
            <p className="mt-2 text-muted-foreground">This is the Wylie High School program in Abilene, Taylor County—not the Wylie Pirates near Dallas or an Abilene ISD team. Wylie and Abilene Cooper are documented competitors in UIL 5A Division II District 2 for 2026–28.</p>
            <a href="/texas-high-school-football-teams/abilene-cooper" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">Explore district opponent Abilene Cooper →</a>
            <span className="mx-2 text-muted-foreground">·</span>
            <a href="https://www.wyliebulldogathletics.com/facilities" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Official Sandifer Stadium directions ↗</a>
          </div>}
          {schoolName === 'Abilene Texas Leadership' && <div className="mt-6 border-l-4 border-border bg-surface p-5 text-sm leading-7">
            <p className="font-display text-xl text-foreground">Which Abilene football team?</p>
            <p className="mt-2 text-muted-foreground">Texas Leadership of Abilene is a tuition-free public-charter school and a separate UIL team from Abilene High and Abilene Cooper. Its district office in San Angelo is not the Abilene secondary campus or home football stadium.</p>
            <a href="/texas-high-school-football-teams/abilene" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">Abilene High Eagles guide →</a>
            <span className="mx-2 text-muted-foreground">·</span>
            <a href="https://www.texasleadership.net/family-resources/enroll" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Official TLCA enrollment ↗</a>
          </div>}
          {(schoolName === 'Abilene' || schoolName === 'Abilene Cooper') && <div className="mt-6 border-l-4 border-border bg-surface p-5 text-sm leading-7">
            <p className="font-display text-xl text-foreground">The Crosstown Showdown</p>
            <p className="mt-2 text-muted-foreground">Abilene ISD documents the Abilene High–Cooper football series beginning in 1961. These two school histories are different, and the teams are assigned to different 2026–28 UIL divisions.</p>
            <a href={schoolName === 'Abilene' ? '/texas-high-school-football-teams/abilene-cooper' : '/texas-high-school-football-teams/abilene'} className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">{schoolName === 'Abilene' ? 'Explore Cooper Cougars football history →' : 'Explore Abilene High Eagles football history →'}</a>
            <span className="mx-2 text-muted-foreground">·</span>
            <a href="https://www.abileneisd.org/article/1525088" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">District's historical rivalry results ↗</a>
          </div>}
          {editorial.photo && <figure className="mt-7 overflow-hidden border border-border bg-surface">
            <img src={editorial.photo.src} alt={editorial.photo.alt} width={editorial.photo.width} height={editorial.photo.height} loading={schoolName === 'Katy' || schoolName === 'Fort Davis' ? 'eager' : 'lazy'} decoding="async" className={editorial.photo.width < 400 ? "mx-auto block h-auto w-auto max-w-full object-contain" : "block h-auto w-full object-cover"} />
            <figcaption className="p-4 text-xs leading-6 text-muted-foreground">
              {editorial.photo.caption}{' '}Photo by <a href={editorial.photo.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{editorial.photo.credit}</a>.{' '}
              <a href={editorial.photo.licenseUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{editorial.photo.license}</a>.
            </figcaption>
          </figure>}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {editorial.coach && <a href={editorial.coach.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{editorial.coach.sourceLabel} ↗</a>}
            {editorial.schedule && <a href={editorial.schedule.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{editorial.schedule.label} ↗</a>}
            {editorial.campus && <a href={editorial.campus.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{editorial.campus.sourceLabel} ↗</a>}
          </div>
        </div>
      </section>}

      {editorial?.milestones && editorial.milestones.length > 0 && <section aria-label={`${displayName} verified football milestones`} className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">The program story</p>
          <h2 className="mt-2 font-display text-3xl">Milestones that shaped {displayName} football</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Every moment is linked to its supporting source. Historical classifications, championship years and coaching records are separate from the current UIL alignment.</p>
          {editorial.theme && editorial.photo && <p className="mt-4 text-xs text-muted-foreground">{editorial.theme.label}</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {['brady', 'breckenridge'].includes(slug) && (
            <figure
              className="min-w-0 border border-border bg-surface p-4 sm:p-6 md:col-span-2"
              aria-label={`${footballName}: sourced historical football milestones graphic`}
            >
              <figcaption className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Historical football · source-derived graphic</p>
                <p className="mt-1 font-display text-xl font-semibold">The documented years, not invented 2026 scores</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Original TexasDefined chronological visual. Each entry links to its attributed history source below; no school-owned logo or photograph.</p>
              </figcaption>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {editorial.milestones.map((milestone) => (
                  <li
                    key={milestone.date + milestone.title}
                    className="min-w-0 border border-border border-l-4 bg-background p-3"
                    style={{ borderLeftColor: editorial.theme?.accentHex || '#64748b' }}
                    aria-label={`${milestone.date}: ${milestone.title}`}
                  >
                    <span className="font-display text-xl font-semibold text-foreground">{milestone.date}</span>
                    <p className="mt-1 break-words text-sm font-medium leading-6 text-foreground">{milestone.title}</p>
                    <a href={milestone.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-2 inline-block text-xs underline underline-offset-4">Historical source ↗</a>
                  </li>
                ))}
              </ol>
            </figure>
          )}
          {editorial.milestones.map((milestone) => <article key={`${milestone.date}:${milestone.title}`} className="border-l-4 bg-surface p-5 sm:p-6" style={{ borderLeftColor: editorial.theme?.accentHex }}>
            <p className="font-display text-2xl font-semibold text-surface-foreground">{milestone.date}</p>
            <h3 className="mt-3 font-display text-2xl leading-tight">{milestone.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{milestone.body}</p>
            <a href={milestone.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-surface-foreground underline underline-offset-4">{milestone.sourceLabel} ↗</a>
          </article>)}
        </div>
      </section>}

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">School snapshot</p>
          <h2 className="mt-2 font-display text-3xl">Where this program fits</h2>
        </div>
        <div>
          {program ? <>
            <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              <Snapshot label="School" value={schoolName} />
              {program.districtName && <Snapshot label="ISD / district" value={program.districtName} />}
              {(program.city || program.countyName) && <Snapshot label="Location" value={[program.city, program.countyName].filter(Boolean).join(' · ')} />}
              <Snapshot label="UIL classification" value={program.classification} />
              <Snapshot label="Football division" value={program.division ? `Division ${program.division === 1 ? 'I' : 'II'}` : 'Not pre-split in alignment'} />
              {program.uilEnrollment && <Snapshot label="UIL reported enrollment" value={program.uilEnrollment.toLocaleString('en-US')} />}
              {enrollmentFitsFinalBand !== false && <Snapshot label="UIL enrollment band" value={enrollmentBand?.label || conferenceBand || 'See current UIL cutoff table'} />}
              {enrollmentFitsFinalBand === false && <Snapshot
                label="Enrollment-based cutoff band"
                value={enrollmentBasedBand
                  ? `${alignmentLabel(enrollmentBasedBand)} · ${enrollmentBasedBand.label}`
                  : 'See official UIL cutoff table'}
              />}
              {enrollmentFitsFinalBand === false && <Snapshot label="Final football placement" value={alignmentLabel(program)} />}
              <Snapshot label="UIL district" value={String(program.district)} />
            </dl>
            {enrollmentFitsFinalBand !== false ? <p className="mt-4 text-sm leading-7 text-muted-foreground">
              TexasDefined orders the statewide directory from 6A through 1A because UIL classifications generally reflect enrollment size. For the 2026–28 cycle, this program’s final football classification{program.division ? ' and football division' : ''} corresponds to an enrollment band of <strong className="text-foreground">{enrollmentBand?.label || conferenceBand}</strong>{program.uilEnrollment ? <> and UIL reports an enrollment of <strong className="text-foreground">{program.uilEnrollment.toLocaleString('en-US')}</strong></> : null}. That ordering is not a claim that a larger-classification football program is better than a smaller-classification program. District assignments and enrollment cutoffs can change at realignment.
            </p> : <div className="mt-4 border-l-4 border-primary bg-surface p-4 text-sm leading-7 text-muted-foreground">
              <p><strong className="text-foreground">Enrollment and football placement are different here.</strong> UIL reports an enrollment of <strong className="text-foreground">{program.uilEnrollment?.toLocaleString('en-US')}</strong>{enrollmentBasedBand ? <>, which falls in the published <strong className="text-foreground">{alignmentLabel(enrollmentBasedBand)} ({enrollmentBasedBand.label})</strong> cutoff band</> : null}{program.uilSubmittedConference ? <>; the alphabetical enrollment listing records a submitted conference of <strong className="text-foreground">{program.uilSubmittedConference}</strong></> : null}. The final 2026–28 football alignment instead places the program in <strong className="text-foreground">{alignmentLabel(program)}</strong>. TexasDefined shows both facts rather than relabeling the final-placement cutoff as the school's enrollment band. The final UIL alignment controls football competition placement.</p>
            </div>}
            {program.uilSubmittedConference && program.uilSubmittedConference !== program.classification && enrollmentFitsFinalBand !== false && <p className="mt-2 text-xs leading-6 text-muted-foreground">UIL’s alphabetical enrollment listing records a submitted conference of {program.uilSubmittedConference}; TexasDefined uses the final 2026–28 football alignment ({program.classification}) for competition placement.</p>}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={UIL_EXACT_ENROLLMENT_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official UIL alphabetical enrollment listing ↗</a>
              <a href={UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official UIL 2026–28 enrollment cutoffs ↗</a>
            </div>
            {(program.teaSchoolProfileUrl || program.teaDistrictProfileUrl || program.schoolWebsite || program.districtWebsite) && <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Official school research</p>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">Use Texas Education Agency and school-system sources for the current campus profile, district context and official contact information. AskTED is the source used to match this football program to the school and district records below.</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                {program.isdProfilePath && program.districtName && <a href={program.isdProfilePath} className="text-primary underline underline-offset-4">All {program.districtName} football programs →</a>}
                {program.teaSchoolProfileUrl && <a href={program.teaSchoolProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA school profile ↗</a>}
                {program.teaDistrictProfileUrl && <a href={program.teaDistrictProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA district profile ↗</a>}
                {program.schoolWebsite && <a href={program.schoolWebsite} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official school website ↗</a>}
                {program.districtWebsite && <a href={program.districtWebsite} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official district website ↗</a>}
              </div>
            </div>}
          </> : privateAlignment ? <div>
            <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              <Snapshot label="Association" value={privateAlignment.association} />
              <Snapshot label="Football division" value={privateAlignment.divisionLabel} />
              {privateAlignment.districtLabel && <Snapshot label="Football district" value={privateAlignment.districtLabel} />}
              {privateAlignment.footballType && <Snapshot label="Format" value={privateAlignment.footballType} />}
              <Snapshot label="Season / cycle" value={privateAlignment.seasonLabel} />
              <Snapshot label="Source type" value={privateAlignment.sourceKind === 'official-association' ? 'Official association' : 'Current secondary source'} />
            </dl>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Private-school football uses its association’s own alignment system. TAPPS divisions, SPC classes and TAIAO divisions are not equivalent to UIL 1A–6A classifications.
            </p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">Alignment checked {privateAlignment.verifiedAt}. {privateAlignment.sourceKind === 'official-association' ? 'This placement comes from the governing association.' : 'This placement is current but uses a secondary football source because the association’s embedded alignment is not directly machine-readable here.'}</p>
            <a href={privateAlignment.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{privateAlignment.sourceLabel} ↗</a>
          </div> : <>
            <div className="border-y border-border py-5">
              <p className="font-display text-2xl">{governingBodyHint ? [governingBodyHint, associationClassification].filter(Boolean).join(' ') : 'Non-UIL football program'}</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                This supplied school did not resolve to the current UIL football alignment. TexasDefined does not force private or non-UIL programs into a UIL classification. Association placement is shown only when it has been separately sourced.
              </p>
              {associationSourceUrl && <a href={associationSourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official association football source ↗</a>}
            </div>
          </>}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {countyPath && <a href={countyPath} className="text-primary">Open {schoolName === 'Katy' ? 'Fort Bend County' : schoolName === 'Abbott' ? 'Hill County' : program?.countyName} guide →</a>}
            {cityGuide && <a href={`/city/${cityGuide.slug}`} className="text-primary">Explore {cityGuide.name} city guide →</a>}
            {program && <a href="/find-my-school-district" className="text-primary">Verify a school district by address →</a>}
            {program?.sourceUrl && <a href={program.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary">Official UIL alignment ↗</a>}
          </div>
        </div>
      </section>

      {program && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Current district</p>
          <h2 className="mt-2 font-display text-3xl">{alignmentLabel(program)} · District {program.district}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{editorial?.notice
              ? "These schools share the published 2026–28 UIL district alignment. Because this program announced a 2026 season cancellation, this list is not a schedule of actual opponents or games."
              : "These are the other schools in the same 2026–28 UIL football district. Every opponent links to the same school-profile system."}</p>
          {districtPath && <a href={districtPath} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open full district guide →</a>}
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {districtPeers.map((peer) => <a key={peer.profilePath} href={peer.profilePath} className="group bg-background p-5 hover:bg-surface">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{alignmentLabel(peer)} · District {peer.district}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{peer.schoolName}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{peer.footballType} · Open profile →</p>
          </a>)}
        </div>
      </section>}

      {program && venueLinks.length > 0 && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Game venue</p>
          <h2 className="mt-2 font-display text-3xl">Football game venues</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Texas high schools often share district stadiums. A venue listed here is a sourced school or district football relationship, not a promise that every home game is played there. Confirm the current schedule before travel.</p>
        </div>
        <div className="space-y-5">
          {venueLinks.map((venue) => <article key={venue.venueSlug} className="border-t-2 border-foreground pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{venue.relationshipLabel}</p>
            <h3 className="mt-2 font-display text-3xl"><a href={venue.venuePath} className="hover:text-primary">{venue.venueName}</a></h3>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{venue.note}</p>
            <dl className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
              {venue.city && <Snapshot label="City" value={venue.city} />}
              {venue.capacity && <Snapshot label="Capacity" value={venue.capacity} />}
            </dl>
            {venue.parking && <p className="mt-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Parking:</strong> {venue.parking}</p>}
            {venue.arrival && <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Arrival:</strong> {venue.arrival}</p>}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={venue.venuePath} className="text-primary underline underline-offset-4">Open TexasDefined stadium guide →</a>
              <a href={venue.officialUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official venue source ↗</a>
            </div>
            {venue.verifiedAt && <p className="mt-3 text-xs text-muted-foreground">Venue details last reviewed <time dateTime={venue.verifiedAt}>{formatFootballDate(venue.verifiedAt)}</time>.</p>}
          </article>)}
        </div>
      </section>}

      {editorial?.venue && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">District venue context</p>
          <h2 className="mt-2 font-display text-3xl">{editorial.venue.name}</h2>
        </div>
        <div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
            <Snapshot label="Venue" value={editorial.venue.name} />
            <Snapshot label="Address" value={editorial.venue.address} />
          </dl>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">{editorial.venue.note}</p>
          <a href={editorial.venue.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">{editorial.venue.sourceLabel} ↗</a>
          <p className="mt-3 text-xs text-muted-foreground">Venue relationship reviewed <time dateTime={editorial.venue.verifiedAt}>{formatFootballDate(editorial.venue.verifiedAt)}</time>.</p>
        </div>
      </section>}

      {editorial?.development && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Program background</p>
          <h2 className="mt-2 font-display text-3xl">{editorial.development.title}</h2>
        </div>
        <div>
          <p className="max-w-4xl text-sm leading-7 text-muted-foreground">{editorial.development.body}</p>
          <a href={editorial.development.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">{editorial.development.sourceLabel} ↗</a>
          <p className="mt-3 text-xs text-muted-foreground">Source reviewed <time dateTime={editorial.development.verifiedAt}>{formatFootballDate(editorial.development.verifiedAt)}</time>.</p>
        </div>
      </section>}

      {((program && enrollmentLink) || (!program && privateAdmissions)) && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Enrollment & eligibility</p>
          <h2 className="mt-2 font-display text-3xl">School enrollment and football eligibility</h2>
        </div>
        <div>
          {program ? <PublicEnrollmentSteps schoolName={schoolName} districtName={program.districtName} enrollmentLink={enrollmentLink} /> : <NonUilEnrollmentSteps schoolName={schoolName} association={privateAlignment?.association ?? governingBodyHint} admissions={privateAdmissions} />}
          <div className="mt-6 border border-border p-5 text-sm leading-7 text-muted-foreground">
            <strong className="text-foreground">Football eligibility is a separate question from school admission.</strong> Being admitted, moving into a district or receiving a transfer does not by itself establish varsity eligibility. Confirm the student's facts directly with the school and the governing athletic association before relying on a move or transfer for football.
            {program && <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
              <a href={UIL_ELIGIBILITY_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL eligibility standards ↗</a>
              <a href={UIL_DETAILED_ELIGIBILITY_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL detailed eligibility rules ↗</a>
            </div>}
          </div>
        </div>
      </section>}

      {identity && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Mascot & identity</p>
          <h2 className="mt-2 font-display text-3xl">School identity</h2>
        </div>
        <div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
            <Snapshot label="Mascot" value={identity.mascot} />
            <Snapshot label="School colors" value={identity.colors || 'Not listed by the verified source'} />
          </dl>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">Identity last reviewed <time dateTime={identity.verifiedAt}>{formatFootballDate(identity.verifiedAt)}</time>. Mascot and colors appear only when TexasDefined has a named source it can cite; the source may be the school or district, UIL, or independently corroborated reporting.</p>
          <a href={identity.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{identity.sourceLabel} ↗</a>
        </div>
      </section>}

      {program?.allTimeHistory && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Program history</p>
          <h2 className="mt-2 font-display text-3xl">All-time UIL state-final record</h2>
        </div>
        <div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <Snapshot label="All-time state titles" value={String(program.allTimeHistory.stateTitles)} />
            <Snapshot label="All-time state finals" value={String(program.allTimeHistory.stateFinalAppearances)} />
            <Snapshot label="UIL table through" value={String(program.allTimeHistory.publishedThroughYear)} />
          </dl>
          {program.allTimeHistory.appearanceYears && <p className="mt-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">State-final appearance years:</strong> {schoolName === 'Benjamin' ? '2022 and 2023 — both 1A Division II state championships' : program.allTimeHistory.appearanceYears}</p>}
          {program.allTimeHistory.documentedCorrection && <p className="mt-3 border-l-4 border-foreground bg-surface p-4 text-sm leading-7 text-foreground"><strong>Championship source correction:</strong> {program.allTimeHistory.documentedCorrection.note} <a href={program.allTimeHistory.documentedCorrection.sourceUrl} className="font-semibold text-primary underline underline-offset-4" target="_blank" rel="noreferrer noopener">Read the official 2003 game recap ↗</a></p>}
          {program.allTimeHistory.supplementedFinals.length > 0 && <p className="mt-3 text-xs leading-6 text-muted-foreground">TexasDefined supplements UIL’s published all-time table with {program.allTimeHistory.supplementedFinals.length} newer completed {program.allTimeHistory.supplementedFinals.length === 1 ? 'state final' : 'state finals'} from the official UIL state archive.</p>}
          <a href={program.allTimeHistory.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">UIL all-time appearances ↗</a>
        </div>
      </section>}

      {program?.recentHistory && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Recent championship context</p>
          <h2 className="mt-2 font-display text-3xl">UIL state-final history</h2>
        </div>
        <div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <Snapshot label="Titles, 2018–19 to 2025–26" value={String(program.recentHistory.stateTitles)} />
            <Snapshot label="State finals" value={String(program.recentHistory.stateFinalAppearances)} />
            <Snapshot label="Most recent final" value={program.recentHistory.mostRecentFinalSeason || '—'} />
          </dl>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {program.recentHistory.finals.map((final) => <div key={`${final.season}-${final.conference}-${final.result}`} className="grid gap-1 py-4 text-sm sm:grid-cols-3">
              <span className="font-semibold">{final.season}</span>
              <span>{final.result}</span>
              <span className="text-muted-foreground">{final.conference} · vs. {final.opponent} · {final.score}</span>
            </div>)}
          </div>
          <a href={program.recentHistory.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">UIL state archives ↗</a>
        </div>
      </section>}



      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Football FAQ</p>
          <h2 className="mt-2 font-display text-3xl">{displayName} football questions</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faq.map((item) => <article key={item.question} className="py-5">
            <h3 className="font-display text-2xl">{item.question}</h3>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">{renderFootballFaqAnswer(item.answer)}</p>
          </article>)}
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Source trail</p>
          <h2 className="mt-2 font-display text-3xl">Where this profile gets its facts</h2>
        </div>
        <div>
          <p className="max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined separates current competition data from school identity, enrollment, venue and live-season sources so one stale source cannot silently control the whole profile.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {program?.sourceUrl && <a href={program.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL alignment source ↗</a>}
            {program?.teaSchoolProfileUrl && <a href={program.teaSchoolProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA school profile ↗</a>}
            {program?.teaDistrictProfileUrl && <a href={program.teaDistrictProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA district profile ↗</a>}
            {identity && <a href={identity.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">School identity source ↗</a>}
            {privateAlignment && <a href={privateAlignment.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Association alignment source ↗</a>}
            {editorial?.coach && <a href={editorial.coach.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Coach source ↗</a>}
            {editorial?.campus && <a href={editorial.campus.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Campus source ↗</a>}
            {editorial?.schedule && <a href={editorial.schedule.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Team schedule source ↗</a>}
            {editorial?.season && <a href={editorial.season.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Season snapshot source ↗</a>}
            {editorial?.venue && <a href={editorial.venue.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Team venue source ↗</a>}
            {venueLinks.map((venue) => <a key={venue.officialUrl} href={venue.officialUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{venue.venueName} source ↗</a>)}
            <a href="https://www.uiltexas.org/maxpreps/" target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL Texas Scoreboard ↗</a>
          </div>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">Schedules, coaching staffs, attendance boundaries and venue assignments can change within a season. Use the dated school or district source when a decision depends on current information.</p>
        </div>
      </section>

      <section className="py-10">
        <p className="eyebrow text-primary">Keep researching</p>
        <h2 className="mt-2 font-display text-3xl">Put {displayName} in the statewide football picture</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Related href="/texas-high-school-football-teams" title="All 1,268 UIL programs" body="Browse every current UIL football school, ordered from 6A through 1A, or search by school, ISD, city or county." />
          <Related href="/article/texas-high-school-football-scores-schedules" title="Current scores & schedules" body="Use the UIL Texas Scoreboard plus school sources for current results, weekly schedules and final game-day verification." />
          <Related href="/article/texas-high-school-football-classifications-1a-6a" title="How 1A through 6A work" body="Understand enrollment classifications, divisions, districts and realignment." />
          <Related href="/article/texas-high-school-football-playoffs-explained" title="How the playoffs work" body="Follow district qualification, bi-district and the state bracket." />
          <Related href="/texas-high-school-football-championship-history" title="UIL championship history" body="Compare all-time state titles and state-final appearances for current UIL programs using official UIL history sources." />
          {(program?.footballType === '6-Man' || privateAlignment?.footballType === '6-Man') && <Related href="/article/texas-six-man-football-rules-explained" title="Six-man football rules" body="Understand the field, first-down distance, exchange rule, scoring and mercy rule." />}
          <Related href="/sports-venues/high-school-football" title="Texas football stadiums" body="Browse venue guides and game-day planning information." />
          <Related href="/sports/friday-night-lights" title="Friday Night Lights, Defined" body="Explore the wider culture, traditions and season around Texas high school football." />
        </div>

      </section>
    </article>
  </Container>;
}

function PublicEnrollmentSteps({
  schoolName,
  districtName,
  enrollmentLink,
}: {
  schoolName: string;
  districtName?: string;
  enrollmentLink?: {
    enrollmentUrl: string;
    sourceLabel: string;
    verifiedAt: string;
    schoolYear?: string;
  } | null;
}) {
  const district = districtName || 'the school district';
  const steps = [
    ['Confirm the school assignment', `Use an official district boundary or campus-assignment tool to confirm that the residence is served by ${schoolName}. A city name or ZIP code is not enough.`],
    ['Use the district’s current registration process', `Complete enrollment through ${district}'s official new-student process and verify the assigned campus directly with the district.`],
    ['Verify football eligibility separately', 'Enrollment, transfer approval and varsity eligibility are different decisions. Ask the school athletic office how UIL residency, transfer and previous-participation rules apply to the student.'],
  ];
  if (!enrollmentLink) return null;
  return <>
    <div className="mb-6 border border-border p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Official district enrollment</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        District enrollment source last reviewed <time dateTime={enrollmentLink.verifiedAt}>{formatFootballDate(enrollmentLink.verifiedAt)}</time>{enrollmentLink.schoolYear ? ` for the ${enrollmentLink.schoolYear} school year` : ''}. Use the district page for current forms, deadlines and required documents.
      </p>
      <a href={enrollmentLink.enrollmentUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
        Start with {enrollmentLink.sourceLabel} ↗
      </a>
    </div>
    <StepList steps={steps} />
  </>;
}

function NonUilEnrollmentSteps({
  schoolName,
  association,
  admissions,
}: {
  schoolName: string;
  association?: string;
  admissions?: {
    admissionsUrl: string;
    sourceLabel: string;
    verifiedAt: string;
    applicationCycle?: string;
  } | null;
}) {
  const steps = [
    ['Use the school’s official admissions process', `Start with ${schoolName}'s admissions office for current dates, requirements, availability and fees.`],
    ['Confirm the current football program', `Verify that the school is fielding football in the intended season and confirm its current ${association ?? 'athletic association'} placement and schedule.`],
    ['Verify athletic eligibility separately', 'Admission does not automatically establish athletic eligibility. Ask the school how transfer, age, residence, prior participation and association rules apply to the student.'],
  ];
  return <>
    {admissions && <div className="mb-6 border border-border p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Official school admissions</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        TexasDefined verified this school admissions source on <time dateTime={admissions.verifiedAt}>{formatFootballDate(admissions.verifiedAt)}</time>{admissions.applicationCycle ? ` for the ${admissions.applicationCycle} application cycle` : ''}. Use the school page for current application dates, requirements, availability and fees.
      </p>
      <a href={admissions.admissionsUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
        Start with {admissions.sourceLabel} ↗
      </a>
    </div>}
    <StepList steps={steps} />
  </>;
}

function StepList({ steps }: { steps: Array<[string, string]> }) {
  return <ol className="divide-y divide-border border-y border-border">
    {steps.map(([title, body], index) => <li key={title} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
      <span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span>
      <div><h3 className="font-display text-xl">{title}</h3><p className="mt-1 text-sm leading-7 text-muted-foreground">{body}</p></div>
    </li>)}
  </ol>;
}

function ReportedFormIllustration({
  schoolName,
  games,
  sourceUrl,
  accent,
}: {
  schoolName: string;
  games: Array<{ date: string; opponent: string; district?: boolean; result?: string }>;
  sourceUrl: string;
  accent: string;
}) {
  // Only source-attributed game results and administrative awards; unreported or cancelled
  // fixtures cannot be presented as played. Forfeits are expressly labeled as non-played.
  const finals = games.filter((game) => /^[WLT] /.test(game.result || ''));
  if (finals.length === 0) return null;
  return <figure className="mt-6 border border-border bg-surface p-4 sm:p-6" aria-label={schoolName + ': dated visual timeline of reported 2026 football finals'}>
    <figcaption className="mb-4">
      <span className="text-xs font-semibold uppercase text-muted-foreground">2026 results · visual snapshot</span>
      <p className="mt-2 font-display text-xl font-semibold text-surface-foreground">The games behind the record</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">Original TexasDefined source-derived graphic. W = win, L = loss, T = tie. Any expressly labeled forfeit is an awarded administrative outcome, not a played score. Not a live scoreboard or certified district standings.</p>
    </figcaption>
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {finals.map((game) => {
        const outcome = game.result?.[0] || '';
        const label = outcome === 'W' ? 'Win' : outcome === 'L' ? 'Loss' : 'Tie';
        return <li key={game.date + '-' + game.opponent} className="min-w-0 border border-border border-l-4 bg-background p-2" style={{ borderLeftColor: accent }} aria-label={game.date + ', ' + label + ' against ' + game.opponent + ', ' + game.result}>
          <div className="flex items-center justify-between gap-1">
            <span className="font-display text-2xl font-semibold text-foreground">{outcome}</span>
            <span className="text-xs font-semibold text-muted-foreground">{game.date.slice(5)}</span>
          </div>
          <p className="mt-1 break-words text-xs font-semibold leading-5 text-foreground">{game.opponent}</p>
          <p className="mt-1 break-words text-xs tabular-nums text-muted-foreground">{game.result?.slice(2)}{game.district ? ' · District' : ''}</p>
        </li>;
      })}
    </ol>
    <p className="mt-4 text-xs leading-5 text-muted-foreground">Shows source-reported completed and awarded outcomes entered into this school record. Forfeits are labeled, not actual played scores; scheduled, cancelled and unverified games are excluded. <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Review the cited results source ↗</a></p>
  </figure>;
}

function FootballIdentityPanel({
  footballName,
  alignment,
  footballType,
  mascot,
  accentHex,
}: {
  footballName: string;
  alignment: string;
  footballType?: string;
  mascot?: string;
  accentHex?: string;
}) {
  return (
    <figure className="min-w-0">
      <div
        className="relative overflow-hidden border border-border bg-foreground text-background"
        style={accentHex ? { minHeight: 240, borderTopWidth: 6, borderTopColor: accentHex } : { minHeight: 240, borderTopWidth: 6 }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 640 360"
          className="absolute inset-0 h-full w-full" style={{ opacity: 0.2 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="640" height="360" fill="currentColor" opacity="0.06" />
          {Array.from({ length: 11 }, (_, index) => {
            const x = 20 + index * 60;
            return <line key={x} x1={x} x2={x} y1="24" y2="336" stroke="currentColor" strokeWidth="2" />;
          })}
          <line x1="20" x2="620" y1="180" y2="180" stroke="currentColor" strokeWidth="4" />
          <rect x="20" y="24" width="600" height="312" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="320" cy="180" r="54" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
        <div className="relative flex flex-col justify-between p-6" style={{ minHeight: 240 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-background">TexasDefined football profile</p>
          <div>
            <p className="max-w-3xl font-display text-3xl leading-tight">{footballName}</p>
            <div className="mt-4 flex flex-wrap gap-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] text-background">
              <span>{alignment}</span>
              {footballType && <span>{footballType}</span>}
              {mascot && <span>Verified mascot: {mascot}</span>}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
        Original TexasDefined field graphic. No school logo, mascot artwork or school-owned photograph is reproduced.
      </figcaption>
    </figure>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{label}</dt><dd className="mt-2 font-semibold">{value}</dd></div>;
}

function Related({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}

const FOOTBALL_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatFootballDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : FOOTBALL_DATE_FORMATTER.format(date);
}

function alignmentLabel(program: { classification: string; division: 1 | 2 | null }) {
  return program.division ? `${program.classification} Division ${program.division === 1 ? 'I' : 'II'}` : program.classification;
}

function privateAlignmentLabel(alignment: { association: string; divisionLabel: string; districtLabel?: string }) {
  return `${alignment.association} ${alignment.divisionLabel}${alignment.districtLabel ? ` · ${alignment.districtLabel}` : ''}`;
}

function countySlug(value: string) {
  return value
    .replace(/\s+County$/i, '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
