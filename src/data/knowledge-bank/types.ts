export type TexasKnowledgeKind =
  | 'verified-fact'
  | 'cultural-observation'
  | 'tradition'
  | 'slang'
  | 'food'
  | 'history'
  | 'geography'
  | 'wildlife'
  | 'weather'
  | 'law'
  | 'record'
  | 'oddity'
  | 'county-fact'
  | 'town-fact'
  | 'you-know-youre-texan'
  | 'this-or-that'
  | 'trivia-question'
  | 'poll';

export type TexasKnowledgeDomain =
  | 'culture'
  | 'home'
  | 'hurricanes'
  | 'pools'
  | 'pests'
  | 'snakes'
  | 'wildlife'
  | 'birds'
  | 'flowers'
  | 'history'
  | 'food'
  | 'places'
  | 'counties'
  | 'towns'
  | 'weather'
  | 'outdoors';

export type TexasKnowledgeSource = {
  sourceId: string;
  url: string;
  authority: string;
  checkedAt: string;
};

export type TexasKnowledgeRecord = {
  id: string;
  kind: TexasKnowledgeKind;
  domain: TexasKnowledgeDomain;
  subject: string;
  statement: string;
  explanation?: string;
  region?: string;
  countySlug?: string;
  townSlug?: string;
  season?: 'spring' | 'summer' | 'fall' | 'winter' | 'year-round' | 'storm-season';
  tags: string[];
  sources: TexasKnowledgeSource[];
  verification: 'verified' | 'editorial-observation' | 'needs-review';
  verifiedAt?: string;
  evergreen: boolean;
  socialReady: boolean;
  articlePath?: string;
  relatedEntityIds?: string[];
  imageQuery?: string;
  socialFormats?: TexasSocialFormat[];
  usage?: {
    timesUsed: number;
    lastUsedAt?: string;
  };
};

export type TexasSocialFormat =
  | 'fact-of-the-day'
  | 'you-know-youre-a-texan-if'
  | 'only-texans-understand'
  | 'texas-trivia'
  | 'true-or-false'
  | 'this-or-that'
  | 'finish-the-sentence'
  | 'texas-by-the-numbers'
  | 'county-of-the-day'
  | 'town-of-the-day'
  | 'wildlife-of-the-day'
  | 'wildflower-of-the-day'
  | 'food-fight'
  | 'tag-a-texan';

export type TexasSocialPost = {
  recordId: string;
  format: TexasSocialFormat;
  text: string;
  linkPath?: string;
  imageQuery?: string;
};
