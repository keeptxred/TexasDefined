import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isTexasDefinedDirectEditorialSource } from './texasdefined-editorial-source-eligibility.mjs';

const article = {
  title: "New Texas nature center opens visitor trails",
  link: "https://www.example.org/news/texas-nature-center",
};

test('permits ordinary direct publisher stories', () => {
  assert.equal(isTexasDefinedDirectEditorialSource(article), true);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://www.kxan.com/news/texas/parks/' }), true);
});

test('does not treat Google News discovery or government clipping as an original publisher', () => {
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://news.google.com/rss/articles/abc' }), false);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'http://www.lrl.state.tx.us/cl.cfm?id=454959' }), false);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://lrl.texas.gov/currentIssues/clips/abc' }), false);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, link: 'https://capitol.texas.gov/BillLookup/History.aspx?LegSess=891' }), true);
});

test('blocks policy boilerplate and transient sports tickers without blocking useful reporting', () => {
  for (const title of ['Privacy Policy 2026', 'Updated Cookie Policy', 'Terms of Use',
    'Week 8 live scores', 'BGC Scores and Schedule: Week 8, 2026', 'Football live updates',
    'High School Football Scoreboard']) {
    assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title }), false, title);
  }
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title: 'Historic Muny Golf Course nears ownership agreement' }), true);
  assert.equal(isTexasDefinedDirectEditorialSource({ ...article, title: 'SMU announces future lacrosse program' }), true);
});
