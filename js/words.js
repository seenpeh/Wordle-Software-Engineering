// دیکشنری کلمات پنج‌حرفی فارسی

import { WORD_LENGTH } from "./config.js";

/**
 * کلمات هدف بازی. همه‌ی کلمات دقیقاً پنج حرف دارند و فقط از حروفی
 * ساخته شده‌اند که روی کیبورد مجازی وجود دارد (بنابراین «آ» در این
 * فهرست نمی‌آید و به‌جای آن از «ا» استفاده می‌شود).
 */
export const WORDS = [
  "پرنده",
  "ستاره",
  "مدرسه",
  "باران",
  "زندگی",
  "پنجره",
  "دریچه",
  "سلامت",
  "کبوتر",
  "گنجشک",
  "نارنج",
  "شکلات",
  "فرهنگ",
  "پرواز",
  "تصویر",
  "کلمات",
  "بادام",
  "انگور",
  "شیرین",
  "ترانه",
  "صندلی",
  "پاییز",
  "دلتنگ",
  "خندان",
  "سپیده",
  "فرشته",
  "بلندی",
  "پرستو",
];

/**
 * آیا کلمه در فهرست کلمات مجاز هست؟
 * @param {string} word
 * @returns {boolean}
 */
export function isValidWord(word) {
  return WORDS.includes(word);
}

/**
 * یک کلمه‌ی تصادفی از فهرست انتخاب می‌کند.
 * @param {() => number} random تابع تصادفی، برای تست‌پذیری قابل جایگزینی است
 * @returns {string}
 */
export function pickRandomWord(random = Math.random) {
  return WORDS[Math.floor(random() * WORDS.length)];
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
 * بررسی سلامت فهرست: همه‌ی کلمات باید طول درست داشته باشند.
 * @returns {string[]} کلمات نامعتبر
 */
export function findMalformedWords() {
  return WORDS.filter((word) => toLetters(word).length !== WORD_LENGTH);
}
