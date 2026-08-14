// مقایسه‌ی حدس با کلمه‌ی هدف

import { LETTER_STATE } from "./config.js";
import { toLetters } from "./words.js";

/**
 * هر حرف حدس را با کلمه‌ی هدف می‌سنجد.
 *
 * @param {string|string[]} guess حدس کاربر
 * @param {string} target کلمه‌ی هدف
 * @returns {{letter: string, status: string}[]} نتیجه به ترتیب حروف حدس
 */
export function evaluateGuess(guess, target) {
  const guessLetters = Array.isArray(guess) ? guess : toLetters(guess);
  const targetLetters = toLetters(target);

  return guessLetters.map((letter, index) => {
    if (letter === targetLetters[index]) {
      return { letter, status: LETTER_STATE.CORRECT };
    }

    if (targetLetters.includes(letter)) {
      return { letter, status: LETTER_STATE.PRESENT };
    }

    return { letter, status: LETTER_STATE.ABSENT };
  });
}

/**
 * آیا حدس دقیقاً برابر کلمه‌ی هدف است؟
 * @param {{status: string}[]} evaluations
 * @returns {boolean}
 */
export function isWinningEvaluation(evaluations) {
  return evaluations.every((entry) => entry.status === LETTER_STATE.CORRECT);
}
