import type { FootballProgramEditorial } from './program-editorial';

// Source-specific Earth Springlake six-man guide; not production certified.
const EARTH: FootballProgramEditorial = {
  slug: 'earth-springlake',
  intro: 'Springlake-Earth ISD operates the Wolverines athletics program in Earth, Lamb County. UIL assigns Earth Springlake to 2026–28 Conference 1A Division I six-man football District 2, alongside Nazareth, Whiteface and Whitharral. Six-man alignment must not be described as eleven-man football.',
  theme: { accentHex: '#476781', label: 'Original TexasDefined accent; not a school mark, official color or licensed photo.' },
  seo: { title: 'Springlake-Earth Wolverines Football | 2026 Six-Man District 2', description: 'Independent Springlake-Earth six-man football guide: UIL District 2 peers, school-operated schedule and roster links, and game-day verification.' },
  campus: {
    address: '472 FM 302, Earth, TX 79031',
    sourceUrl: 'https://www.springlake-earth.org/',
    sourceLabel: 'Springlake-Earth ISD official district site; district contact address',
    verifiedAt: '2026-11-08'
  },
  schedule: {
    label: 'Check the Wolverines football schedule and roster through district athletics',
    sourceUrl: 'https://www.springlake-earth.org/athletics.html',
    sourceLabel: 'Springlake-Earth ISD official athletics page with football schedule and roster links',
    verifiedAt: '2026-11-08'
  },
  notice: {
    title: 'Six-man format and game venue matter',
    body: 'UIL lists the Wolverines in six-man Division I, District 2. The district office contact address is not a verified stadium gate. Check each fixture and host before traveling.',
    sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/1AD1FB2026.pdf',
    sourceLabel: 'Official UIL six-man football alignment',
    verifiedAt: '2026-11-08'
  },
  overview: [
    'The Wolverines represent Springlake-Earth ISD in Lamb County, not a conventional eleven-player program. The 2026–28 UIL alignment assigns Earth Springlake to Conference 1A Division I six-man football District 2.',
    'Nazareth, Whiteface and Whitharral share the UIL district. These are scheduled district peers by alignment, not a claim that any particular matchup was completed or a win-loss record was established.',
    'The district athletics page separates football schedule, roster and summer workout links from other sports. Its football coaching column names Shawn Harrison as athletic director, Juan Salas as head coach and Kin Falkenbury as assistant coach. These are positions listed on the school-operated page as reviewed in November 2026, not a guarantee of appointments for every future season.',
    'The district contact address is 472 FM 302 in Earth. Region 17 ESC lists PO Box 130, Earth, TX 79031 as the district’s mailing address; a post-office box is never a physical campus or stadium entrance. Other online directories give different street addresses, so spectators should use the host game announcement rather than assume a general district address identifies the field.',
    'No score, standings, ticket price, seating accessibility, parking rule or licensed school image is inferred from an unsourced listing; named school-operated coaching roles remain subject to subsequent staff changes.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL six-man District 2', body: 'Earth Springlake joins Nazareth, Whiteface and Whitharral in Conference 1A Division I six-man football District 2.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/1AD1FB2026.pdf', sourceLabel: 'UIL official six-man football alignment' },
    { date: '2026', title: 'District football schedule and roster sources', body: 'The Springlake-Earth athletics page links a football schedule and roster separately from other sports.', sourceUrl: 'https://www.springlake-earth.org/athletics.html', sourceLabel: 'Springlake-Earth ISD athletics' },
    { date: '2026-11', title: 'School-operated football coaching roles', body: 'The athletics page identifies Shawn Harrison as athletic director, Juan Salas as head football coach, and Kin Falkenbury as football assistant coach; recheck these appointments for a future season.', sourceUrl: 'https://www.springlake-earth.org/athletics.html', sourceLabel: 'Official athletics staff listing' },
    { date: '2026-11', title: 'Mailing address distinguished from venue', body: 'ESC Region 17 publishes PO Box 130 for Springlake-Earth ISD in Earth; this is a postal contact rather than a physical campus or football field.', sourceUrl: 'https://www.esc17.net/page/district.springlakeearth', sourceLabel: 'Official Region 17 education service directory' }
  ],
  faq: [
    { question: 'Is Springlake-Earth eleven-man or six-man football?', answer: 'UIL lists Earth Springlake in 2026–28 Conference 1A Division I six-man football.' },
    { question: 'Who shares the 2026 football district?', answer: 'UIL District 2 includes Earth Springlake, Nazareth, Whiteface and Whitharral.' },
    { question: 'Where can I find the official Wolverines football schedule?', answer: 'Use the school-operated football links at https://www.springlake-earth.org/athletics.html and check the current host for changes.' },
    { question: 'Is 472 FM 302 the stadium entrance?', answer: 'No stadium entrance is established by the district contact address; ESC Region 17 also provides a mailing-only PO Box 130. Verify the host venue, ticketing and accessible entrance for the specific game.' },
    { question: 'Who is listed as head coach of Springlake-Earth football?', answer: 'The district football athletics column lists Juan Salas as head coach, Shawn Harrison as athletic director and Kin Falkenbury as assistant coach. Confirm whether roles have changed before relying on the list for a later season.' }
  ]
};
export function getBatch016EarthEditorial(slug: string): FootballProgramEditorial | undefined { return slug === 'earth-springlake' ? EARTH : undefined; }
