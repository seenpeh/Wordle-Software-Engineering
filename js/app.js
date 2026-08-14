import {
  bindKeyboardFeedback,
  bindPhysicalKeyboard,
  bindVirtualKeyboard,
} from "./keyboard.js";

const keyboard = document.querySelector("#keyboard");

bindVirtualKeyboard(keyboard);
bindPhysicalKeyboard();
bindKeyboardFeedback(keyboard);
