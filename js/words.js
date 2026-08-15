// دسترسی به دیکشنری کلمات فارسی

import { WORD_LENGTH } from "./config.js";
import { ANSWERS, VALID_WORDS } from "./dictionary.js";

/** کلمات هدف بازی. */
export const WORDS = ANSWERS;

// جست‌وجوی حدس در هر نوبت انجام می‌شود، پس یک Set به‌جای پیمایش آرایه.
const VALID_LOOKUP = new Set(VALID_WORDS);

/**
 * آیا کلمه به‌عنوان حدس پذیرفته می‌شود؟
 * @param {string} word
 * @returns {boolean}
 */
export function isValidWord(word) {
  return VALID_LOOKUP.has(word);
}

/**
 * یک کلمه‌ی هدف تصادفی انتخاب می‌کند.
 * @param {() => number} random تابع تصادفی، برای تست‌پذیری قابل جایگزینی است
 * @returns {string}
 */
export function pickRandomWord(random = Math.random) {
  return ANSWERS[Math.floor(random() * ANSWERS.length)];
}

/**
 * کلمه را به آرایه‌ی حروف تبدیل می‌کند.
 * @param {string} word
 * @returns {string[]}
 */
export function toLetters(word) {
  return [...word.normalize("NFC")];
}

/**
 * بررسی سلامت دیکشنری: همه‌ی کلمات باید طول درست داشته باشند.
 * @returns {string[]} کلمات نامعتبر
 */
export function findMalformedWords() {
  return VALID_WORDS.filter((word) => toLetters(word).length !== WORD_LENGTH);
}
