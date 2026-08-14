import test from "node:test";
import assert from "node:assert/strict";

import {
  loadStats,
  recordGameResult,
  STATS_STORAGE_KEY,
} from "../js/stats.js";

function createMemoryStorage(initialValue = null) {
  const values = new Map();

  if (initialValue !== null) {
    values.set(STATS_STORAGE_KEY, initialValue);
  }

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("returns empty stats when no saved game exists", () => {
  assert.deepEqual(loadStats(createMemoryStorage()), {
    played: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    maxStreak: 0,
  });
});

test("records wins and advances current and maximum streaks", () => {
  const storage = createMemoryStorage();

  recordGameResult(true, storage);
  const stats = recordGameResult(true, storage);

  assert.deepEqual(stats, {
    played: 2,
    wins: 2,
    losses: 0,
    currentStreak: 2,
    maxStreak: 2,
  });
});

test("records losses and resets only the current streak", () => {
  const storage = createMemoryStorage();

  recordGameResult(true, storage);
  const stats = recordGameResult(false, storage);

  assert.deepEqual(stats, {
    played: 2,
    wins: 1,
    losses: 1,
    currentStreak: 0,
    maxStreak: 1,
  });
});

test("recovers safely from malformed stored data", () => {
  assert.deepEqual(loadStats(createMemoryStorage("not-json")), {
    played: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    maxStreak: 0,
  });
});
