import assert from "node:assert/strict";
import test from "node:test";

import { WORD_LENGTH } from "../js/config.js";
import { WORDS, findMalformedWords, isValidWord, pickRandomWord, toLetters } from "../js/words.js";

test("every word has exactly the configured length", () => {
  assert.deepEqual(findMalformedWords(), []);
});

test("counts Persian characters rather than UTF-16 code units", () => {
  assert.equal(toLetters("پرنده").length, WORD_LENGTH);
});

test("the word list has no duplicates", () => {
  assert.equal(new Set(WORDS).size, WORDS.length);
});

test("recognises words inside and outside the list", () => {
  assert.equal(isValidWord("ستاره"), true);
  assert.equal(isValidWord("قورباغه"), false);
});

test("picks a word from the list using the injected random source", () => {
  assert.equal(pickRandomWord(() => 0), WORDS[0]);
  assert.equal(pickRandomWord(() => 0.999999), WORDS.at(-1));
});
