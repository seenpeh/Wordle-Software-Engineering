export const GAME_INPUT_EVENT = "wordle:input";

const PERSIAN_LETTERS = new Set([
  "آ", "ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز",
  "ژ", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل",
  "م", "ن", "و", "ه", "ی",
]);

const LETTER_VARIANTS = new Map([
  ["ك", "ک"],
  ["ي", "ی"],
  ["ى", "ی"],
]);

export function normalizeGameInput(rawKey) {
  if (typeof rawKey !== "string") {
    return null;
  }

  const key = rawKey.trim().normalize("NFC");
  const lowerKey = key.toLocaleLowerCase("en-US");

  if (lowerKey === "enter") {
    return { action: "submit" };
  }

  if (lowerKey === "backspace" || lowerKey === "delete") {
    return { action: "delete" };
  }

  const letter = LETTER_VARIANTS.get(key) ?? key;
  if (PERSIAN_LETTERS.has(letter)) {
    return { action: "letter", value: letter };
  }

  return null;
}

export function emitGameInput(rawKey, { target = document, source = "virtual" } = {}) {
  const input = normalizeGameInput(rawKey);

  if (!input) {
    return false;
  }

  target.dispatchEvent(new CustomEvent(GAME_INPUT_EVENT, {
    detail: { ...input, source },
  }));

  return true;
}
