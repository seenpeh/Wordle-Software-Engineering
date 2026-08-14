import test from "node:test";
import assert from "node:assert/strict";

import { mergeKeyState } from "../js/keyboard.js";

test("upgrades keyboard feedback according to Wordle state priority", () => {
  assert.equal(mergeKeyState(null, "absent"), "absent");
  assert.equal(mergeKeyState("absent", "present"), "present");
  assert.equal(mergeKeyState("present", "correct"), "correct");
});

test("does not downgrade an existing keyboard state", () => {
  assert.equal(mergeKeyState("correct", "present"), "correct");
  assert.equal(mergeKeyState("present", "absent"), "present");
});

test("ignores unknown feedback states", () => {
  assert.equal(mergeKeyState("present", "unknown"), "present");
  assert.equal(mergeKeyState(null, "unknown"), null);
});
