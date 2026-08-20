import type { TexasKnowledgeRecord, TexasSocialFormat, TexasSocialPost } from './types';

const headlineFor = (format: TexasSocialFormat) => {
  switch (format) {
    case 'fact-of-the-day': return 'Texas Fact of the Day';
    case 'you-know-youre-a-texan-if': return "You know you're a Texan if…";
    case 'only-texans-understand': return 'Only Texans understand…';
    case 'texas-trivia': return 'Texas Trivia';
    case 'true-or-false': return 'True or False — Texas Edition';
    case 'this-or-that': return 'Texas This or That';
    case 'finish-the-sentence': return 'Finish the sentence';
    case 'texas-by-the-numbers': return 'Texas by the Numbers';
    case 'county-of-the-day': return 'Texas County of the Day';
    case 'town-of-the-day': return 'Texas Town of the Day';
    case 'wildlife-of-the-day': return 'Texas Wildlife of the Day';
    case 'wildflower-of-the-day': return 'Texas Wildflower of the Day';
    case 'food-fight': return 'Texas Food Fight';
    case 'tag-a-texan': return 'Tag a Texan';
  }
};

function renderBody(record: TexasKnowledgeRecord, format: TexasSocialFormat) {
  switch (format) {
    case 'you-know-youre-a-texan-if':
      return record.verification === 'editorial-observation'
        ? record.statement.replace(/^Texans often /i, '').replace(/\.$/, '') + '.'
        : record.statement;
    case 'only-texans-understand':
      return record.statement;
    case 'texas-trivia':
      return `How well do you know Texas? ${record.subject}: what do you know before you reveal the answer?\n\nAnswer: ${record.statement}`;
    case 'true-or-false':
      return `${record.statement}\n\nTrue or false?`;
    case 'finish-the-sentence':
      return `You know you're in Texas when ________.\n\nOur take: ${record.statement}`;
    case 'this-or-that':
      return `${record.subject}: which side are you on? Tell us why.`;
    case 'county-of-the-day':
      return `${record.subject}\n\n${record.statement}`;
    case 'town-of-the-day':
      return `${record.subject}\n\n${record.statement}`;
    case 'wildlife-of-the-day':
      return `${record.subject}\n\n${record.statement}\n\nWould you know what to do if you saw one?`;
    case 'wildflower-of-the-day':
      return `${record.subject}\n\n${record.statement}\n\nHave you seen these blooming this year?`;
    case 'food-fight':
      return `${record.statement}\n\nTexas, settle this one in the comments.`;
    case 'tag-a-texan':
      return `${record.statement}\n\nTag the Texan this describes perfectly.`;
    case 'texas-by-the-numbers':
    case 'fact-of-the-day':
    default:
      return record.statement;
  }
}

export function renderTexasSocialPost(record: TexasKnowledgeRecord, format: TexasSocialFormat): TexasSocialPost {
  if (!record.socialReady) throw new Error(`Knowledge record ${record.id} is not approved for social use.`);
  if (record.socialFormats?.length && !record.socialFormats.includes(format)) {
    throw new Error(`Social format ${format} is not approved for ${record.id}.`);
  }

  return {
    recordId: record.id,
    format,
    text: `${headlineFor(format)}\n\n${renderBody(record, format)}`,
    linkPath: record.articlePath,
    imageQuery: record.imageQuery,
  };
}

export function renderAllApprovedSocialVariants(record: TexasKnowledgeRecord) {
  return (record.socialFormats ?? []).map((format) => renderTexasSocialPost(record, format));
}

export function selectUnusedSocialRecords(records: TexasKnowledgeRecord[], limit = 10) {
  return records
    .filter((record) => record.socialReady)
    .sort((a, b) => {
      const uses = (a.usage?.timesUsed ?? 0) - (b.usage?.timesUsed ?? 0);
      if (uses !== 0) return uses;
      return (a.usage?.lastUsedAt ?? '').localeCompare(b.usage?.lastUsedAt ?? '');
    })
    .slice(0, limit);
}
