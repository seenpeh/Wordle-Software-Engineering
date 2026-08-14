// وردل فارسی - نقطه‌ی ورود برنامه

import { createBoard } from "./board.js";
import {
  bindKeyboardFeedback,
  bindPhysicalKeyboard,
  bindVirtualKeyboard,
} from "./keyboard.js";

const board = document.querySelector("#board");
const keyboard = document.querySelector("#keyboard");

createBoard(board);

bindVirtualKeyboard(keyboard);
bindPhysicalKeyboard();
bindKeyboardFeedback(keyboard);
