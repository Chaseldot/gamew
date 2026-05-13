import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createInitialState,
  createRng,
  performCheck,
  useSkill,
  enemyTurn,
  resolveEnding,
} from '../src/game-state.js';

test('requires exactly three prelude flags before starting the slice', () => {
  assert.throws(
    () => createInitialState(['savedVillage', 'mechanismMap']),
    /exactly 3/,
  );
  assert.throws(
    () => createInitialState(['savedVillage', 'mechanismMap', 'heartTune', 'stoleLedger']),
    /exactly 3/,
  );

  const state = createInitialState(['savedVillage', 'mechanismMap', 'heartTune']);

  assert.deepEqual(state.preludeFlags, ['savedVillage', 'mechanismMap', 'heartTune']);
  assert.equal(state.phase, 'camp');
  assert.equal(state.objectives.bell.progress, 0);
  assert.equal(state.actors.tav.ap, 2);
});

test('roll checks are visible, deterministic, and include actor and prelude bonuses', () => {
  const state = createInitialState(['savedVillage', 'mechanismMap', 'heartTune']);
  const rng = createRng(7);

  const result = performCheck(state, {
    actorId: 'liu',
    discipline: 'music',
    dc: 11,
    preludeFlag: 'heartTune',
    rng,
  });

  assert.equal(result.roll, 6);
  assert.equal(result.modifier, 4);
  assert.equal(result.preludeBonus, 3);
  assert.equal(result.total, 13);
  assert.equal(result.success, true);
});

test('skill use spends action points and advances linked objectives', () => {
  const state = createInitialState(['savedVillage', 'mechanismMap', 'heartTune']);
  state.phase = 'combat';

  const result = useSkill(state, {
    actorId: 'tang',
    skillId: 'splitFlood',
    targetId: 'watergate',
    rng: createRng(3),
  });

  assert.equal(result.ok, true);
  assert.equal(state.actors.tang.ap, 0);
  assert.equal(state.objectives.watergate.progress, 2);
  assert.equal(state.objectives.watergate.complete, false);

  state.actors.tang.ap = 2;
  useSkill(state, {
    actorId: 'tang',
    skillId: 'splitFlood',
    targetId: 'watergate',
    rng: createRng(4),
  });

  assert.equal(state.objectives.watergate.complete, true);
  assert.equal(state.variables.tangWatergateFix, true);
});

test('enemy turn raises pressure but does not hard fail the encounter', () => {
  const state = createInitialState(['stoleLedger', 'shanzhaiContact', 'trackedBai']);
  state.phase = 'combat';
  state.pressure = 3;

  const result = enemyTurn(state, createRng(2));

  assert.equal(result.events.length > 0, true);
  assert.equal(state.phase, 'combat');
  assert.equal(state.pressure >= 4, true);
  assert.equal(state.objectives.hostages.complete, false);
});

test('ending rules support distinct partial-success outcomes', () => {
  const rescueState = createInitialState(['savedVillage', 'mechanismMap', 'heartTune']);
  rescueState.objectives.bell.complete = true;
  rescueState.objectives.watergate.complete = true;
  rescueState.objectives.hostages.complete = true;
  rescueState.variables.hostageRescueScore = 3;
  rescueState.variables.watergateStability = 3;
  rescueState.variables.evidenceExposure = 2;

  assert.equal(resolveEnding(rescueState).id, 'balancedMercy');

  const chaseState = createInitialState(['stoleLedger', 'shanzhaiContact', 'trackedBai']);
  chaseState.objectives.tieKey.complete = true;
  chaseState.variables.tieKeyState = 'obtained';
  chaseState.variables.whiteWeichenStatus = 'captured';
  chaseState.variables.watergateStability = 1;

  assert.equal(resolveEnding(chaseState).id, 'chaseKey');

  const chaosState = createInitialState(['stoleLedger', 'shanzhaiContact', 'trackedBai']);
  chaosState.pressure = 8;
  chaosState.variables.watergateStability = 0;
  chaosState.variables.hostageRescueScore = 0;

  assert.equal(resolveEnding(chaosState).id, 'chaosEscape');
});
