// کنترلر بازی: رویدادهای ورودی را به وضعیت و گرید وصل می‌کند

import { GAME_INPUT_EVENT } from "./input.js";
import { createBoard, setTileLetter } from "./board.js";
import { addLetter, createGameState, currentGuess, deleteLetter } from "./state.js";
import { WORD_LENGTH } from "./config.js";

/**
 * ردیف جاری گرید را با حروف تایپ‌شده هم‌گام می‌کند.
 */
function renderCurrentRow(tiles, state) {
  const letters = currentGuess(state);
  const rowTiles = tiles[state.currentRow];

  if (!rowTiles) {
    return;
  }

  for (let col = 0; col < WORD_LENGTH; col++) {
    setTileLetter(rowTiles[col], letters[col] ?? "");
  }
}

/**
 * بازی را روی گرید داده‌شده راه‌اندازی می‌کند.
 * @param {HTMLElement} boardElement
 * @param {Document|HTMLElement} target عنصری که رویدادهای ورودی روی آن منتشر می‌شود
 * @returns {() => void} تابع پاک‌سازی شنونده‌ها
 */
export function startGame(boardElement, target = document) {
  const tiles = createBoard(boardElement);
  const state = createGameState();

  const handleInput = (event) => {
    const { action, value } = event.detail ?? {};
    let changed = false;

    if (action === "letter") {
      changed = addLetter(state, value);
    } else if (action === "delete") {
      changed = deleteLetter(state);
    }

    if (changed) {
      renderCurrentRow(tiles, state);
    }
  };

  target.addEventListener(GAME_INPUT_EVENT, handleInput);

  return () => target.removeEventListener(GAME_INPUT_EVENT, handleInput);
}
