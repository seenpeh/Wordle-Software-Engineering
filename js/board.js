// ساخت و مدیریت گرید حدس‌ها (۶ ردیف × ۵ خانه)

import { WORD_LENGTH, MAX_GUESSES, LETTER_STATE } from "./config.js";

/**
 * گرید را داخل عنصر داده‌شده می‌سازد و مرجع خانه‌ها را برمی‌گرداند.
 * @param {HTMLElement} container
 * @returns {HTMLElement[][]} آرایه‌ی دوبعدی خانه‌ها به ترتیب [ردیف][ستون]
 */
export function createBoard(container) {
  container.innerHTML = "";
  const tiles = [];

  for (let row = 0; row < MAX_GUESSES; row++) {
    const rowEl = document.createElement("div");
    rowEl.className = "board-row";
    rowEl.dataset.row = String(row);

    const rowTiles = [];
    for (let col = 0; col < WORD_LENGTH; col++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.state = LETTER_STATE.EMPTY;
      tile.dataset.row = String(row);
      tile.dataset.col = String(col);
      rowEl.appendChild(tile);
      rowTiles.push(tile);
    }

    container.appendChild(rowEl);
    tiles.push(rowTiles);
  }

  return tiles;
}

/**
 * حرف یک خانه را می‌نویسد یا پاک می‌کند.
 * @param {HTMLElement} tile
 * @param {string} letter رشته‌ی خالی یعنی پاک‌کردن خانه
 */
export function setTileLetter(tile, letter) {
  tile.textContent = letter;
  tile.classList.toggle("filled", letter !== "");
}

/**
 * وضعیت رنگی یک خانه را تعیین می‌کند.
 * @param {HTMLElement} tile
 * @param {string} state یکی از مقادیر LETTER_STATE
 */
export function setTileState(tile, state) {
  tile.dataset.state = state;
}
