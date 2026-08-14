import test from "node:test";
import assert from "node:assert/strict";

import { calculateWinRate } from "../js/stats-modal.js";

test("calculates a rounded win percentage", () => {
  assert.equal(calculateWinRate({ played: 3, wins: 2 }), 67);
  assert.equal(calculateWinRate({ played: 4, wins: 1 }), 25);
});

test("returns zero percent before the first game", () => {
  assert.equal(calculateWinRate({ played: 0, wins: 0 }), 0);
});

test("normalizes invalid values before calculating win rate", () => {
  assert.equal(calculateWinRate({ played: -1, wins: "many" }), 0);
});
