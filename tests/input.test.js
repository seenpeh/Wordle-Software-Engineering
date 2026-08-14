import test from "node:test";
import assert from "node:assert/strict";

import { normalizeGameInput } from "../js/input.js";

test("normalizes Persian letters and common Arabic variants", () => {
  assert.deepEqual(normalizeGameInput("پ"), { action: "letter", value: "پ" });
  assert.deepEqual(normalizeGameInput("ك"), { action: "letter", value: "ک" });
  assert.deepEqual(normalizeGameInput("ي"), { action: "letter", value: "ی" });
});

test("maps virtual action keys to game actions", () => {
  assert.deepEqual(normalizeGameInput("enter"), { action: "submit" });
  assert.deepEqual(normalizeGameInput("backspace"), { action: "delete" });
});

test("accepts physical keyboard action key casing", () => {
  assert.deepEqual(normalizeGameInput("Enter"), { action: "submit" });
  assert.deepEqual(normalizeGameInput("Backspace"), { action: "delete" });
  assert.deepEqual(normalizeGameInput("Delete"), { action: "delete" });
});

test("ignores keys that are not valid game input", () => {
  assert.equal(normalizeGameInput("A"), null);
  assert.equal(normalizeGameInput("Shift"), null);
  assert.equal(normalizeGameInput(null), null);
});
