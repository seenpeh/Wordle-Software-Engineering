// وردل فارسی - نقطه‌ی ورود برنامه

import { startGame } from "./game.js";
import {
  bindKeyboardFeedback,
  bindPhysicalKeyboard,
  bindVirtualKeyboard,
} from "./keyboard.js";

const board = document.querySelector("#board");
const keyboard = document.querySelector("#keyboard");

startGame(board);

bindVirtualKeyboard(keyboard);
bindPhysicalKeyboard();
bindKeyboardFeedback(keyboard);
