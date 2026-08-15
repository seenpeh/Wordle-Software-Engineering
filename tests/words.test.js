import assert from "node:assert/strict";
import test from "node:test";

import { WORD_LENGTH } from "../js/config.js";
import { ANSWERS, VALID_WORDS } from "../js/dictionary.js";
import { findMalformedWords, isValidWord, pickRandomWord, toLetters } from "../js/words.js";

// حروفی که روی کیبورد مجازی وجود دارند؛ «آ» عمداً در فهرست نیست.
const KEYBOARD_LETTERS = new Set("ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی");

test("every word has exactly the configured length", () => {
  assert.deepEqual(findMalformedWords(), []);
});

test("counts Persian characters rather than UTF-16 code units", () => {
  assert.equal(toLetters("پرنده").length, WORD_LENGTH);
});

test("the dictionary is large enough to be playable", () => {
  assert.ok(VALID_WORDS.length > 5000, `only ${VALID_WORDS.length} valid words`);
  assert.ok(ANSWERS.length > 500, `only ${ANSWERS.length} answers`);
});

test("neither list has duplicates", () => {
  assert.equal(new Set(VALID_WORDS).size, VALID_WORDS.length);
  assert.equal(new Set(ANSWERS).size, ANSWERS.length);
});

test("every answer is also an accepted guess", () => {
  const missing = ANSWERS.filter((word) => !isValidWord(word));
  assert.deepEqual(missing, []);
});

test("every word is typeable on the virtual keyboard", () => {
  const unreachable = VALID_WORDS.filter(
    (word) => !toLetters(word).every((letter) => KEYBOARD_LETTERS.has(letter)),
  );
  assert.deepEqual(unreachable.slice(0, 5), []);
});

test("accepts common everyday words", () => {
  for (const word of ["ایران", "یخچال", "ستاره", "پرنده", "گنجشک", "کبوتر"]) {
    assert.equal(isValidWord(word), true, `«${word}» should be accepted`);
  }
});

test("rejects words of the wrong length", () => {
  assert.equal(isValidWord("قورباغه"), false);
  assert.equal(isValidWord("درخت"), false);
});

test("picks a word from the answer list using the injected random source", () => {
  assert.equal(pickRandomWord(() => 0), ANSWERS[0]);
  assert.equal(pickRandomWord(() => 0.999999), ANSWERS.at(-1));
});
