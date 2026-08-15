export const GAME_ENDED_EVENT = "wordle:game-ended";
export const STATS_UPDATED_EVENT = "wordle:stats-updated";
export const STATS_STORAGE_KEY = "persian-wordle:stats:v1";

const EMPTY_STATS = Object.freeze({
  played: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  maxStreak: 0,
});

function sanitizeCount(value) {
  return Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

export function createEmptyStats() {
  return { ...EMPTY_STATS };
}

export function normalizeStats(value) {
  if (!value || typeof value !== "object") {
    return createEmptyStats();
  }

  const stats = {
    played: sanitizeCount(value.played),
    wins: sanitizeCount(value.wins),
    losses: sanitizeCount(value.losses),
    currentStreak: sanitizeCount(value.currentStreak),
    maxStreak: sanitizeCount(value.maxStreak),
  };

  stats.played = Math.max(stats.played, stats.wins + stats.losses);
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);

  return stats;
}

export function loadStats(storage = localStorage) {
  try {
    const storedValue = storage.getItem(STATS_STORAGE_KEY);
    return storedValue ? normalizeStats(JSON.parse(storedValue)) : createEmptyStats();
  } catch {
    return createEmptyStats();
  }
}

export function saveStats(stats, storage = localStorage) {
  const normalizedStats = normalizeStats(stats);

  try {
    storage.setItem(STATS_STORAGE_KEY, JSON.stringify(normalizedStats));
  } catch {
    // The current result is still returned when browser storage is unavailable.
  }

  return normalizedStats;
}

export function recordGameResult(won, storage = localStorage) {
  const currentStats = loadStats(storage);
  const nextStreak = won ? currentStats.currentStreak + 1 : 0;

  return saveStats({
    played: currentStats.played + 1,
    wins: currentStats.wins + (won ? 1 : 0),
    losses: currentStats.losses + (won ? 0 : 1),
    currentStreak: nextStreak,
    maxStreak: Math.max(currentStats.maxStreak, nextStreak),
  }, storage);
}

export function bindStatsTracking(target = document, storage = localStorage) {
  const handleGameEnded = (event) => {
    if (typeof event.detail?.won !== "boolean") {
      return;
    }

    const stats = recordGameResult(event.detail.won, storage);
    target.dispatchEvent(new CustomEvent(STATS_UPDATED_EVENT, {
      detail: { stats },
    }));
  };

  target.addEventListener(GAME_ENDED_EVENT, handleGameEnded);

  return () => target.removeEventListener(GAME_ENDED_EVENT, handleGameEnded);
}
