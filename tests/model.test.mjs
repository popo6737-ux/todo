import test from 'node:test';
import assert from 'node:assert/strict';
import { CANDIDATES, DEFAULTS, calculate, rankCandidates } from '../src/model.js';

test('8 people / 1.6m budget totals, per person and remaining calculate', () => {
  const result = calculate(CANDIDATES[0], DEFAULTS);
  assert.equal(result.total, 1470000);
  assert.equal(result.perPerson, 183750);
  assert.equal(result.remaining, 130000);
  assert.equal(result.capacity, 10);
});

test('changing whole-home price and people recalculates costs', () => {
  const result = calculate(CANDIDATES[0], { ...DEFAULTS, people: 7, overrides: { conversation: { roomUnit: 300000 } } });
  assert.equal(result.capacity, 10);
  assert.equal(result.items.stay, 300000);
  assert.equal(result.items.meals, 595000);
  assert.equal(result.total, 1235000);
  assert.equal(result.perPerson, 176429);
});

test('recommendation requires two confirmed en-suite bathrooms by default', () => {
  assert.equal(rankCandidates(DEFAULTS)[0].candidate.id, 'value');
  assert.deepEqual(rankCandidates(DEFAULTS).filter(x => x.fits).map(x => x.candidate.id), ['value']);
  assert.equal(rankCandidates({ ...DEFAULTS, privateRooms: false, priority: 'team' })[0].candidate.id, 'conversation');
  assert.equal(rankCandidates({ ...DEFAULTS, privateRooms: false, priority: 'budget' })[0].candidate.id, 'recharge');
  assert.equal(rankCandidates({ ...DEFAULTS, budget: 1000000 })[0].fits, false);
  assert.equal(rankCandidates({ ...DEFAULTS, people: 9 })[0].fits, false);
});

test('every candidate keeps Day 1 hike and Day 2 optional sales meeting', () => {
  for (const candidate of CANDIDATES) {
    assert.match(candidate.day1.map(([,item]) => item).join(' '), /울산바위 왕복 등반/);
    assert.doesNotMatch(candidate.day1.map(([,item]) => item).join(' '), /세일즈 자료 미팅/);
    assert.match(candidate.day2.map(([,item]) => item).join(' '), /선택: 세일즈 자료 미팅/);
    assert.match(candidate.day2.map(([,item]) => item).join(' '), /점심/);
    assert.match(candidate.day2.map(([,item]) => item).join(' '), /산책/);
  }
});
