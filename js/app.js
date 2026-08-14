// وردل فارسی - نقطه‌ی ورود برنامه

import { createBoard } from "./board.js";

function init() {
  const container = document.getElementById("board");
  createBoard(container);
}

document.addEventListener("DOMContentLoaded", init);
