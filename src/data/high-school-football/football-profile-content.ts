export type FootballProfileContentInput = {
  displayName: string;
  program?: {
    classification: string;
    division: 1 | 2 | null;
    district: number;
    footballType?: string;
    uilEnrollment?: number;
    districtName?: string;
    city?: string;
    countyName?: string;
  } | null;
  identity?: {
    mascot: string;
    colors?: string;
  } | null;
  privateAlignment?: {
    association: string;
    divisionLabel: string;
    districtLabel?: string;
    footballType?: string;
  } | null;
  venueLinks?: Array<{
    venueName: string;
  }>;
  editorial?: {
    coach?: { name: string };
    campus?: { address: string };
    venue?: { name: string; address: string };
    schedule?: { label: string };
    faq?: Array<{ question: string; answer: string }>;
  } | null;
};

export type FootballProfileQuickFact = {
  label: string;
  value: string;
};

export type FootballProfileFaq = {
  question: string;
  answer: string;
};

export function footballProfileAlignmentLabel(input: FootballProfileContentInput) {
  const { program, privateAlignment } = input;
  if (program) {
    return program.division
      ? `${program.classification} Division ${program.division === 1 ? 'I' : 'II'} · District ${program.district}`
      : `${program.classification} · District ${program.district}`;
  }
  if (privateAlignment) {
    return `${privateAlignment.association} ${privateAlignment.divisionLabel}${privateAlignment.districtLabel ? ` · ${privateAlignment.districtLabel}` : ''}`;
  }
  return 'Association placement not yet verified';
}

export function buildFootballProfileSummary(input: FootballProfileContentInput) {
  const { displayName, program, identity, privateAlignment, editorial } = input;
  const team = identity?.mascot ? `${displayName} ${identity.mascot}` : displayName;

  if (program) {
    const alignment = footballProfileAlignmentLabel(input);
    const place = [program.city, program.countyName].filter(Boolean).join(', ');
    const enrollment = program.uilEnrollment
      ? ` UIL reports ${program.uilEnrollment.toLocaleString('en-US')} students for the 2026–28 realignment snapshot.`
      : '';
    const coach = editorial?.coach ? ` The current sourced head coach is ${editorial.coach.name}.` : '';
    return `${team} football competes in ${alignment}${place ? ` from ${place}` : ''}.${enrollment}${coach} This page ties the current UIL placement to school, district, venue, history and schedule sources. Classification is not a quality ranking.`;
  }

  if (privateAlignment) {
    const coach = editorial?.coach ? ` The current sourced head coach is ${editorial.coach.name}.` : '';
    return `${team} football is tracked under ${footballProfileAlignmentLabel(input)}.${coach} Private-school association divisions are shown on their own terms rather than being forced into UIL 1A–6A classifications.`;
  }

  return `${team} football has a TexasDefined profile, but a current association placement is shown only when it can be sourced. Use the school and governing-association links on this page for current season verification.`;
}

export function buildFootballProfileQuickFacts(input: FootballProfileContentInput): FootballProfileQuickFact[] {
  const { displayName, program, identity, privateAlignment, venueLinks = [], editorial } = input;
  const facts: FootballProfileQuickFact[] = [{ label: 'Program', value: identity?.mascot ? `${displayName} ${identity.mascot}` : displayName }];

  if (program) {
    facts.push({ label: 'Current alignment', value: footballProfileAlignmentLabel(input) });
    if (program.districtName) facts.push({ label: 'School district', value: program.districtName });
    if (program.city || program.countyName) facts.push({ label: 'Location', value: [program.city, program.countyName].filter(Boolean).join(' · ') });
    if (program.uilEnrollment) facts.push({ label: 'UIL enrollment', value: program.uilEnrollment.toLocaleString('en-US') });
    if (program.footballType) facts.push({ label: 'Football format', value: program.footballType });
  } else if (privateAlignment) {
    facts.push({ label: 'Current alignment', value: footballProfileAlignmentLabel(input) });
    if (privateAlignment.footballType) facts.push({ label: 'Football format', value: privateAlignment.footballType });
  }

  if (identity?.colors) facts.push({ label: 'School colors', value: identity.colors });
  if (editorial?.coach) facts.push({ label: 'Head coach', value: editorial.coach.name });
  const venue = editorial?.venue?.name || venueLinks[0]?.venueName;
  if (venue) facts.push({ label: 'Sourced football venue', value: venue });

  return facts.slice(0, 9);
}

export function buildFootballProfileFaq(input: FootballProfileContentInput): FootballProfileFaq[] {
  const { displayName, program, identity, privateAlignment, venueLinks = [], editorial } = input;
  const items: FootballProfileFaq[] = [];

  if (program) {
    items.push({
      question: `What classification is ${displayName} football in for 2026–28?`,
      answer: `${displayName} is in ${footballProfileAlignmentLabel(input)} for the current UIL 2026–28 football alignment.`,
    });
    items.push({
      question: `What football district is ${displayName} in?`,
      answer: `${displayName} is assigned to UIL District ${program.district} in ${program.division ? `${program.classification} Division ${program.division === 1 ? 'I' : 'II'}` : program.classification} for the 2026–28 alignment cycle.`,
    });
    if (program.uilEnrollment) {
      items.push({
        question: `What enrollment does UIL list for ${displayName}?`,
        answer: `UIL's 2026–28 realignment enrollment snapshot lists ${program.uilEnrollment.toLocaleString('en-US')} students for this program. It is not a live daily campus count, and the final football alignment shown on this page is the authoritative competition placement when that placement differs from the standard enrollment band.`,
      });
    }
    if (program.districtName) {
      items.push({
        question: `What school district is ${displayName} in?`,
        answer: `TexasDefined's TEA AskTED match places ${displayName} in ${program.districtName}. Families should still verify attendance-zone assignment for a specific address with the district.`,
      });
    }
  } else if (privateAlignment) {
    items.push({
      question: `What association does ${displayName} football compete in?`,
      answer: `${displayName} is tracked in ${footballProfileAlignmentLabel(input)}. This association alignment is not equivalent to a UIL 1A–6A classification.`,
    });
  }

  if (identity?.mascot) {
    items.push({
      question: `What is the ${displayName} mascot?`,
      answer: `${displayName}'s verified school identity is the ${identity.mascot}${identity.colors ? `, with ${identity.colors} listed as the school colors` : ''}.`,
    });
  }

  const venue = editorial?.venue?.name || venueLinks[0]?.venueName;
  if (venue) {
    items.push({
      question: `Where does ${displayName} play football?`,
      answer: `${venue} is a sourced football venue associated with ${displayName} or its school district. Because Texas districts can share stadiums, confirm the venue on the current game schedule before travel.`,
    });
  }

  if (editorial?.coach) {
    items.push({
      question: `Who is the ${displayName} football head coach?`,
      answer: `The current school-source entry used by TexasDefined lists ${editorial.coach.name} as the head football coach.`,
    });
  }

  items.push({
    question: `Where can I verify the current ${displayName} football schedule and scores?`,
    answer: editorial?.schedule
      ? `Use the school-published ${editorial.schedule.label} linked on this page, then confirm scores through the UIL Texas Scoreboard and current school athletics information.`
      : 'Use the UIL Texas Scoreboard and the school or district athletics source linked on this page. Game dates, kickoff times and venues can change during the season.',
  });

  const merged = [...(editorial?.faq ?? []), ...items];
  const seen = new Set<string>();
  return merged.filter((item) => {
    const key = item.question.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 8);
}
