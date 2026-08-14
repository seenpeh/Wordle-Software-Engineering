// وضعیت بازی: حدس‌های ثبت‌شده و حدس در حال تایپ

import { WORD_LENGTH, MAX_GUESSES } from "./config.js";

/**
 * یک وضعیت خالی برای شروع بازی می‌سازد.
 * @returns {{guesses: string[][], currentRow: number, status: string}}
 */
export function createGameState() {
  return {
    guesses: Array.from({ length: MAX_GUESSES }, () => []),
    currentRow: 0,
    status: "playing",
  };
}

/**
 * حروف ردیفی که در حال تایپ است.
 * @param {object} state
 * @returns {string[]}
 */
export function currentGuess(state) {
  return state.guesses[state.currentRow] ?? [];
}

/**
 * آیا ردیف فعلی کامل شده است؟
 * @param {object} state
 * @returns {boolean}
 */
export function isGuessComplete(state) {
  return currentGuess(state).length === WORD_LENGTH;
}

/**
 * یک حرف به ردیف فعلی اضافه می‌کند.
 * @returns {boolean} اگر حرف پذیرفته شد true
 */
export function addLetter(state, letter) {
  if (state.status !== "playing" || isGuessComplete(state)) {
    return false;
  }

  currentGuess(state).push(letter);
  return true;
}

/**
 * آخرین حرف ردیف فعلی را پاک می‌کند.
 * @returns {boolean} اگر حرفی پاک شد true
 */
export function deleteLetter(state) {
  if (state.status !== "playing" || currentGuess(state).length === 0) {
    return false;
  }

  currentGuess(state).pop();
  return true;
}

/**
 * ردیف فعلی را نهایی می‌کند و به ردیف بعد می‌رود.
 * @returns {boolean} اگر ردیف پیش رفت true
 */
export function commitRow(state) {
  if (!isGuessComplete(state)) {
    return false;
  }

  state.currentRow += 1;
  return true;
}

/**
 * آیا همه‌ی ردیف‌ها مصرف شده‌اند؟
 * @param {object} state
 * @returns {boolean}
 */
export function isBoardFull(state) {
  return state.currentRow >= MAX_GUESSES;
}
