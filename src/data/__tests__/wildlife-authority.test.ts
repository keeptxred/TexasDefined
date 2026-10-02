import assert from 'node:assert/strict';
import test from 'node:test';
import { TEXAS_WILDLIFE_SPECIES } from '../knowledge-graph/wildlife-species';
import { WILDLIFE_CORE_PROFILES } from '../wildlife-authority-core';
import { WILDLIFE_MAMMAL_PROFILES } from '../wildlife-authority-mammals';
import { WILDLIFE_BIRD_REPTILE_PROFILES } from '../wildlife-authority-birds-reptiles';

const profiles = {
  ...WILDLIFE_CORE_PROFILES,
  ...WILDLIFE_MAMMAL_PROFILES,
  ...WILDLIFE_BIRD_REPTILE_PROFILES,
};

test('every current wildlife species has a bespoke authority profile', () => {
  const missing = TEXAS_WILDLIFE_SPECIES.map((species) => species.slug).filter((slug) => !profiles[slug]);
  assert.deepEqual(missing, []);
  assert.equal(Object.keys(profiles).length, TEXAS_WILDLIFE_SPECIES.length);
});

test('every wildlife authority profile has substantive sections and FAQs', () => {
  for (const species of TEXAS_WILDLIFE_SPECIES) {
    const profile = profiles[species.slug];
    assert.ok(profile, `${species.slug} is missing a profile`);
    assert.ok(profile.intro.length >= 2, `${species.slug} needs at least two intro paragraphs`);
    assert.ok(profile.sections.length >= 5, `${species.slug} needs at least five substantive sections`);
    assert.ok(profile.answers.length >= 4, `${species.slug} needs at least four species-specific FAQs`);
    assert.ok(profile.sections.every((section) => section.body.length >= 2), `${species.slug} has a thin section`);
  }
});
