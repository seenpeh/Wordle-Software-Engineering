import assert from "node:assert/strict";
import test from "node:test";

import { evaluateGuess, isWinningEvaluation } from "../js/evaluate.js";

const statuses = (guess, target) => evaluateGuess(guess, target).map((entry) => entry.status);

test("marks every letter correct when the guess matches the target", () => {
  assert.deepEqual(
    statuses("ستاره", "ستاره"),
    ["correct", "correct", "correct", "correct", "correct"],
  );
});

test("marks letters that are in the word but in the wrong place", () => {
  // «رتنسه» در برابر «ستاره»: «ت» و «ه» سر جای خود هستند،
  // «ر» و «س» در کلمه هستند اما جابه‌جا، و «ن» اصلاً وجود ندارد
  assert.deepEqual(
    statuses("رتنسه", "ستاره"),
    ["present", "correct", "absent", "present", "correct"],
  );
});

test("marks letters that do not appear in the target at all", () => {
  assert.deepEqual(
    statuses("گنجشک", "بادام"),
    ["absent", "absent", "absent", "absent", "absent"],
  );
});

test("accepts a letter array as well as a string", () => {
  assert.deepEqual(statuses([..."ستاره"], "ستاره"), statuses("ستاره", "ستاره"));
});

test("detects a winning evaluation", () => {
  assert.equal(isWinningEvaluation(evaluateGuess("ستاره", "ستاره")), true);
  assert.equal(isWinningEvaluation(evaluateGuess("پرنده", "ستاره")), false);
});
